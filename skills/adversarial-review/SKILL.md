---
name: adversarial-review
description: Critically review a research hypothesis, proposal, or plan for correctness, quality, hidden assumptions, feasibility, and likely failure modes. Use this when the user wants skeptical evaluation rather than supportive brainstorming.
---

# Adversarial Review

Use this skill to critique a hypothesis or proposal from a skeptical, evidence-seeking perspective.

## When to use

Use this skill when you want to know whether an idea is:
- internally coherent
- plausible
- overstated
- poorly specified
- weakly motivated
- hard to evaluate or likely to fail in practice

This skill is about correctness, rigor, feasibility, and quality. It is not the primary mode for deep literature-grounded novelty assessment; use `novelty-check` separately for that.

## Goal

Stress-test the target artifact and identify its strongest weaknesses.

## Workflow

1. Read the target hypothesis or proposal carefully.
2. Identify its core claim, assumptions, and intended contribution.
3. Look for:
   - hidden assumptions
   - vague or untestable language
   - unsupported causal claims
   - weak mechanism explanations
   - likely confounders or alternative explanations
   - unrealistic evaluation requirements
   - settings where the claim likely breaks
4. Ask what evidence would be needed to make the claim credible.
5. Prefer the strongest objections, not a laundry list of weak nitpicks.
6. Be concise, direct, and specific.

## Review dimensions

Score and discuss at least these dimensions:
- **Correctness risk:** Is the claim likely wrong or internally inconsistent?
- **Specification quality:** Is it precise enough to test?
- **Mechanistic plausibility:** Is there a believable reason it should work?
- **Feasibility:** Can it realistically be implemented and evaluated?
- **Evaluation quality risk:** Could weak experimental design make the result uninterpretable?
- **Overclaim risk:** Does the wording overstate likely impact or scope?

## Good practices

- Distinguish fatal flaws from fixable weaknesses.
- Do not praise the idea unless needed for balance; prioritize criticism.
- If a claim could be salvaged by narrowing scope, say so.
- Explicitly identify what evidence or clarification is missing.
- If novelty concerns arise, mention them briefly as “possible overlap,” but leave full novelty assessment to `novelty-check`.

## Output format

### Verdict
- One-paragraph skeptical summary

### Strongest objections
1. Objection
   - Why it matters
   - What assumption or weakness causes it
   - What evidence would address it

### Failure modes
- Scenario 1
- Scenario 2
- Scenario 3

### Required fixes
- What must change before this is worth deeper investment

### Scorecard
- Correctness risk: 1-5
- Specification quality: 1-5
- Mechanistic plausibility: 1-5
- Feasibility: 1-5
- Evaluation quality risk: 1-5
- Overclaim risk: 1-5

### Recommendation
- Reject / revise / proceed to novelty check
