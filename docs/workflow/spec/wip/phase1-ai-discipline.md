# Spec: Phase 1 - AI Discipline Enforcement

## Requirements

### 1. Backlog Edit Prevention
- AI must NEVER edit `docs/backlog.md`
- AI must NEVER suggest modifications to backlog.md
- Clear prohibition must be documented in AI rules

### 2. Rules Reading Enforcement
- AI must read ALL files in `docs/rules/` before starting any task
- AI must start with `docs/rules/index.md`
- This must be enforced via `.aiassistant/rules/index.md`

### 3. Error Prevention Documentation
- Document all past mistakes from journal entries
- Provide prevention strategy for each mistake
- Create verification checklist

### 4. Workflow Enforcement
- Mandate business/spec/archi creation before implementation
- Add enforcement to workflow-guide.md
- Make workflow skipping a documented violation

## Acceptance Criteria

### AC1: Backlog Protection
- [ ] `.aiassistant/rules/index.md` contains explicit backlog.md prohibition
- [ ] Prohibition uses strong language ("NEVER", "ABSOLUTE")
- [ ] Prohibition explains backlog is user-only territory

### AC2: Rules Reading
- [ ] `.aiassistant/rules/index.md` has "CRITICAL" section
- [ ] Section requires reading all docs/rules/ files
- [ ] Section is enforced via `apply: always`

### AC3: Error Prevention
- [ ] `docs/rules/error-prevention.md` created
- [ ] Minimum 3 past mistakes documented
- [ ] Each mistake has prevention strategy
- [ ] Prevention checklist included

### AC4: Workflow Enforcement
- [ ] `docs/rules/workflow-guide.md` updated
- [ ] Mandatory workflow section added
- [ ] Workflow skipping labeled as violation

## Out of Scope

- Automated enforcement via pre-commit hooks (future)
- AI behavior testing framework (future)

## Related

- Business: `docs/workflow/business/wip/phase1-ai-discipline.md`
- Source: `docs/roadmap/index.md` Phase 1
