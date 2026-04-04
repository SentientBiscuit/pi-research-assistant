---
name: literature-review
description: Explore scientific literature with Semantic Scholar and arXiv. Use this when the user wants to find papers, inspect a specific paper, build a reading list, identify foundational and recent work, compare research directions, or gather evidence relevant to a research goal.
---

# Literature Review

Use this skill for scientific literature discovery, paper triage, and evidence gathering.

## Available tools

- `semantic_scholar_search`: search for relevant papers
- `arxiv_get_paper`: fetch arXiv metadata and canonical abstract/PDF/source URLs using a raw arXiv ID
- `arxiv_download_source`: download and extract arXiv source files locally when full text/source is needed

## When to use

Use this skill when you need to:
- map an area quickly
- identify foundational, recent, or survey papers
- gather evidence for or against a hypothesis
- understand what has already been tried
- collect related work for novelty assessment
- progressively inspect papers from abstract-level signals first, then full text only when necessary

## Workflow

1. Clarify the research goal if needed:
   - topic or question
   - domain and subfield
   - time horizon
   - whether the user wants breadth, depth, or both

2. Start broad with `semantic_scholar_search`.

3. From search results, identify:
   - survey/review papers
   - foundational highly cited papers
   - recent papers likely to reflect the current frontier
   - papers most directly relevant to the stated goal

4. Work progressively through papers:
   - start with titles, TL;DRs, abstracts, citation counts, and metadata from `semantic_scholar_search`
   - identify the most relevant papers from those search results
   - fetch full text only when abstracts are insufficient, for example when you need methodology details, specific experimental results, or need to resolve contradictions

5. If you need canonical arXiv links or full source text and Semantic Scholar gives an arXiv ID, use the arXiv tools:
   - use `arxiv_get_paper` when you need canonical arXiv metadata or links
   - use `arxiv_download_source` only when you need the source files locally

6. Organize findings into themes, not just a flat list of papers.

7. Summarize in a research-friendly format:
   - what is established
   - what is contested or unclear
   - what gaps appear relevant to the user's goal
   - which papers should be read next

## Good practices

- Prefer concise, high-signal summaries over dumping raw metadata.
- Distinguish clearly between facts from paper metadata and your own inference.
- Group papers by idea, method, limitation, or question.
- Mention when you only have metadata/abstract-level visibility.
- For AI/ML, assume Semantic Scholar often gives an arXiv ID when an arXiv version exists.
- When a query is too broad, refine it iteratively with narrower terms.
- When useful, compare neighboring directions rather than evaluating each paper in isolation.

## Output template

### Topic summary
- One short paragraph on the area and its relevance to the goal

### Key themes
- Theme 1
- Theme 2
- Theme 3

### Recommended papers
1. **Title** (Year)
   - Why it matters
   - Key clues from abstract/TL;DR
   - Citations / venue
   - Relevance to the goal

### Gaps / next steps
- What remains unclear
- Which paper to inspect more deeply
- Which search queries to try next

## Setup

Optional but recommended for higher rate limits:

```bash
export SEMANTIC_SCHOLAR_API_KEY=your_key_here
```

The Semantic Scholar tools can still work without an API key if Semantic Scholar allows the request, but authenticated access is more reliable.
