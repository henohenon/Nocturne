# Lessons Learned

過去に発生したミスと対策。作業前に必ず確認すること。

---

## L-001: `.claude/skills/` は Claude Code の標準ディレクトリではない

**何が起きたか**: スラッシュコマンドを `skills/` に配置したが、Claude Code はこのディレクトリを認識しない。

**なぜ起きたか**: Claude Code のコマンドディレクトリを確認せずに命名した。

**対策**: スラッシュコマンドは必ず `.claude/commands/` に配置する。

---

## L-002: rules と commands にコンテンツが重複した

**何が起きたか**: `commands/commit.md` にコミットフォーマットを書いたが、同じ内容が `rules/commits.md` にも存在した。

**なぜ起きたか**: commands 作成時に rules の内容を参照せず書き直した。

**対策**: commands はルールを参照するだけにする。コンテンツは rules が唯一の情報源。

---

## L-003: docs/rules/ を .claude/rules/ に移行した際にファイルが削除扱いになった

**何が起きたか**: git 上で `docs/rules/` 配下のファイルが staged delete 状態になっており、コミット時に意図せず削除された。

**なぜ起きたか**: git status で staged 変更を事前確認しなかった。

**対策**: コミット前に必ず `git status` で staged 変更を確認し、意図しない削除がないか確認する。
