<template>
	<div>
		<div class="pages" id="page-two">
			<div data-aos="zoom-out-down" data-aos-anchor-placement="bottom-bottom">
				<h1>Your mom is gay</h1>
			</div>
			<div class="cropper-wrapper is-cropper-open">
				<div class="cropper-close-wrapper">
					<div class="cropper-close">
						<div></div>
						<div></div>
					</div>
				</div>
				<cropper class="cropper" :src="img" :auto-zoom="true" :stencil-size="{ width: 180, height: 180 }" image-restriction="stencil" :stencil-props="{ aspectRatio: 1 }" />
				<button class="cropper-done">Готово</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.is-cropper-open {
	visibility: visible;
	background-color: rgba(0,0,0,0.7);
}
.cropper-wrapper { 
	z-index: 9999;
	position: fixed;
	background-color: rgba(0,0,0,0.7);
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	visibility: hidden;
}
.cropper-done {
	position: absolute;
	left: calc(50% - 40px);
	top: calc(50% + 180px);
	width: 80px;
	height: 40px;
	border-radius: 5px;
}
.cropper-close > div:first-child {
	transform: rotate(45deg);
}
.cropper-close > div:last-child {
	transform: rotate(-45deg);
}
.cropper-close > * {
	grid-row-start: 1;
	grid-column-start: 1;
	background-color: white;
	width: 2.5rem;
	height: 0.25rem;
	border-radius: 5rem;
}
.cropper-close {
	display: grid;
	position: relative;
	top: 47.5%;
	left: 15%;
}
.cropper-close-wrapper {
	position: fixed;
	cursor: pointer;
	width: 3.5rem;
	height: 3.5rem;
	top: 1.75rem;
	right: 1.75rem;
}
.cropper {
	position: relative;
	top: calc(50% - 160px);
	margin: auto;
	width: 320px;
	height: 320px;
}
</style>


<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default {
	name: "PageTwo",
	components: {
		Cropper,
	},
	data() {
	    return {
	        img: 'https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
	    }
	},
	methods: {
		change({ coordinates, canvas }) {
			console.log(coordinates, canvas)
		}
	},
}
</script>
