# Business Context: Documentation Deduplication

## Why

### Problem
Two types of duplication have emerged:

1. **CLAUDE.md vs process.md**: Process steps (before/after task, reading order) appear in both files. CLAUDE.md should be project context; process.md should own all behavioral rules.

2. **lessons.md is stale**: Two of three lessons describe approaches that have since been superseded. An outdated lesson is worse than no lesson — it gives the AI incorrect guidance.

### Goal
- Single source of truth for each type of content
- lessons.md reflects current conventions accurately

### Success Criteria
- CLAUDE.md contains no process steps — only project identity, paths, and pointers
- process.md is the sole source for all AI behavioral rules
- All lessons in lessons.md are accurate and actionable
