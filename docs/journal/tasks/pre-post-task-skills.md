# タスク: pre-task / post-task スキル化

## 実施したタスク

### 完了
- process-enhancement wip/ を archive
- `.claude/skills/pre-task/SKILL.md` 作成
- `.claude/skills/post-task/SKILL.md` 作成
- `process.md` を "Run /pre-task" / "Run /post-task" の2行に簡略化
- `CLAUDE.md` のスキル一覧に `/pre-task`・`/post-task` を追加
- `docs/index.md` の process.md 説明を更新
- workflow docs 作成・archive

## 技術的決定事項

### TD-1: ハイブリッド構造
- **rules/process.md**: 「スキルを呼べ」という薄いポインター
- **skills/pre-task, post-task**: 実際の手順を持つ
- **理由**: rules は「常に念頭にある制約」、skills は「実行時に参照する手順書」として役割を分離

## 次のアクション
- Phase 6（リリース準備）へ
