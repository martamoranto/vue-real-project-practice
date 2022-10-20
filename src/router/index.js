import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventEdit from '../views/event/Edit.vue'
import EventRegister from '../views/event/Register.vue'
import About from '../views/AboutView.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'

const routes = [
	{
		path: '/',
		name: 'EventList',
		component: EventList,
		props: (route) => ({ page: parseInt(route.query.page) || 1 }),
	},
	{
		path: '/events/:id',
		name: 'EventLayout',
		// other way of propping
		// props: (route) => ({ id: route.params.id }),
		props: true,
		component: EventLayout,
		children: [
			{
				path: '',
				name: 'EventDetails',
				component: EventDetails,
			},
			{
				path: 'register',
				name: 'EventRegister',
				component: EventRegister,
			},
			{
				path: 'edit',
				name: 'EventEdit',
				component: EventEdit,
			},
		],
	},
	{
		// use this for redirection including children
		path: '/event/:afterEvent(.*)',
		redirect: (to) => {
			return { path: '/events/' + to.params.afterEvent }
		},
		// 1st path for 1st method in children
		// path: '/event/:id',

		// 1st method
		// redirect: (to) => {
		// 	return { name: 'EventDetails', params: { id: to.params.id } }
		// },
		// end of 1st
		// 2nd method
		// redirect: () => {
		// 	return { name: 'EventDetails' }
		// },
		// end of 2nd
		// for children 1st
		// children: [
		// 	{ path: 'register', redirect: () => ({ name: 'EventRegister' }) },
		// 	{ path: 'edit', redirect: () => ({ name: 'EventEdit' }) },
		// ],
		// end for children 1st
	},
	{
		path: '/about',
		name: 'About',
		component: About,
	},
	{
		// Match all routes that don't match an existing route
		path: '/:catchAll(.*)',
		name: NotFound,
		component: NotFound,
	},
	{
		path: '/404/:resource',
		name: '404Resource',
		component: NotFound,
		props: true,
	},
	{
		path: '/network-error',
		name: 'NetworkError',
		component: NetworkError,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
