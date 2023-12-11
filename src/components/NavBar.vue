<script setup>
</script>

<template>
	<div id="navbar">
		<router-link class="link" to="/">Main</router-link>
		<router-link class="link" to="/about">About</router-link>
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
#navbar {
	width: 100%;
	height: 60px;
	background: linear-gradient(90deg, #4373D9, #2AC9A3);
}
</style>


<script>
export default {
	name: "NavBar",
}
</script>
