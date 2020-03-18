import Vue from 'vue'
// 导入弹框提示组件
import {
    Button,
    Form, FormItem, Input, Message, Container, Header, Aside,
    Main, Menu, Submenu, MenuItemGroup, MenuItem,
    Breadcrumb, BreadcrumbItem, Card, Row, Col, Table,
    TableColumn, Switch, Tooltip, Pagination, Dialog
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)

Vue.prototype.$message = Message
// 把弹框组件挂载到vue实例上，每一个组件可以通过this.$message来使用弹框组件提示





