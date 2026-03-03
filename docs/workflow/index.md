# Workflow

具体的な実装作業を深掘りするディレクトリ。
business (Why) → spec (What) → archi (How) の流れで設計を文書化します。

## ディレクトリ構成

### research/
調査・リサーチドキュメント。
技術調査や市場調査を行った結果を記録します。

### business/
Why（ビジネス要件）を記述。
なぜこの機能や変更が必要なのか、ビジネス的な背景や目的を文書化します。

- **wip/**: 作成中・検討中
- **adr/**: 決定事項として確定
- **archive/**: 古くなった・不要になった文書

### spec/
What（仕様）を記述。
何を実装するのか、機能の詳細な仕様を文書化します。

- **wip/**: 作成中・検討中
- **adr/**: 決定事項として確定
- **archive/**: 古くなった・不要になった文書

### archi/
How（アーキテクチャ）を記述。
どのように実装するのか、技術的なアーキテクチャや設計を文書化します。

- **wip/**: 作成中・検討中
- **adr/**: 決定事項として確定
- **archive/**: 古くなった・不要になった文書

## ワークフロー

1. **調査**: `research/` で技術調査
2. **Why**: `business/wip/` でビジネス要件を明確化
3. **What**: `spec/wip/` で仕様を定義
4. **How**: `archi/wip/` でアーキテクチャを設計
5. **実装**: ドキュメントを基に実装
6. **確定**: wip → adr に移動

## ライフサイクル

ドキュメントはフォルダ位置で状態を表現：

- **wip/** (Work In Progress): 作成中・検討中、自由に編集可能
- **adr/** (Architecture Decision Record): 決定事項として確定、変更には慎重な検討が必要
- **archive/** Obsolete: 古くなったまたは不要になった文書、参考用に保持

### 状態遷移

```bash
# wip → adr への移行
mv business/wip/xxx.md business/adr/xxx.md

# adr → archive への移行
mv business/adr/xxx.md business/archive/xxx-archive.md
```
