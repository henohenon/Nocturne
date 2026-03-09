# Skill: journal

Write today's work log. Task logs are written in Japanese.

## Structure

```
docs/journal/
├── YYYY-MM-DD.md     # daily: task index + brief reflection (human writes reflection)
└── tasks/
    └── task-name.md  # per-task work log (AI writes this)
```

## Steps

1. Confirm today's date (YYYY-MM-DD)
2. Create a task log at `docs/journal/tasks/<task-name>.md`
   - Use a descriptive kebab-case name (no number prefix)
3. Add a link in `docs/journal/<today>.md` under `## 作業ログ` (create file if missing)
4. Ensure `docs/journal/<today>.md` has a `## 振り返り` section for human reflection

## Task Log Contents

1. **Tasks** — done, in-progress, newly discovered
2. **Decisions** — options considered, choice made, why
3. **Learnings** — what worked, what didn't, insights
4. **Next** — next actions, blockers
5. Link commits with hashes where relevant

## Rules

- AI does not write the `## 振り返り` section — human only
- Write task logs after completing or pausing any meaningful work
- Update the daily index at end of session
