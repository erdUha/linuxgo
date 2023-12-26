<script setup>
import { defineProps, reactive, ref } from 'vue'
import FormData from 'form-data'

</script>

<template>
	<div>
		<div class="pages" id="profile-page">
			<div class="button-wrapper">
				<button class="button" @click="$refs.file.click()">
					<input type="file" ref="file" @change="loadImage($event)" accept="image/*">
					Load image
				</button>
			</div>
			<div v-if="isCropperOpen" class="cropper-wrapper">
				<div @click="toggleCropperOpen()" class="cropper-close-wrapper">
					<div class="cropper-close">
						<div></div>
						<div></div>
					</div>
				</div>
				<cropper @change="change" class="cropper" id="pfp-cropper" :stencil-component="$options.components.CircleStencil" ref="cropper" :src="image.src" :auto-zoom="true" :stencil-size="{ width: 180, height: 180 }" image-restriction="stencil" :stencil-props="{ aspectRatio: 1 }" />
				<button @click="uploadImage()" class="cropper-done">Готово</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.cropper-wrapper { 
	z-index: 9999;
	position: fixed;
	background-color: rgba(0,0,0,0.7);
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
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
import { ref } from 'vue'
import { CircleStencil,  Cropper } from 'vue-advanced-cropper'
import axios from 'axios'
import 'vue-advanced-cropper/dist/style.css'

const isCropperOpen = ref(false)

function toggleCropperOpen() {
	isCropperOpen.value = !isCropperOpen.value
}
function openCropper() {
	const file = document.getElementById("upload-pfp").files[0]
}
function submitCropper() {
	isCropperOpen.value = false;
	const upload = document.getElementById("upload-pfp")
	const cropper = document.getElementById("pfp-cropper")
	console.log(cropper.coordinates)
}

function getMimeType(file, fallback = null) {
	const byteArray = (new Uint8Array(file)).subarray(0, 4);
    let header = '';
    for (let i = 0; i < byteArray.length; i++) {
       header += byteArray[i].toString(16);
    }
	switch (header) {
        case "89504e47":
            return "image/png";
        case "47494638":
            return "image/gif";
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
            return "image/jpeg";
        default:
            return fallback;
    }
}

export default {
	name: "ProfilePage",
	components: {
		Cropper, 
		CircleStencil
	},
	data() {
		return {
			image: {
				src: null,
				type: null
			}
		};
	},
	methods: {
		change({ coordinates, canvas }) {
			//console.log(coordinates, canvas)
		},
		crop() {
			const { canvas } = this.$refs.cropper.getResult();
			canvas.toBlob((blob) => {
			}, this.image.type);
		},
		reset() {
			this.image = {
				src: null,
				type: null
			}
		},
		loadImage(event) {
			const { files } = event.target;
			if (files && files[0]) {
				console.log(getMimeType(files[0], files[0].type));
				if (this.image.src) {
					URL.revokeObjectURL(this.image.src)
				}
				const blob = URL.createObjectURL(files[0]);
				const reader = new FileReader();
				reader.onload = (e) => {
					this.image = {
						src: blob,
						type: getMimeType(e.target.result, files[0].type),
					};
				};
				reader.readAsArrayBuffer(files[0]);
				isCropperOpen.value = true
			}
		},
		uploadImage() {
			const { canvas } = this.$refs.cropper.getResult();
			if (canvas) {
				const form = new FormData();
				const blob = new Blob
				form.append('file', blob)
				const res = fetch('/api/setpfp', {
					method: 'POST',
					credentials: 'same-origin',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'hey': blob
					}),
				});
			}
		},
	},
	destroyed() {
		if (this.image.src) {
			URL.revokeObjectURL(this.image.src)
		}
	},
}
</script>
