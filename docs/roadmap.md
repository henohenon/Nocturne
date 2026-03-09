# Roadmap

YouTube動画操作無効化Chrome拡張機能の開発ロードマップ

## Phase 5: Claude Code / 開発環境整備 ✅
**目標**: AI支援開発の基盤を整え、ミスを繰り返さない仕組みを作る

### タスク
- [x] `.claude/` ディレクトリ設定（CLAUDE.md, rules/, skills/）
- [x] commands と rules の重複を解消し、適切に分割
- [x] backlog が上から優先度順であることを docs に記載
- [x] 完了タスクを roadmap から順次廃棄するルールを整備
- [x] 一度した失敗を二度としないための docs 再整備（docs/lessons.md）
- [x] journal 構造の変更（tasks/ + 日次 index）
- [x] commands を `.claude/skills/xxx/SKILL.md` 形式に変更
- [x] journal 記入
- [x] AI の思考プロセス改善（rules/process.md）
- [x] CLAUDE.md と process.md の重複解消
- [x] lessons.md の精査・更新
- [x] docs 構造オーバーホール（settings.json, roadmap リネーム, wip アーカイブ, failure prevention 再設計）

## Phase 5.5: プロセス最終調整 🔧
**目標**: 作業開始フローの確立と lessons.md の完全廃止

### タスク
- [x] process.md に「作業開始時に roadmap.md 更新」を義務化
- [x] lessons.md を削除、rules に journal/tasks・archive 読み込みを追加
- [x] docs/index.md から lessons.md エントリ除去

## Phase 5.6: pre-task / post-task スキル化 🔧

### タスク
- [x] process-enhancement wip/ を archive
- [x] `/pre-task`・`/post-task` スキル作成
- [x] `process.md` をスキル呼び出しの1行に簡略化
- [x] `docs/index.md` のスキル一覧を更新

## Phase 5.7: ワークフロー再設計 🔧

### タスク
- [x] CLAUDE.md に pre-task 読み込み指示を追加
- [x] `rules/workflow.md` を wip/adr/archive セマンティクスで再定義
- [x] `skills/pre-task/SKILL.md` に反復ループ（3問自己レビュー）を追加
- [x] `skills/post-task/SKILL.md` を wip→adr→archive フローに更新
- [x] `process.md` のデザインファースト閾値を定性的判断に変更
- [x] `docs/index.md` の wip ファイル一覧を削除

## Phase 6: リリース準備
**目標**: 実運用に向けた準備

### タスク
- [ ] ユーザー向けREADME作成（必要に応じて）
- [ ] インストール手順の整備
- [ ] 最終動作確認
- [ ] リリース

**成果物**:
- リリース可能なChrome拡張機能

---

**現在のフェーズ**: Phase 6（リリース準備）
**最終更新**: 2026-03-09 (Phase 5.7 追加)
