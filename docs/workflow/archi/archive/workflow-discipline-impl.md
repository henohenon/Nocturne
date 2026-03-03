# ワークフロー規律の実装設計（How）


## 実装方針

段階的にワークフロー文書を作成し、最後にガイドをまとめる。

## 実装順序

### Phase 1: 既存ルールのワークフロー文書作成（遡及）

#### 1-1. 言語ポリシー関連
```
docs/workflow/business/language-policy-why.md
docs/workflow/spec/language-policy-spec.md
docs/workflow/archi/language-policy-impl.md
```

**内容**:
- Why: ハイブリッドアプローチを選んだ理由
- What: 英語/日本語の使い分け仕様
- How: 実際の運用方法


#### 1-2. コミット・journal関連
```
docs/workflow/business/commit-journal-why.md
docs/workflow/spec/commit-journal-spec.md
docs/workflow/archi/commit-journal-impl.md
```

**内容**:
- Why: 記録の必要性
- What: 何を記録するか
- How: フォーマットとテンプレート


### Phase 2: ワークフローガイド作成

```
docs/rules/workflow-guide.md
```

**内容**（英語・簡潔）:
- Workflow steps: backlog → business → spec → archi → impl
- When to use: Rule changes, new features
- When to skip: Trivial fixes, typos
- Lifecycle: wip → adr → archive

**制約**: 50行以内

### Phase 3: テンプレート整備

```
docs/workflow/business/template.md
docs/workflow/spec/template.md
docs/workflow/archi/template.md
```

**内容**:
- 各段階で記述すべき項目
- Status管理
- リンク構造

## ファイル構成

```
docs/
  workflow/
    business/
      template.md
      language-policy-why.md (wip)
      commit-journal-why.md (wip)
      workflow-discipline-why.md (wip) ← 今回作成中
    spec/
      template.md
      language-policy-spec.md (wip)
      commit-journal-spec.md (wip)
      workflow-discipline-spec.md (wip) ← 今回作成中
    archi/
      template.md
      language-policy-impl.md (wip)
      commit-journal-impl.md (wip)
      workflow-discipline-impl.md (wip) ← 今回作成中
  rules/
    workflow-guide.md (英語・簡潔)
```

## Status管理

### wip (Work In Progress)
- 作成中・検討中のドキュメント
- 自由に編集可能
- ファイルヘッダーに `**Status**: wip` を記載

### adr (Architecture Decision Record)
- 確定した意思決定
- 変更には慎重な検討が必要
- ファイルヘッダーに `**Status**: adr` を記載

### archive
- 古くなった・不要になったドキュメント
- 参考用に保持
- ファイル名に `-archive` suffix を追加

## コミット戦略

### コミット1: ワークフロー文書作成
```
feat: add workflow docs for existing rules

Create business/spec/archi docs for:
- Language policy
- Commit/journal rules
- Workflow discipline (self-referential)

All docs start with wip status.
```

### コミット2: ワークフローガイド作成
```
feat: add workflow guide for discipline

Create minimal workflow guide in rules/.
English, concise, <50 lines.
```

### コミット3: テンプレート整備
```
feat: add workflow templates

Templates for business/spec/archi stages.
```

## 実装上の注意

- **トークン効率**: rules/は英語・最小限、workflow/は日本語・詳細OK
- **自己参照**: 今回のタスク自体もworkflow/business/spec/archiで文書化
- **一貫性**: 既存の3ファイル（journal, commit-message, language-policy）と整合
