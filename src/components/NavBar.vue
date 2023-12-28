<script setup>
import { onMounted } from 'vue'
import $ from 'jquery'
function exitMenu(isAnimation) {
	const checkbox = document.querySelector('#mobile-menu-open'),
				mobileMenu = document.querySelector('#mobile-menu'),
				mobileMenuClose = document.querySelector('#mobile-menu-close');
	if (!isAnimation) {
		mobileMenu.classList.add('stop-transition')
		mobileMenuClose.classList.add('stop-transition')
	}
	checkbox.checked = false;
	if (!isAnimation) {
		setTimeout(() => {
			mobileMenu.classList.remove('stop-transition')
			mobileMenuClose.classList.remove('stop-transition')
		}, 100)
	}
}
onMounted(() => {
	const mobileMenu = document.querySelector('#mobile-menu')
	const mobileMenuClose = document.querySelector('#mobile-menu-close');
	let timer = null
	window.addEventListener('resize', function () {
		if (timer) {
			clearTimeout(timer)
			timer = null
		} else {
			mobileMenu.classList.add('stop-transition')
			mobileMenuClose.classList.add('stop-transition')
		}
		timer = setTimeout(() => {
			mobileMenu.classList.remove('stop-transition')
			mobileMenuClose.classList.remove('stop-transition')
			timer = null;
		}, 100)
		if (document.body.clientWidth / window.getComputedStyle(document.body).getPropertyValue('font-size').replace(/\D/g, "") > 48) {
			exitMenu()
		}
	})
});
</script>

<template>
	<div id="navbar">
		<div id="mobile-hamburger">
			<div id="mobile-hamburger-wrap">
				<div></div>
				<div></div>
				<div></div>
			</div>
			<input id="mobile-menu-open" type="checkbox" />
			<div @click="exitMenu(true)" id="overlay"></div>
			<div id="mobile-menu-close">
				<div></div>
				<div></div>
			</div>
			<div id="mobile-menu">
				<router-link @click="exitMenu()" class="noselect m-link" to="/">Main</router-link>
				<router-link @click="exitMenu()" class="noselect m-link" to="/about">About</router-link>
				<router-link @click="exitMenu()" class="noselect m-link" to="/sql-tutorial">MySQL Туториал</router-link>
			</div>
		</div>
		<div id="icon"></div>
		<div id="desktop-links">
			<router-link class="noselect link" to="/">Главная</router-link>
			<router-link class="noselect link" to="/about">Базы данных</router-link>
			<router-link class="noselect link" to="/sql-tutorial">MySQL Туториал</router-link>
		</div>
		<div v-if="!isLogged" id="right-buttons">
			<router-link class="noselect link" to="/signin">Войти</router-link>
			<router-link class="noselect link" to="/signup-vue">Регистрация</router-link>
		</div>
		<div v-else id="right-profile">
			<h4>bruh</h4>
		</div>
	</div>
</template>

<style scoped>
.m-link:hover {
	border-bottom: 2px solid #fff;
}
.m-link {
	box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
	margin-bottom: 0.75rem;
	text-align: left;
	text-decoration: none;
	font-size: 1.5rem;
	font-weight: 600;
	color: white;
	height: 2.375rem;
}

.link:hover,
.link.router-link-active {
	border-bottom: 2px solid #fff;
}
.link {
	margin-left: 1rem;
	float: left;
	font-size: 1rem;
	font-weight: 600;
	text-decoration: none;
	color: white;
}
.link:hover,
.link.router-link-active {
	border-bottom: 2px solid #fff;
}
#right-buttons > *:active {
	background-color: #111; 
}
#right-buttons > *:hover {
	background-color: #333; 
}
#right-buttons > * {
	font-size: 1rem;
	background-color: #222;
	padding: 0.4rem 0.8rem;
	border-radius: 5px;
	float: right;
	box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
}
#right-buttons {
	top: 0.2rem;
	width: 100%;
	padding-right: 1.5rem;
}
#desktop-links > * {
}
#desktop-links {
	margin-left: 1rem;
	width: 100%;
}
#mobile-hamburger-wrap > * {
	width: 2.4375rem;
	height: 0.3125rem;
	border-radius: 100px;
	background-color: white;
}
#mobile-hamburger-wrap {
	z-index: inherit;
}
#mobile-hamburger > * {
	grid-row-start: 1;
	grid-column-start: 1;
	padding: 8px;
}
#mobile-hamburger {
	display: none;
	margin-right: auto;
	margin-left: 0.75rem;
}
#overlay {
	z-index: 5;
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0,0,0,0.7);
	visibility: hidden;
}
#mobile-menu-open {
	z-index: 9999;
	width: 100%;
	height: 100%;
	margin: 0;
	cursor: pointer;
	filter: opacity(0);
}
#mobile-menu-open:checked ~ #mobile-menu {
	left: 0px;
}
#mobile-menu-open:checked ~ #mobile-menu-close {
	left: 0.6rem;
	transform: rotate(0deg);
}
#mobile-menu-open:checked ~ #overlay {
	visibility: visible;
}
#mobile-menu-close > div:first-child {
	transform: rotate(45deg);
}
#mobile-menu-close > div:last-child {
	transform: rotate(-45deg);
}
#mobile-menu-close > * {
	grid-row-start: 1;
	grid-column-start: 1;
	border-radius: 100px;
	width: 3rem;
	height: 0.35rem;
	background-color: #fff;
}
#mobile-menu-close {
	z-index: 2000;
	position: absolute;
	display: grid;
	grid-template-columns: 1fr;
	transform: rotate(-180deg);
	top: 1.3rem;
	left: -35%;
	transition: 0.2s cubic-bezier(.22,.07,.56,1.01);
}
#mobile-menu {
	z-index: 500;
	position: fixed;
	display: grid;
	top: 0px;
	padding:2rem;
	padding-top: 5rem;
	left: calc(-15rem - 1.75rem - 4rem);
	height: calc(100vh - 7rem);
	width: 15rem;
	/*min-width: 8rem;*/
	background-color: #444;
	transition: 0.2s cubic-bezier(.22,.07,.56,1.01);
	grid-template-rows: max-content max-content; 
}
@media (max-width: 32em) {
	#right-buttons > * {
		font-size: 1rem;
	}
	.m-link {
		font-size: 1.25rem !important;
	}
	#mobile-menu {
		left: calc(-60% - 1.75rem - 4rem);
		width: 60%;
	}
	#mobile-menu-close {
		left: -60%;
	}
}
.stop-transition {
	transition: none !important;
}
#navbar {
	z-index: 500;
	position: absolute;
	display: grid;
	grid-template-columns: max-content 1fr max-content;
	justify-content: right;
	place-items: center;
	width: 100%;
	height: 3rem;
	background: linear-gradient(#3d3c4e, #423e53);
}
@media screen and (max-width: 48em) {
	#desktop-links {
		display: none;
	}
	#icon {
		display: none;
	}
	#mobile-hamburger-wrap {
		z-index: -2;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	#mobile-hamburger {
		display: grid;
		grid-template-columns: 1fr;
	}
	#navbar {
		height: 3.25rem;
		grid-template-columns: 1fr max-content;
	}
}
</style>



<script>
import { onMounted, ref } from 'vue'
const isLogged = ref(false)
export default {
	name: "NavBar",
	setup() {
	}
}
</script>
