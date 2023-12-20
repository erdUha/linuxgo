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
	margin-top: 60px;
}
@media (max-width: 48em) {
	#router-wrapper {
		margin-top: 4rem;
	}
}
#app {
	position: relative;
	overflow: hidden;
	width: 100%; 
}
</style>

<script>
import { onMounted, ref } from 'vue'
import NavBar from './components/NavBar.vue'

const isLogged = ref(false)

export default {
  name: 'App',
  components: {
		NavBar,
  },
	setup() {
		onMounted( async () => {
			const res = await fetch('/api/islogged', { 
				method: 'GET',
				credentials: 'same-origin',
			}).then((response) => response.json())
				.then((json) => {
					if (json.isLogged) {
						isLogged.value = json.isLogged
						if (!json.email) {
							console.log("NO EMAIL");
						}
						console.log(json);
					} else {
						console.log('Not logged in');
					}
				})
				.catch((err) => {
					console.error(err);
				})
			
			// =================================================

			const res2 = await fetch('/login', {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					'username': 'BARAAAN',
					'password': 'baranina',
				}),
			}).then((response) => response.json())
				.then((json) => {
					console.log('login: ' + json.status);
				})
				.catch((err) => {
					console.error(err);
				})
		})
	}
}
</script>
