// Роутер для навигации между страничками. Не влияет на NavBar

import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './components/Pages/MainPage.vue'
import PageOne from './components/Pages/PageOne.vue'
import PageTwo from './components/Pages/PageTwo.vue'
import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import SqlTutorial from './components/SqlTutorial.vue'
import SupportComp from './components/SupportComp.vue'
import MainArticles from './components/Pages/Articles/MainArticles.vue'
import FirstNodejs from './components/Pages/Articles/FirstNodejs.vue'

console.log(window.location.href);
export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: MainPage,
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
			meta: { transition: 'slide-left' }
		},
		{
			path: '/sql-tutorial',
			name: 'SqlTutorial',
			component: SqlTutorial, 
			meta: { transition: 'fade' }
		},
		{
			path: '/support',
			name: 'support',
			component: SupportComp, 
			meta: { transition: 'slide-right' }
		},
		{
			path: '/articles',
			name: 'articles',
			component: MainArticles, 
			meta: { transition: 'fade' }
		},
		{
			path: '/first-nodejs',
			name: 'First Nodejs',
			component: FirstNodejs, 
			meta: { transition: 'slide-right' }
		},
	]
})
