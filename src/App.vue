<script setup>
</script>

<template>
	<NavBar />
	<div id="router-wrapper">
		<router-view id="router" v-slot="{ Component, route }">
			<transition :name="route.meta.transition || 'slide-right'" @beforeLeave="beforeLeave" @enter="enter" @afterEnter="afterEnter">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
	<FooterComp />
</template>

<style lang="scss" src="./styles/app.scss"></style>
<style lang="scss" src="./styles/transitions.scss"></style>

<style>
html, body {
	padding: 0; margin: 0;
}
.pages {
	padding-top: 550px;
	width: 100%; height:2000px;
}
.ease-cool {
	transition-timing-function: cubic-bezier(.34,.01,.39,1.01) !important;
}
#router {
	grid-row-start: 1;
	grid-column-start: 1;
	min-height: 100vh;
}
#router-wrapper {
	min-height: 100vh;
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
import FooterComp from './components/FooterComp.vue'

window.sessionStorage.setItem('isLogged', false);

export default {
  name: 'App',
  components: {
		NavBar,
		FooterComp,
  },
	setup() {
		onMounted(() => {
		})
	},
	data() {
    return {
      prevHeight: 10000,
    };
  },
	methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
  },
}
</script>
