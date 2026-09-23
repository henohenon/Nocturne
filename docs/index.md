# Docs Index

Project documentation navigation. Read this first to find relevant docs.

## Core

| File | Purpose |
|------|---------|
| `backlog.md` | Prioritized idea list (top = highest priority). Human edits only. |
| `roadmap.md` | Cumulative phase list. Updated in pre-task (add new phase, mark previous ✅). Not touched in post-task. |

## Workflow (`workflow/`)

Design decisions follow: **business/** (Why) → **spec/** (What) → **archi/** (How)

Lifecycle: `wip/` → `archive/`
- `wip/` — in-progress decisions (should be empty when not actively working)
- `archive/` — completed or superseded decisions; read these for domain history

## Journal (`journal/`)

| Pattern | Purpose |
|---------|---------|
| `journal/YYYY-MM-DD.md` | Daily index + AI reflection + human reflection |
| `journal/tasks/<name>.md` | Per-task work log; read these for domain history and past mistakes |

## Rules (`.claude/rules/`)

| File | Purpose |
|------|---------|
| `process.md` | When and how to act — delegates to `/pre-task` and `/post-task` |
| `language.md` | Japanese/English split |
| `workflow.md` | Workflow doc structure and lifecycle |
| `docs.md` | Doc writing style |
| `coding.md` | TypeScript/CSS coding conventions |
| `git.md` | Branching, versioning, release |
