# コミット・journal記録の実装（How）


## コミット実装

### 日常的なコミット

1. 変更をステージング:
   ```bash
   git add <files>
   ```

2. シンプルなコミット:
   ```bash
   git commit -m "feat: add workflow guide"
   ```

3. TUI確認:
   ```bash
   git log --oneline
   ```

### ルール遵守

- `rules/commit-message.md` に従う
- 1コミット = 1論理変更
- 50文字以内で要点を伝える

## journal実装

### 新しいjournalエントリー作成

```bash
# テンプレートをコピー
cp docs/journal/template.md docs/journal/$(date +%Y-%m-%d).md

# エディタで開いて記入
```

### 記入方法

1. **作業内容**から埋める（事実）
2. **意思決定**を記録（背景と理由）
3. **学び**を振り返る（何を得たか）
4. **Next**を明確にする（次の行動）
5. **コミットハッシュ**をリンク

### 1日の終わりルーチン

1. コミット履歴を確認:
   ```bash
   git log --oneline --since="today"
   ```

2. journalに転記:
   - 今日のコミット一覧
   - 何をしたか
   - なぜそうしたか
   - 何を学んだか

3. コミット:
   ```bash
   git add docs/journal/YYYY-MM-DD.md
   git commit -m "docs: update journal"
   ```

## テンプレート活用

### journal template

`docs/journal/template.md` を使用:
- 不要なセクションは削除OK
- 追加のセクションもOK
- 柔軟に運用

### コミットメッセージ

よく使うパターン:
```bash
# 新機能
feat: add <feature>

# 修正
fix: correct <issue>

# ドキュメント
docs: update <doc>

# リファクタリング
refactor: simplify <code>
```

## 自動化（将来）

- git hookでjournal雛形生成
- コミットメッセージからjournalへ自動転記
- journal未記入時の警告

現時点では手動運用でパターンを確立する。
