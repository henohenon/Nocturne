# Roadmap

backlog.mdから実施が決定したタスクの優先順位と実施計画。


## 実施予定フェーズ

### Phase 1: AI Discipline Enforcement
**元backlog項目**: "backlogを二度と編集しないようにさせたい" + "一度行ったミスを二度と行わないような仕組みづくり"

**目的**: AIが確実にルールを守り、過去のミスを繰り返さない仕組みを確立

**タスク**:
1. AI behavior validation
   - .aiassistant/rules/index.mdの強化
   - backlog.md編集防止の検証
   - docs/rules読み込みの確実化
2. Error prevention system
   - 過去のミス（journal記載）を分析
   - 防止策をrulesまたはworkflowに組み込み
   - チェックリストの自動化検討

**完了条件**:
- AIがbacklog.mdを編集しようとしない
- AIが必ずdocs/rulesを最初に読む
- 過去のミス（Phase 0/1で発生したもの）の再発防止策が文書化されている

---

### Phase 2: Coding Standards
**元backlog項目**: "コーディング規則の整備"

**目的**: コード品質と一貫性を保つルールを確立

**タスク**:
1. File structure rules
   - ファイル分割基準
   - ディレクトリ構造ルール
   - 命名規則
2. Design principles
   - SOLID原則の適用ガイド
   - リファクタリング原則
   - コードスメル検知基準

**成果物**: `docs/rules/coding-standards.md`

---

### Phase 3: Journal Format Refinement
**元backlog項目**: "ジャーナル形式再定義"

**目的**: journal運用を実践的に改善

**タスク**:
1. 現在のjournal/template.mdの評価
2. 実際の運用（2026-03-03.md）から改善点抽出
3. テンプレート更新
4. journal-writing.mdルールの調整

**完了条件**:
- journalテンプレートが実用的
- 記載すべき情報が明確
- 記載負荷が適切

---

## 実施順序

1. **Phase 1** (最優先) - AI規律確立により、以降の作業品質を担保
2. **Phase 2** - コーディング規則（実装開始時に必要）
3. **Phase 3** - journal改善（継続的改善として並行可能）

## 進捗管理

- 各フェーズの詳細は別ファイル化しない（トークン削減のため）
- 進捗はこのファイルのチェックボックスで管理
- 完了したフェーズは ✅ マーク + "完了済みフェーズ"セクションに移動

## Next Actions

現在の推奨: **Phase 1開始** - AI規律確立から着手
