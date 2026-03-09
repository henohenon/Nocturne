# Workflow Guide

Structured workflow for disciplined development.

## Directory Roles
- **`business/`** (Why) — Goals, context, stakeholders
- **`spec/`** (What) — Requirements, acceptance criteria
- **`archi/`** (How) — Design, tech decisions, trade-offs
- **`research/`** — Free-form investigation notes

## Document Lifecycle

**`wip/`** → **`adr/`** → **`archive/`**

### wip/ — Thinking stage
Open-ended exploration and design. Iterate here until the approach is settled.
- All new design docs start here
- Revise freely; no decision is final
- Do NOT move to `adr/` until the iteration loop in `/pre-task` passes

### adr/ — Execution record (living doc)
Active record of a task in progress. Updated as implementation proceeds.
- Move wip → adr when execution begins (not when design is complete)
- Record decisions made, problems encountered, and deviations from plan
- A living document: update it during and after implementation

### archive/ — Completed
Task is done. Move adr → archive automatically upon task completion.
- No user approval needed — revert if something was archived prematurely
- Never delete — always archive

`research/` is free-form and does not follow this lifecycle.

## AI Responsibilities
- Before design work: create or reference the relevant `business/`, `spec/`, `archi/` doc in `wip/`
- When execution begins: move `wip/` → `adr/`; keep updating `adr/` during work
- When task is complete: move `adr/` → `archive/` (automatically, no approval needed)
