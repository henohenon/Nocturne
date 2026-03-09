# Skill: journal

Write today's work log. Task logs are written in Japanese.

## Structure

```
docs/journal/
├── YYYY-MM-DD.md     # daily: task index + AI reflection + human reflection
└── tasks/
    └── task-name.md  # per-task work log (AI writes this)
```

## Daily File Format

```markdown
# YYYY-MM-DD

## 作業ログ
- [task-name](tasks/task-name.md)

## GCされなかった思考
（AIの所感・気づき・ひとりごと）

## 人間さんの記述
（人間が書く — AI は書かない）
```

## Steps

1. Confirm today's date (YYYY-MM-DD)
2. Create a task log at `docs/journal/tasks/<task-name>.md`
   - Use a descriptive kebab-case name (no number prefix)
3. Add a link in `docs/journal/<today>.md` under `## 作業ログ` (create file if missing)
4. Write `## GCされなかった思考` — AI's own reflection on the session
5. Leave `## 人間さんの記述` blank for the human

## Task Log Contents

1. **Tasks** — done, in-progress, newly discovered
2. **Decisions** — options considered, choice made, why
3. **Learnings** — what worked, what didn't, insights
4. **Next** — next actions, blockers
5. Link commits with hashes where relevant

## Rules

- AI does not write the `## 人間さんの記述` section — human only
- `## GCされなかった思考` is AI's genuine reflection, not a summary of the task log
- Write task logs after completing or pausing any meaningful work
