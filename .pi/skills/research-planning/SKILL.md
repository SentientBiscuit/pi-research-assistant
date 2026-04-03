---
name: research-planning
description: Turn a promising hypothesis into a concrete research plan. Use this when the user wants next steps, evaluation design, baselines, datasets, success criteria, risks, or a minimal path to validating an idea.
---

# Research Planning

Use this skill to convert a promising hypothesis into an actionable research plan.

## When to use

Use this skill when a hypothesis has survived initial critique and is worth operationalizing.

## Goal

Produce a concrete plan for testing the idea efficiently and rigorously.

## Workflow

1. Read the current hypothesis and any relevant review findings.
2. Identify the minimum claim that needs to be tested.
3. Design the smallest credible validation path first.
4. Specify:
   - experimental question
   - baselines
   - datasets or tasks
   - evaluation metrics
   - ablations or controls
   - failure criteria
   - required resources or dependencies
5. Distinguish must-have work from nice-to-have work.
6. Highlight the main execution risks.
7. Prefer lean, informative experiments over bloated plans.

## Good practices

- Start with the cheapest experiment that meaningfully tests the claim.
- Tie every experiment to a specific uncertainty or hypothesis component.
- Include baselines that could falsify the value of the idea.
- Avoid evaluation plans that can only confirm, not disconfirm.
- State what result would count as “not worth pursuing.”

## Output format

### Objective
- What exactly the plan is trying to validate

### Minimal validation plan
1. Step
   - Purpose
   - Expected signal
   - Failure condition

### Experimental design
- **Tasks / datasets:**
- **Baselines:**
- **Metrics:**
- **Controls / ablations:**

### Resource needs
- Compute
- Data
- Implementation dependencies
- Time / complexity risk

### Key risks
- Risk 1
- Risk 2
- Risk 3

### Decision rule
- What results justify continuing
- What results suggest stopping or revising
