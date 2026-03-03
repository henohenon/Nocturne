# ドキュメント構造再設計の仕様（What）

## 何を変更するか

### 変更1: backlog/roadmap を docs/ 直下に移動

#### Before
```
docs/
  workflow/
    backlog/
    roadmap/
    research/
    business/
    spec/
    archi/
```

#### After
```
docs/
  backlog/          # 移動
  roadmap/          # 移動
  workflow/
    research/
    business/
    spec/
    archi/
```

### 変更2: ステータスをフォルダで管理

#### Before
```
workflow/
  business/
    language-policy-why.md        # ファイル内に Status: wip
    commit-journal-why.md         # ファイル内に Status: wip
```

#### After
```
workflow/
  business/
    wip/
      language-policy-why.md      # フォルダで状態管理
      commit-journal-why.md
    adr/
      (確定版が入る)
    archive/
      (旧版が入る)
```

同様に spec/, archi/ も階層化。

## 新しいディレクトリ構造

```
docs/
  backlog/                    # 大きな方針・アイデア
  roadmap/                    # 計画・フェーズ管理
  journal/                    # 日次ログ
  rules/                      # AI向けルール（英語・簡潔）
  workflow/
    research/                 # 調査結果
    business/
      wip/                    # 作成中
      adr/                    # 確定版
      archive/                # 旧版
    spec/
      wip/
      adr/
      archive/
    archi/
      wip/
      adr/
      archive/
```

## 移行対象ファイル

### backlog/roadmap 移動
- `docs/workflow/backlog/*` → `docs/backlog/*`
- `docs/workflow/roadmap/*` → `docs/roadmap/*`

### business/ の再構成
- 既存9ファイルを `business/wip/` に移動
- `business/template.md` は削除または wip/ に移動

### spec/ の再構成
- 既存9ファイルを `spec/wip/` に移動

### archi/ の再構成
- 既存9ファイルを `archi/wip/` に移動

## 更新対象

### index.md 系
- `docs/index.md` - backlog/roadmap のパス更新
- `docs/workflow/index.md` - 構造説明を更新

### rules/workflow-guide.md
- フォルダ構造の説明を更新
- wip/adr/archive の説明を追加

## 削除対象

### Status 記述
すべての wip ファイルから `**Status**: wip` 行を削除。
フォルダ位置で状態を表現するため。

## 受け入れ基準

- [ ] backlog/, roadmap/ が docs/ 直下にある
- [ ] workflow/business/wip/ にファイルがある
- [ ] workflow/spec/wip/ にファイルがある
- [ ] workflow/archi/wip/ にファイルがある
- [ ] すべてのファイルから Status 行が削除されている
- [ ] docs/index.md のパスが更新されている
- [ ] rules/workflow-guide.md が更新されている
