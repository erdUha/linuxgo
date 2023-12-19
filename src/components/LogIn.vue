<script setup>
</script>

<template>
	<div id="signin">
		<h2>Вход в аккаут</h2>
		<h3 id="err" class="is-error">hey</h3>
		<button id="submit" @click="checkValid()">Войти</button>
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
