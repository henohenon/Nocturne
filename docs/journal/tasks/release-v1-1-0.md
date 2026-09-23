# タスク: ブランチ方針の策定と v1.1.0 リリース

## 実施したタスク

### 完了
- ブランチ・バージョン・リリース方針を `.claude/rules/git.md` に明文化、README と docs/index.md から参照
- version を 1.1.0 に上げ、main を push → CI 成功 → `v1.1.0` タグを push → Release ワークフロー成功
- Release: https://github.com/henohenon/Nocturne/releases/tag/v1.1.0 （`nocturne-1.1.0-chrome.zip`、manifest の version 1.1.0・アイコン 4 サイズを確認）

## 技術的決定事項

### TD-1: ブランチ運用
- **決定**: main 中心の軽い trunk-based。小さな変更は main 直、大きな変更は短命ブランチ + PR（squash）
- **代替案**: すべて PR 経由（main 保護）/ git-flow（develop・release ブランチ）
- **理由**: 一人開発・配布は GitHub Release のみ。保護や長寿命ブランチは手間に見合わない

### TD-2: バージョン
- **決定**: SemVer。パッチ = 修正・セレクタ追従、マイナー = 機能・UI、メジャー = 保存状態の互換性破壊
- **理由**: YouTube の DOM 変化への追従が頻繁に起きる前提で、パッチの意味を明確にしておく

## 気づき
- CI/CD は GitHub 公開準備の時点でほぼ揃っていた（ユーザーも「もうできてるのか」）。追加実装より運用ルールの明文化が効いた
- Actions の警告: `actions/checkout@v4` が Node.js 20 で非推奨、`ubuntu-latest` が 2026-10-19 から Ubuntu 26 に移行

## 追記: CI の整備
- `actions/checkout` を v7（Node 24）に更新し、Node.js 20 非推奨警告を解消
- 共有状態の単体テスト（9件: 夜間スケジュール・手動無効化・連続判定・夜間の封印）を `tests/` に追加、`bun run test` を CI とリリースに組み込み。UTC / 太平洋時間でも通ることを確認
- `ubuntu-latest` の Ubuntu 26 移行は告知のみ。追従で問題ないため固定しない
