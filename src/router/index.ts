import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/teacher-dashboard',
        name: 'TeacherDashboard',
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/TeacherDashboard.vue'),
    },
    {
        path: '/login',
        name: 'Login', 
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register', 
        component: () => import('../views/Register.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
