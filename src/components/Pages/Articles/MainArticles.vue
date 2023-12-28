<template>
	<div>
		<div id="main-articles">
			<div class="article-item">
				<router-link class="article-item-link" to="first-nodejs">
					Первое приложение на Express JS
				</router-link>
			</div>
		</div>
	</div>
</template>

<style scoped>
.article-item-link {
}
.article-item * {
	color: #fff;
	text-decoration: none;
	font-size: 1.5rem;
}
.article-item {
	margin-top: 4rem;
}
</style>

<script>
export default {
	name: 'MainArticles',
}
</script>
