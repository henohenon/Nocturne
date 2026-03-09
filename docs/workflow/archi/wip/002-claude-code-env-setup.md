# Technical Architecture: Claude Code Environment Setup

## How to Build

### AD-1: `.claude/` Directory Structure

**Decision**: Rename `skills/` to `commands/`

Claude Code resolves slash commands from `.claude/commands/*.md`.
Each file becomes `/filename` (e.g., `commands/journal.md` → `/journal`).
`skills/` has no special meaning in Claude Code — it's dead weight.

```
.claude/
├── CLAUDE.md         # always-loaded project context
├── rules/            # passive conventions (AI reads always)
│   ├── language.md
│   ├── workflow.md
│   ├── commits.md
│   ├── journal.md
│   └── docs.md
└── commands/         # active slash commands (invoked on demand)
    ├── journal.md    → /journal
    ├── commit.md     → /commit
    └── workflow-status.md → /workflow-status
```

### AD-2: rules vs commands Separation

| | `rules/` | `commands/` |
|---|---|---|
| Purpose | Define conventions | Execute task workflows |
| Loaded | Always | On invocation |
| Content | What/how to do | Step-by-step prompts |
| Duplication | Source of truth | May reference rules, never copy |

**Audit checklist**:
- `commands/commit.md`: references `rules/commits.md` ✓ — remove any duplicated format details
- `commands/journal.md`: references `rules/journal.md` ✓ — remove any duplicated format details
- `commands/workflow-status.md`: no rule overlap expected

### AD-3: Backlog Priority Convention

Add a header comment to `docs/backlog.md`:
```
<!-- 上から順に優先度が高い -->
```
And document the convention in `CLAUDE.md` under a "Backlog" section.

### AD-4: Roadmap Cleanup Rule

Add to `CLAUDE.md`:
> Completed phases are removed from `roadmap/index.md` when the phase closes.
> History is preserved in `docs/journal/` and git log.

### AD-5: Failure Prevention Docs

Create `docs/lessons.md`:
- Format: markdown table or per-entry sections
- Trigger: written whenever a mistake is identified
- Linked from `CLAUDE.md` as must-read

### AD-6: Journal Structure

```
docs/journal/
├── YYYY-MM-DD.md       # daily: index of sessions + personal reflection
└── tasks/
    └── NNN-task-name.md  # per-task work log
```

- `CLAUDE.md` references new journal rules
- Update `.claude/rules/journal.md` with new structure
- Existing `2026-03-03.md` kept as-is (legacy, no migration needed)
