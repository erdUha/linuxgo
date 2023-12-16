const express = require('express'); // Подключение Express.js
const session = require('express-session'); // Сессия express
const router = express.Router(); // Подключение роутера

const db = require('./db'); // Подключение базы данных

const bcrypt = require('bcrypt'); // Необходим для хеширования и сравнения паролей

const app = express(); // Создание бекенд приложения
app.set('view engine', 'pug'); // Присвоение шаблонизатора "pug" приложению. Стандартная папка для шаблонов "./views"

// Конфигурации сессии
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/dist")) // Указание папки "dist" для static файлов
app.use(express.static(__dirname + "/static")) // Указание папки "static" для static файлов


module.exports = router;

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
    return await bcrypt.compare(password, hash) // Проверка (true/false)
  } catch (error) { // Поимка ошибок
    console.log(error)
  }
  return false
}

// Функция проверки эл. почты
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email); // (true/false)
}

app.get('/login', async (req, res) => { // Вывод на экран страницы входа
	res.render('login');
});

app.get('/signup', async (req, res) => { // Вывод на экран страницы регистрации
	res.render('signup');
});


app.post('/login', async (req, res) => { // Авторизация
	// Сбор информации из запроса
	let username = req.body.username;
	let password = req.body.password;
	let isEmail = isValidEmail(username);

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
			const response = await db.query(query); // Произведение PostgeSQL запроса для проверки пароля
			// Проверка на наличие пользователя в базе данных
			if (response.rows[0]) {
				hashedPassword = response.rows[0].password; // Получение хешированного пароля для сверки
			} else {
				res.render('login', { error: "Неправильное имя пользователя или пароль" });
				return false;
			}
			;(async () => {
				const isValidPass = await comparePassword(password, hashedPassword); // Сравнение введенного пароля и хешированного
				// Проверка входа
				if (isValidPass) {
					res.redirect('/');
				}	else {
					res.render('login', { error: "Неправильное имя пользователя или пароль" });
				}
			})()
		} catch (err) { // Поимка ошибок и вывод в консоль
			res.render('login', { error: "Ошибка, пропробуйте позже" });
			console.error(err);
			return false;
		}
	} else {
		res.render('login', { message: "Пожалуйса, заполните поля" });
	}
});

app.post('/signup', async (req, res) => { // Регистрация
	// Сбор информации из запроса
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email;

	// Проверка на случай пустых полей
	if (username && password) {
		// Проверка валидности эл. почты
		if (email) {
			if (!isValidEmail(email)) {
				res.render("signup", { message: "Пожалуйста, введите правильную Эл. почту" });
				return false;
			} else {
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
					res.render("signup", { error: "Эл. почта уже занята, попробуйте войти в аккаунт" });
					return false;
				}
				if (isUsernameAvailable.rows.length != 0) {
					res.render("signup", { error: "Имя пользователя уже занято" });
					return false;
				}
				// Произведение PostgeSQL запроса для внедрения информации о пользователе
				await db.query("INSERT INTO users(" + keys + ") VALUES(" + values + ")");
				res.redirect('/');
			} catch (err) { // Поимка ошибок и вывод в консоль
				res.render('signup', { error: "Ошибка, пропробуйте позже" });
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
