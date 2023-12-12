import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'jquery'
import AOS from 'aos'
AOS.init()

const app = createApp(App)
app.mount('#app')
