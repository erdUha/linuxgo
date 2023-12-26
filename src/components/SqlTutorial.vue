<script setup>
</script>

<template>
	<iframe
		loading="lazy"
		class="tutorial-iframe"
		frameBorder="0"
		src="https://onecompiler.com/embed/challenges/3zx9c58bm/posgresql-tutorial?theme=dark&hideNew=true&hideSubmit=true&hideEditorOptions=true">
	</iframe>
</template>

<style scoped>
.tutorial-iframe {
	width: 100%;
	height: calc(100vh - 3.25rem);
}
</style>

<script>
	import { watch } from 'vue'
	watch(document.getElementById("__next"), function() {
		console.log("bruh");
	})
export default {
	name: 'SqlTutorial',
}
</script>
