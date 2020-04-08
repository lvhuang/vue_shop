<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="../assets/heima.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <!-- <el-button type="info" @click="logout">{{this.$store.state.admin}}</el-button> -->
      <el-dropdown @command="logout">
        <span class="el-dropdown-link">
          <el-button type="info">{{this.$store.state.username}}</el-button>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
          <el-dropdown-item>个人中心</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <!-- 侧边栏布局内容 -->
      <el-aside :width="isCollapse? '64px':'200px'">
        <!-- 折叠 -->
        <div class="toggle_button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <!-- 一级菜单 -->
          <el-submenu :index="'/'+item.path+''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+subitem.path+''"
              v-for="subitem in item.children"
              :key="subitem.id"
            >
              <i class="el-icon-menu"></i>
              <span slot="title">{{subitem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      menulist: [],
      iconObj: {
        "125": "el-icon-s-custom",
        "103": "el-icon-s-claim",
        "101": "el-icon-s-goods",
        "102": "el-icon-s-data",
        "145": "el-icon-s-platform"
      },
      isCollapse: false
    };
  },
  created() {
    this.getMenuList();
  },
  mounted() {
    console.log("当前激活的路由信息对象-----", this.$route);
    console.log("router 实例-----", this.$router);
  },
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push("/login");
    },
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
      console.log(res);
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>logout

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 20px;
  > div {
    //嵌套使用方法
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.toggle_button {
  background-color: #4a5064;
  font-size: 10px;
  color: #fff;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>