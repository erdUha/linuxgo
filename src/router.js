// Роутер для навигации между страничками. Не влияет на NavBar

import { createRouter, createWebHistory } from 'vue-router'
import PageOne from './components/Pages/PageOne.vue'
import PageTwo from './components/Pages/PageTwo.vue'
import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'


console.log(window.location.href);
export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: PageOne,
			meta: { transition: 'fade' },
		},
		{
			path: '/about',
			name: 'about',
			component: PageTwo,
			meta: { transition: 'fade' },
		},
		{
			path: '/signin',
			name: 'signin',
			component: LogIn,
			meta: { transition: 'slide-right' }
		},
		{
			path: '/signup-vue',
			name: 'signup-vue',
			component: SignUp, 
			meta: { transition: 'slide-right' }
		}
	]
})
