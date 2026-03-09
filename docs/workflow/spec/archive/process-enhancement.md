# Functional Specification: Process Enhancement

## FR-1: Roadmap-first task start
- **Requirement**: Before any other action, add the new task(s) to `docs/roadmap.md`
- **Purpose**: Roadmap reflects live work, not just completed work
- **Location**: process.md "Before Starting Any Task", step 1

## FR-2: Remove lessons.md
- **Requirement**: Delete `docs/lessons.md`
- **Replacement**: process.md instructs reading relevant `docs/journal/tasks/` and `docs/workflow/*/archive/` when working in a domain with prior history
- **Acceptance**: No reference to lessons.md remains in any rule or doc

## FR-3: Contextual history reading in process.md
- **Requirement**: When a task touches a domain with prior work, read the relevant task logs and archived workflow docs
- **How AI identifies relevance**: match task topic against journal/tasks filenames and archive filenames
