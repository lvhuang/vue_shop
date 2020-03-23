<template>
  <div>
    我是权限列表
    <!-- 用户列表页面首航面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 权限列表区域 -->
      <el-table :data="rightsList" width="100%" border stipe>
        <!-- 添加索引列type="index" -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <!-- 通过插槽拿到该列的level，用v-if判断level -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="danger" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 用户列表需要渲染的数据存储在rightsList中
      rightsList: []
    };
  },
  created() {
    this.getRightsList();
  },
  methods: {
    // 获取列表数据
    async getRightsList() {
      const { data: res } = await this.$http.get("rights/list");
      console.log(res);

      if (res.meta.status !== 200) {
        return this.$message.error("获取权限列表失败");
      }
      this.rightsList = res.data;
    }
  }
};
</script>

<style lang="less" scoped></style>