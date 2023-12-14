const express = require('express'); // Подключение Express.js
const session = require('express-session');
const router = express.Router(); // Подключение роутера

const pg = require('pg'); // Подключение модуля pg, для подключения базы данных от PostgreSQL
const db = require('./db'); //

const app = express(); // Создание бекенд приложения

module.exports = router;

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/dist")) // Указание папки "dist" для static файлов

app.get('/login', async (req, res) => { // Подключение веб приложения из папки "dist"
  res.sendFile(__dirname + "/login/index.html");
});


app.post('/auth', async (req, res) => { // Авторизация
	// Сбор информации из запроса
	let username = req.body.username;
	let password = req.body.password;
	// Проверка на случай пустых полей
	if (username && password) {
		try {
			// Произведение PostgeSQL запроса
			const result = await db.query("SELECT * FROM users WHERE username = '" + username  + "' AND password = '" + password + "'");
			if (result.rows.length != 0) { // Проверка на успешный вход
				res.send("You good to go!");
			} else { // Иначе
				res.send("KILL YOURSELF!");
			}
		} catch (err) { // Поимка ошибок и вывод в консоль
			console.error(err);
			console.error("THIS WAS ERROR");
		}
	}
});

// Подключение веб приложения из папки "dist"
app.get('*', async (req, res) => { 
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

const port = 3333;

app.listen(port, () => { // Прослушка запросов на localhost
  console.log('Express intro running on http://localhost:' + port);
});
