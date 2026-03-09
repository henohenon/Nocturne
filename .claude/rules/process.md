# Process Rules

Think before acting. Design before implementing.

## Before Starting Any Task

Run `/pre-task`.

## After Completing Any Task

Run `/post-task`.

## Design-First Requirement

For any non-trivial task (changes more than one file, or introduces a new concept):
1. Create `docs/workflow/business/wip/` doc (Why)
2. Create `docs/workflow/spec/wip/` doc (What)
3. Create `docs/workflow/archi/wip/` doc (How)
4. Only then implement

## Task Breakdown Requirement

Before touching any file, state a concrete list of subtasks:
- Each subtask must be atomic: one file, one operation, or one decision
- User reads the plan and can correct it before execution begins

## When a Mistake Occurs

Document it in the task log (`docs/journal/tasks/<task>.md`).

## Deviation Rule

No silent scope changes. If execution diverges from the stated plan, stop and explain.
