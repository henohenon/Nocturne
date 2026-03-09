# Technical Architecture: Process Enhancement

## AD-1: Updated process.md "Before Starting Any Task"

New order:
1. Read `docs/index.md` — discover docs
2. **Update `docs/roadmap.md`** — add the new task under the current phase
3. Read `docs/roadmap.md` — confirm current phase and context
4. Read `docs/backlog.md` — confirm priority
5. If task domain has prior history: read relevant `docs/journal/tasks/` and `docs/workflow/*/archive/` files

## AD-2: Updated process.md "When a Mistake Occurs"

Remove reference to lessons.md. New rule:
> Document the mistake in the task log (`docs/journal/tasks/<task>.md`). No other action needed.

## AD-3: Delete docs/lessons.md

No replacement file. Knowledge lives in journal/tasks and workflow/archive.

## AD-4: Update docs/index.md

- Remove lessons.md row from Core table
- Update wip/ listing to reflect current state
