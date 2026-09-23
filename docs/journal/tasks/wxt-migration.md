# タスク: WXT への移行（開発時の自動リロード）

## 実施したタスク

### 完了
- `vite` / `vite-plugin-web-extension` を削除し `wxt@0.21.4` を導入
- `wxt.config.ts` に manifest を移管（`srcDir: src`, `outDir: dist`, ブラウザ自動起動オフ）
- `src/entrypoints/content.ts`（`defineContentScript`）、`src/entrypoints/popup/` に移行
- `vite.config.ts` / `public/manifest.json` を削除、scripts・tsconfig・.gitignore 更新
- `CLAUDE.md` / `coding.md` のパスとルールを更新
- 本番 manifest の同等性確認、dev サーバーで保存→再ビルド→リロード通知を確認

## 技術的決定事項

### TD-1: ツール
- **決定**: WXT
- **代替案**: CRXJS / vite-plugin-web-extension 継続 / 自作リロード
- **理由**: 2026 年のデファクト、vite-plugin-web-extension の後継（同作者、非推奨予定）

### TD-2: ブラウザ
- **決定**: 自動起動オフ、普段の Chrome に `dist/chrome-mv3-dev` を一度読み込む
- **代替案**: WXT が別プロファイルの Chrome を起動
- **理由**: ログイン状態の YouTube で確認できる。最近の Chrome での起動・ログイン保持の不具合報告を回避

### TD-3: CSS 注入
- **決定**: 従来通り `<style>` を実行時注入（manifest の css に載せない）
- **理由**: 一時無効化でスタイルを外す必要がある

## 学び
- WXT はエントリポイントをビルド時に評価するため、`chrome.*` 呼び出しは `main()` 内に置く必要がある
- dev ビルドでは content script が manifest から外れ、バックグラウンドから動的登録される

## 次のアクション
- 手元 Chrome で dev 出力を読み込み、保存→自動反映を確認
- 旧 `dist` を読み込んでいる場合は削除して `dist/chrome-mv3`（本番）/ `dist/chrome-mv3-dev`（開発）に差し替え
