# Lessons Learned

Past mistakes and how to avoid them. Read before acting.

---

## L-001: Wrong skill directory structure

**What**: Created skills as flat `.claude/skills/name.md` files instead of `.claude/skills/name/SKILL.md`.

**Why**: Assumed a flat structure without checking the required format.

**Do instead**: Always use `.claude/skills/xxx/SKILL.md` — each skill in its own subdirectory.

---

## L-002: Duplicated content between rules and skills

**What**: Wrote commit format details in both a rule file and a skill file simultaneously.

**Why**: Created a skill without checking whether a rule file already covered the same content.

**Do instead**: Decide ownership before writing. Rules own conventions; skills own execution steps. When a skill needs convention details, integrate the rule content into the skill and delete the rule file.

---

## L-003: Unintended file deletion on commit

**What**: `docs/rules/` files were staged as deleted and removed when committing an unrelated change.

**Why**: Did not run `git status` before committing to verify staged changes.

**Do instead**: Always run `git status` before staging or committing. Confirm no unintended deletions are staged.

---

## L-004: Workflow docs left stale after implementation

**What**: `archi/002` still referenced `commands/` structure after the project moved to `skills/xxx/SKILL.md`.

**Why**: Workflow docs were not archived after the decisions they described were implemented and superseded.

**Do instead**: After completing a task, move the corresponding workflow docs from `wip/` to `archive/`. Stale wip docs mislead future decisions.
