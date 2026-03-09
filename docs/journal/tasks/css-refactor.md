# タスク: CSS セレクター改善

## 実施したタスク

### 完了
- `src/styles/overlay.css` を `:is()` ベースで書き直し（104行 → 62行）
- `--yt-overlay-hidden-bg` CSS カスタムプロパティ導入（`#404040` の重複を削除）

## 技術的決定事項

### TD-1: `:is()` の採用
- **決定**: `element1 .class, element2 .class { }` パターンを `:is(element1, element2) .class { }` に統一
- **理由**: 同じセレクターの繰り返しを排除。追加要素が来ても `:is()` の引数を増やすだけ
- **互換性**: `:is()` は Chrome 88+。Manifest V3 の最低要件と一致するため問題なし
- **Specificity**: `:is()` は引数の最大 specificity を使用。`ytd-*`（0,0,1）なので既存と同等

### TD-2: CSS カスタムプロパティ
- `#404040` が 4 箇所に散在していた → `--yt-overlay-hidden-bg` に集約
- 色調整が 1 箇所の変更で済む

### TD-3: Shorts のセレクター統合
- `ytd-reel-video-renderer` は一部のプロパティのみ共通（`.ytDecoratedAvatarViewModelHost` なし）
- 共通部分は `:is()` で統合し、差分のみ個別ルールに
