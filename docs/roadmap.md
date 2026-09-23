# Roadmap

Nocturne（旧 yt-overlay）の開発ロードマップ

## コーディング規則の整備 ✅
- [x] コーディング規則を調査・まとめる
- [x] `.claude/rules/` に `coding.md` として追加

## content.ts リファクタ ✅
- [x] `src/content.js`（コンパイル済みアーティファクト）を削除
- [x] `src/config.ts`, `src/utils.ts`, `src/badge.ts` に分割

## 3分無効化ボタン（popup UI） ✅
- [x] CSS `:is()` リファクタ（overlay.css）
- [x] 拡張機能 popup に3分無効化ボタンを実装
- [x] content script ↔ popup メッセージング

## ロードマップ方針変更 ✅
- [x] post-task でロードマップ更新ナシに
- [x] pre-task で前フェーズを ✅ 追記する方式に

## 一時停止 duration をユーザー変更可能に ✅
- [x] popup に duration 選択ドロップダウンを追加（1分/3分/5分/10分）
- [x] 選択値を chrome.storage.local に保存
- [x] DISABLE メッセージで duration を content script に渡す

## 最新ビルドの動作確認 ✅
- [x] type-check / build
- [x] dist 成果物の確認
- [x] content script の実ページ動作確認（NG: バッジ判定・テキスト隠蔽）
- [x] popup の状態遷移確認

## 最新 YouTube DOM 調査・代替手法探索 ✅
- [x] ページ種別ごとの動画要素と判定シグナルの調査
- [x] 代替手法（CSS `:has()` / 要素データ / 他）の比較
- [x] research ノートにまとめる

## 隠す機能を CSS `:has()` 方式で再実装 ✅
- [x] 設計（business / spec / archi）
- [x] overlay.css を `:has()` 許可リスト方式に書き換え
- [x] JS のバッジ判定・MutationObserver を削除
- [x] 実ページで動作確認

## WXT への移行（開発時の自動リロード） ✅
- [x] 設計（business / spec / archi）
- [x] WXT 導入・エントリポイント移行
- [x] ビルド成果物の同等性確認
- [x] 開発モード（自動リロード）確認（手元 Chrome での反映は未確認）

## 許可対象の見直し・夜間スケジュール・無効化フローの刷新 ✅
- [x] 許可対象: 公式アーティスト動画 + 再生リスト/ミックスのみ（ライブはブロック）
- [x] 夜間スケジュール（19:30〜05:00 は自動で無効）
- [x] 無効化は専用ウィンドウ（危険デザイン、デフォルト30分・最大120分）
- [x] 連続無効化の確認アラート（60分以内の再無効化を連続と数える）、クールダウン廃止
- [x] 無効化状態を全タブ共通に

## Nocturne へのリネームと GitHub 公開準備 ✅
- [x] 拡張名・コード・ドキュメントのリネーム
- [x] README
- [x] CI（型チェック・ビルド）とタグでの Release 自動作成
- [x] GitHub リポジトリ作成・push（master→main、コミットのメールを noreply に書き換え、IDE ファイルを ignore）

## アイコン刷新と UI のビジュアル統一 ✅
- [x] アイコン制作（閉じた目の三日月、夜の黒 + 金の2色、16px はドット打ち）
- [x] 設計（business / spec / archi）
- [x] popup をアイコンのトーンに合わせて刷新、表記を Nocturne に統一
- [x] 無効化ウィンドウを刷新（危険さは維持）
- [x] 夜間モード中の「今夜も封印する」トグル
- [x] YouTube 上のブロック表示を刷新
- [x] ビルド・見た目確認

## 封印を解く画面の恐怖演出・連続確認の専用画面・ブロック表示のグレー化 ✅
- [x] 設計（business / spec / archi）
- [x] 開眼マーク（閉じた目が開く、瞳がカーソルを追う）と心拍の演出
- [x] 連続無効化の確認を専用画面に（回数に応じた待ち時間）
- [x] YouTube 上のブロック表示をグレー系に
- [x] ビルド・見た目・動作確認

## ブランチ方針の策定と v1.1.0 リリース ✅
- [x] ブランチ・バージョン・リリース方針（`.claude/rules/git.md`）
- [x] v1.1.0 リリース

## X のタイムラインを封印 ✅
- [x] 設計（business / spec / archi）
- [x] 封印の付け外しを共通化（YouTube / X の content script）
- [x] X: ページ判定（/home・/explore）と封印 CSS、右カラム非表示
- [x] manifest・文言を X 対応に
- [x] テスト・ビルド・確認
- [x] ログイン後の実画面で確認し、レイアウトを崩さない形に修正
- [x] v1.2.0 リリース

## YouTube の音楽判定を広げる ✅
- [x] ホームの「音楽」でブロックされる項目の調査（公式アーティスト印なし・再生時間に ♪）
- [x] 許可条件に「再生時間バッジの ♪」を追加（ライブは引き続きブロック）
- [x] 検証・README 更新
- [x] v1.3.0 リリース

---

**最終更新**: 2026-09-23
