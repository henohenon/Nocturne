# Skill: commit

Stage and commit changes following project conventions.

## Steps

1. Run `git status` and `git diff` to review all changes
2. Identify logical groupings — one commit per logical change
3. Stage relevant files (avoid secrets like `.env`)
4. Write a commit message following the format below
5. Commit; do not push without user confirmation

## Commit Format

```
<type>: <subject>
```

**Types**: `feat` `fix` `docs` `style` `refactor` `test` `chore`

**Subject rules**:
- English, imperative mood, lowercase
- Under 50 characters
- No unnecessary body unless context is non-obvious
- Keep git log clean and scannable
