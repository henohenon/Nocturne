# タスク: content.ts リファクタ

## 実施したタスク

### 完了
- `src/content.js`（コンパイル済みアーティファクト）を git から削除
- `.gitignore` に `src/*.js` を追加
- `src/config.ts` 作成 — 定数 (BADGE_SELECTOR, SHOW_CLASS, VIDEO_SELECTORS)
- `src/utils.ts` 作成 — debounce ユーティリティ
- `src/badge.ts` 作成 — hasBadge, processVideoElement, processAllVideoElements
- `src/content.ts` を整理 — 上記を import、エントリー関心事のみ残す

## 技術的決定事項

### TD-1: 分割の境界
- **config** — 定数。どこからでも import できる単一の真実の源
- **utils** — ドメインに依存しない汎用ロジック
- **badge** — バッジ検出とDOM要素処理。ドメインの中核
- **content** — スタイル注入・オブザーバー・初期化。エントリーポイントの関心事

### TD-2: content.js の削除
- `src/` にコンパイル済み `.js` が混在していた
- `dist/` が出力先なのに `src/content.js` がコミットされていたのは過去の誤操作
- `.gitignore` に `src/*.js` を追加して再発防止

## ビルド確認
- `bun run build` → 5 modules transformed, dist/content.js 3.97kB → OK

## 次のアクション
- backlog 次項: 3分無効化ボタン / css要素ごとに書くの辛いしなんかベターな方法ないか
