<template>
  <div>
    <!-- 用户列表页面首航面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="usersList" width="100%" border stipe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <!--作用域插槽的使用获取该列所有数据  -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <!-- 修改，删除，角色分配按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip effect="dark" content="角色分配" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 4, 5, 6]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import LoginVue from "./Login.vue";
export default {
  data() {
    // 获取列表查询参数写到一个data里面，后面直接引用
    return {
      queryInfo: {
        query: "",
        // 当前页数
        pagenum: 1,
        // 每页显示几条数据
        pagesize: 2
      },
      // 存储列表数据
      usersList: [],
      total: 0
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取列表数据
    async getUserList() {
      var { data: res } = await this.$http.get("users", {
        params: this.queryInfo
      });
      console.log(res);
      if (res.meta.status !== 200)
        return this.$message.error("res.data.meta.msg");
      this.usersList = res.data.users;
      this.total = res.data.total;
    },
    // 监听页面数据改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
     // 监听页数改变事件
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    }
  }
};
</script>

<style lang="stylus" scoped></style>