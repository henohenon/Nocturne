# ワークフロー規律の仕様（What）


## 何を作るか

ワークフローを確実に実践するための仕組みとドキュメント。

## 成果物

### 1. ワークフローガイド（`rules/workflow-guide.md`）

**内容**:
- backlog → business → spec → archi → 実装 の流れ
- 各段階で何をするか
- いつワークフローを使うか/スキップするか
- ライフサイクル（wip → adr → archive）の運用

**対象読者**: AI、未来の自分

**トークン制約**: 最小限（50行以内目標）

### 2. 既存ルールのワークフロー文書（遡及作成）

Phase 1で作成した3つのルールについて、後付けでワークフロー文書を作成：

#### 言語ポリシー
- `business/language-policy-why.md` - なぜハイブリッドか
- `spec/language-policy-spec.md` - 何を英語/日本語にするか
- `archi/language-policy-impl.md` - どう運用するか

#### コミット・journalルール
- `business/commit-journal-why.md` - なぜ記録が必要か
- `spec/commit-journal-spec.md` - 何を記録するか
- `archi/commit-journal-impl.md` - どう記録するか

### 3. テンプレート更新

既存テンプレートにワークフローの説明を追加：
- `workflow/business/template.md`
- `workflow/spec/template.md`
- `workflow/archi/template.md`

## スコープ

### 含む
- ワークフロー使用ガイドの作成
- 既存3ルールのワークフロー文書（遡及）
- テンプレートの整備

### 含まない（将来課題）
- 自動化（git hook等）
- ワークフロー遵守のチェッカー
- 詳細なガイドライン（最小限に留める）

## 受け入れ基準

- [ ] `rules/workflow-guide.md` が作成され、50行以内に収まっている
- [ ] business/spec/archiに最低6つの文書がある（2ルール × 3段階）
- [ ] 各文書がwipステータスで作成されている
- [ ] テンプレートが整備されている
- [ ] Phase 0 Task 1 が完了できる

## 非機能要件

- **トークン効率**: rulesは英語・簡潔
- **可読性**: business/spec/archiは日本語・詳細OK
- **実用性**: 実際に使えるガイド
