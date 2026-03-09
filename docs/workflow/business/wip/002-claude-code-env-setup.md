# Business Context: Claude Code Environment Setup

## Why

### Problem
AI-assisted development introduced friction due to:
- Inconsistent rule application (AI misses or misinterprets conventions)
- Repeated mistakes that were never formally captured
- Unclear document conventions causing ambiguity
- Journal structure that conflates work logs with personal reflection

### Goal
Establish a reliable, low-friction environment where Claude Code follows project conventions consistently and past mistakes don't recur.

### Value Proposition
- **Consistency**: AI applies rules predictably every session
- **Resilience**: Lessons learned are documented and enforced
- **Clarity**: Each doc type has a clear, non-overlapping purpose

## Success Criteria
- `.claude/` structure is correct and non-redundant
- Backlog priority order is explicit in docs
- Completed roadmap items are pruned, keeping the file scannable
- At least one failure is documented and prevented from recurring
- Journal structure separates work logs from personal diary entries

## Constraints
- Changes must not break existing Claude Code behavior
- Docs should be AI-readable: concise, structured, unambiguous
