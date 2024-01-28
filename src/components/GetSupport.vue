<template>
	<div>
		<p id="yoo">
		</p>
	</div>
</template>
<style>
#yoo {
	width: 100vw;
	word-break: break-all;
}
</style>

<script>
import { onMounted, ref } from 'vue'

export default {
	name: "GetSupport",
}
</script>
<script setup>
import { onMounted } from 'vue'
onMounted(async() => {
	const elem = document.getElementById("yoo")
	console.log(elem);
	const res = await fetch('/api/get-support', {
		method: "GET",
	}).then((response) => response.json())
		.then((json) => {
			console.log(json.response)
			json.response.forEach((el) => {
				elem.innerHTML += JSON.stringify(el) + "<br><br><br>";
			})
		})
		.catch((err) => {
			console.error(err);
		})
})
</script>
