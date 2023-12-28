<template>
	<div id="footer">
		<div class="column">
			<router-link class="noselect footer-link" to="/">Главная</router-link>
		</div>
		<a id="github-img" target="_blank" href="https://github.com/erdUha/linuxgo">
			<img src="../assets/github.svg" />
		</a>
	</div>
</template>

<style scoped>
.column * {
	font-size: 1.25rem;
	font-weight: 400;
}
.column {
	display: flex;
	flex-direction: column;
	width: 20vw;
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
