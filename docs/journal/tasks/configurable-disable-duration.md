# タスク: 一時停止 duration をユーザー変更可能に

## 実施したタスク

### 完了
- `public/popup.html` に duration 選択ドロップダウンを追加（1分/3分/5分/10分）
- `src/popup.ts` を書き直し: 選択値の読み込み・保存（chrome.storage.local）、DISABLE メッセージに `durationMs` を含める
- `src/content.ts` の `disableOverlay()` を `durationMs` 引数付きに変更、DISABLE メッセージから受け取る
- `src/config.ts` の `DISABLE_DURATION_MS` → `DEFAULT_DISABLE_DURATION_MS` にリネーム
- `public/manifest.json` に `storage` 権限を追加

## 技術的決定事項

### TD-1: duration の選択 UI
- **決定**: `<select>` ドロップダウン（1分/3分/5分/10分のプリセット）
- **代替案**: 自由入力テキストフィールド
- **理由**: プリセットの方が誤入力がなく UX がシンプル。popup の狭い幅にも適合

### TD-2: duration の永続化
- **決定**: `chrome.storage.local` に保存
- **理由**: popup を閉じても選択が保持される。localStorage は popup のコンテキストごとに分離されるため不適

### TD-3: duration の伝達方法
- **決定**: DISABLE メッセージの `durationMs` フィールドで content script に渡す
- **理由**: content script 側で storage を読む必要がなく、メッセージパッシングの既存パターンを活用

## ビルド確認
- content.js: 3.88kB, popup.js: 1.32kB → OK
