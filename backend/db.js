require('dotenv').config(); // Для импортирования переменных окружения
const { Pool } = require('pg'); // Нужен для подключения базы данных от PostgreSQL

// Объявление переменных из окружения (Environment variables)
const {
	POSTGRES_HOST, // Хост базы данных. Обычно localhost
	POSTGRES_DB_OS, // Название базы данных
	POSTGRES_USER, // Пользователь с полномочиями управления базами данных
	POSTGRES_PASSWORD // Пароль для пользователя
} = process.env;

// Создание нового пула
const pool = new Pool({ 
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: 5432, // Стандартный порт для Postgres
  database: POSTGRES_DB_OS
});

// Экспорт созданного пула
module.exports = {
  query: (text, params) => pool.query(text, params)
};
