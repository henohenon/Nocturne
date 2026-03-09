# Process Rules

Think before acting. Design before implementing.

## Before Starting Any Task

Read in this order:
1. `docs/roadmap/index.md` — current phase and priorities
2. `docs/lessons.md` — past mistakes
3. All relevant `docs/workflow/` docs, including `archive/` subdirectories
4. `docs/backlog.md` — priority-ordered list (top = highest priority)

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

1. Update `docs/workflow/` lifecycle as needed (wip → adr → archive)
2. Update `docs/roadmap/index.md` — mark completed tasks, remove completed phases
3. Write journal: task log at `docs/journal/tasks/NNN-task-name.md`, link from `docs/journal/YYYY-MM-DD.md`
4. Commit using the `/commit` skill

## Deviation Rule

No silent scope changes. If execution diverges from the stated plan, stop and explain.
