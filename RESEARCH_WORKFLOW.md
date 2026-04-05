# Using Pi as a Research Assistant

This project equips pi with a small set of research-oriented skills and literature tools for human-guided, steerable research exploration.

## What pi can do

### Literature tools
The local extension `.pi/extensions/literature-tools.ts` provides:

- `semantic_scholar_search` — search papers in Semantic Scholar
- `arxiv_download_source` — download and extract arXiv source files locally

### Skills
The local skills in `.pi/skills/` are:

- `literature-review`
- `hypothesis-generation`
- `adversarial-review`
- `novelty-check`
- `hypothesis-refinement`
- `research-planning`

## First-time setup

Reload pi after skill or extension changes:

```bash
/reload
```

Optional but recommended for Semantic Scholar reliability:

```bash
export SEMANTIC_SCHOLAR_API_KEY=your_key_here
```

## Recommended working style

Use pi in a **human-guided, multi-session workflow**.

Instead of asking one session to do everything, prefer separate focused sessions or tabs for different roles:

- one session for literature exploration
- one session for generating candidate hypotheses
- one session for adversarial review
- one session for novelty checking
- one session for refinement or planning

Keep the handoff between sessions in files.

## Suggested directory layout

You do not need to follow this exactly, but a file-based workflow works well:

```text
research/
  goal.md
  literature/
    topic-summary.md
    paper-notes/
  hypotheses/
    h1.md
    h2.md
  reviews/
    h1-adversarial.md
  novelty/
    h1.md
  plans/
    h1.md
```

## Core principle

Use skills as **operation modes**:
- each skill gives pi a role and a method
- you stay in control of sequencing and scope
- use files to pass distilled artifacts between sessions

Do not try to keep the whole research process inside one long conversation.

## Recommended thinking levels

These are suggested defaults, not strict rules:

- `literature-review` → **medium**
- `hypothesis-generation` → **high**
- `adversarial-review` → **high**
- `novelty-check` → **high**
- `hypothesis-refinement` → **high**
- `research-planning` → **medium**

### Practical rule of thumb

- Use **lower thinking** for broad exploration, search, and shortlisting.
- Use **higher thinking** for synthesis, critique, novelty assessment, and refinement.
- If you are only doing a quick first pass, `literature-review` can often be run at **low**.
- If planning becomes technically subtle or evaluation design is tricky, raise `research-planning` to **high**.

---

# Skill-by-skill guide

## 1. `/skill:literature-review`

Use this to:
- map an area
- identify foundational/recent/survey papers
- gather evidence relevant to a hypothesis
- find papers worth reading more deeply

### Best practices
- Do not rely on a single query.
- Search at multiple abstraction levels:
  - broad area
  - task
  - method
  - mechanism
  - failure mode / limitation
- Start from titles, TL;DRs, abstracts, and citation metadata.
- Fetch full text only when abstracts are insufficient.
- Use citation count as a signal, not a hard filter.
- Group results into themes rather than making a flat list.

### Example

```text
/skill:literature-review
Research goal: identify promising directions for improving long-context reasoning in LLMs.
Focus on papers from the last 3 years, but include foundational older papers when important.
Output a themed summary and a shortlist of papers to inspect more deeply.
```

### Typical outputs to save
- `research/literature/topic-summary.md`
- `research/literature/shortlist.md`

---

## 2. `/skill:hypothesis-generation`

Use this to:
- generate candidate research hypotheses grounded in literature
- turn gaps or tensions into testable claims

### Best practices
- Feed it a research goal plus a literature summary.
- Ask for multiple hypotheses, not just one.
- Prefer narrow, testable claims over ambitious vague ones.
- Require explicit assumptions and falsification conditions.

### Example

```text
/skill:hypothesis-generation
Using @research/goal.md and @research/literature/topic-summary.md, generate 3-5 candidate hypotheses.
Prioritize ideas that are testable, grounded in the literature, and relevant to efficient long-context reasoning.
```

### Typical outputs to save
- `research/hypotheses/h1.md`
- `research/hypotheses/h2.md`
- `research/hypotheses/h3.md`

---

## 3. `/skill:adversarial-review`

Use this to:
- critique a hypothesis skeptically
- expose hidden assumptions, overclaiming, feasibility issues, and failure modes

### Best practices
- Run this in a fresh session when possible.
- Give it the hypothesis and only the minimum context needed.
- Ask for strong objections, not a long list of weak nitpicks.
- Treat this as a correctness/quality review, not the main novelty pass.

### Example

```text
/skill:adversarial-review
Review @research/hypotheses/h2.md skeptically.
Focus on correctness risk, hidden assumptions, feasibility, evaluation weaknesses, and overclaim risk.
Write a concise review with a scorecard and a recommendation.
```

### Typical outputs to save
- `research/reviews/h2-adversarial.md`

---

## 4. `/skill:novelty-check`

Use this to:
- assess whether a hypothesis is genuinely new
- identify closest prior work
- test whether the idea is likely incremental or already known

### Best practices
- Run this after a hypothesis survives adversarial review.
- Ask for nearest-neighbor prior work, not generic background papers.
- Be conservative: lack of an exact match is not proof of novelty.
- Save both the verdict and the papers/queries that still need checking.

### Example

```text
/skill:novelty-check
Assess the novelty of @research/hypotheses/h2.md relative to the literature in @research/literature/topic-summary.md.
Find the closest prior work, explain overlap vs differences, and judge whether the idea is likely already known, incremental, or plausibly novel.
```

### Typical outputs to save
- `research/novelty/h2.md`

---

## 5. `/skill:hypothesis-refinement`

Use this to:
- revise a hypothesis after critique or novelty assessment
- narrow, sharpen, or salvage a promising idea

### Best practices
- Feed in the original hypothesis plus review artifacts.
- Ask explicitly which concerns were addressed and which remain.
- Prefer a narrower true claim over a broad fragile one.
- If the idea is not salvageable, let pi say so.

### Example

```text
/skill:hypothesis-refinement
Refine @research/hypotheses/h2.md using:
- @research/reviews/h2-adversarial.md
- @research/novelty/h2.md
Produce a revised version, explain what changed, and say whether it should go back to review, novelty check, or planning.
```

### Typical outputs to save
- `research/hypotheses/h2-v2.md`

---

## 6. `/skill:research-planning`

Use this to:
- turn a promising hypothesis into a concrete validation plan
- define experiments, baselines, metrics, ablations, and stopping criteria

### Best practices
- Use only after a hypothesis is strong enough to justify operationalization.
- Ask for the smallest credible validation path first.
- Require explicit failure conditions and decision rules.
- Prefer lean plans over bloated roadmaps.

### Example

```text
/skill:research-planning
Create a research plan for @research/hypotheses/h2-v2.md.
Design the smallest credible validation path, including baselines, datasets/tasks, metrics, ablations, risks, and clear continue/stop decision rules.
```

### Typical outputs to save
- `research/plans/h2-v2.md`

---

# Recommended sequence

A good default workflow is:

1. `literature-review`
2. `hypothesis-generation`
3. `adversarial-review`
4. `hypothesis-refinement`
5. `novelty-check`
6. `hypothesis-refinement` again if needed
7. `research-planning`

This order is not mandatory, but it is a good default because it avoids spending too much time on novelty analysis for weak ideas.

---

# Practical tips

## Use separate sessions for separate roles
This helps keep context clean.

Good pattern:
- literature review in one session
- hypothesis generation in another
- adversarial review in another
- novelty checking in another

## Keep artifacts short and structured
Pi works better when handoff files are concise and organized.

## Prefer progressive reading
Use metadata and abstracts first. Fetch arXiv links or source only when needed.

## Stay skeptical about novelty
Novelty is easy to overclaim. Use the novelty-check skill conservatively.

## Let files carry the workflow
The chat is for steering; files are for durable research state.

---

# Example end-to-end workflow

## Session 1: map the area

```text
/skill:literature-review
Research goal: find underexplored directions for improving reasoning quality in long-context language models.
Create a themed summary and shortlist.
```

Save output to:
- `research/literature/topic-summary.md`

## Session 2: generate hypotheses

```text
/skill:hypothesis-generation
Using @research/goal.md and @research/literature/topic-summary.md, generate 4 candidate hypotheses.
```

Save outputs to:
- `research/hypotheses/h1.md`
- `research/hypotheses/h2.md`
- `research/hypotheses/h3.md`
- `research/hypotheses/h4.md`

## Session 3: adversarial review one candidate

```text
/skill:adversarial-review
Review @research/hypotheses/h3.md skeptically.
```

Save output to:
- `research/reviews/h3-adversarial.md`

## Session 4: novelty check

```text
/skill:novelty-check
Check whether @research/hypotheses/h3.md is actually novel.
Use @research/literature/topic-summary.md as starting context.
```

Save output to:
- `research/novelty/h3.md`

## Session 5: refine

```text
/skill:hypothesis-refinement
Refine @research/hypotheses/h3.md using @research/reviews/h3-adversarial.md and @research/novelty/h3.md.
```

Save output to:
- `research/hypotheses/h3-v2.md`

## Session 6: plan

```text
/skill:research-planning
Create a minimal validation plan for @research/hypotheses/h3-v2.md.
```

Save output to:
- `research/plans/h3-v2.md`

---

# Future evolution

As repeated patterns become clear, they can later be encoded as custom slash commands such as:
- `/research:new-worker`
- `/research:adversarial-review`
- `/research:novelty-check`
- `/research:plan`

For now, manual use of skills plus file-based handoff is the intended workflow.
