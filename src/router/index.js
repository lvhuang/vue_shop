import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "../config/router.config" //route
Vue.use(VueRouter)

let router = new VueRouter({routes})


// 挂载路由导航守卫


router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from从哪里而来
  // next是一个函数，表示放行
  //  next（）放行  next（‘login’）强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
