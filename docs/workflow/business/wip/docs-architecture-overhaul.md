# Business Context: Docs Architecture Overhaul

## Why

### Problems
1. **lessons.md grows unbounded** — a flat list of past mistakes becomes expensive to read and imprecise as it grows. Token cost scales with history, but accuracy of recall does not.
2. **Completed wip/ docs pollute the workspace** — 11 files from Phases 1–5 remain in wip/ despite the work being done. The archive obligation was not enforced.
3. **roadmap/index.md path is unnecessarily nested** — a single file in a directory adds indirection with no benefit.
4. **File edits require user confirmation** — slows down routine implementation work.

### Goal
- Failure knowledge is embedded contextually in task logs and workflow docs, not in a growing central list
- workspace reflects current reality: wip/ contains only in-progress work
- Navigation is as simple as the structure warrants

### Success Criteria
- lessons.md is a short pointer index (not content store)
- All completed work is in archive/
- docs/roadmap.md replaces docs/roadmap/index.md
- settings.json allows file edits without confirmation
