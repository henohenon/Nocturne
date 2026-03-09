# Technical Architecture: Docs Architecture Overhaul

## AD-1: settings.json permissions

```json
"permissions": {
  "allow": ["Edit", "Write", "Read", "Glob", "Grep", "Bash(git *)"]
}
```
Keep existing env/attribution fields. Merge into existing settings.json.

## AD-2: Failure prevention redesign

**docs/lessons.md** becomes a pointer index only:
```
# Lessons Index
- skills structure: see journal/tasks/claude-code-env-setup.md
- rules/skills overlap: see journal/tasks/doc-deduplication.md
- git staged deletes: see journal/tasks/claude-code-env-setup.md
- stale workflow docs: see journal/tasks/doc-deduplication.md
```

**process.md** "Before Starting" changes:
- Step 1: read `docs/index.md` — discover what docs exist
- Step 2: identify which docs are relevant to the task at hand
- Step 3: read those docs (including archives if the topic was worked before)
- Remove: "read docs/lessons.md" as a separate step (it's now one doc among many)

**docs/index.md** becomes a navigable file listing.

## AD-3: Archive wip/ files

Move to archive/ using git mv:
- business/wip/ → business/archive/: youtube-interaction-blocker, ai-process-improvement, doc-deduplication, docs-architecture-overhaul (after this task)
- spec/wip/ → spec/archive/: core-functionality, project-structure-improvements, badge-exclusion-and-enhanced-overlay, ai-process-improvement, doc-deduplication, docs-architecture-overhaul
- archi/wip/ → archi/archive/: extension-architecture, ai-process-improvement, doc-deduplication, docs-architecture-overhaul

## AD-4: Roadmap rename

```bash
git mv docs/roadmap/index.md docs/roadmap.md
rmdir docs/roadmap
```

Update references: process.md, CLAUDE.md (if present), docs/index.md.
