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
          <!-- 通过在input组件双向绑定数据，把查询参数绑定，然后通过get获取数据 -->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList()">
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
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
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <!-- 修改，删除，角色分配按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
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
    <!-- 添加用户对话框模块组件 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 弹窗中添加表单 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 弹框下面确认取消栏 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框模块组件 -->
    <el-dialog
      title="添加用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @closed="editDialogClosed"
    >
      <!-- 修改弹框中的列表 -->
      <el-form :model="editData" :rules="editDataRules" ref="editDataRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="emial">
          <el-input v-model="editData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 弹框下面确认取消栏 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LoginVue from "./Login.vue";
export default {
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^1(3[0-9]|5[189]|8[6789])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };

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
      total: 0,
      // 控制添加对话框显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据addForm
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 添加表单的用户规则内容
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
      // 控制修改对话框显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editData: {},
      // 修改表单验证规则对象
      editDataRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取用户列表数据
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
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听状态更改
    async userStateChanged(userInfor) {
      console.log(userInfor);
      // put更新用户数据
      const { data: res } = await this.$http.put(
        `users/${userInfor.id}/state/${userInfor.mg_state}`
      );
      if (res.meta.status !== 200) {
        userInfor.mg_state = !userInfor.mg_state;
        return this.$message.error("更新用户状态失败");
      }
      this.$message.success("更新用户状态成功");
    },
    // 添加对话框关闭之后添加内容重定向
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 添加弹框确认提交之前对数据进行预验证,添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        // 发起添加数据信息的请求
        const { data: res } = await this.$http.post("users", this.addForm);
        if ((res.meta.status = !200)) {
          this.$message.error("添加用户失败");
        }
        this.$message.success("添加用户成功");
        // 添加用户成功，关闭弹框addDialogVisible = false"
        this.addDialogVisible = false;
        this.getUserList();
      });
    },
    // 展示编辑用户的对话框
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("users/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("编辑用户失败");
      }
      this.editData = res.data;
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editDataRef.resetFields();
    },
    // 修改用户信息，进行预验证并提交数据
    editUserInfo() {
      this.$refs.editDataRef.validate(async valid => {
        if (!valid) return;
        // 发起修改用户信息的请求
        const { data: res } = await this.$http.put(
          "users/" + this.editData.id,
          {
            email: this.editData.email,
            mobile: this.editData.mobile
          }
        );
        if (res.meta.status !== 200) {
          this.$message.error("更新用户数据失败");
        }
        // 跟新数据成功，关闭对话框、刷新数据、提示修改用户成功
        this.editDialogVisible = false;
        this.getUserList();
        this.$message.success("更新用户数据成功");
      });
    }
  }
};
</script>

<style lang="stylus" scoped></style>