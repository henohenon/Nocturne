# タスク: popup UI・ロードマップ方針・CSS リファクタ

## 実施したタスク

### 完了
- `src/button.ts` を削除（ページ注入ボタン廃止）
- `src/content.ts` に disable/enable 状態管理と chrome.runtime.onMessage ハンドラを追加
- `public/popup.html` を新規作成
- `src/popup.ts` を新規作成（状態取得・カウントダウン・トグル）
- `vite.config.ts` を2パスビルドに変更（IIFE は複数エントリー非対応のため）
- `package.json` の build スクリプトを更新（`vite build && vite build --mode popup`）
- `public/manifest.json` に `action.default_popup` と `"tabs"` 権限を追加
- `src/styles/overlay.css` を `:is()` ベースで書き直し（104行 → 62行）
- `--yt-overlay-hidden-bg` CSS カスタムプロパティを導入
- `pre-task/SKILL.md` のロードマップ指示を「再生成」→「追記＋✅マーク」に変更
- `post-task/SKILL.md` からロードマップ更新ステップを削除

## 技術的決定事項

### TD-1: popup ↔ content script 通信方式
- **決定**: `chrome.runtime.onMessage` / `chrome.tabs.sendMessage` によるメッセージパッシング
- **理由**: popup はページとは別プロセス。共有メモリなし。標準の拡張機能 API を使う

### TD-2: ページ内ボタンの廃止
- **理由**: YouTube の UI に異物を注入するより、拡張機能 popup として提供する方が UX として正しい

### TD-3: 2パスビルド
- **問題**: Vite/Rollup の IIFE 形式は複数エントリーと非対応（`inlineDynamicImports` の制約）
- **解決**: `--mode popup` で content と popup を別パスでビルド。`emptyOutDir: false` で dist を保持

### TD-4: ロードマップ方針
- **変更**: post-task でロードマップを更新しない（ナシ）
- **理由**: 完了後に履歴が消えるのが不便。pre-task で前フェーズを ✅ にしつつ追記する方式に統一
- **記録の場所**: journal/tasks/ が詳細履歴、roadmap が phase 一覧として残る

### TD-5: CSS :is() 採用
- **効果**: `ytd-rich-item-renderer, yt-lockup-view-model` の繰り返しを一箇所に集約
- **互換性**: Chrome 88+ (Manifest V3 最低要件)

## ビルド確認
- content.js: 3.86kB, popup.js: 1.11kB → OK
