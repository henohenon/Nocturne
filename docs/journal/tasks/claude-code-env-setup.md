# 001: Claude Code 開発環境整備

## 実施したタスク

### 完了
- `.claude/` ディレクトリ設定（CLAUDE.md, rules/, skills/）
- `docs/rules/` を `.claude/rules/` に移行・整理
- skills と rules の役割分担を整理（rules=常時適用の規約、skills=タスク実行プロンプト）
- backlog の優先度順コメントを追記
- 完了タスクの roadmap 廃棄ルールを整備
- `docs/lessons.md` 作成（失敗防止ドキュメント）
- journal 構造を変更（tasks/ + 日次 index）
- skills を `.claude/skills/xxx/SKILL.md` 形式に変更
- roadmap Phase 5 タスクを追加・更新

## 技術的決定事項

### TD-1: skills ディレクトリ構造
- **選択**: `.claude/skills/xxx/SKILL.md`（サブディレクトリ形式）
- **理由**: ユーザー指定。スキルごとに独立したディレクトリで拡張しやすい
- **旧形式**: `.claude/commands/xxx.md`（フラット形式）→ 廃止

### TD-2: rules vs skills の分離
- **rules/**: 常時読み込まれる規約。AIが常に従うべき「ルール」
- **skills/**: タスク実行時に呼び出すプロンプト。rulesを参照するが内容は複製しない

### TD-3: journal 構造
- **tasks/NNN-task-name.md**: 作業単位のログ（AIが記入）
- **YYYY-MM-DD.md**: 日次インデックス＋感情・反省（人間が記入）
- **理由**: 作業ログと個人日記を分離することで、AIが書く部分と人間が書く部分を明確化

## 学んだこと・気づき

- `.claude/commands/` は一度使ったが、ユーザーの意図した形式（skills/xxx/SKILL.md）と異なっていた → L-001 として lessons.md に記録済み
- rules と skills の内容が重複しがちなので、skills は「手順」だけ持ち、フォーマット詳細は rules に委ねる設計が適切

## 次のアクション

- Phase 5 完了 → Phase 6（リリース準備）へ
- 拡張機能の動作確認と残バグ対応

## コミット

- `2528d40` chore: set up Claude Code configuration and rules
- `a3f32a9` docs: add roadmap cleanup rule to backlog and roadmap
- `2e16f36` chore: ai tmp
