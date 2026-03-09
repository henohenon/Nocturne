# Process Rules

Think before acting. Design before implementing.

## Before Starting Any Task

1. Read `docs/index.md` — discover what docs exist
2. **Update `docs/roadmap.md`** — add the new task(s) under the current phase before doing anything else
3. Read `docs/roadmap.md` — confirm current phase and open tasks
4. Read `docs/backlog.md` — confirm priority order
5. If the task touches a domain with prior history: read relevant `docs/journal/tasks/` and `docs/workflow/*/archive/` files
6. Spend time here: design, decompose, consider trade-offs before touching files

Do not skip archived docs or prior task logs when working in a related area.

## Task Breakdown Requirement

Before touching any file, state a concrete list of subtasks:
- Each subtask must be atomic: one file, one operation, or one decision
- User reads the plan and can correct it before execution begins
- If the plan changes mid-execution, explicitly state what changed and why

## Design-First Requirement

For any non-trivial task (changes more than one file, or introduces a new concept):
1. Create `docs/workflow/business/wip/` doc (Why)
2. Create `docs/workflow/spec/wip/` doc (What)
3. Create `docs/workflow/archi/wip/` doc (How)
4. Only then implement

## After Completing Any Task

1. Move workflow docs: `wip/` → `archive/`
2. Update `docs/roadmap.md` — mark completed tasks, remove completed phases when all done
3. Write journal: task log at `docs/journal/tasks/<task-name>.md`, link from `docs/journal/YYYY-MM-DD.md`
4. Commit

## When a Mistake Occurs

Document it in the task log (`docs/journal/tasks/<task>.md`). No other action needed.

## Deviation Rule

No silent scope changes. If execution diverges from the stated plan, stop and explain.
