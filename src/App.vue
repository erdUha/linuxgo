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

<style lang="scss" src="./styles/app.scss"></style>
<style src="./transitions.css"></style>

<style>
html, body {
	padding: 0; margin: 0;
}
.pages {
	padding-top: 550px;
	width: 100%; height: 2000px;
}
#router {
	grid-row-start: 1;
	grid-column-start: 1;
}
#router-wrapper {
	display: grid; /* Для того, чтобы 2 странички с id="router" накладывались друг на друга */
	grid-template-columns: 1fr;
	margin-top: 3rem;
}
@media (max-width: 48em) {
	#router-wrapper {
		margin-top: 3.25rem;
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

window.sessionStorage.setItem('isLogged', false);

const checkIfLogged = async () => {
	const res = await fetch('/api/islogged', { 
		method: 'GET',
		credentials: 'same-origin',
	}).then((response) => response.json())
		.then((json) => {
			if (json.isLogged) {
				window.sessionStorage.setItem('isLogged', json.isLogged);
				window.sessionStorage.setItem('email', json.email);
				if (!json.email) {
					console.log("NO EMAIL");
				}
				console.log(json);
			} else {
				console.log('Not logged in');
			}
		})
		.catch((err) => {
			//console.error(err);
		})
}

export default {
  name: 'App',
  components: {
		NavBar,
  },
	setup() {
		onMounted(() => {
			//$checkIsLogged();
		})
	}
}
</script>
