# Pi Research Assistant

This project turns [pi](https://github.com/badlogic/pi-mono) into a personal research assistant for scientific literature review, hypothesis generation, skeptical evaluation, refinement, and research planning.

It is built around:
- **local pi skills** in `.pi/skills/`
- **local pi extensions** in `.pi/extensions/`
- a **human-guided workflow** using separate sessions, files, and reusable role modes

The current setup is aimed at research exploration rather than fully autonomous operation.

## What this repo contains

### Skills
Role-oriented modes for research work:
- `literature-review`
- `hypothesis-generation`
- `adversarial-review`
- `novelty-check`
- `hypothesis-refinement`
- `research-planning`

### Extension tools
Currently in `.pi/extensions/literature-tools.ts`:
- `semantic_scholar_search`
- `arxiv_download_source`

## Install pi

See the official pi repository for full documentation:
- https://github.com/badlogic/pi-mono

Basic install:

```bash
npm install -g @mariozechner/pi-coding-agent
```

Then start pi in this repo:

```bash
pi
```

You can use either:
- **API keys** (for example Anthropic, OpenAI, etc.), or
- an existing **OpenAI / Codex subscription** via pi login

If you want to use an API key, for example with Anthropic:

```bash
export ANTHROPIC_API_KEY=...
pi
```

If you want to use your OpenAI / Codex subscription instead of API keys:

```bash
pi
/login
```

Then select the appropriate provider in pi.

Optional for Semantic Scholar support in this project:

```bash
export SEMANTIC_SCHOLAR_API_KEY=...
```

After changing local skills or extensions, reload pi:

```bash
/reload
```

## How this project is meant to be used

This repo favors a **human-guided, steerable research workflow**.

Recommended pattern:
- use one session for literature review
- another for hypothesis generation
- another for adversarial review
- another for novelty checking
- keep durable artifacts in files under `research/`

See also:
- `RESEARCH_WORKFLOW.md`
- `research/literature/SUMMARY_TEMPLATE.md`

## Extensions, skills, and worker-like sessions

### Skills
Skills are reusable role definitions and workflows. In this repo they live under:

```text
.pi/skills/
```

You can invoke them with commands like:

```text
/skill:literature-review
/skill:hypothesis-generation
/skill:adversarial-review
```

### Extensions
Extensions are TypeScript modules that add custom tools, commands, and behavior. In this repo they live under:

```text
.pi/extensions/
```

Example: `literature-tools.ts` adds literature search and arXiv source download tools.

### “Subagents” / worker sessions
Pi does not force a built-in subagent model. In practice, a good pattern is to use:
- separate pi sessions or tabs
- focused skills per session
- filesystem artifacts for handoff

So instead of one overloaded context, use multiple focused worker-like sessions.

## Example configs and inspiration

A few public pi setups worth looking at:
- https://github.com/nicobailon
- https://github.com/HazAT/pi-config

These are useful references for how people organize:
- extensions
- skills
- prompts
- workflow conventions
- custom tooling around pi

## Important idea: pi can extend itself

One of the best parts of pi is that it can often help you extend it just by talking to it.

You can ask pi to:
- create a new skill
- add a custom tool
- scaffold a local extension
- build a reusable command
- refine prompts and workflows
- create ad hoc project-specific research modes

Examples:
- “Create a skill for novelty checking in ML systems research.”
- “Add a tool that lists cached arXiv papers.”
- “Create a command for starting a new adversarial review worker session.”
- “Refine the literature-review skill so it uses multi-query search.”

This makes pi a good fit for evolving workflows: start manually, notice recurring patterns, then encode them as skills, commands, or tools.

## Suggested next steps

After installing pi:

1. Start pi in this repo.
2. Run `/reload`.
3. Try a skill manually, for example:

```text
/skill:literature-review
Research goal: identify promising directions for self-improving LLM agents.
```

4. Save outputs in `research/`.
5. As repeated patterns emerge, ask pi to add:
   - new skills
   - new tools
   - commands for worker/session setup

## Notes

- This repo is evolving.
- The workflow is intentionally file-centric and session-based.
- The goal is not to hide the research process, but to make it easier to steer, inspect, and improve.
