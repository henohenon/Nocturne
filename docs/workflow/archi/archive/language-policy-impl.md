# 言語ポリシーの実装（How）


## 運用方法

### ドキュメント作成時

1. 場所を確認:
   - `rules/` → 英語
   - `docs/workflow/` → 日本語
   - `journal/` → 日本語

2. 迷ったら:
   - AIが読む？→ 英語
   - 自分が読む？→ 日本語

### コード作成時

1. 英語で命名:
   ```typescript
   // Good
   function calculateTotal(price: number): number

   // Bad
   function 合計計算(価格: number): number
   ```

2. コメントも英語:
   ```typescript
   // Calculate total price with tax
   const total = price * (1 + taxRate);
   ```

### コミット時

1. 英語でコミットメッセージ:
   ```
   feat: add language policy
   fix: correct file path
   docs: update workflow guide
   ```

2. Conventional Commits形式に従う（`rules/commit-message.md` 参照）

## チェックリスト

新しいファイル作成時:
- [ ] ファイルの目的を確認（AI用？自分用？）
- [ ] 適切な言語を選択
- [ ] 命名規則に従う（コードの場合）

## 例外対応

- 技術用語は無理に訳さない（例: "バックログ" より "backlog"）
- README.mdは両言語併記を検討
- 外部公開する場合は英語優先
