import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/gloable.css'//引入公共样式
import axios from 'axios'// 引入axios

Vue.config.productionTip = false


axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'// 设置公共请求地址
Vue.prototype.$http = axios// 给Vue原型加上axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
