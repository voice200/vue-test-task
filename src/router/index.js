import Vue from 'vue';
import VueRouter from 'vue-router';
import { Home, Login, MyProfile, Registration, NotFound  } from '@/pages';
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},

	{
		path: '/login',
		name: 'login',
		component: Login,
		props: true
	},
	{
		path: '/registration',
		name: 'registration',
		component: Registration,
		props: true
	},
	{
		path: '/myProfile/:id',
		component: MyProfile,
		name: 'myProfile',
		props: true,
		beforeEnter: AuthGuard
	},
	{
		path: '*',
		component: NotFound
	}
];

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router;

