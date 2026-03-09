# 002: AI プロセス改善

## 実施したタスク

### 完了
- `docs/workflow/business/wip/003-ai-process-improvement.md` 作成
- `docs/workflow/spec/wip/005-ai-process-improvement.md` 作成
- `docs/workflow/archi/wip/003-ai-process-improvement.md` 作成
- `.claude/rules/process.md` 作成（設計優先・タスク分割・文書読み込み義務）
- `CLAUDE.md` の "Before Starting Any Task" セクションを更新
- `docs/roadmap/index.md` から完了フェーズ（1–4）を廃棄
- Phase 5 完了タスクとして AI プロセス改善を追記
- 完了した Phase 5 workflow docs を archive に移動

## 技術的決定事項

### TD-1: process.md を rules/ に配置
- **選択**: `.claude/rules/process.md`（常時読み込み）
- **理由**: スキルとして呼び出すのではなく、常にコンテキストとして参照されるべき行動規範
- **内容**: 実装前の文書読み込み、タスク分割、設計優先、逸脱時の明示

### TD-2: Phase 1–4 をロードマップから廃棄
- **根拠**: 「完了タスクは順次廃棄する」ルールに従い適用
- **保存先**: git log と docs/journal/ に履歴は残る

### TD-3: 完了済み workflow docs を archive に移動
- archi/002, spec/004, business/002（Claude Code env setup）は実装完了 → archive へ
- 実態と乖離した内容（`commands/` 参照）がそのまま wip/ に残るのを防ぐ

## 学んだこと・気づき

- バックログの「AIの思考が浅い」という指摘は、今回の作業自体（全ドキュメントを読んでから設計→実装）で実践的に示せた
- archi doc が古くなっていることに今回初めて気づいた。workflow docs も完了後は適切にライフサイクル管理が必要

## 次のアクション

- Phase 6（リリース準備）へ
- 拡張機能の実動作確認と残バグ対応
