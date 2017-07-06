# Modelに関するメモ

## ユーザー関連のModel

### `user`

ユーザーの基本データ

#### `user.get( userId )`

ユーザーの基本データを取得する。ユーザーが存在しない場合には`null`を返す。

#### `user.update( options )`

ユーザーの基本データを変更する（`upsert`）。

#### `user.delete( userId )`

ユーザーを削除する。データベース上ではデータを非アクティブにするフラグを立てる。

### `auth`

ユーザーを認証する。

