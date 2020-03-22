<template>
  <div>
    <div>我是state初始值{{this.$store.state.count}}</div>
    <div>我是从getters中的计算属性获取的值{{this.$store.getters.getStateCount}}</div>
    <button @click="zengjia">+++++++</button>
    <button @click="jianshao">-------</button>
    <input type="number" v-model="$store.state.danjia">单价
    <input type="number" v-model="$store.state.shuliang">数量
    <button >总价{{this.$store.getters.zongjia}}</button>
  </div>
</template>

<script>
export default {
  methods: {
    zengjia() {
      this.$store.dispatch("addFun1");
    },
    jianshao() {
      this.$store.dispatch("reduceFun1");
    },
    zongjia() {
      this.$store.dispatch("zongjia1");
    }
  }
};
</script>

