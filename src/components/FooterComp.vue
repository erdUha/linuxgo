<template>
	<div id="footer">
		<div id="footer-wrap">
			<div class="column">
				<router-link class="noselect footer-link" to="/">Главная</router-link>
				<router-link class="noselect footer-link" to="/articles">Статьи</router-link>
				<router-link class="noselect footer-link" to="/sql-tutorial">SQL туториал</router-link>
			</div>
			<div class="column">
				<router-link class="noselect footer-link" to="/login">Войти в аккаунт</router-link>
				<router-link class="noselect footer-link" to="/signup">Зарегестрироваться</router-link>
				<router-link class="noselect footer-link" to="/support">Об. связь</router-link>
			</div>
		</div>
		<a id="github-img" target="_blank" href="https://github.com/erdUha/linuxgo">
			<img src="../assets/github.svg" />
		</a>
	</div>
</template>

<style scoped>
.column * {
	text-align: left;
	font-size: 1.25rem;
	font-weight: 400;
	margin-bottom: 0.5rem;
}
.column {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	width: 40vw;
}
#footer-wrap {
	display: flex;
	margin: auto;
	max-width: 30rem;
}
.footer-link:hover {
	text-decoration: underline;
}
.footer-link {
	text-decoration: none;
	color: #fff;
}
#footer {
	position: relative;
	background-color: #151515;
	width: 80%;
	height: 15rem;
	transition: 0.2s ease-in-out;
	padding: 5% 10%;
}
#github-img {
	position:absolute;
	bottom: 1rem;
	left: calc(50% - 1.5rem);
}
img {
	filter: invert(1);
	width: 3rem;
	height: 3rem;
}
</style>

<script>
export default {
	name: 'Foter',
}
</script>
