<script setup>
import { onMounted } from 'vue'
import { router } from '../../router.js'
import '../../scroll-timeline.js'

function setAosDelay() {
	var isSmall = false
	if (document.body.clientWidth / window.getComputedStyle(document.body).getPropertyValue('font-size').replace(/\D/g, "") < 48) {
		isSmall = true
	}
	const noDelay = document.getElementsByClassName('no-delay')
	Array.from(noDelay).forEach((element) => {
		if (isSmall) {
			if (element.dataset.aosDelay) {
				element.dataset.aosDelayDesktop = element.dataset.aosDelay
				element.dataset.aosDelay = "0"
			}
			element.dataset.aosDesktop = element.dataset.aos
			element.dataset.aos = "zoom-out"
		} else {
			if (element.dataset.aosDelayDesktop) {
				element.dataset.aosDelay = element.dataset.aosDelayDesktop
			}
			if (element.dataset.aosDesktop) {
				element.dataset.aos = element.dataset.aosDesktop
			}
		}
	})
}

onMounted(function () {
	window.addEventListener('resize', function () {
		setAosDelay()
	})
	setAosDelay()
})


</script>
<template>
	<div>
		<div id="main-page">
			<h1 class="ease-cool" data-aos-delay="250" data-aos-duration="800" data-aos="fade-left" id="main-text">
				<strong>LinuxGO</strong><br /><br />
				<span class="small">Создайте сайт вашей мечты!</span>
			</h1>
		</div>
		<div class="ease-cool no-delay" id="section-1" data-aos-delay="150" data-aos="zoom-out-right" data-aos-anchor-placement="bottom-bottom">
			<h3>Научитесь понимать и реализовывать Back-End часть для <strong>вашего</strong> сайта</h3>
		</div>
		<div id="frameworks">
			<h3 class="ease-cool no-delay" data-aos="zoom-out" data-aos-delay="350" data-aos-anchor-placement="bottom-bottom">Справочный материал для самых прогрессивных фреймворков</h3>
			<img loading="lazy" data-aos="zoom-out-right" data-aos-offset="150" data-aos-anchor-placement="bottom-bottom" class="ease-cool noselect no-delay" @click="scrollToTop(); router.push('/about')" width="200px" src="../../assets/nodejs.png" />
			<img loading="lazy" data-aos-delay="200" data-aos="zoom-out-up" data-aos-offset="150" data-aos-anchor-placement="bottom-bottom" class="ease-cool noselect no-delay" width="200px" src="../../assets/django.png" />
			<img loading="lazy" data-aos-delay="350" data-aos="zoom-out-left" data-aos-offset="150" data-aos-anchor-placement="bottom-bottom" class="ease-cool noselect no-delay" width="200px" src="../../assets/flask.png" />
		</div>
		<div class="ease-cool no-delay" id="section-2" data-aos-offset="150" data-aos="zoom-out-left" data-aos-anchor-placement="bottom-bottom">
			<h3>Решайте интерактивные задачи по <strong>базам данных</strong></h3>
		</div>
		<img loading="lazy" data-aos-offset="300" data-aos-duration="1000" data-aos="flip-down" id="pg-anim" src="../../assets/posgres-test.webp" />
		<div data-aos="fade-up" data-aos-anchor-placement="center-bottom" id="section-3">
			<div>
				<h3>Давайте начнем!</h3>
				<button @click="redirect()">Введение</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
#section-3 button:hover {
	background-color: #8f68d1;
	color: black;
}
#section-3 button {
	border: none;
	border-radius: 3vw;
	padding: 0.5rem 2rem;
	margin: 2.5vw 10vw;
	height: 10vw;
	font-size: 3vw;
	transition: 0.05s ease-in-out;
}
#section-3 h3 {
	width: 50vw;
	position: relative;
	text-align: left;
	margin-left: 8vw;
	margin-top: 3.5vw;
	font-size: 5vw;
}
#section-3 div {
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr;
	width: 100%;
	height: 15vw;
	top: 50vw;
	background-color: rgba(12,11,15,0.5);
	box-shadow: 0 0 13vw rgba(12,11,15,1);
}
#section-3 {
	width: 100vw;
	height: 80vw;
	margin-top: 5rem;
	box-shadow: inset 0 0px 15vw rgba(0,0,0,0.9);
	background-image: url('../../assets/coding.jpeg');
	background-size: cover;
}
#pg-anim {
	width: min(80%, 1083px);
}
@media (max-width: 32em) {
	#pg-anim {
		width: 95%;
	}
}
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
	#pg-anim {
		margin-top: 3rem;
	}
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
import { router } from '../../router.js'


export default {
	name: 'MainPage',
	methods: {
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		},
		redirect() {
			router.push('/articles')
		}
	},
	setup() {
	},
}
</script>
