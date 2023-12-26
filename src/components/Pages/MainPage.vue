<script setup>
import { router } from '../../router.js'
function redirect() {
	router.push('about')
}
</script>
<template>
	<div>
		<div id="main-page">
			<h1 id="main-text">
				<strong>LinuxGO</strong><br /><br />
				<span class="small">Создайте сайт вашей мечты!</span>
			</h1>
		</div>
		<div id="section-1" data-aos-offset="-100" data-aos="zoom-out-right" data-aos-anchor-placement="bottom-bottom">
			<h3>Научитесь понимать и реализовывать Back-End часть для <strong>вашего</strong> сайта</h3>
		</div>
		<div id="frameworks">
			<h3>Справочный материал для самых прогрессивных фреймворков</h3>
			<img class="noselect" @click="scrollToTop(); router.push('/about')" width="200px" src="../../assets/nodejs.png" />
			<img class="noselect" width="200px" src="../../assets/django.png" />
			<img class="noselect" width="200px" src="../../assets/flask.png" />
		</div>
		<div id="section-2" data-aos="zoom-out-left" data-aos-anchor-placement="bottom-bottom">
			<h3>Решайте интерактивные задачи по <strong>базам данных</strong></h3>
		</div>
	</div>
</template>

<style scoped>
strong {
	font-weight: 800;
}
.small {
	font-size: 0.625em;
}
* {
	font-weight: 600;
}
#frameworks > * {
	margin: 20px;
}
#frameworks h3 {
	margin-bottom: 2rem;
}
#frameworks {
	background-color: #201f21;
	padding: 2.5rem 0;
}
#section-1 h3, #section-2 h3 {
	margin: auto;
	padding: 0 20%;
}
#section-1, #section-2 {
	display: grid;
	width: 100%;
	height: 10rem;
}
@media (min-width: 48em) {
	#frameworks {
		padding-top: 10rem;
	}
	#section-1, #section-2 {
		background-color: #252428;
		border: 4px solid #555;
		border-radius: 1rem;
		padding: 2rem 0;
		width: calc(6rem + 30%);
		top: calc(100vh - 8rem);
		position: absolute;
		z-index: 2;
	}
	#section-1 {
		left: calc(15% - 6rem);
	}
	#section-2 {
		right: calc(15% - 6rem);
	}
}
#main-text {
	position: relative;
	font-size: 2.5rem;
	text-align: left;
	margin-top: 0;
	padding: 0 10% 0 15%;
	top: calc(30vh - 3.25rem);
	line-height: 0.625em;
}
#main-page {
	background-image: url('../../assets/main-page.jpg');
	background-size: cover;
	width: 100%;
	height: calc(100vh - 3rem);
}
@media (min-width: 64em) {
	#main-text {
		font-size: 4rem;
		padding: 0 10% 0 10%;
		top: calc(40vh - 3.25rem);
	}
	#section-1, #section-2 {
		font-size: 1.125em;
	}
	#frameworks h3 {
		font-size: 1.5rem;
	}
}
@media (max-width: 48em) {
	#main-page {
		height: calc(100vh - 3.25rem);
	}
}
@media (max-width: 36em) {
	#main-text {
		text-align: center;
		padding: 0 5%;
	}
}
</style>

<script>
export default {
	name: 'MainPage',
	methods: {
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}
}
</script>
