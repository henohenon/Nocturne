# Business Context: AI Process Improvement

## Why

### Problem
AI assistant defaults to immediate execution:
- Skips reading archived and deeply nested docs before acting
- Does not decompose tasks before implementing
- Spends too little time in design/planning relative to coding

This leads to:
- Decisions made without full context
- Rework when overlooked docs contradict the implementation
- Coarse-grained execution that misses edge cases

### Goal
Make the AI spend proportionally more effort in understanding and planning before touching any files.

### Value Proposition
- **Better decisions**: full context read before acting reduces reversals
- **Fewer mistakes**: explicit task breakdown catches gaps early
- **Alignment**: user can review and correct the plan before execution begins

## Success Criteria
- AI reads all relevant docs (including archives) before starting work
- AI states a concrete task breakdown before implementing
- Implementation follows the stated plan, deviating only with explanation
