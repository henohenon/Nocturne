# Technical Architecture: AI Process Improvement

## How to Build

### AD-1: New Rule File — `.claude/rules/process.md`

Captures the required thinking process. Loaded always alongside other rules.

Content:
- Read ALL docs before acting (what to read, in what order)
- Task breakdown requirement (when, how granular)
- Design-first requirement (threshold for creating workflow docs)
- Deviation transparency

### AD-2: Update `CLAUDE.md`

Add a "Process" section referencing `rules/process.md`.
Update "Before Starting Any Task" checklist to include:
- Read `docs/workflow/` including `archive/` subdirs
- State task breakdown explicitly before touching files

### AD-3: No Code Changes

This task is documentation-only. No source code (`src/`) is affected.

### AD-4: Roadmap Pruning (bundled)

Phases 1–5 are all complete. Per the established rule, remove them from `roadmap/index.md`.
History is preserved in git log and `docs/journal/`.

### Implementation Order
1. Create `.claude/rules/process.md`
2. Update `.claude/CLAUDE.md`
3. Prune `docs/roadmap/index.md` (remove phases 1–5)
4. Update roadmap Phase 5 task list with this item
5. Archive outdated workflow docs (archi/002 references old `commands/` structure)
6. Write journal
7. Commit
