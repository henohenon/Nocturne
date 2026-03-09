# Functional Specification: Claude Code Environment Setup

## What to Build

### FR-1: Fix `.claude/` Directory Structure
- **Current**: `skills/` directory exists but is not a standard Claude Code feature
- **Required**: Slash commands must live in `.claude/commands/` to be invocable
- **Action**: Rename `skills/` → `commands/`; update references in `CLAUDE.md`

### FR-2: Eliminate rules/commands Overlap
- **`rules/`** — Conventions the AI must always follow (passive, always-loaded context)
- **`commands/`** — Prompts that trigger specific task workflows (active, invoked on demand)
- **Rule**: Commands may *reference* rules but must not *duplicate* rule content
- **Action**: Audit each file pair and remove duplicated content

### FR-3: Document Backlog Priority Convention
- **Required**: A doc explicitly states that backlog items are ordered top-to-bottom by priority
- **Location**: `docs/rules/` or inline in `docs/backlog.md` header
- **Acceptance**: AI reads priority order from backlog without ambiguity

### FR-4: Roadmap Cleanup Rule
- **Required**: Completed phases are removed from the active roadmap after phase close
- **Location**: Convention documented in `docs/rules/` or `CLAUDE.md`
- **Acceptance**: `roadmap/index.md` only shows current and future phases

### FR-5: Failure Prevention Docs
- **Required**: A `docs/lessons.md` (or equivalent) capturing mistakes made and how to avoid them
- **Format**: Per-entry: what happened, why, what to do instead
- **Acceptance**: At least the failures from Phase 1–5 are documented

### FR-6: Journal Structure Change
- **Current**: One file per day (`YYYY-MM-DD.md`) mixing work log and reflection
- **Required**:
  - Work logs: one file per task/session (`docs/journal/tasks/NNN-task-name.md`)
  - Daily diary: one file per day (`docs/journal/YYYY-MM-DD.md`) as index + personal reflection
- **Acceptance**: Rules updated, template created, existing journal migrated or noted as legacy
