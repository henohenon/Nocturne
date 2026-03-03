# コミット・journal記録の仕様（What）


## コミットメッセージ仕様

### フォーマット
```
<type>: <subject within 50 chars>
```

### Types
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: フォーマット
- `refactor`: リファクタリング
- `test`: テスト
- `chore`: ビルド・ツール

### ルール
- 英語、命令形、小文字
- 50文字以内
- TUIでスキャン可能

詳細は `rules/commit-message.md` 参照。

## journal仕様

### ファイル形式
- ファイル名: `YYYY-MM-DD.md`
- 配置: `docs/journal/`
- テンプレート: `journal/template.md`

### 記載内容

#### 1. Tasks (何をしたか)
- 完了したタスク
- 進行中のタスク
- 新たに発見したタスク

#### 2. Decisions (なぜそうしたか)
- 選択肢
- 決定内容
- 理由

#### 3. Learnings (何を学んだか)
- うまくいったこと
- うまくいかなかったこと
- 気づき・発見

#### 4. Next (次に何をするか)
- アクションアイテム
- 気になること
- 保留事項

### 記載タイミング
- 1日の終わり（必須）
- 重要な意思決定時（必須）
- Phase完了時（必須）
- 詰まった時・突破した時（推奨）

## コミットとjournalの連携

- journalにコミットハッシュを記載
- コミットメッセージからjournalへリンク（必要に応じて）
- 1日の終わりに両方を更新

詳細は `rules/journal-writing.md` 参照。
