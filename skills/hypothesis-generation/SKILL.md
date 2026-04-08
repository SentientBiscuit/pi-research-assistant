---
name: hypothesis-generation
description: Generate research hypotheses from a research goal and literature findings. Use this when the user wants candidate ideas, possible mechanisms, testable claims, or promising directions grounded in prior work rather than unconstrained brainstorming.
---

# Hypothesis Generation

Use this skill to propose candidate research hypotheses grounded in a research goal and existing literature.

## When to use

Use this skill when you have:
- a research goal or problem statement
- literature findings, paper notes, or evidence summaries
- identified gaps, tensions, or limitations in prior work

Do not use this skill for unconstrained idea generation with no grounding. Prefer literature-backed hypotheses.

## Goal

Generate multiple candidate hypotheses that are:
- plausible
- specific
- testable
- connected to the stated goal
- grounded in literature evidence or identified gaps
- self-contained and understandable to a reader who has not read the source papers

## Workflow

1. Read the research goal carefully.
2. Read the available literature summary or notes.
3. Identify:
   - gaps in prior work
   - contradictions or unresolved questions
   - recurring limitations
   - underexplored combinations or assumptions
4. Generate several distinct candidate hypotheses, not just one.
5. For each hypothesis, explain:
   - the core claim
   - the rationale
   - what mechanism or intuition supports it
   - why it may matter
   - what evidence would support or falsify it
   - any specialized terms in plain language
6. Prefer narrower, testable claims over broad visionary statements.
7. Explicitly note uncertainty and assumptions.
8. Assume the reader has not read the source papers. Define non-obvious terms and avoid compressed source-specific shorthand.
9. Prefer clarity and self-contained explanation over brevity, even if the artifact becomes longer.

## Good practices

- Tie each hypothesis to specific signals from the literature.
- Separate the hypothesis from the explanation and expected impact.
- Avoid inflated novelty claims at this stage.
- Avoid vague statements like “this may improve performance” without a mechanism.
- Produce alternatives that differ in substance, not superficial wording.
- If the problem is underspecified, state what assumptions you are making.
- Do not assume the reader is familiar with terminology, naming conventions, or mechanisms from the source papers.
- If you use a specialized term, define it immediately in plain language.
- Include at least one concrete example or toy scenario showing what the idea would look like in practice.
- If a compact technical restatement is useful, put it after the plain-language explanation, not before it.

## Output format

For each candidate hypothesis, use this structure:

### Hypothesis Hn: <short name>
- **Plain-English summary:** Explain the idea in 2-4 sentences for a reader who has not read the source papers.
- **Detailed explanation:** Explain what the hypothesis is claiming, what setup it assumes, and why it might work.
- **Definitions of key terms:** Define any specialized terms, mechanisms, or evaluation language in plain words.
- **Motivation:** Why this follows from the goal and literature.
- **Mechanism / intuition:** Why it might work.
- **Expected benefit:** What it could improve and under what conditions.
- **Key assumptions:** What must be true for it to hold.
- **Concrete example:** Give a small example or scenario showing what the idea would look like in practice.
- **How to falsify:** What result would strongly count against it.
- **Evidence basis:** Which papers/findings/gaps motivated it.
- **Risk level:** Low / medium / high.
- **Compact technical version (optional):** A shorter technical restatement, only if it adds clarity after the plain-language explanation.

## Selection guidance

When useful, end with:
- strongest candidate
- most novel-looking candidate
- most feasible candidate
- which one should go to adversarial review first
