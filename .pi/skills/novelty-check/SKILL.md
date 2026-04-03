---
name: novelty-check
description: Assess whether a research hypothesis or proposed contribution is actually novel relative to the literature. Use this when the user wants prior-art comparison, overlap analysis, or a reality check against reinventing known ideas.
---

# Novelty Check

Use this skill to evaluate whether a hypothesis or proposed contribution is genuinely novel, incrementally different, or likely already known.

## When to use

Use this skill after a hypothesis survives initial skeptical review, or when the user specifically wants prior-art comparison.

## Goal

Find the nearest prior work and judge how much the proposed idea truly differs.

## Workflow

1. Read the target hypothesis or proposal carefully.
2. Extract the core claimed contribution:
   - what is supposed to be new
   - what mechanism is central
   - what setting or task matters
3. Use literature tools to find the most relevant neighboring papers.
4. Compare the target against prior work along multiple axes:
   - mechanism
   - objective
   - architecture or method class
   - training setup
   - evaluation setting
   - claimed benefit
5. Judge whether the idea is:
   - likely already known
   - a small variant of known work
   - moderately differentiated
   - plausibly novel
   - unclear due to incomplete evidence
6. Be conservative. Absence of an exact match is not proof of novelty.

## Good practices

- Focus on nearest-neighbor prior work, not generic background papers.
- Quote concrete overlap and concrete differences.
- Distinguish conceptual novelty from benchmark/application novelty.
- Note when novelty depends on a narrow technical detail.
- If literature coverage is incomplete, say so explicitly.

## Output format

### Novelty verdict
- One short paragraph

### Closest prior work
1. **Paper**
   - Why it is relevant
   - What overlaps
   - What differs

### Overlap analysis
- **Mechanism overlap:**
- **Setting overlap:**
- **Objective overlap:**
- **Claim overlap:**

### Novelty assessment
- Likely already known / incremental / moderately differentiated / plausibly novel / unclear
- Confidence: low / medium / high
- Main reason for this judgment

### Search gaps
- What still needs to be checked
- Which queries or papers to inspect next

### Recommendation
- Drop / narrow claim / proceed / investigate more literature first
