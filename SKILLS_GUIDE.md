# Research Workflow Guide

This document is a practical companion to `README.md`.

- `README.md` explains what this project is and why it uses pi.
- This file focuses on **how to use the research skills in practice**.

The main idea is simple:
- use each skill as a **mode of work**
- keep sessions focused
- save outputs to files
- move between exploration, synthesis, critique, refinement, and planning deliberately

## When to use separate sessions

You do not need a new session for every step, but separate sessions are often useful when:
- you want a fresh perspective
- you want a narrower context
- you are switching from creative generation to skeptical review
- you want to compare different directions side by side

A good default is:
- one session for literature exploration
- one for hypothesis generation
- one for adversarial review
- one for novelty checking
- one for refinement or planning

## Suggested thinking levels

These are starting points, not rigid rules:

- `literature-review` → **medium**
- `hypothesis-generation` → **high**
- `adversarial-review` → **high**
- `novelty-check` → **high**
- `hypothesis-refinement` → **high**
- `research-planning` → **medium**

Rule of thumb:
- use **lower thinking** for broad exploration and shortlisting
- use **higher thinking** for synthesis, critique, novelty assessment, and refinement

---

# Skill-by-skill usage

## 1. `/skill:literature-review`

Use this skill whenever you need literature discovery or evidence gathering.

### Common use cases

#### A. Broad exploration
Use it to understand a field, map subareas, and identify anchor papers.

Example:

```text
/skill:literature-review
Research goal: understand the landscape of self-improving and self-evolving AI systems.
Map the area, identify the main subfields, and give me a reading list for fast orientation.
```

Good outputs to save:
- `research/literature/summary.md`
- `research/literature/reading-list.md`

#### B. Preparing an in-depth literature report
Use it to build a richer synthesis around one focused topic.

Example:

```text
/skill:literature-review
Prepare an in-depth literature report on test-time self-improvement in language models.
Compare main method families, identify strongest papers, and highlight evaluation weaknesses and unresolved questions.
Use the summary template in @templates/literature-summary.md.
```

Good outputs to save:
- `research/literature/test-time-self-improvement-report.md`

#### C. Answering a targeted question
Use it when you want a literature-backed answer, not a broad survey.

Example:

```text
/skill:literature-review
Question: do current self-evolving agent papers actually measure retention of earlier skills over long horizons?
Find the most relevant evidence and summarize the answer with citations.
```

Good outputs to save:
- `research/literature/retention-evidence.md`

#### D. Finding evidence for or against a claim
Use it to test whether a hypothesis or assumption is supported.

Example:

```text
/skill:literature-review
Find evidence relevant to this claim: agents with explicit skill libraries generalize better across task families than agents that rely only on long-context memory.
Summarize supporting evidence, contradictory evidence, and what remains unclear.
```

Good outputs to save:
- `research/literature/skill-library-evidence.md`

#### E. Building a shortlist for deep reading
Use it to identify which papers deserve full-text inspection.

Example:

```text
/skill:literature-review
Find the 8 most relevant papers on tool-using self-improving agents in stable environments.
Shortlist the papers most worth reading in depth and explain why.
```

Good outputs to save:
- `research/literature/deep-read-shortlist.md`

### What to ask for

As a user, it is often helpful to specify:
- whether you want breadth or depth
- time horizon
- whether you want surveys, foundational papers, recent papers, or all three
- whether the goal is orientation, evidence gathering, or hypothesis generation
- the desired output file or format

---

## 2. `/skill:hypothesis-generation`

Use this skill to turn goals, literature findings, and gaps into candidate research hypotheses.

### Common use cases

#### A. Generate first-pass candidate hypotheses
The standard use case.

Example:

```text
/skill:hypothesis-generation
Using @research/goal.md and @research/literature/summary.md, generate 3-5 candidate hypotheses.
Make them self-contained, define non-obvious terms, and include concrete examples.
```

Good outputs to save:
- `research/hypotheses/h1.md`
- `research/hypotheses/h2.md`
- `research/hypotheses/h3.md`

#### B. Generate hypotheses from specific gaps
Useful when the literature summary already contains explicit unresolved questions.

Example:

```text
/skill:hypothesis-generation
Using @research/literature/summary.md, focus only on the gaps around retention, transfer across task families, and amortized cost.
Generate hypotheses specifically targeting those gaps.
```

#### C. Generate hypotheses under constraints
Useful when you care about feasibility or a certain evaluation budget.

Example:

```text
/skill:hypothesis-generation
Generate hypotheses relevant to self-improving agents, but constrain them to ideas that could be tested with modest compute and without training a frontier model from scratch.
```

#### D. Generate multiple kinds of hypotheses
Useful when you want variety instead of several similar ideas.

Example:

```text
/skill:hypothesis-generation
Generate four hypotheses of different kinds:
- one mechanism-level idea
- one evaluation-focused idea
- one systems/agent design idea
- one efficiency/amortization idea
All should be grounded in @research/literature/summary.md.
```

### What to ask for

As a user, it helps to specify:
- how many hypotheses you want
- whether you prefer ambitious or conservative ideas
- whether the main priority is novelty, feasibility, clarity, or expected impact
- what constraints matter: compute, datasets, implementation complexity, evaluation cost

---

## 3. `/skill:adversarial-review`

Use this skill to pressure-test a hypothesis, proposal, or research direction.

### Common use cases

#### A. Review a single hypothesis skeptically
The default use case.

Example:

```text
/skill:adversarial-review
Review @research/hypotheses/h2.md skeptically.
Focus on correctness risk, hidden assumptions, feasibility, evaluation weaknesses, and overclaim risk.
```

Good outputs to save:
- `research/reviews/h2-adversarial.md`

#### B. Compare several hypotheses and attack the weakest points
Useful when you have multiple candidates and want triage.

Example:

```text
/skill:adversarial-review
Compare @research/hypotheses/h1.md, @research/hypotheses/h2.md, and @research/hypotheses/h3.md.
For each, identify the strongest objection and tell me which one survives criticism best.
```

#### C. Review a plan rather than a hypothesis
The skill also works on plans and proposals.

Example:

```text
/skill:adversarial-review
Review @research/plans/h2-v2.md skeptically.
Focus on weak baselines, likely confounders, missing controls, and feasibility problems.
```

#### D. Ask for a specific kind of criticism
Useful when you want targeted review instead of a general critique.

Example:

```text
/skill:adversarial-review
Review @research/hypotheses/h2.md, but focus specifically on whether the proposed improvement could be an artifact of repeated task-family exposure rather than genuine transfer.
```

### What to ask for

As a user, it helps to specify:
- whether the target is a hypothesis, plan, or broader proposal
- whether you want broad critique or a narrow critique axis
- whether you want a full scorecard or only strongest objections

---

## 4. `/skill:novelty-check`

Use this skill when you want a literature-grounded reality check on originality.

### Common use cases

#### A. Check whether a hypothesis is actually novel
The standard use case.

Example:

```text
/skill:novelty-check
Assess the novelty of @research/hypotheses/h2.md relative to @research/literature/summary.md.
Find the closest prior work and explain overlap versus differences.
```

Good outputs to save:
- `research/novelty/h2.md`

#### B. Narrow an overbroad novelty claim
Useful when the idea may only be novel in a limited sense.

Example:

```text
/skill:novelty-check
Check whether the contribution claimed in @research/hypotheses/h2.md is truly conceptually novel, or whether it is better framed as a narrower novelty claim around evaluation or transfer.
```

#### C. Compare a candidate idea against a specific method family
Useful when you already know the nearest neighbors.

Example:

```text
/skill:novelty-check
Compare @research/hypotheses/h2.md specifically against the literature on self-rewarding language models, self-training, and reflective agents.
Tell me whether this is a new mechanism, a new setting, or mostly a recombination.
```

#### D. Use novelty check as a search tool for adjacent work
Useful when the real goal is discovering the closest prior art.

Example:

```text
/skill:novelty-check
Treat @research/hypotheses/h2.md as a search seed and identify the closest adjacent papers or neighboring formulations I should read before committing to this direction.
```

### What to ask for

As a user, it helps to specify:
- whether you want a global novelty judgment or comparison against a specific subliterature
- whether the concern is conceptual novelty, benchmark novelty, mechanism novelty, or application novelty
- whether you want a verdict, a search plan, or both

---

## 5. `/skill:hypothesis-refinement`

Use this skill to revise a promising idea after critique.

### Common use cases

#### A. Refine after adversarial review
The default use case.

Example:

```text
/skill:hypothesis-refinement
Refine @research/hypotheses/h2.md using @research/reviews/h2-adversarial.md.
Produce a clearer and more defensible version, and explain what changed.
```

Good outputs to save:
- `research/hypotheses/h2-v2.md`

#### B. Refine after novelty check
Useful when the idea is too broad or overlaps too much with prior work.

Example:

```text
/skill:hypothesis-refinement
Refine @research/hypotheses/h2.md using @research/novelty/h2.md.
Narrow the claim so that it better reflects what may still be genuinely differentiated.
```

#### C. Refine after both critique and novelty analysis
Often the best use case.

Example:

```text
/skill:hypothesis-refinement
Refine @research/hypotheses/h2.md using:
- @research/reviews/h2-adversarial.md
- @research/novelty/h2.md
Make the result self-contained, easier to understand, and less vulnerable to obvious objections.
```

#### D. Decide whether the idea is salvageable
Useful when you are unsure whether refinement is worth it.

Example:

```text
/skill:hypothesis-refinement
Given @research/hypotheses/h2.md and its review artifacts, either produce a stronger revised hypothesis or explain clearly why the idea should be dropped instead of refined.
```

### What to ask for

As a user, it helps to specify:
- whether the goal is narrowing, clarifying, salvaging, or reframing
- whether the revised output should optimize for novelty, feasibility, or testability
- whether you want one revised version or multiple alternatives

---

## 6. `/skill:research-planning`

Use this skill when a hypothesis is promising enough to operationalize.

### Common use cases

#### A. Create a minimal validation plan
The standard use case.

Example:

```text
/skill:research-planning
Create a research plan for @research/hypotheses/h2-v2.md.
Design the smallest credible validation path, including baselines, datasets/tasks, metrics, risks, and stop/continue criteria.
```

Good outputs to save:
- `research/plans/h2-v2.md`

#### B. Plan a quick feasibility check
Useful before investing in a full project.

Example:

```text
/skill:research-planning
Design a lightweight feasibility check for @research/hypotheses/h2-v2.md.
I want the cheapest experiment that would tell me whether this direction is worth deeper work.
```

#### C. Plan a stronger evaluation suite
Useful after an initial idea already looks plausible.

Example:

```text
/skill:research-planning
Create a stronger evaluation plan for @research/hypotheses/h2-v2.md.
Focus on confounders, ablations, controls, and failure criteria rather than just a single success benchmark.
```

#### D. Plan under resource constraints
Useful when compute, time, or data is limited.

Example:

```text
/skill:research-planning
Create a research plan for @research/hypotheses/h2-v2.md under these constraints:
- modest compute
- no frontier-scale training
- implementation time under two weeks
- preference for existing benchmarks
```

### What to ask for

As a user, it helps to specify:
- whether you want a minimal plan or a full plan
- your compute/time/data constraints
- whether your goal is quick validation, publication-quality evaluation, or internal prioritization

---

# Default sequence

A good default sequence is:

1. `literature-review`
2. `hypothesis-generation`
3. `adversarial-review`
4. `hypothesis-refinement`
5. `novelty-check`
6. `hypothesis-refinement` again if needed
7. `research-planning`

This is only a default. In practice you may:
- loop back to literature review after critique
- run novelty checks on only the strongest candidates
- refine before novelty checking if the original wording is too broad
- create multiple planning variants for one idea

# What this file is for

Use this document when you want help deciding:
- which skill to use next
- how to phrase a request to a skill
- what kinds of outputs to save
- how to use the same skill for different purposes

For project overview and setup, see `README.md`.
