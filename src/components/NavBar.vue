<script setup>
import { onMounted } from 'vue'
import $ from 'jquery'
function exitMenu() {
	const checkbox = document.querySelector('#open-close-hamburger');
	const mobileMenu = document.querySelector('#mobile-menu')
	mobileMenu.classList.add('stop-transition')
	checkbox.checked = !checkbox.checked;
	setTimeout(() => {
		mobileMenu.classList.remove('stop-transition')
	}, 100)
}
onMounted(() => {
	const mobileMenu = document.querySelector('#mobile-menu')
	let timer = null
	window.addEventListener('resize', function () {
		if (timer) {
			clearTimeout(timer)
			timer = null
		} else {
			mobileMenu.classList.add('stop-transition')
		}
		timer = setTimeout(() => {
			mobileMenu.classList.remove('stop-transition')
			timer = null;
		}, 100)
		if ($(window).width() / parseFloat($('body').css('font-size')) > 48) {
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
			<input id="open-close-hamburger" type="checkbox" />
			<div id="mobile-menu">
				<router-link @click="exitMenu()" class="m-link" to="/">Main</router-link>
				<router-link @click="exitMenu()" class="m-link" to="/about">About</router-link>
				<router-link @click="exitMenu()" class="m-link" to="/signin">Log In</router-link>
				<router-link @click="exitMenu()" class="m-link" to="/signup-vue">Sign Up</router-link>
			</div>
		</div>
		<div id="icon"></div>
		<div id="desktop-links">
			<router-link class="link" to="/">Main</router-link>
			<router-link class="link" to="/about">About</router-link>
			<router-link class="link" to="/signin">Sign In</router-link>
		</div>
		<div id="right-buttons">
			<a class="link" href="/login">Log In</a>
			<a class="link" href="/signup">Sign Up</a>
		</div>
	</div>
</template>

<style scoped>
.link {
	text-decoration: none;
	color: white;
	font-size: 1.5em;
	margin-left: 15px;
}
.link:hover,
.link.router-link-active {
	border-bottom: 2px solid #fff;
}
#right-buttons > *:hover {
	background-color: #333; 
}
#right-buttons > * {
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
	float: left;
}
#desktop-links {
	width: 100%;
}
#mobile-hamburger-wrap > * {
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
#open-close-hamburger {
	z-index: 9999;
	width: 100%;
	height: 100%;
	margin: 0;
	cursor: pointer;
	filter: opacity(0);
}
#mobile-menu > *:hover {
	border-bottom: 5px solid #fff;
}
#mobile-menu > * {
	text-decoration: none;
	font-size: 3rem;
}
#mobile-menu {
	position: fixed;
	display: flex;
	flex-direction: column;
	top: 0px;
	left: calc(-100vw - 0.75rem - 8px);
	height: 100vh;
	width: 100%;
	background-color: blue;
	transition: 0.2s ease-out;
}
.stop-transition {
	transition: none !important;
}
#open-close-hamburger:checked ~ #mobile-menu {
	left: 0px;
}
#navbar {
	z-index: 500;
	position: fixed;
	display: grid;
	grid-template-columns: max-content 1fr max-content;
	justify-content: right;
	place-items: center;
	width: 100%;
	height: 60px;
	background: linear-gradient(#444, #555);
}
@media (max-width: 48em) {
	#desktop-links {
		display: none;
	}
	#icon {
		display: none;
	}
	#mobile-hamburger-wrap > * {
		width: 2.75rem;
		height: 0.35rem;
	}
	#mobile-hamburger-wrap {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}
	#mobile-hamburger {
		z-index: 1500;
		display: grid;
		grid-template-columns: 1fr;
	}
	#navbar {
		height: 4rem;
		grid-template-columns: 1fr max-content;
	}
}
</style>



<script>
import { onMounted } from 'vue'
export default {
	name: "NavBar",
	setup() {
	}
}
</script>
