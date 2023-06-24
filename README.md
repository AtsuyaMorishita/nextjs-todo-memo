# Next.js×Firebase で TODO メモ アプリ制作

## 技術スタック

- Next.js
- TypeScript
- TailwindCSS
- Vercel
- Firebase
- PWA

## 主な機能

- 新規会員登録(Firebase Authentication)
- ログイン、ログアウト(Firebase Authentication)
- Todo の追加、チェックを入れる、チェックを外す、削除(Cloud Firestore)
- メモの追加、テキストの編集、削除(Cloud Firestore)
- PWA

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

## Todo

- メールでの会員登録バリデーション
- パスワード変更の機能
- OGP の設定

## 開発者

[Atsuya](https://github.com/AtsuyaMorishita)

## 公開 URL

https://nextjs-todo-memo.vercel.app/
