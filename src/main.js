import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/gloable.css'//引入公共样式
import axios from 'axios'// 引入axios

Vue.config.productionTip = false


axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'// 设置公共请求地址
// 通过axios请求拦截器添加token验证
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 必须要return config
  return config
})
// 添加响应拦截器
axios.interceptors.response.use((response) =>{
  // 对响应数据做点什么
  console.log(response);
  return response;
});
Vue.prototype.$http = axios// 给Vue原型加上axios



new Vue({
  router,
  created:function(){window.$vue = this} ,
  render: h => h(App)
}).$mount('#app')

