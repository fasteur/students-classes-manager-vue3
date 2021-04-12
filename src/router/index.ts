import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        components: {
            container: Main,
        },
        children: [
            {
                path: '',
                components: {
                    content: Home
                }
            },
            {
                path: 'teacher-dashboard',
                name: 'TeacherDashboard',
                components: {
                    content: () => import(/* webpackChunkName: "about" */ '../views/TeacherDashboard.vue')
                },
            }
        ]
    },
    {
        path: '/login',
        name: 'Login', 
        components: {
            container: () => import('../views/Login.vue')
        }
    },
    {
        path: '/register',
        name: 'Register', 
        components: {
            container: () => import('../views/Register.vue')
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
