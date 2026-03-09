# タスク: コーディング規則の整備

## 実施したタスク

### 完了
- `src/content.ts` と `src/styles/overlay.css` を読んで規則を帰納的に導出
- `.claude/rules/coding.md` を新規作成
- `docs/index.md` の rules テーブルに `coding.md` を追記

## 技術的決定事項

### TD-1: 帰納的アプローチ
- **決定**: 規則を一から設計するのではなく、既存コードから観察して文書化
- **理由**: 「あるべき規則」より「実際に使われている規則」の方が実態に合う

### TD-2: 内容の範囲
- TypeScript の命名・型・JSDoc・エラー処理・ガード節
- CSS のセレクター・`.show` パターン・`!important` の理由
- `[YT Overlay]` ログ prefix
- スタイル注入の冪等性パターン
- ファイル構成の方針

## 次のアクション
- backlog 次項: tsが肥大化してきたのでリファクタ
