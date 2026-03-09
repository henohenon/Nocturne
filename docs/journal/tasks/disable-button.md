# タスク: 3分無効化ボタン

## 実施したタスク

### 完了
- `src/config.ts` に `DISABLE_DURATION_MS`・`BUTTON_ID` を追加
- `src/button.ts` を新規作成（フローティングボタン、カウントダウン、enable/disable）
- `src/content.ts` に `removeOverlayStyles()` を追加し `setupButton()` を呼び出し

## 技術的決定事項

### TD-1: disable の実装方法
- **決定**: overlay CSS の `<style>` タグを DOM から削除して無効化し、タイマー後に再注入
- **代替案**: `<html>` に `.yt-overlay-disabled` クラスを付与して CSS でキャンセル
- **理由**: style タグの削除/再注入はシンプルで副作用が少ない。再有効化時に `processAllVideoElements()` も呼ぶことで `.show` クラスの整合性を保つ

### TD-2: ボタン UI
- フローティング固定ボタン（右下）
- 無効中はカウントダウン表示「再有効化 2:45」
- 再クリックで即時再有効化（キャンセル）

### TD-3: コールバックパターン
- `button.ts` に `onDisable` / `onReEnable` をコールバックとして渡す
- `button.ts` が `content.ts` の関数に直接依存しないため循環依存を回避

## ビルド確認
- `bun run build` → 6 modules transformed, 5.29kB → OK

## 次のアクション
- backlog 次項: css要素ごとに書くの辛いしなんかベターな方法ないか
