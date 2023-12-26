// Роутер для навигации между страничками. Не влияет на NavBar

import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './components/Pages/MainPage.vue'
import PageOne from './components/Pages/PageOne.vue'
import PageTwo from './components/Pages/PageTwo.vue'
import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import SqlTutorial from './components/SqlTutorial.vue'
import ProfilePage from './components/ProfilePage.vue'

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
			meta: { transition: 'slide-right' }
		},
		{
			path: '/sql-tutorial',
			name: 'SqlTutorial',
			component: SqlTutorial, 
			meta: { transition: 'fade' }
		},
		{
			path: '/profile',
			name: 'profile-page',
			component: ProfilePage, 
			meta: { transition: 'fade' }
		},
	]
})
