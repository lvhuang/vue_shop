<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录图标 -->
      <div class="avater_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录内容 -->
      <div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_from">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-s-cooperation"
              type="password"
            ></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetloginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据对象
      loginForm: {
        username: "",
        password: ""
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods:{
    resetloginForm(){
      // console.log(this)获取组件实例
      this.$refs.loginFormRef.resetFields()
    },
    login(){
      this.$refs.loginFormRef.validate((valid)=>{
        console.log(valid)
      })
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); // 固定宽高剧中

  .avater_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 8px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
