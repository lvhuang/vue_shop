import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/Users.vue'
import Rights from '../components/power/Rights.vue'
const routes = [
    { path: '/', redirect: '/login' }, //route
    { path: '/login', component: Login },
    {
        path: '/home', component: Home, redirect: '/welcome',
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/users', component: Users },
            { path: '/rights', component: Rights }
        ]
    }
]

export default routes