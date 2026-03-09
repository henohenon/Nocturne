# Functional Specification: pre-task / post-task Skills

## FR-1: /pre-task skill
Steps executed before any task:
1. Archive previous task's wip/ docs if any remain
2. Update `docs/roadmap.md` — add new task under current phase
3. Read `docs/index.md` — identify relevant docs
4. Read relevant `docs/journal/tasks/` and `docs/workflow/*/archive/` for domain history
5. State concrete task breakdown before touching any file

## FR-2: /post-task skill
Steps executed after completing any task:
1. Move wip/ workflow docs to archive/
2. Mark tasks complete in `docs/roadmap.md`; remove completed phases when all done
3. Write task log at `docs/journal/tasks/<task-name>.md`
4. Link task log from `docs/journal/YYYY-MM-DD.md`
5. Commit

## FR-3: Simplified process.md
- "Before starting: run /pre-task"
- "After completing: run /post-task"
- Keep: Design-First requirement, Task Breakdown requirement, Deviation rule, When a Mistake Occurs
