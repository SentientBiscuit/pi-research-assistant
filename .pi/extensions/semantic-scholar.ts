import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";

const API_BASE = "https://api.semanticscholar.org/graph/v1";
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

function getApiKey() {
  return process.env.SEMANTIC_SCHOLAR_API_KEY;
}

async function semanticScholarFetch(path: string, signal?: AbortSignal) {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  const apiKey = getApiKey();
  if (apiKey) headers["x-api-key"] = apiKey;

  const response = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers,
    signal,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Semantic Scholar API error ${response.status}: ${body || response.statusText}`);
  }

  return response.json();
}

function summarizePaper(paper: any) {
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

function paperToText(paper: ReturnType<typeof summarizePaper>) {
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
      "Use semantic_scholar_get_paper after search when you need a deeper view of a specific paper.",
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
      const papers = Array.isArray(result.data) ? result.data.map(summarizePaper) : [];
      const text = papers.length
        ? papers.map((paper: ReturnType<typeof summarizePaper>, i: number) => `Result ${i + 1}\n${paperToText(paper)}`).join("\n\n---\n\n")
        : `No Semantic Scholar papers found for query: ${params.query}`;

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
    name: "semantic_scholar_get_paper",
    label: "Semantic Scholar Get Paper",
    description: "Fetch detailed metadata for a specific paper from Semantic Scholar using a paper ID, DOI, ArXiv ID, PMID, PMCID, ACL ID, CorpusId, or URL.",
    promptSnippet: "Fetch one paper from Semantic Scholar by identifier such as DOI, ArXiv ID, Semantic Scholar paperId, or URL.",
    promptGuidelines: [
      "Use semantic_scholar_get_paper when the user names a specific paper or when you have an identifier from search results.",
    ],
    parameters: Type.Object({
      paperId: Type.String({ description: "Paper identifier, e.g. Semantic Scholar paperId, DOI:10..., ARXIV:..., PMID:..., PMCID:..., ACL:..., CorpusId:..., or a paper URL." }),
      fields: Type.Optional(Type.String({ description: `Comma-separated Semantic Scholar fields to request. Default: ${DEFAULT_FIELDS}` })),
    }),
    async execute(_toolCallId, params, signal) {
      const search = new URLSearchParams();
      search.set("fields", params.fields || DEFAULT_FIELDS);
      const paperId = encodeURIComponent(params.paperId);

      const result = await semanticScholarFetch(`/paper/${paperId}?${search.toString()}`, signal);
      const paper = summarizePaper(result);

      return {
        content: [{ type: "text", text: paperToText(paper) }],
        details: {
          paper,
        },
      };
    },
  });
}
