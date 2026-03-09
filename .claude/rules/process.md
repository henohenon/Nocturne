# Process Rules

Think before acting. Design before implementing.

## Before Starting Any Task

1. Read `docs/index.md` — discover what docs exist and find relevant ones
2. Read the relevant docs (roadmap, workflow archive, task logs for related areas)
3. Read `docs/roadmap.md` — current phase and open tasks
4. Read `docs/backlog.md` — priority-ordered task list (top = highest priority)

Do not skip archived docs. They contain context that informs current decisions.

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

1. Move workflow docs: `wip/` → `archive/` for completed work
2. Update `docs/roadmap.md` — mark completed tasks, remove completed phases
3. Write journal: task log at `docs/journal/tasks/<task-name>.md`, link from `docs/journal/YYYY-MM-DD.md`
4. Commit using the `/commit` skill

## When a Mistake Occurs

Document it in the relevant task log (`docs/journal/tasks/`) and add a pointer row to `docs/lessons.md`.

## Deviation Rule

No silent scope changes. If execution diverges from the stated plan, stop and explain.
