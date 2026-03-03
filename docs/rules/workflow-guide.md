# Workflow Guide

Structured workflow for disciplined development.

## Structure

- **`business/`** (Why) — Goals, context, stakeholders
- **`spec/`** (What) — Requirements, acceptance criteria
- **`archi/`** (How) — Design, tech decisions, trade-offs
- **`research/`** — Notes and findings gathered during investigation

## Document Lifecycle

Every document in `business/`, `spec/`, and `archi/` follows: **`wip/` → `adr/` → `archive/`**

- **`wip/`** — Draft. Open for discussion and revision. All new documents start here.
- **`adr/`** — Accepted Decision Record. Move here only after explicit review and approval.
- **`archive/`** — Superseded or obsolete. When an ADR is replaced, move it here with a reference to its successor. Never delete — always archive.

- `research/` is free-form and does not follow the lifecycle. Use it to capture any intermediate findings, spikes, or references that inform decisions.
