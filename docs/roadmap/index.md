# Roadmap

YouTube動画操作無効化Chrome拡張機能の開発ロードマップ

## Phase 1: プロジェクト立ち上げ・設計 ✅
**目標**: プロジェクトの基盤を確立し、要件と設計を明確化する

### タスク
- [x] プロジェクト構造とドキュメント体系の整備
- [x] ビジネス要件の明確化（Why）
- [x] 機能仕様の定義（What）
- [x] 技術設計とアーキテクチャの決定（How）
- [x] TypeScript + Vite開発環境のセットアップ

**成果物**:
- roadmap/index.md（このファイル）
- workflow/business/wip/001-youtube-interaction-blocker.md
- workflow/spec/wip/001-core-functionality.md
- workflow/archi/wip/001-extension-architecture.md
- TypeScript + Vite開発環境

## Phase 2: 基本機能実装 ✅
**目標**: YouTube動画操作を無効化する基本機能を実装

### タスク
- [x] TypeScriptプロジェクト構成
- [x] manifest.json設定（Manifest V3）
- [x] content.ts実装（CSS injection）
- [x] 動画要素の操作無効化スタイル適用
- [x] ビルドパイプライン構築
- [x] 初期動作確認

**成果物**:
- 動作するChrome拡張機能（dist/配下）
- src/content.ts - TypeScript実装
- Viteビルド設定

## Phase 3: テストと改善
**目標**: 機能の検証と品質向上

### タスク
- [ ] 手動テスト実施
- [ ] エッジケースの検証
- [ ] バグ修正と調整
- [ ] ドキュメントのWIP → ADR移行

**成果物**:
- 安定動作する拡張機能
- 確定した設計文書（adr/配下）

## Phase 4: リリース準備
**目標**: 実運用に向けた準備

### タスク
- [ ] ユーザー向けREADME作成（必要に応じて）
- [ ] インストール手順の整備
- [ ] 最終動作確認
- [ ] リリース

**成果物**:
- リリース可能なChrome拡張機能

---

**現在のフェーズ**: Phase 3（テストと改善）
**最終更新**: 2026-03-03

## 進捗メモ
- Phase 1-2を完了し、基本機能が動作中
- ユーザー報告: 「やや問題はあったけど動いてる」→ Phase 3で改善予定
