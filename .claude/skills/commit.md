# Skill: commit

変更内容をコミットする。

## 手順

1. `git status` と `git diff` で変更内容を確認する
2. 変更の論理的なまとまりを把握する
3. `.claude/rules/commits.md` に従ってコミットメッセージを作成する
4. 関連ファイルをステージングしてコミットする

## コミットメッセージ形式

```
<type>: <subject in English, imperative, lowercase, <50 chars>
```

## 注意

- 1コミット = 1つの論理的変更
- 機密ファイル（.env等）は絶対にコミットしない
- ユーザーに確認なしでpushしない
