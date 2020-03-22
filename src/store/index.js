import Vue from 'vue'
import Vuex from 'vuex'

// 使用vuex
Vue.use(Vuex);

// 创建vuex实例
const store = new Vuex.Store({
    state: {
        count: 1,
        danjia: 0,
        shuliang: 0,
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
    },
    actions: {
        addFun1(context) {
            context.commit("addFun")
        },
        reduceFun1(context) {
            context.commit("reduceFun")
        }
    }
})

export default store

