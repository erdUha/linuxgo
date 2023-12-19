<script setup>
</script>

<template>
	<NavBar />
	<div id="router-wrapper">
		<router-view id="router" v-slot="{ Component, route }">
			<transition :name="route.meta.transition || 'slide-right'">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>

<style src="./style.css"></style>
<style src="./transitions.css"></style>

<style>
html, body {
	padding: 0; margin: 0;
}
#page-two {
	background-color: yellow;
}
#page-one {
	background-color: cyan;
}
.pages {
	padding-top: 50px;
	width: 100%;
	height: 100vh;
}
#router {
	grid-row-start: 1;
	grid-column-start: 1;
}
#router-wrapper {
	display: grid; /* Для того, чтобы 2 странички с id="router" накладывались друг на друга */
	grid-template-columns: 1fr;
}
#app {
	position: relative;
	overflow: hidden;
	width: 100%; 
}
</style>

<script>
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
		NavBar,
  },
	setup() {
		onMounted( async () => {
			const res = await fetch('/login', { 
				method: 'POST',
				//credentials: 'include',
				body: {
					'username': 'erdUha',
					'password': 'P@rol123'
				}
			}).then((response) => response.json())
				.then((json) => {
					console.log(json);
				})
				.catch((err) => {
					console.error(err);
				})
		})
	}
}
</script>
