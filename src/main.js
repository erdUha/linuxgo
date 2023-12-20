import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'
import 'jquery'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()


const app = createApp(App)
app.use(router)
app.mount('#app')
