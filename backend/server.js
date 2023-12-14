const express = require('express'); // Подключение Express.js
const session = require('express-session');
const router = express.Router(); // Подключение роутера

const pg = require('pg'); // Подключение модуля pg, для подключения базы данных от PostgreSQL
const db = require('./db'); //

const bcrypt = require('bcrypt');

const app = express(); // Создание бекенд приложения

module.exports = router;

// Функция хеширования паролей
const hashPassword = async (password, saltRounds = 12) => {
	try {
		// Генерация соли
		const salt = await bcrypt.genSalt(saltRounds);
		// Создание хеша
		return await bcrypt.hash(password, salt);
	} catch (err) { // Поимка ошибок
		console.error(err);
	}
	return null;
}

// Функция проверки пароля
const comparePassword = async (password, hash) => {
  try {
    // Проверка
    return await bcrypt.compare(password, hash)
  } catch (error) { // Поимка ошибок
    console.log(error)
  }
  return false
}

// Функция проверки эл. почты
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

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

app.get('/signup', async (req, res) => { // Подключение веб приложения из папки "dist"
  res.sendFile(__dirname + "/regestration/regestration.html");
});


app.post('/auth', async (req, res) => { // Авторизация
	// Сбор информации из запроса
	let username = req.body.username;
	let password = req.body.password;
	let isEmail = isValidEmail(username);
	// Проверка на случай пустых полей
	if (username && password) {
		try {
			// Произведение PostgeSQL запроса
			let hashedPassword;
			let query = "";
			if (isEmail) {
				query = "SELECT password FROM users WHERE email = '" + username  + "'";
			} else {
				query = "SELECT password FROM users WHERE username = '" + username  + "'";
			}
			const response = await db.query(query);
			hashedPassword = response.rows[0].password;
			if (hashedPassword.length != 0) { // Проверка на наличие пользователя 
				;(async () => {
					const isValidPass = await comparePassword(password, hashedPassword);
					if (isValidPass) {
						res.send("Вход произведен успешно!");
					}	else {
						res.send("Неправильный пароль");
					}
				})()
			} else { // Иначе
				res.send("Неправильное эл. почта или имя пользователя!");
			}
		} catch (err) { // Поимка ошибок и вывод в консоль
			console.error(err);
			console.error("THIS WAS ERROR");
		}
	}
});

app.post('/regestration', async (req, res) => { // Регистрация
	// Сбор информации из запроса
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;

	// Проверка на случай пустых полей
	if (username && password) {
		// Проверка эл. почты
		;(async () => {
			const hashedPassword = await hashPassword(password);
			let keys = "";
			let values = "";
			if (email) {
				keys = "username, password, email";
				values = "'" + username + "', '" + hashedPassword + "', '" + email + "'"; 
			} else {
				keys = "username, password";
				values = "'" + username + "', '" + hashedPassword + "'"; 
			}
			try {
				const isEmailAvailable = await db.query("SELECT * FROM users WHERE email = '" + email + "'");
				const isUsernameAvailable = await db.query("SELECT * FROM users WHERE username = '" + username + "'");
				if (isEmailAvailable.rows.length != 0) {
					res.send("Эл. почта уже занята, попробуйте войти в аккаунт");
					return false;
				}
				if (isUsernameAvailable.rows.length != 0) {
					res.send("Имя пользователя уже занято");
					return false;
				}
				// Произведение PostgeSQL запроса для внедрения информации о пользователе
				await db.query("INSERT INTO users(" + keys + ") VALUES(" + values + ")");
				res.redirect('/');
			} catch (err) { // Поимка ошибок и вывод в консоль
				console.error(err);
				console.error("THIS WAS ERROR");
			}
		})()
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
