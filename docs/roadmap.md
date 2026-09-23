# Roadmap

YouTube動画操作無効化Chrome拡張機能の開発ロードマップ

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

## 隠す機能を CSS `:has()` 方式で再実装
- [x] 設計（business / spec / archi）
- [x] overlay.css を `:has()` 許可リスト方式に書き換え
- [x] JS のバッジ判定・MutationObserver を削除
- [x] 実ページで動作確認

---

**最終更新**: 2026-09-23
