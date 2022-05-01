# Дипломный проект "Cloud.Хранилище"
Проект создан с использованием MongoDB, Express, React, NodeJS.
![Иллюстрация к проекту](https://i.imgur.com/Xg8vGkO.jpg)
## Скрипт для запуска
### Client
Для запуска проекта нужно перейти в директорию `cd client` и запустить команду: `npm start`.
### Server
После чего перейти в `cd server` и запустить команду `npm run dev`.
## Переменные окружения
#### /server/config/default.json
    "serverPort": Порт сервера,
    "mongoUrl": Адрес подключения к MongoDB,
    "secretKey": Секретное слово для кодирования JWT,
    "tokenExpiresIn": Время, спустя которое JWT обнуляется.
#### /client/.env
    "DB_URL": Адрес подключения к серверу



