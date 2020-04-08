import Vue from 'vue'
import Vuex from 'vuex'

// import VueXAlong from 'vuex-along'

// 使用vuex
Vue.use(Vuex);

// 创建vuex实例，将数据存储在store中
const store = new Vuex.Store({
    // 共享数据存储在state中
    state: {
        count: 1,
        danjia: 0,
        shuliang: 0,
        username: localStorage.getItem("username") || ''
    },
    getters: {
        getStateCount(state) {
            return state.count + 1
        },
        zongjia(state) {
            return state.danjia * state.shuliang
        }
    },
    mutations: {
        addFun(state) {
            state.count++
        },
        reduceFun(state) {
            state.count--
        },
        userName(state, username) {
            state.username = username
        },
    },
    actions: {
        addFun1(context) {
            context.commit("addFun")
        },
        reduceFun1(context) {
            context.commit("reduceFun")
        },
        userName1(context, username) {
            console.log(username);

            context.commit("userName", username)
        }
    },
    // plugins: [VueXAlong({
    //     name: 'username',     //存放在localStroage或者sessionStroage 中的名字
    //     local: false,      //是否存放在local中  false 不存放 如果存放按照下面session的配置配
    //     session: { list: [], isFilter: true } //如果值不为false 那么可以传递对象 其中 当isFilter设置为true时， list 数组中的值就会被过滤调,这些值不会存放在seesion或者local中
    // })]
})

export default store

