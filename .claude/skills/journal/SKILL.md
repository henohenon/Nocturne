# Skill: journal

Write today's work log. Task logs are written in Japanese.

## Structure

```
docs/journal/
├── YYYY-MM-DD.md        # daily index + personal reflection (human writes reflection)
└── tasks/
    └── NNN-task-name.md # per-task work log (AI writes this)
```

## Steps

1. Confirm today's date (YYYY-MM-DD)
2. Create a task log at `docs/journal/tasks/NNN-task-name.md`
   - NNN is the next sequential number from existing files
3. Add a link to the task log in `docs/journal/<today>.md` (create if missing)

## Task Log Contents

1. **Tasks** — done, in-progress, newly discovered
2. **Decisions** — options considered, choice made, why
3. **Learnings** — what worked, what didn't, insights
4. **Next** — next actions, blockers
5. Link commits with hashes where relevant

## Rules

- AI does not write the reflection/emotion section in the daily diary
- Write task logs after completing or pausing any meaningful work
- Update the daily index at end of session
