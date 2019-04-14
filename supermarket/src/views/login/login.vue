<template>
  <div class="login">
    <div class="login-wrap">
      <!-- 标题 -->
      <div class="title">
        <span class="el-icon-menu"></span>
        华联超市管理系统
      </div>
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 账号 -->
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 引入验证密码函数
import { passwordReg } from "@/utils/validator";
// 引入 local 文件
import local from "@/utils/local";

export default {
  data() {
    // 确认密码自定义验证函数
    const confirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空")); // 输出错误提示信息
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次密码不一致")); // 输出错误提示信息
      } else {
        callback(); // 成功
      }
    };
    // 密码的自定义验证函数
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        // 非空
        callback(new Error("密码不能为空")); // 错误提示
      } else if (!passwordReg(value)) {
        callback(
          new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线")
        ); // 错误提示
      } else {
        if (this.loginForm.checkPass !== "") {
          // 如果确认密码不为空
          this.$refs.loginForm.validateField("checkPass");
        }
        callback(); // 成功回调
      }
    };
    return {
      // 表单数据
      loginForm: {
        account: "",
        password: "",
        checkPass: ""
      },
      // 验证规则
      rules: {
        // 账号
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }, // 非空
          { min: 3, max: 6, message: "账号长度 3~6 位", trigger: "blur" } // 长度
        ],
        // 密码
        password: [
          { required: true, validator: checkPassword, trigger: "blur" } // 自定义验证
        ],
        // 确认密码
        checkPass: [
          { required: true, validator: confirmPassword, trigger: "blur" } // 自定义验证
        ]
      }
    };
  },
  methods: {
    // 登录
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        // 如果所有前端验证都通过
        if (valid) {
          // 提交数据给后端
          let params = {
            account: this.loginForm.account,
            password: this.loginForm.password
          };
          // 发送请求  把数据后端
          this.request
            .post("/login/checklogin", params)
            .then(res => {
              // 接受后端传回来的数据
              let { code, reason, token } = res;
              if (code === 0) {
                // 把token存入浏览器
                local.save("s_t_t_w_h_n666", token);
                // 成功
                this.$message({
                  type: "success",
                  message: reason
                });
                //跳转页面
                this.$router.push("/home");
              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("请重新登陆");
          return;
        }
      });
    },
    // 重置
    resetForm() {
      // 重置表单
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background-image: url("../../assets/timg.jpg");
  .login-wrap {
    width: 500px;
    height: 350px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 22px 56px 0px 0;
    box-sizing: border-box;
    // 水平垂直居中
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    // 标题
    .title {
      font-size: 24px;
      color: #fff;
      font-weight: bold;
      margin-left: 59px;
      margin-bottom: 20px;
    }
    .el-form {
      .el-form-item {
        .el-form-item__label {
          color: #fff;
        }
      }
    }
  }
}
</style>
