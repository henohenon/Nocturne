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

## Phase 3: テストと改善 ✅
**目標**: 機能の検証と品質向上

### タスク
- [x] プロジェクト構造改善（src/配下に整理）
- [x] CSS分離（src/styles/overlay.css）
- [x] public/ディレクトリ作成とビルド設定改善
- [x] Blocker→Overlay名称変更
- [x] npm→bun移行
- [x] ビルドテスト実施

**成果物**:
- 改善されたプロジェクト構造
- src/styles/overlay.css - 独立したCSS
- public/ - manifest.json + icons
- bun.lockb - bunパッケージマネージャー

## Phase 4: 高度な機能実装 ✅
**目標**: Badge除外とオーバーレイ強化

### タスク
- [x] Badge検出ロジック実装（`.yt-badge-shape__icon`）
- [x] MutationObserver実装（動的要素監視）
- [x] 除外クラス適用機能（`yt-overlay-excluded`）
- [x] オーバーレイ強化（完全非表示レベル）
- [x] デバウンス処理でパフォーマンス最適化

**成果物**:
- Badge付き動画の自動検出と除外機能
- 強化されたオーバーレイ（opacity 0.05, blur 30px）
- MutationObserverによる動的コンテンツ対応
- docs/workflow/spec/wip/003-badge-exclusion-and-enhanced-overlay.md

## Phase 5: リリース準備
**目標**: 実運用に向けた準備

### タスク
- [ ] ユーザー向けREADME作成（必要に応じて）
- [ ] インストール手順の整備
- [ ] 最終動作確認
- [ ] リリース

**成果物**:
- リリース可能なChrome拡張機能

---

**現在のフェーズ**: Phase 5（リリース準備）
**最終更新**: 2026-03-03

## 進捗メモ
- Phase 1-4完了
- 初回実装での問題点をすべて解決:
  - ✅ プロジェクト構造整理
  - ✅ dist/に必要ファイル完備（manifest.json + icons）
  - ✅ CSS可読性向上（別ファイル分離）
  - ✅ bunへの移行完了
  - ✅ Overlay命名への統一
- Badge検出機能実装:
  - ✅ `.yt-badge-shape__icon`を持つ動画を除外
  - ✅ 動的コンテンツに対応（MutationObserver）
  - ✅ オーバーレイ大幅強化（完全非表示レベル）
