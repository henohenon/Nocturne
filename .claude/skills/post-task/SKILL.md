# Skill: post-task

Run this after completing any task.

## Steps

1. **Archive wip/ docs** — move this task's `docs/workflow/*/wip/` files to `archive/`
2. **Update roadmap** — mark completed tasks in `docs/roadmap.md`; remove phases where all tasks are done
3. **Write task log** — create `docs/journal/tasks/<task-name>.md` with:
   - Tasks completed
   - Decisions made (options, choice, why)
   - Learnings and insights
   - Next actions / blockers
4. **Update daily index** — add a link to the task log in `docs/journal/YYYY-MM-DD.md` (create if missing); ensure `## GCされなかった思考` section exists
5. **Commit** — stage all changes and commit following the `/commit` skill
