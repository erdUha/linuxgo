<script setup>
import Swal from 'sweetalert2/dist/sweetalert2.js'
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2800,
  timerProgressBar: true,
})
async function login() {
	const username = document.getElementById('username-field')
	const password = document.getElementById('password-field')
	const button = document.getElementById('submit-login')
	const loader = document.getElementById('loader-login')
	let statusCode = 400
	let wrong = ''
	if (username.value && password.value) {
		button.disabled = true
		button.classList.add('is-loading')
		loader.classList.add('is-loading')
		const res = await fetch('/api/login', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'username': username.value,
				'password': password.value,
			}),
		}).then((response) => response.json())
			.then((json) => {
				statusCode = json.status
				if (json.wrong) {
					wrong = json.wrong
				}
			})
			.catch((err) => {
				//console.error(err)
			})
		button.disabled = false
		button.classList.remove('is-loading')
		loader.classList.remove('is-loading')
	} else {
		statusCode = 204
		if (!username.value && !password.value) {
			wrong = 'all'
		} else if (!username.value) {
			wrong = 'username'
		} else if (!password.value) {
			wrong = 'password'
		}
	}
	switch (statusCode) {
		case 200:
			router.push('/')
			Toast.fire({
				title: 'Вход прошел успешно!',
				icon: 'success',
			})
			break
		case 404:
			Toast.fire({
				title: 'Неправильное имя пользователя или пароль',
				icon: 'error',
			})
			break
		case 204:
			if (wrong === 'all') {
				username.classList.add('wrong')
				password.classList.add('wrong')
			} else if (wrong === 'username') {
				username.classList.add('wrong')
			} else if (wrong === 'password') {
				password.classList.add('wrong')
			}
			Toast.fire({
				title: 'Пожалуйста, заполните поля',
				icon: 'error',
			})
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
		<div id="login-wrapper">
			<div id="login">
				<h2>Вход в аккаунт</h2>
				<form @submit.prevent="login()">
					<input @click="removeWrong()" id="username-field" type="text" placeholder="Имя пользователя / E-mail" /><br />
					<input @click="removeWrong()" id="password-field" type="password" placeholder="Пароль" /><br />
					<div id="submit-log-wrapper">
						<button type="submit" class="submit-login" id="submit-login">Войти</button>
						<div class="submit-login"><div id="loader-login"></div></div>
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
	const fields = [document.getElementById('username-field'),
									document.getElementById('password-field'),
									document.getElementById('submit-login')]
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

