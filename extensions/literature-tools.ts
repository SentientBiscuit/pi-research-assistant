import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";

const S2_API_BASE = "https://api.semanticscholar.org/graph/v1";
const DEFAULT_FIELDS = [
  "paperId",
  "title",
  "abstract",
  "year",
  "venue",
  "publicationVenue",
  "publicationTypes",
  "authors",
  "citationCount",
  "influentialCitationCount",
  "referenceCount",
  "fieldsOfStudy",
  "s2FieldsOfStudy",
  "openAccessPdf",
  "externalIds",
  "url",
  "publicationDate",
  "journal",
  "tldr",
].join(",");

const MAX_RETRIES = 3;

const rateLimits = {
  semantic_scholar: { minIntervalMs: 1000, nextAllowedAt: 0, queue: Promise.resolve() },
  arxiv: { minIntervalMs: 3000, nextAllowedAt: 0, queue: Promise.resolve() },
} as const;

async function sleep(ms: number, signal?: AbortSignal) {
  if (ms <= 0) return;
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    const onAbort = () => {
      clearTimeout(timeout);
      cleanup();
      reject(new Error("Aborted while waiting for rate limit"));
    };

    const cleanup = () => {
      if (signal) signal.removeEventListener("abort", onAbort);
    };

    if (signal) {
      if (signal.aborted) {
        clearTimeout(timeout);
        cleanup();
        reject(new Error("Aborted while waiting for rate limit"));
        return;
      }
      signal.addEventListener("abort", onAbort, { once: true });
    }
  });
}

async function withRateLimit<T>(provider: keyof typeof rateLimits, fn: () => Promise<T>, signal?: AbortSignal): Promise<T> {
  const state = rateLimits[provider];

  const reservation = state.queue.then(async () => {
    const now = Date.now();
    const waitMs = Math.max(0, state.nextAllowedAt - now);
    await sleep(waitMs, signal);
    state.nextAllowedAt = Math.max(Date.now(), state.nextAllowedAt) + state.minIntervalMs;
  });

  state.queue = reservation.catch(() => {});
  await reservation;
  return fn();
}

function isRetryableStatus(status: number) {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

function isRetryableErrorMessage(message: string) {
  return /rate.?limit|too many requests|overloaded|service.?unavailable|temporar|timeout|timed out|connection.?reset|connection.?refused|network/i.test(
    message,
  );
}

async function fetchWithRetries(
  provider: keyof typeof rateLimits,
  url: string,
  init: RequestInit,
  signal?: AbortSignal,
): Promise<Response> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (signal?.aborted) throw new Error("Request was aborted");

    try {
      const response = await withRateLimit(provider, () => fetch(url, { ...init, signal }), signal);
      if (response.ok) {
        return response;
      }
      
      const body = await response.text().catch(() => "");
      if (attempt < MAX_RETRIES && (isRetryableStatus(response.status) || isRetryableErrorMessage(body))) {
        await sleep(rateLimits[provider].minIntervalMs * 2 ** attempt, signal);
        continue;
      }

      throw new Error(`${provider} API error ${response.status}: ${body || response.statusText}`);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      if (err.name === "AbortError" || err.message === "Request was aborted" || signal?.aborted) {
        throw new Error("Request was aborted");
      }
      lastError = err;
      if (attempt < MAX_RETRIES && isRetryableErrorMessage(err.message)) {
        await sleep(rateLimits[provider].minIntervalMs * 2 ** attempt, signal);
        continue;
      }
      throw err;
    }
  }

  throw lastError ?? new Error(`Failed to fetch ${url}`);
}

function getApiKey() {
  return process.env.SEMANTIC_SCHOLAR_API_KEY;
}

async function semanticScholarFetch(path: string, signal?: AbortSignal) {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  const apiKey = getApiKey();
  if (apiKey) headers["x-api-key"] = apiKey;

  const response = await fetchWithRetries("semantic_scholar", `${S2_API_BASE}${path}`, { method: "GET", headers }, signal);
  return response.json();
}

function normalizePaper(paper: any) {
  return {
    paperId: paper.paperId,
    title: paper.title,
    year: paper.year,
    venue: paper.venue ?? paper.publicationVenue?.name ?? paper.journal?.name ?? null,
    authors: Array.isArray(paper.authors)
      ? paper.authors.map((a: any) => ({ name: a.name, authorId: a.authorId }))
      : [],
    abstract: paper.abstract ?? null,
    tldr: paper.tldr?.text ?? null,
    citationCount: paper.citationCount ?? 0,
    influentialCitationCount: paper.influentialCitationCount ?? 0,
    referenceCount: paper.referenceCount ?? 0,
    fieldsOfStudy: paper.fieldsOfStudy ?? paper.s2FieldsOfStudy?.map((f: any) => f.category) ?? [],
    publicationDate: paper.publicationDate ?? null,
    publicationTypes: paper.publicationTypes ?? [],
    externalIds: paper.externalIds ?? {},
    openAccessPdf: paper.openAccessPdf ?? null,
    url: paper.url ?? null,
  };
}

function normalizeArxivId(arxivId: string) {
  const normalized = arxivId.trim();
  if (!normalized) throw new Error("arXiv ID must not be empty");
  if (!/^[A-Za-z.-/0-9]+(v\d+)?$/.test(normalized)) throw new Error(`Invalid arXiv ID: ${arxivId}`);
  return normalized;
}

function sanitizeArxivIdForPath(arxivId: string) {
  return arxivId.replace(/\//g, "__");
}

async function listFilesRecursive(dir: string, baseDir = dir): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) return listFilesRecursive(fullPath, baseDir);
      return [fullPath.slice(baseDir.length + 1)];
    }),
  );
  return files.flat().sort();
}

function guessMainTexFiles(files: string[]) {
  return files
    .filter((file) => file.toLowerCase().endsWith(".tex"))
    .sort((a, b) => {
      const score = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.endsWith("/main.tex") || lower === "main.tex") return 0;
        if (lower.endsWith("/paper.tex") || lower === "paper.tex") return 1;
        if (lower.endsWith("/ms.tex") || lower === "ms.tex") return 2;
        if (lower.endsWith("/article.tex") || lower === "article.tex") return 3;
        return 10;
      };
      return score(a) - score(b) || a.localeCompare(b);
    })
    .slice(0, 10);
}

function paperToText(paper: ReturnType<typeof normalizePaper>) {
  const authors = paper.authors.slice(0, 8).map((a) => a.name).join(", ");
  const idParts = Object.entries(paper.externalIds || {})
    .filter(([, v]) => typeof v === "string" && v.length > 0)
    .slice(0, 5)
    .map(([k, v]) => `${k}: ${v}`)
    .join(", ");

  return [
    `Title: ${paper.title ?? "Unknown title"}`,
    `Paper ID: ${paper.paperId ?? "n/a"}`,
    `Year: ${paper.year ?? "n/a"}`,
    `Venue: ${paper.venue ?? "n/a"}`,
    `Authors: ${authors || "n/a"}`,
    `Citations: ${paper.citationCount ?? 0} (influential: ${paper.influentialCitationCount ?? 0})`,
    `References: ${paper.referenceCount ?? 0}`,
    `Fields of study: ${paper.fieldsOfStudy?.join(", ") || "n/a"}`,
    `Publication date: ${paper.publicationDate ?? "n/a"}`,
    `URL: ${paper.url ?? "n/a"}`,
    idParts ? `External IDs: ${idParts}` : "",
    paper.tldr ? `TL;DR: ${paper.tldr}` : "",
    paper.abstract ? `Abstract: ${paper.abstract}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function (pi: ExtensionAPI) {
  pi.registerTool({
    name: "semantic_scholar_search",
    label: "Semantic Scholar Search",
    description: "Search scientific papers in Semantic Scholar and return concise metadata for matching papers.",
    promptSnippet: "Search Semantic Scholar for scientific papers by topic, keyword, or natural-language query.",
    promptGuidelines: [
      "Use semantic_scholar_search when the user wants to find, survey, or shortlist scientific papers.",
    ],
    parameters: Type.Object({
      query: Type.String({ description: "Search query for papers" }),
      limit: Type.Optional(Type.Number({ description: "Number of results to return, 1-20", minimum: 1, maximum: 20 })),
      yearFrom: Type.Optional(Type.Number({ description: "Lower bound publication year" })),
      yearTo: Type.Optional(Type.Number({ description: "Upper bound publication year" })),
      fields: Type.Optional(Type.String({ description: `Comma-separated Semantic Scholar fields to request. Default: ${DEFAULT_FIELDS}` })),
    }),
    async execute(_toolCallId, params, signal) {
      const limit = Math.max(1, Math.min(20, params.limit ?? 10));
      const search = new URLSearchParams();
      search.set("query", params.query);
      search.set("limit", String(limit));
      search.set("fields", params.fields || DEFAULT_FIELDS);
      if (typeof params.yearFrom === "number" || typeof params.yearTo === "number") {
        const from = typeof params.yearFrom === "number" ? String(params.yearFrom) : "";
        const to = typeof params.yearTo === "number" ? String(params.yearTo) : "";
        search.set("year", `${from}-${to}`);
      }

      const result = await semanticScholarFetch(`/paper/search?${search.toString()}`, signal);
      const papers = Array.isArray(result.data) ? result.data.map(normalizePaper) : [];
      const resultsText = papers.length
        ? papers.map((paper: ReturnType<typeof normalizePaper>, i: number) => `Result ${i + 1}\n${paperToText(paper)}`).join("\n\n---\n\n")
        : `No Semantic Scholar papers found.`;
      const text = [`Query: ${params.query}`, `Limit: ${limit}`, resultsText].join("\n\n");

      return {
        content: [{ type: "text", text }],
        details: {
          query: params.query,
          total: papers.length,
          papers,
        },
      };
    },
  });

  pi.registerTool({
    name: "arxiv_download_source",
    label: "arXiv Download Source",
    description: "Download and extract arXiv source files for a paper using a raw arXiv ID.",
    promptSnippet: "Download and extract arXiv source files locally when you need the full LaTeX source.",
    promptGuidelines: [
      "Use arxiv_download_source only when you need the paper's full source files, not just metadata or links.",
      "Pass only the raw arXiv ID, not an arXiv URL.",
    ],
    parameters: Type.Object({
      arxivId: Type.String({ description: "Raw arXiv ID, e.g. 1706.03762 or cs.CL/9901001" }),
      title: Type.String({ description: "Paper title." }),
      outputDir: Type.Optional(Type.String({ description: "Directory to store extracted source. Defaults to .pi/cache/arxiv/<id> under the current project." })),
      force: Type.Optional(Type.Boolean({ description: "If true, delete any existing extracted directory and re-download." })),
    }),
    async execute(_toolCallId, params, signal, _onUpdate, ctx) {
      const arxivId = normalizeArxivId(params.arxivId);
      const title = params.title.trim();
      if (!title) throw new Error("Paper title must not be empty");
      const targetDir = resolve(ctx.cwd, params.outputDir ?? join(".pi", "cache", "arxiv", sanitizeArxivIdForPath(arxivId)));
      const archivePath = join(targetDir, "source.tar");
      const extractDir = join(targetDir, "source");

      if (params.force) {
        await rm(targetDir, { recursive: true, force: true });
      }

      let cacheHit = false;
      let files: string[] = [];
      try {
        files = await listFilesRecursive(extractDir);
        cacheHit = files.length > 0;
      } catch {
        cacheHit = false;
      }

      if (!cacheHit) {
        await mkdir(extractDir, { recursive: true });

        const response = await fetchWithRetries(
          "arxiv",
          `https://arxiv.org/e-print/${encodeURIComponent(arxivId)}`,
          {
            method: "GET",
          },
          signal,
        );
        const buffer = Buffer.from(await response.arrayBuffer());
        await writeFile(archivePath, buffer);

        const extractResult = await pi.exec("tar", ["-xf", archivePath, "-C", extractDir], { signal, timeout: 120000 });
        if (extractResult.code !== 0) {
          throw new Error(`Failed to extract arXiv source with tar: ${extractResult.stderr || extractResult.stdout || `exit code ${extractResult.code}`}`);
        }

        files = await listFilesRecursive(extractDir);
      }

      const texFiles = files.filter((file) => file.toLowerCase().endsWith(".tex"));
      const mainTexCandidates = guessMainTexFiles(files);

      const text = [
        `${cacheHit ? "Using cached" : "Downloaded"} arXiv source for ${arxivId}`,
        `Title: ${title}`,
        `Archive: ${archivePath}`,
        `Extracted to: ${extractDir}`,
        `Total files: ${files.length}`,
        `TeX files: ${texFiles.length}`,
        mainTexCandidates.length ? `Main TeX candidates: ${mainTexCandidates.join(", ")}` : "Main TeX candidates: none found",
      ].join("\n");

      return {
        content: [{ type: "text", text }],
        details: {
          arxivId,
          title,
          cacheHit,
          archivePath,
          extractDir,
          fileCount: files.length,
          texFileCount: texFiles.length,
          mainTexCandidates,
          files: files.slice(0, 500),
          truncatedFileList: files.length > 500,
        },
      };
    },
  });
}
