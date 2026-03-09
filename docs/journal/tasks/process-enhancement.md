# タスク: プロセス最終調整

## 実施したタスク

### 完了
- 前タスク（docs-architecture-overhaul）の wip/ を archive/ へ移動
- roadmap.md に今回タスクを追記（作業開始時に更新する新ルールを実践）
- workflow docs 作成（business/spec/archi）
- `process.md` を更新：roadmap-first フロー、lessons.md 参照除去、journal/tasks・archive の読み込みを指示
- `docs/lessons.md` 削除
- `docs/index.md` を更新（lessons.md 除去、wip/ 一覧を最新化）

## 技術的決定事項

### TD-1: lessons.md の完全廃止
- **選択**: ファイルを削除し、process.md に「関連する journal/tasks と workflow/archive を読む」を追加
- **理由**: 中間ファイルは二重メンテナンスを生む。知識はその発生源（タスクログ・設計ドキュメント）に置くのが最もシンプル
- **効果**: 読むべき情報が常に「今やっているタスクと関連するもの」に絞られる

### TD-2: roadmap-first ルール
- **選択**: Before Starting の step 1 に「roadmap.md にタスクを書き出す」を追加
- **理由**: roadmap が「完了履歴」ではなく「現在の作業状態」を反映するようになる。作業の意図が明文化される

## GCされなかった思考（journal ではなくタスクログなのでここに書く）

lessons.md を消すのは単純に見えて、「失敗を記録する場所がなくなる」という不安がある。
でも実際は「タスクログに書く」というだけで、場所がなくなったわけじゃない。
むしろ「失敗はそれが起きたコンテキストと一緒に保存される」ほうが、後から読んだときに意味がある。

## 次のアクション

- Phase 5.5 完了 → Phase 6（リリース準備）へ
