# タスク: docs 構造オーバーホール

## 実施したタスク

### 完了
- `settings.json` に permissions 追加（Edit, Write, Read, Glob, Grep, Bash(git *) を auto-approve）
- `docs/roadmap/index.md` → `docs/roadmap.md` にリネーム（空ディレクトリ削除）
- 完了済み wip/ docs 11ファイルを archive/ へ移動
- `docs/lessons.md` を軽量ポインターインデックスに書き直し
- `docs/index.md` を実ファイル一覧のナビゲーションハブに更新
- `process.md` を docs-first 読み込みアプローチに更新（lessons.md 個別読み込み廃止）
- `CLAUDE.md` の参照を更新

## 技術的決定事項

### TD-1: failure prevention の分散化
- **旧**: lessons.md に全失敗を集積 → 肥大化・精度低下
- **新**: lessons.md は短いポインターインデックス。詳細は journal/tasks/ に残る
- **読み込み方式**: docs/index.md で全体把握 → 関連ドキュメントを選択的に読む

### TD-2: settings.json の権限スコープ
- file ops (Edit/Write/Read/Glob/Grep) と git ops を auto-approve
- push 等の destructive ops は含めない（ユーザー確認が残る）

### TD-3: wip/ の完全クリーンアップ
- Phase 1–5 の全 wip/ を archive/ へ
- 以後: タスク完了時に wip → archive を義務化（process.md に明記）

## 学んだこと・気づき

- wip/ の放置は無秩序に見えるだけでなく、AI が「これは今作業中」と誤読するリスクがある
- docs/index.md が実ファイル一覧になることで、AI は全体像を1ファイルで把握できる

## 次のアクション

- Phase 6（リリース準備）へ
