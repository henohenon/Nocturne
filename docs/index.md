# Docs Index

Project documentation navigation. Read this first to find relevant docs.

## Core

| File | Purpose |
|------|---------|
| `backlog.md` | Prioritized idea list (top = highest priority). Human edits only. |
| `roadmap.md` | Current and upcoming phases. Update at task start and task end. |

## Workflow (`workflow/`)

Design decisions follow: **business/** (Why) → **spec/** (What) → **archi/** (How)

Lifecycle: `wip/` → `archive/`
- `wip/` — in-progress decisions (should be empty when not actively working)
- `archive/` — completed or superseded decisions; read these for domain history

### Active (wip/)
- `workflow/business/wip/process-enhancement.md`
- `workflow/spec/wip/process-enhancement.md`
- `workflow/archi/wip/process-enhancement.md`

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
