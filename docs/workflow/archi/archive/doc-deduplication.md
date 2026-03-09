# Technical Architecture: Documentation Deduplication

## How to Build

### AD-1: CLAUDE.md — Remove Process Content

Strip to project identity only:
```
# yt-overlay
[description]
## Stack
## Key Paths
## Conventions  ← pointers only, no content
## Skills       ← location reference only
```

Remove entirely: Quick reference, Backlog section, Before/After task sections.

### AD-2: process.md — Add "After Completing" Section

Move from CLAUDE.md:
1. Update `docs/workflow/` lifecycle
2. Update `docs/roadmap/index.md`
3. Write journal (task log + daily index)
4. Commit

### AD-3: lessons.md — Rewrite Stale Entries

| Entry | Action |
|-------|--------|
| L-001 | Rewrite: correct approach is `.claude/skills/xxx/SKILL.md` |
| L-002 | Rewrite: rules content is integrated into skills, not referenced separately |
| L-003 | Keep as-is |

Format each entry consistently:
- **What**: one sentence
- **Why**: one sentence
- **Do instead**: one actionable sentence
