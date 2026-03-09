# Skill: pre-task

Run this before starting any task.

## Steps

1. **Archive stale docs** — if any `docs/workflow/*/adr/` files remain from a previously completed task, move them to `archive/` now
2. **Update roadmap** — add the new task as a new phase in `docs/roadmap.md`. Mark previously completed tasks with ✅ if not already done. Do not delete old phases — history stays visible.
3. **Read `docs/index.md`** — get an overview of what docs exist
4. **Read relevant history** — for the task's domain, read related files from:
   - `docs/journal/tasks/` (past task logs)
   - `docs/workflow/*/archive/` (past design decisions)
5. **Design (if needed)** — for tasks requiring design judgment, create `docs/workflow/*/wip/` docs (business/spec/archi). Skip for trivial changes.
6. **State task breakdown** — list all subtasks atomically before touching any file
7. **Iterate** — before proceeding, self-review with these three questions:
   - Is the breakdown granular enough? (each subtask = one file or one decision)
   - Is there a design flaw or missing assumption?
   - Does anything conflict with existing implementation or past decisions?

   If any answer is "yes" or "unsure", revise the plan and repeat step 7.
   Only proceed to execution when all three pass.
