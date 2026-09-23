# タスク: Nocturne へのリネームと GitHub 公開準備

## 実施したタスク

### 完了
- 拡張名・package 名・ログ接頭辞・style id・CSS 変数・画面表示を Nocturne に変更
- `CLAUDE.md` / `coding.md` を更新
- README（英語、リリースからの導入手順・開発コマンド・注意点）を追加
- GitHub Actions: `ci.yml`（main への push / PR で型チェック + ビルド）、`release.yml`（`v*` タグで zip 付き Release 作成、タグと package.json の version 一致チェック）
- `wxt zip` で `nocturne-1.0.0-chrome.zip` の生成を確認

## 技術的決定事項

### TD-1: 名前
- **決定**: Nocturne
- **代替案**: Sekisho（関所）/ Kekkai（結界）/ Kido（木戸）など
- **理由**: ユーザーの好み（かっこいい）。夜だけ解放される仕様とも合う。商標を名前に含めない

### TD-2: 置き場所
- **決定**: 個人アカウント（henohenon/nocturne, public）
- **代替案**: Project-Starlivia（OSS ライブラリ用 org）
- **理由**: 個人用ツールで DOM 変化で壊れる前提。org は作り込んだライブラリ群の置き場。育ったら transfer で移せる

### TD-3: 配布
- **決定**: GitHub Release に zip を添付（手動で unpacked 読み込み）
- **代替案**: Chrome ウェブストア限定公開（自動更新）
- **理由**: 個人の複数端末用途で十分。更新が面倒になったら限定公開を検討

## 次のアクション
- GitHub リポジトリ作成・push（ユーザー確認後）
- 作業ディレクトリ名 `yt-overlay` の変更は任意（セッション外で）
