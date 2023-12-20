<script setup>
</script>

<template>
	<div id="signup">
		<h2>Вход в аккаут</h2>
		<h3 id="err" class="is-error">hey</h3>
		<button id="submit" @click="checkValid()">Войти</button>
	</div>
</template>

<script>
export default {
	name: 'SingUp'
}
</script>
