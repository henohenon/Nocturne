# Functional Specification: AI Process Improvement

## What to Build

### FR-1: Mandatory Doc Reading Before Acting
- **Requirement**: AI must read all relevant docs before starting any task
- **Scope**: `docs/workflow/` (including `archive/`), `docs/lessons.md`, `docs/roadmap/index.md`
- **Acceptance**: No implementation begins without confirmed doc review

### FR-2: Explicit Task Breakdown Before Implementation
- **Requirement**: AI must state a concrete list of subtasks before writing any code or files
- **Granularity**: Each subtask must be atomic (one file, one operation, one decision)
- **Acceptance**: User can read the plan and catch misunderstandings before work begins

### FR-3: Design-First Enforcement
- **Requirement**: For any non-trivial task, workflow docs (business → spec → archi) must exist before implementation
- **Threshold**: "Non-trivial" = changes more than one file, or introduces a new concept
- **Acceptance**: Implementation files are not created without a corresponding wip/ doc

### FR-4: Deviation Transparency
- **Requirement**: If the plan changes mid-execution, AI must state what changed and why
- **Acceptance**: No silent scope changes
