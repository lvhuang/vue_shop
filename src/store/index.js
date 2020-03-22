import Vue from 'vue'
import Vuex from 'vuex'

// 使用vuex
Vue.use(Vuex);

// 创建vuex实例
const store = new Vuex.Store({
    state: { count: 1 },
    getters: {
        getStateCount(state) {
            return state.count + 1
        }
    },
    mutations:{
        addFun(state){
            state.count++
        },
        reduceFun(state){
            state.count--
        }
    },
    actions:{
        addFun1(context){
            context.commit("addFun")
        },
        reduceFun1(context){
            context.commit("reduceFun")
        }
    }
})

export default store

