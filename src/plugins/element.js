import Vue from 'vue'
// 导入弹框提示组件
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)     
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
// 把弹框组件挂载到vue实例上，每一个组件可以通过this.$message来使用弹框组件提示





