---
name: literature-review
description: Explore scientific literature with Semantic Scholar. Use this when the user wants to find papers, inspect a specific paper, build a reading list, identify foundational and recent work, or compare research directions.
---

# Literature Review

Use this skill for scientific literature discovery and paper triage.

## Available tools

- `semantic_scholar_search`: search for relevant papers
- `semantic_scholar_get_paper`: fetch details for one paper by paperId, DOI, ArXiv ID, PMID, PMCID, ACL ID, CorpusId, or URL

## Workflow

1. Clarify the research goal if needed:
   - topic or question
   - domain
   - date range
   - whether the user wants foundational papers, recent papers, surveys, or a focused shortlist

2. Start broad with `semantic_scholar_search`.

3. From the search results, identify:
   - review/survey papers
   - highly cited foundational papers
   - recent papers likely to reflect the current state of the field

4. Use `semantic_scholar_get_paper` on the most relevant hits to inspect:
   - abstract
   - TL;DR
   - citation counts
   - venue
   - authors
   - external IDs and links

5. Summarize results in a research-friendly format:
   - why the paper matters
   - likely contribution
   - whether it looks foundational, survey-style, or recent/applied
   - uncertainty or missing information

## Good practices

- Prefer concise, high-signal summaries over dumping raw metadata.
- Distinguish clearly between facts from Semantic Scholar metadata and your own inference.
- When building a reading list, group papers into categories such as surveys, foundational work, and recent advances.
- Mention if you only have metadata/abstract-level visibility.
- If a query is too broad, refine it iteratively with narrower terms.

## Output template

When useful, format results like this:

### Topic summary
- One short paragraph on the area

### Recommended papers
1. **Title** (Year)
   - Why it matters
   - Key clues from abstract/TL;DR
   - Citations / venue

### Gaps / next steps
- What to search next
- Which paper to inspect more deeply

## Setup

Optional but recommended for higher rate limits:

```bash
export SEMANTIC_SCHOLAR_API_KEY=your_key_here
```

The tools can still work without an API key if Semantic Scholar allows the request, but authenticated access is more reliable.
