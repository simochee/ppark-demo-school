# Modelに関するメモ

## `user`

ユーザーの基本データ

### `user.get( userId )`

ユーザーの基本データを取得する。ユーザーが存在しない場合には`null`を返す。

### `user.update( options )`

ユーザーの基本データを変更する（`upsert`）。

### `user.delete( userId )`

ユーザーを削除する。データベース上ではデータを非アクティブにするフラグを立てる。

---

## `auth( userId )`

ユーザーを認証する。

---

## `parking`

駐車場のデータを取得・操作する

### `parking.getAll()`

すべての駐車場のデータを配列で取得する

### `parking.entry( userId, stallId )`

指定された駐車マスにユーザーを入庫する

---

## `stall`

駐車マスのデータを取得・操作する

### `stall.getAll()`

すべての駐車マスのデータを配列で取得する

### `stall.get( stallId )`

単一の駐車マスのデータを取得する