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

## 一時停止 duration をユーザー変更可能に
- [x] popup に duration 選択ドロップダウンを追加（1分/3分/5分/10分）
- [x] 選択値を chrome.storage.local に保存
- [x] DISABLE メッセージで duration を content script に渡す

---

**最終更新**: 2026-03-18
