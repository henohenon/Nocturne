# 言語ポリシーの仕様（What）


## 言語の使い分け

### 日本語を使う場所
- `docs/` 配下のドキュメント
- journal (日次作業ログ)
- backlog, roadmap (タスク管理)
- business, spec, archi (ワークフロー文書)
- README.md の詳細説明部分

### 英語を使う場所
- コミットメッセージ
- コード (変数名、関数名、クラス名)
- コメント (インラインコメント、JSDoc等)
- `rules/` 配下 (AI読み込み効率のため)
- `docs/ai-root.md`

## 命名規則（英語）

- **camelCase**: 変数、関数
- **PascalCase**: クラス、型、インターフェース
- **kebab-case**: ファイル名
- **UPPER_SNAKE_CASE**: 定数

## 例外・特記事項

- README.mdのプロジェクト概要は英語も併記推奨（OSS化の可能性）
- 技術用語は英語のまま使用OK（例: backlog, commit, refactor）
- 固有名詞は原語のまま（例: Claude Code, JetBrains）
