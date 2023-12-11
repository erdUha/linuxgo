
const express = require('express'); // Подключение Express.js
const router = express.Router(); // Подключение роутера

const pg = require('pg'); // Подключение модуля pg, для подключения базы данных от PostgreSQL
const db = require('./db'); //

const app = express(); // Создание бекенд приложения

module.exports = router;

app.use(express.static(__dirname + "/dist")) // Указание папки "dist" для static файлов

app.get('*', async (req, res) => { // Подключение веб приложения из папки "dist"
  res.sendFile(__dirname + "/dist/index.html");
});

//app.get('/', async (req, res) => {
//  try {
//    const result = await db.query('SELECT * FROM person');
//    res.json(result.rows);
//  } catch (err) {
//    console.error(err);
//    res.status(500).send('Internal Server Error');
//  }
//});

app.listen(3333, () => { // Прослушка запросов на localhost c портом 3333
  console.log('Express intro running on http://localhost:3333');
});
