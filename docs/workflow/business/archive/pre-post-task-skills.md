# Business Context: pre-task / post-task Skills

## Why

### Problem
process.md contains detailed before/after steps as prose rules. Rules are always loaded but not always reliably executed — "knowing" a rule and "executing" it step-by-step are different.

### Goal
Make the mandatory pre/post task procedures explicit, invocable, and checkable as skills. process.md becomes a thin pointer; the skills own the procedure.

### Success Criteria
- `/pre-task` skill executes all required steps before work begins
- `/post-task` skill executes all required cleanup/documentation steps after work
- process.md is reduced to "run /pre-task" and "run /post-task"
