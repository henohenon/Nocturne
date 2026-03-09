# Functional Specification: Documentation Deduplication

## What to Build

### FR-1: CLAUDE.md Scope Restriction
- **Requirement**: CLAUDE.md contains only project identity, stack, key paths, and pointers to rule files
- **Remove**: "Before Starting Any Task", "After Completing Any Task", "Backlog" note, "Quick reference"
- **Keep**: Project description, Stack, Key Paths, pointers to rules/ and skills/
- **Acceptance**: No process steps remain in CLAUDE.md

### FR-2: process.md Completeness
- **Requirement**: process.md owns ALL behavioral steps — before and after any task
- **Add**: "After Completing Any Task" section (moved from CLAUDE.md)
- **Acceptance**: Reading process.md alone gives complete behavioral guidance

### FR-3: lessons.md Accuracy
- **Requirement**: Every lesson reflects current conventions
- **L-001 fix**: Current approach is `.claude/skills/xxx/SKILL.md`, not `.claude/commands/`
- **L-002 fix**: Rules content is now integrated into skills, not kept separate
- **L-003**: Still accurate — keep as-is
- **Format improvement**: Each entry should be scannable (what/why/do instead)
- **Acceptance**: No lesson contradicts current file structure or conventions
