<template>
	<h2>
		Тех. поддержка
	</h2>
	<div id="support-wrapper">
		<input type="email" id="support-email" placeholder="E-mail" /><br>
		<input type="text" id="support-name" placeholder="Имя, Фамилия" /><br>
		<textarea id="support-text" placeholder="Введите ваш вопрос по сайту" /><br>
		<button @click="sendEmail">Отправить</button>
	</div>
</template>

<style scoped>
h2 {
	height: 1rem;
}
#support-wrapper {
	background-color: #171618;
	padding: 1.5rem 2.5rem;
	padding-top: 3rem;
	border: 2px solid #555;
	border-radius: 0.75rem;
	margin: auto;
	margin-top: 0;
	padding: auto;
}
button:hover {
	background-color: #555;
	box-shadow: inset 0 0 0.75rem rgba(0,0,0,0.15);
	color: #fff;
}
button:active {
	background-color: #333;
	box-shadow: inset 0 0 0.25rem rgba(255,255,255,0.2);
	color: #ccc;
	transition: 0.01s ease-in-out;
}
button {
	position: relative;
	float: right;
	width: 6rem;
	height: 3rem;
	border: none;
	border-radius: 0.75rem;
}
input[type="email"],input[type="text"] {
	position: relative;
	padding: 0.25rem 1.25rem;
}
textarea {
	min-width: min(70vw, 30rem);
	width: 70vw;
	max-width: min(70vw, 30rem);
	min-height: 9rem;
	margin-bottom: 1rem;
	padding: 1.25rem 1.25rem;
	border: 2px solid #999;
	border-radius: 1.25rem;
	background-color: #555;
	color: #fff;
	font-size: 0.875rem;
	font-weight: 400;
	box-shadow: inset 0 0 1rem rgba(0,0,0,0.0875);
	transition: 0.1s ease-in-out;
}
</style>

<script>
export default {
	name: 'SupportComp',
	methods: {
		async sendEmail() {
			const name = document.getElementById("support-name").value
			const email = document.getElementById("support-email").value
			const text = document.getElementById("support-text").value
			const response = await fetch('/api/send-email', {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					'name': name,
					'password': email,
					'text': text,
				}),
			}).then((response) => response.json())
			.then((json) => {
			})
			.catch((err) => {
			})
		},
	}
}
</script>
