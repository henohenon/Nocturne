# Functional Specification: Docs Architecture Overhaul

## FR-1: Auto-approve file edits in settings.json
- Add `permissions.allow` for Edit, Write, Read, Glob, Grep, Bash(git *)
- Scope: `.claude/settings.json` (committed, shared)

## FR-2: Failure prevention — distributed approach
- **Remove**: lessons.md as content store
- **Replace with**: short pointer index at docs/lessons.md listing where relevant mistakes are documented (journal tasks, workflow docs)
- **process.md change**: Step 1 = read `docs/index.md` to discover relevant docs, then read them
- **When a mistake occurs**: document it in the relevant task log (`journal/tasks/`) or a dedicated `workflow/research/` note

## FR-3: Archive all completed wip/ docs
- All wip/ files from Phases 1–5 move to archive/
- Affected: 11 files across business/, spec/, archi/
- After: wip/ directories are empty

## FR-4: Rename roadmap
- `docs/roadmap/index.md` → `docs/roadmap.md`
- Remove empty `docs/roadmap/` directory
- Update all references in process.md, CLAUDE.md, docs/index.md

## FR-5: Update docs/index.md
- List actual files (not just directories) so AI can navigate without exploring the tree
