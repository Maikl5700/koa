## Установка
1. [Redis for Windows](https://github.com/microsoftarchive/redis/releases/download/win-3.0.504/Redis-x64-3.0.504.zip)
2. [MySQL](https://dev.mysql.com/downloads/installer/)
3. npm install

## Настройка

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
3. Создать базу,таблицы и заполнить их командой:
```sh
    node server
```

## Примеры запросов

#### Запись данных

Может принимать объект или массив обектов с полями таблицы
```sh
HTTP method = POST
ctx.request.body
[{
    key1: 'val1'
 },
 {
    key2: 'val2'
}]
```
#### Обновление данных

Принимает объект с полями которые изменяем в таблице. Поле where 
принимаeт объект или массив обектов условий объединеных AND
```sh
HTTP method = PUT
ctx.request.body
{
  update: {
    description: 'new description'
  },
  where: [{ title: 'Nobis explicabo ad.' }, { date: '1972-02-05' }]
}
```
#### Получение данных
В папке проекта есть index.html c примерами запросов
```sh
HTTP method = GET
qs.parse(ctx.request.querystring)
{
   attrs: ['id','name'],
   where: [{ date: '1980-06-14' }, { id: 7154 }, { title: "Vero cumque laboriosam." }],
   order: 'author_id',
   reverseOrder: true,
   limit: 12,
   offset: 1000
}
```


