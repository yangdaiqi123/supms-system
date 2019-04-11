<template>
  <div class="account-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>添加管理员账号</h3>
      </div>
      <!-- 登录表单 -->
      <el-form
        :model="accountAddForm"
        style="width:400px"
        status-icon
        :rules="rules"
        size="small"
        ref="accountAddForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 账号 -->
        <el-form-item label="账号:" prop="account">
          <el-input type="text" v-model="accountAddForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="accountAddForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="accountAddForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 选择用户组 -->
        <el-form-item label="选择用户组" prop="userGroup">
          <el-select v-model="accountAddForm.userGroup" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">添加</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入验证函数
import { passwordReg } from "@/utils/validator";
// 引入qs
import qs from "qs";
export default {
  data() {
    // 自定义密码验证函数
    const chickPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (!passwordReg(value)) {
        callback(
          new Error("以字母开头，长度在3~6之间，只能包含字符、数字和下划线")
        ); //错误提示
      } else {
        if (this.accountAddForm.checkPass !== "") {
          this.$refs.accountAddForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 确认密码自定义函数
    const confirmPassword = (rule, value, callback) => {
      if (value === "") {
        //非空验证
        callback(new Error("密码不能为空"));
      } else if (value !== this.accountAddForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback(); //成功
      }
    };
    return {
      // 表单数据
      accountAddForm: {
        account: "",
        password: "",
        checkPass: "",
        userGroup: ""
      },
      // 验证规则
      rules: {
        // 账号
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "账号长度在3-6位", trigger: "blur" }
        ],
        // 密码
        password: [
          { required: true, validator: chickPassword, trigger: "blur" }
        ],
        // 确认密码
        checkPass: [
          { required: true, validator: confirmPassword, trigger: "blur" }
        ],
        // 用户组
        userGroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 添加账号
    submitForm() {
      this.$refs.accountAddForm.validate(valid => {
        //如果所有的验证都通过
        if (valid) {
          // 提交数据给后端
          let params = {
            account: this.accountAddForm.account,
            password: this.accountAddForm.password,
            userGroup: this.accountAddForm.userGroup
          };
          // 发送axios请求  把数据给后端
          this.request
            .post("/account/accountadd", params)
            .then(res => {
              // 获取后端返回来的数据
              let { code, reason } = res;
              // 判断
              if (code === 0) {
                //成功
                this.$message({
                  type: "success",
                  message: reason
                });
                this.$router.push("/home/accountmanage");
              } else if (code === 1) {
                // 失败
                this.$message.error(reason);
              }
            })
            .cathch(err => {
              console.log(err);
            });
        } else {
          console.log("验证不通过，请重新添加");
          return;
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.accountAddForm.resetFields();
    }
  }
};
</script>

<style lang="less">
.el-card {
  .el-form {
    .el-form-item {
      margin-bottom: 30px;
    }
  }
}
</style>
