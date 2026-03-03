# Architecture: Phase 1 - AI Discipline Enforcement

## Implementation Strategy

### Approach: Layered Rule Enforcement

Use JetBrains AI's `.aiassistant/rules/` system combined with explicit documentation in `docs/rules/`.

**Rationale**: 
- `.aiassistant/rules/index.md` with `apply: always` ensures rules are always loaded
- `docs/rules/` provides detailed guidance that AI must read
- Two-layer system (forced load + mandatory read) maximizes compliance

## Architecture Decisions

### AD1: Backlog Protection via Absolute Prohibition

**Implementation**:
```markdown
**ABSOLUTE PROHIBITIONS**:
- NEVER edit `docs/backlog.md` under any circumstances
- NEVER create, modify, or suggest changes to backlog.md
- Backlog is user-only territory - AI reads only
```

**Location**: `.aiassistant/rules/index.md`

**Rationale**: 
- Strong language ("NEVER", "ABSOLUTE") to prevent misinterpretation
- Explain "why" (user-only territory) to reinforce understanding
- Positioned in always-loaded file for guaranteed visibility

### AD2: Rules Reading via CRITICAL Section

**Implementation**:
```markdown
**CRITICAL**: Before starting ANY task, you MUST:
1. Read ALL files in `docs/rules/` directory thoroughly
2. ALWAYS start by reading: `docs/rules/index.md`
3. Follow the workflow defined in `docs/rules/workflow-guide.md`
```

**Location**: `.aiassistant/rules/index.md`

**Rationale**:
- CRITICAL label emphasizes importance
- Explicit file path prevents ambiguity
- Ordered list creates clear sequence

### AD3: Error Prevention Document

**Structure**:
```markdown
# Error Prevention System

## Past Mistakes and Prevention
### Mistake N: [Title]
**What happened**: [Description]
**Prevention**: [Strategy]
**Rule**: [Specific enforcement]

## Prevention Checklist
- [ ] Check 1
- [ ] Check 2
```

**Location**: `docs/rules/error-prevention.md`

**Rationale**:
- Separate file to avoid bloating index.md (token efficiency)
- Structured format for easy scanning
- Checklist for verification
- Includes "what happened" for context (learning tool)

### AD4: Workflow Enforcement

**Implementation**:
```markdown
## Mandatory Workflow

**CRITICAL**: Before ANY implementation, you MUST:
1. Create `business/wip/<task>.md` — Define why and business context
2. Create `spec/wip/<task>.md` — Define what needs to be done
3. Create `archi/wip/<task>.md` — Define how to implement
4. Only then proceed to implementation

Skipping workflow steps is a violation of project discipline.
```

**Location**: `docs/rules/workflow-guide.md`

**Rationale**:
- CRITICAL label for emphasis
- Explicit step-by-step to prevent skipping
- "violation" language to convey seriousness
- Positioned at top of workflow-guide.md for visibility

## File Modifications

### Modified Files
1. `.aiassistant/rules/index.md`
   - Add ABSOLUTE PROHIBITIONS section
   - Add ERROR PREVENTION section
   - Keep existing CRITICAL section

2. `docs/rules/workflow-guide.md`
   - Add Mandatory Workflow section at top
   - Keep existing structure

### New Files
1. `docs/rules/error-prevention.md`
   - Document 4+ past mistakes from journal
   - Provide prevention strategies
   - Include checklist

## Trade-offs

### Token Efficiency vs. Clarity
- **Choice**: Minimal but clear language in rules
- **Trade-off**: Less examples/explanation but faster loading
- **Mitigation**: Details in error-prevention.md and journal examples

### Enforcement Strength
- **Choice**: Strong language ("NEVER", "CRITICAL", "violation")
- **Trade-off**: May sound harsh but prevents ambiguity
- **Rationale**: AI discipline requires unambiguous rules

## Future Enhancements

1. **Automated verification**: Pre-commit hook to check workflow docs exist
2. **AI behavior testing**: Framework to verify AI follows rules
3. **Metric tracking**: Count rule violations over time

## Related

- Business: `docs/workflow/business/wip/phase1-ai-discipline.md`
- Spec: `docs/workflow/spec/wip/phase1-ai-discipline.md`
