# Workflow Guide

Structured workflow for disciplined development.

## Directory Roles
- **`business/`** (Why) — Goals, context, stakeholders
- **`spec/`** (What) — Requirements, acceptance criteria
- **`archi/`** (How) — Design, tech decisions, trade-offs
- **`research/`** — Free-form investigation notes

## Document Lifecycle
All documents in `business/`, `spec/`, `archi/` follow:

**`wip/`** → **`adr/`** → **`archive/`**

- `wip/` — Draft. Open for revision. All new docs start here.
- `adr/` — Accepted Decision Record. Move here after explicit review/approval.
- `archive/` — Superseded or obsolete. Never delete — always archive.

`research/` is free-form and does not follow this lifecycle.

## AI Responsibilities
- Before design work: create or reference the relevant `business/`, `spec/`, `archi/` doc
- After decisions: update doc lifecycle accordingly
- Do not skip lifecycle steps without user approval
