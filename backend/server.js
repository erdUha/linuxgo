const express = require('express'); // Подключение Express.js
const session = require('express-session'); // Сессия express
const fs = require('fs');

const db = require('./db'); // Подключение базы данных
const bcrypt = require('bcrypt'); // Необходим для хеширования и сравнения паролей
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express(); // Создание бекенд приложения

require('dotenv').config(); // Для импортирования переменных окружения
const jwtKey = process.env.JWT_PRIVATE_KEY; // Импорт приватного ключа для создания и проверки JWT из переменной окружения

// Конфигурации приложения
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(__dirname + "/dist")) // Указание папки "dist" для static файлов

app.get("/preza", async (req, res) => {
	res.redirect('https://bestsiteever.com/');
});

// Функция хеширования паролей
const hashPassword = async (password, saltRounds = 14) => { // saltRounds должен быть не меньше 10 для защиты от брут-форса!
	try {
		const salt = await bcrypt.genSalt(saltRounds) // Генерация соли
		return await bcrypt.hash(password, salt); // Создание хеша (String)
	} catch (err) { // Поимка ошибок
		console.error(err);
	}
	return null;
}

// Функция сверки пароля и хеша
const comparePassword = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash); // Проверка (true/false)
  } catch (error) { // Поимка ошибок
    console.log(error);
  }
  return false;
}

// Функция проверки эл. почты
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email); // (true/false)
}

// Функция проверки имени пользователя
function isValidUsername(username) {
    return /^[0-9a-zA-Z_.-]+$/.test(username);
}

// Проверка JWT токена на валидность
app.get('/api/islogged', async (req, res) => {
	if (req.cookies['JWT']) {
		let credentials;
		try {
			credentials = jwt.verify(req.cookies['JWT'], jwtKey);
		} catch(err) {
			console.error(err);
		}
		try {
			const result = await db.query("SELECT * FROM users WHERE id = " + credentials.id);
			if (result.rows && result.rows[0].username === credentials.name) {
				res.send({
					isLogged: true,
					email: result.rows[0].email
				});
			} else {
				res.send({
					isLogged: false
				});
			}
		} catch (err) {
			//console.error(err);
			res.send({
				isLogged: false
			});
		}
	} else {
		res.send({
			isLogged: false
		});
	}
});

app.post('/api/setpfp', async (req, res) => {
	var body = Buffer.from([]);
	req.on('data', function (data) {
		body = Buffer.concat([body, data]);
		if (body.length > 1e7) {
			console.log("POSTED data too large!")
			req.connection.destroy();
		}
	});
	req.on('end', function () {
			var pathname = "test.png";
			fs.writeFileSync(pathname, body, {flag: "w"});
			res.writeHead(200, {
						'Content-Type': 'text/plain',
						'Access-Control-Allow-Origin' : '*',
						// note: I had to add these because of the OPTIONS request
						'Access-Control-Allow-Headers' : 'Content-Type',
						'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,OPTIONS'
			});
			res.end("got it")
	});
})

// Вход в аккаунт
app.post('/api/login', async (req, res) => {
	// Сбор информации из запроса
	const username = req.body.username;
	const password = req.body.password;
	const isEmail = isValidEmail(username);

	// Проверка на случай пустых полей
	if (username && password) {
		try {
			let hashedPassword;
			let query = "";
			if (isEmail) { // Выборка запроса в зависимости, если пользователь ввел эл. почту или имя пользователя
				query = "SELECT * FROM users WHERE email = '" + username  + "'";
			} else {
				query = "SELECT * FROM users WHERE username = '" + username  + "'";
			}
			const result = await db.query(query); // Произведение PostgeSQL запроса для проверки пароля
			// Проверка на наличие пользователя в базе данных
			if (result.rows[0]) {
				hashedPassword = result.rows[0].password; // Получение хешированного пароля для сверки
			} else {
				res.send({ // Пользователь не найден или не правильный пароль
					status: 404
				});
				return false;
			}
			;(async () => {
				const isValidPass = await comparePassword(password, hashedPassword); // Сравнение введенного пароля и хешированного
				// Проверка входа
				if (isValidPass) {
					// Выполнение входа
					const lastId = result.rows[0].id;
					let payload = { id: lastId, name: username };
					const token = await jwt.sign(payload, jwtKey);
					res.cookie('JWT', token, {
						expiresIn: '7d',
						httpOnly: true,
						sameSite: 'lax'
					});
					res.send({ // Все хорошо
						status: 200
					});
					//res.redirect('/');
				}	else {
					res.send({ // Пользователь не найден или не правильный пароль
						status: 404
					});
					return false;
				}
			})()
		} catch (err) { // Ошибка на стороне сервера
			res.send({ 
				status: 403
			});
			console.error(err);
			return false;
		}
	} else { // В случае пустых полей
		if (!username && !password) {
			res.send({ 
				status: 204,
				wrong: 'all'
			});
		}
		else if (!username) {
			res.send({ 
				status: 204,
				wrong: 'username'
			});
		} else if (!password) {
			res.send({ 
				status: 204,
				wrong: 'password'
			});
		}
		return false;
	}
});

// Регистрация
app.post('/api/signup', async (req, res) => { 
	// Сбор информации из запроса
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;

	// Проверка на случай пустых полей
	if (username && password) {
		// Проверка валидности эл. почты
		if (email) {
			if (!isValidEmail(email)) {
				res.send({
					status: 422,
					wrong: 'email'
				});
				return false;
			}
			if (!isValidUsername(username)) {
				res.send({
					status: 422,
					wrong: 'username'
				});
				return false;
			}
		}
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
					res.send({
						status: 409,
						wrong: 'email'
					});
					return false;
				}
				if (isUsernameAvailable.rows.length != 0) {
					res.send({
						status: 409,
						wrong: 'username'
					});
					return false;
				}
				// Произведение PostgeSQL запроса для внедрения информации о пользователе и получение его id
				const result = await db.query("INSERT INTO users (" + keys + ") VALUES(" + values + ") RETURNING id");
				const lastId = result.rows[0].id;
				let payload = { id: lastId, name: username };
				const token = await jwt.sign(payload, jwtKey);
				res.cookie('JWT', token, {
					expiresIn: '7d',
					httpOnly: true,
					sameSite: 'lax'
				});
				res.send({
					status: 200
				});
			} catch (err) { // Поимка ошибок и вывод в консоль
				res.send({
					status: 400
				});
				console.error(err);
				return false;
			}
		})()
	}
});

// Подключение веб приложения из папки "dist"
app.get('*', async (req, res) => { 
  res.sendFile(__dirname + "/dist/index.html");
});

const port = 3333;

app.listen(port, () => { // Прослушка запросов на localhost
  console.log('Express running on http://localhost:' + port);
});
