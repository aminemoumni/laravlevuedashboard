import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Profile from '../components/Profile'
import Dashboard from '../components/Dashboard'
import Users from '../components/Users'

const router = new VueRouter({
    mode: 'history',
    routes: [
        // 
        //     path: '/',
        //     name: 'home',
        //     component: Home,
        // },
        { 
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        { 
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        { 
            path: '/users',
            name: 'users',
            component: Users
        }
       
    ],
    linkActiveClass: 'active'
});

export default router