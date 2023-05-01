# Next.js×Firebase で TODO メモ アプリ制作

## アーキテクチャ図

## 機能

- 新規会員登録(Firebase Authentication)
- ログイン、ログアウト(Firebase Authentication)
- Todo の追加、チェックを入れる、チェックを外す、削除(Cloud Firestore)
- メモの追加、テキストの編集、削除(Cloud Firestore)
- PWA 対応

## Cloud Firestore DB

### 共通

<table>
<tr align="center">
  <th>データモデル</th>
  <th>データ名</th>
  <th>タイプ</th>
</tr>
<tr>
<tr align="center">
  <th>collection</th>
  <td>user</td>
  <td>-</td>
</tr>
<tr align="center">
  <th>document</th>
  <td>自動ID</td>
  <td>-</td>
</tr>
<tr align="center">
  <th rowspan="2">collection</th>
  <td>todo</td>
  <td>-</td>
</tr>
<tr align="center">
  <td>memo</td>
  <td>-</td>
</tr>
</table>

### 「todo」の collection 以降

<table>
<tr align="center">
  <th>document</th>
  <td>自動ID</td>
  <td>-</td>
</tr>
<tr>
  <tr align="center">
  <th rowspan="5">data</th>
  <td>id</td>
  <td>string</td>
</tr>
<tr align="center">
  <td>timestamp</td>
  <td>timestamp</td>
</tr>
<tr  align="center">
  <td>todo</td>
  <td>string</td>
</tr>
<tr  align="center">
  <td>isChecked</td>
  <td>boolean</td>
</tr>
<tr  align="center">
  <td>isComplete</td>
  <td>boolean</td>
</tr>
</table>

### 「memo」の collection 以降

<table>
<tr align="center">
  <th>document</th>
  <td>自動ID</td>
  <td>-</td>
</tr>

<tr>
  <tr align="center">
  <th rowspan="4">data</th>
  <td>id</td>
  <td>string</td>
</tr>
<tr align="center">
  <td>timestamp</td>
  <td>timestamp</td>
</tr>
<tr  align="center">
  <td>memoTitle</td>
  <td>string</td>
</tr>
<tr  align="center">
  <td>memoContent</td>
  <td>string</td>
</tr>
</table>

## やりたい事・修正点

- pc 含め UI の最終調整
- パスワード制限 4 文字以上を入れる
- パスワード忘れた人用の機能
- ローディング中は gif ローディングを入れる
- タスク入力箇所の範囲が少し狭い
- チェック済みタスクの削除が遅い
- アカウント削除の処理
- ゲスト用のログインを用意する
- ログイン時のタイムラグ
- DB 保存のタイミングをさらに改善

## 開発者

[Atsuya](https://github.com/AtsuyaMorishita)

## 公開 URL

https://nextjs-todo-memo.vercel.app/
