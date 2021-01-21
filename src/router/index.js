import {
	defineAsyncComponent
} from 'vue'
import {
	createRouter,
	createWebHistory,
} from 'vue-router'


const routes = [{
		path: '/',
		redirect: {
			name: 'layout'
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/user/userLogin.vue'),
	},
	{
		path: '/regist', //用户注册
		name: 'regist',
		component: () => import('@/views/user/userRegist.vue'),
	},
	{
		path: '/layout',
		name: 'layout',
		// component: defineAsyncComponent(() => import('@/views/layout/main.vue')),
		component: () => import('@/views/layout/layout.vue'),
		redirect: {
			name: 'home',
		},
		children: [{
				path: '/home',
				name: 'home',
				// component: defineAsyncComponent(() => import('@/views/home/index.vue')),
				component: () => import('@/views/home/index.vue'),
			},
			{
				path: '/about',
				name: 'about',
				component: () => import('@/views/about/index.vue'),
			},
			{
				path: '/community/:communityId', //社区板块
				name: 'community',
				component: () => import('@/views/community/index.vue'),
			},
			{
				path: '/user/:userName/noteList', //单一用户文章列表
				name: 'userNoteList',
				component: () => import('@/views/note/userNoteList.vue'),
			},

			{
				path: '/note/create', //创建文章
				name: 'createNote',
				component: () => import('@/views/note/createNote.vue'),
			},

			{
				path: '/note/view/:articalId', //查看某一文章
				name: 'viewNote',
				component: () => import('@/views/note/viewNote.vue'),
			},
			{
				path: '/note/edit/:articalId', //编辑某一文章
				name: 'editNote',
				component: () => import('@/views/note/editNote.vue'),
			},
			// {
			// 	path: '/problem/create', //创建问题
			// 	name: 'createProblem',
			// 	component: () => import('@/views/problem/createProblem.vue'),
			// },
			// {
			// 	path: '/problem/view/:articalId', //查看某一个问题
			// 	name: 'viewProblem',
			// 	component: () => import('@/views/problem/viewProblem.vue'),
			// },
			{
				path: '/user', //创建问题
				name: 'user',
				component: () => import('@/views/user/user.vue'),
			},
		]
	}
]



export default createRouter({
	history: createWebHistory(),
	routes,
})