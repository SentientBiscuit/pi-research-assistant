---
name: literature-review
description: Explore scientific literature with Semantic Scholar and arXiv. Use this when the user wants to find papers, inspect a specific paper, build a reading list, identify foundational and recent work, compare research directions, or gather evidence relevant to a research goal.
---

# Literature Review

Use this skill for scientific literature discovery, paper triage, and evidence gathering.

## Available tools

- `semantic_scholar_search`: search for relevant papers
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

2. Do not rely on a single query. Search progressively with multiple query styles:
   - a direct statement of the problem or goal
   - a higher-level formulation of the area
   - a narrower method- or mechanism-level formulation
   - neighboring or competing terms for the same problem

3. Use `semantic_scholar_search` iteratively across different abstraction levels:
   - broad area query
   - more specific task/method query
   - failure-mode, limitation, or contradiction-oriented query when relevant

4. From search results, identify:
   - survey/review papers
   - foundational highly cited papers
   - recent papers likely to reflect the current frontier
   - papers most directly relevant to the stated goal
   - neighboring approaches that solve the problem differently

5. Work progressively through papers:
   - start with titles, TL;DRs, abstracts, citation counts, and metadata from `semantic_scholar_search`
   - identify the most relevant papers from those search results
   - fetch full text only when abstracts are insufficient, for example when you need methodology details, specific experimental results, or need to resolve contradictions

6. If you need full source text and Semantic Scholar gives an arXiv ID, use `arxiv_download_source`.

7. Use multi-hop query expansion when a promising paper or theme appears:
   - search using the paper's key terms
   - search for close alternatives or competing formulations
   - search for limitations, critiques, or follow-up variants

8. Treat citation count as a signal, not a hard filter:
   - for older papers, it helps identify foundational work
   - for recent papers, relevance and recency often matter more than citations
   - do not discard relevant papers only because they are lightly cited

9. Organize findings into themes, not just a flat list of papers.

10. Summarize in a research-friendly format:
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
- Do multi-query search rather than trusting the first wording.
- Rewrite queries at different abstraction levels: area, method, mechanism, and failure mode.
- When a query is too broad, refine it iteratively with narrower terms.
- Use neighboring and competing formulations to avoid tunnel vision.
- Use multi-hop expansion from promising papers or themes.
- Treat citation count as a relevance cue, not a hard filter.
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
