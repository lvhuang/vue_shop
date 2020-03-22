import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/gloable.css'//引入公共样式


import axios from './utils/request'
Vue.prototype.$http = axios// 给Vue原型加上axios



new Vue({
  router,
  created:function(){window.$vue = this} ,
  render: h => h(App)
}).$mount('#app')

