## Установка

1.Указать параметры в конфиге.

```sh
./config/db.config.js

{
    host: "localhost",
    user: "root",
    password: "zx123456",
    multipleStatements: true
}
```
2. Создать базу,таблицы и заполнить их командой:
```sh
    node fill_db
```
3. Пользоваться.


## Примеры запросов


```sh
HTTP status = 4..
{
    "code": "BadRequestError",
    "message": "Validation error"
}
```

## Query запросы
