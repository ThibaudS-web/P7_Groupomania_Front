import { createRouter, createWebHistory } from 'vue-router'
import Signin from '../views/Signin'
import Signup from '../views/Signup'
import Home from '../views/Home'
import Profil from '../views/Profil'

const routes = [
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/signin',
        name: 'Signin',
        component: Signin
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/profil",
        name: "Profil",
        component: Profil,
        meta: { requiresAuth: true }
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkExactActiveClass: "link-active-class",
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    console.log(token)
    if (to.matched.some(record  => record.meta.requiresAuth)) {
        if (!token) {
            console.log(!token)
            next({
                name: "Signin"
            });
        } else {
            console.log('Token Valide !')
            next()
        }
    } else {
        next()
    }
})

export default router