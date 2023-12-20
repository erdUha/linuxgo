<script setup>
async function login() {
	const button = document.querySelector('#submit-login')
	button.disabled = true
	let statusCode = 400;
	const res = await fetch('http://localhost:3334/login', {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'username': 'BARAAAN',
			'password': 'baranina',
		}),
	}).then((response) => response.json())
		.then((json) => {
			statusCode = json.status;
		})
		.catch((err) => {
			console.error(err)
		})
	button.disabled = false
	if (statusCode == 200) {
		console.log('Logged In!');
		window.location.href = '/';
	} else {
		console.log('ЛОШАРА');
	}
}
</script>

<template>
	<div id="login">
		<h2>Вход в аккаут</h2>
		<h3 id="err" class="is-error">hey</h3>
		<form @submit.prevent="login()">
			<input id="submit-login" type="submit" value="Войти" />
		</form>
	</div>
</template>

<style scoped>
h2 {
	color: black;
}
.is-error {
	height: 5rem;
}
#err {
	height: 0;
	margin: 0;
	padding: 0;
}
button {
	background-color: #ccddff;
	color: black;
}
input {
	background-color: #ccddff;
	color: black;
}
</style>

<script>
export default {
	name: "LogIn",
}
</script>
