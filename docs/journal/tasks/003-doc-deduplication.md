# 003: ドキュメント重複解消・lessons.md 整備

## 実施したタスク

### 完了
- `docs/workflow/business/wip/004-doc-deduplication.md` 作成
- `docs/workflow/spec/wip/006-doc-deduplication.md` 作成
- `docs/workflow/archi/wip/004-doc-deduplication.md` 作成
- `CLAUDE.md` をプロジェクトコンテキストのみに絞り込み（プロセス記述を削除）
- `rules/process.md` に "After Completing Any Task" セクションを追加
- `docs/lessons.md` を全面的に見直し（L-001・L-002 を現状に合わせて修正、L-004 を追加）

## 技術的決定事項

### TD-1: CLAUDE.md の責務を「コンテキスト」に限定
- **選択**: CLAUDE.md = プロジェクト説明・パス・ルールへのポインタのみ
- **理由**: プロセスの詳細が CLAUDE.md と process.md の両方にあると、どちらが正しいか曖昧になる
- **結果**: CLAUDE.md は変わりにくい情報のみ。プロセス変更は process.md だけ修正すればよい

### TD-2: lessons.md のフォーマット統一
- **形式**: What / Why / Do instead の3行構成
- **理由**: AI が素早くスキャンして正しい行動を取れる形式に
- **L-004 追加**: workflow docs のアーカイブ漏れを教訓として記録

## 学んだこと・気づき

- lessons.md 自体が古い情報を持っていた（L-001, L-002 が現行と矛盾）。「再発防止ドキュメント」も定期的に見直さないと逆に害になる
- CLAUDE.md にプロセス内容を書くことで、rules/ とのダブルメンテが発生していた。責務の境界は早めに決めるべき

## 次のアクション

- Phase 5 完了 → Phase 6（リリース準備）へ
