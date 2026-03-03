# ドキュメント構造再設計の実装（How）

## 実装手順

### Phase 1: フォルダ構造作成

```bash
# docs/ 直下に backlog/roadmap 作成（移動先）
mkdir -p docs/backlog docs/roadmap

# workflow/ 配下に wip/adr/archive 作成
mkdir -p docs/workflow/business/{wip,adr,archive}
mkdir -p docs/workflow/spec/{wip,adr,archive}
mkdir -p docs/workflow/archi/{wip,adr,archive}
```

### Phase 2: backlog/roadmap 移動

```bash
# backlog 移動
mv docs/workflow/backlog/* docs/backlog/

# roadmap 移動
mv docs/workflow/roadmap/* docs/roadmap/

# 空ディレクトリ削除
rmdir docs/workflow/backlog
rmdir docs/workflow/roadmap
```

### Phase 3: business/spec/archi の再構成

```bash
# business
mv docs/workflow/business/*.md docs/workflow/business/wip/

# spec
mv docs/workflow/spec/*.md docs/workflow/spec/wip/

# archi
mv docs/workflow/archi/*.md docs/workflow/archi/wip/
```

### Phase 4: Status 行削除

すべての wip/ 配下のファイルから `**Status**: wip` 行を削除:

```bash
# 一括削除（Git Bash/Linux）
find docs/workflow/*/wip/ -name "*.md" -exec sed -i '/^\*\*Status\*\*:/d' {} \;
```

または手動で各ファイルを編集。

### Phase 5: ドキュメント更新

#### docs/index.md
```markdown
# Before
- `docs/workflow/backlog/`
- `docs/workflow/roadmap/`

# After
- `docs/backlog/`
- `docs/roadmap/`
```

#### docs/workflow/index.md
新しい構造を反映:
```markdown
## ディレクトリ構成

### research/
調査結果

### business/
- wip/: 作成中
- adr/: 確定版
- archive/: 旧版

### spec/
(同上)

### archi/
(同上)
```

#### rules/workflow-guide.md
```markdown
## Lifecycle

Files are organized by status in subdirectories:
- `wip/`: Work in progress, draft
- `adr/`: Architecture Decision Record, finalized
- `archive/`: Obsolete, kept for reference

## File Organization

```
docs/workflow/
  business/
    wip/        # Draft business requirements
    adr/        # Confirmed requirements
    archive/    # Historical versions
```
```

### Phase 6: .gitkeep 配置

空のadr/archive/フォルダに .gitkeep:
```bash
touch docs/workflow/business/adr/.gitkeep
touch docs/workflow/business/archive/.gitkeep
touch docs/workflow/spec/adr/.gitkeep
touch docs/workflow/spec/archive/.gitkeep
touch docs/workflow/archi/adr/.gitkeep
touch docs/workflow/archi/archive/.gitkeep
```

## コミット戦略

### コミット1: フォルダ構造作成
```
refactor: create wip/adr/archive structure

Prepare status-based folder organization.
```

### コミット2: backlog/roadmap 移動
```
refactor: move backlog and roadmap to docs root

Separate policy-level docs from workflow implementation.
```

### コミット3: workflow ファイル再配置
```
refactor: organize workflow files by status

Move all files to wip/ subdirectories.
Remove inline Status headers.
```

### コミット4: ドキュメント更新
```
docs: update structure documentation

Reflect new folder organization in index and guides.
```

## 検証

```bash
# 構造確認
tree docs/ -L 3

# 期待される出力
docs/
├── backlog/
├── roadmap/
├── journal/
├── rules/
└── workflow/
    ├── research/
    ├── business/
    │   ├── wip/
    │   ├── adr/
    │   └── archive/
    ├── spec/
    │   ├── wip/
    │   ├── adr/
    │   └── archive/
    └── archi/
        ├── wip/
        ├── adr/
        └── archive/
```

## 注意事項

- 既存の git 履歴は保持される（`git mv` 使用）
- Status 行削除は慎重に（wip以外のファイルは触らない）
- index.md 等のリンク切れに注意
