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


## Примеры запросов

#### Запись данных

Может принимать объект или массив обектов с полями таблицы
```sh
// HTTP method = POST
// body
[{
    key1: 'val1'
 },
 {
    key2: 'val2'
}]
```

## Query запросы
