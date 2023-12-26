<script setup>
import Swal from 'sweetalert2/dist/sweetalert2.js'
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2800,
  timerProgressBar: true,
})
async function register() {
	const email = document.getElementById('email-field')
	const username = document.getElementById('username-field')
	const password = document.getElementById('password-field')
	const passwordRepeat = document.getElementById('password-repeat-field')
	const button = document.getElementById('submit-register')
	const loader = document.getElementById('loader-register')
	let statusCode = 400
	let wrong = ''
	if (username.value && password.value && passwordRepeat.value == password.value) {
		button.disabled = true
		button.classList.add('is-loading');
		loader.classList.add('is-loading');
		let body = {}
		if (email.value) {
			body = JSON.stringify({
				'email': email.value,
				'username': username.value,
				'password': password.value,
			})
		} else {
			body = JSON.stringify({
				'username': username.value,
				'password': password.value,
			})
		}
		const res = await fetch('/api/signup', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: body
		}).then((response) => response.json())
			.then((json) => {
				statusCode = json.status
				if (json.wrong) {
					wrong = json.wrong
				}
			})
			.catch((err) => {
				console.error(err)
			})
		button.disabled = false
		button.classList.remove('is-loading');
		loader.classList.remove('is-loading');
	} else {
		statusCode = 204
		if (!username.value && !password.value) {
			username.classList.add('wrong')
			password.classList.add('wrong')
			Toast.fire({
				title: 'Пожалуйста, заполните поля',
				icon: 'error',
			})
		} else if (!username.value) {
			username.classList.add('wrong')
			Toast.fire({
				title: 'Пожалуйста, заполните поле',
				icon: 'error',
			})
		} else if (!password.value) {
			password.classList.add('wrong')
			Toast.fire({
				title: 'Пожалуйста, заполните поле',
				icon: 'error',
			})
		} else if (!passwordRepeat.value) {
			passwordRepeat.classList.add('wrong')
			Toast.fire({
				title: 'Пожалуйста, заполните полe',
				icon: 'error',
			})
		} else if (password.value !== passwordRepeat.value) {
			passwordRepeat.classList.add('wrong')
			Toast.fire({
				title: 'Пароли не совпадают',
				icon: 'error',
			})
		}
		return false
	}
	switch (statusCode) {
		case 200:
			router.push('/')
			Toast.fire({
				title: 'Регистрация прошла успешно!',
				icon: 'success',
			})
			break
		case 204:
			Toast.fire({
				title: 'Пустые поля!',
				text: 'Пожалуйста, заполните поля',
				icon: 'error',
			})
			break
		case 422:
			if (wrong === 'email') {
				Toast.fire({
					title: 'Неправильный E-mail',
					text: 'Пожалуйста, введите правильную Эл. почту',
					icon: 'error',
				})
				email.classList.add('wrong')
			} else if (wrong === 'username') {
				Toast.fire({
					title: 'Неправильное имя пользователя',
					text: 'Имя пользователя должно быть на латинице. Принимаются цифры и символы [- _ .]',
					icon: 'error',
				})
				username.classList.add('wrong')
			}
			break
		case 409:
			if (wrong === 'email') {
				Toast.fire({
					title: 'Эл. почта уже занята. Попробуйте войти в аккаунт',
					icon: 'error',
				})
				email.classList.add('wrong')
			} else if (wrong === 'username') {
				Toast.fire({
					title: 'Имя пользователя уже занято',
					icon: 'error',
				})
				username.classList.add('wrong')
			}
			break
		case 400:
		case 403:
			Toast.fire({
				title: 'Ошибка сервера!',
				text: 'Пожалуйста, попробуйте позже',
				icon: 'error',
			})
			break
		default:
			Toast.fire({
				title: 'Произошла неизвестная ошибка',
				icon: 'error',
			})
			break
	}
}
</script>

<template>
	<div>
		<div id="signup-wrapper">
			<div id="signup">
				<h2>Регистрация</h2>
				<form @submit.prevent="register()">
					<input @click="removeWrong()" id="email-field" type="email" placeholder="Эл. почта (Не обязятельно)" /><br />
					<input @click="removeWrong()" id="username-field" type="text" placeholder="Имя пользователя" /><br />
					<input @click="removeWrong()" id="password-field" type="password" placeholder="Пароль" /><br />
					<input @click="removeWrong()" id="password-repeat-field" type="password" placeholder="Повторите пароль" /><br />
					<div id="submit-reg-wrapper">
						<button type="submit" class="submit-register" id="submit-register">Зарегестрироваться</button>
						<div class="submit-register"><div id="loader-register"></div></div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<style lang="scss" src="../styles/signing.scss"></style>

<script>
import { router } from '../router.js'

const removeWrong = () => {
	const fields = [document.getElementById('email-field'),
									document.getElementById('username-field'),
									document.getElementById('password-field'),
									document.getElementById('submit-register')]
	fields.forEach((element) => {
		element.addEventListener('focus', () => {
			element.classList.remove('wrong')
		})
	})
}

export default {
	name: "LogIn",
}
</script>
