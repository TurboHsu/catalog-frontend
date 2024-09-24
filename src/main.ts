import { createApp } from 'vue'
import './assets/index.css'
import Homepage from './pages/Homepage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import VueLazyLoad from 'vue3-lazyload'
import Cat from './pages/Cat.vue'
import About from './pages/About.vue'

const routes = [
	{ path: '/', name: 'Homepage', component: Homepage },
	{ path: '/about', name: 'About', component: About },
	{ path: '/cat/:uuid', name: 'Cat', component: Cat },
	{ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

const app = createApp(App)
app.use(router)
app.use(VueLazyLoad, {
	loading: '/cat.svg',
	error: '/fail.svg',
	lifecycle: {
		// loading: (el) => {
		// 	console.log("loading", el);
		// },
		error: el => {
			console.warn('error on lazy load: ', el)
		},
		// loaded: (el) => {
		// 	console.log("loaded", el);
		// },
	},
})

app.mount('#app')
