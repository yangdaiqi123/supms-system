<template>
  <div class="password-modify">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>密码修改</h3>
      </div>
      <!-- 修改表单 -->
      <el-form
        :model="PasswordModify"
        style="width:400px"
        status-icon
        :rules="rules"
        size="small"
        ref="PasswordModify"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 账号 -->
        <el-form-item label="原密码:" prop="oldPassword">
          <el-input type="password" v-model="PasswordModify.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="新密码:" prop="newPassword">
          <el-input type="password" v-model="PasswordModify.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 确认新密码 -->
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="PasswordModify.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 修改 -->
      <el-button type="success" style="margin-left:100px">修改</el-button>
    </el-card>
  </div>
</template>

<script>
// 引入验证函数
import { passwordReg } from "@/utils/validator";
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
        if (this.PasswordModify.checkPass !== "") {
          this.$refs.PasswordModify.validateField("checkPass");
        }
        callback();
      }
    };
    // 确认密码自定义函数
    const confirmPassword = (rule, value, callback) => {
      if (value === "") {
        //非空验证
        callback(new Error("密码不能为空"));
      } else if (value !== this.PasswordModify.newPassword) {
        callback(new Error("两次密码不一致"));
      } else {
        callback(); //成功
      }
    };
    return {
      // 表单数据
      PasswordModify: {
        oldPassword: "",
        newPassword: "",
        checkPass: "",
      },
      // 验证规则
      rules: {
       // 原密码
        oldPassword:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:3,max:6,message:"账号是原密码",trigger:'blur'}
        ],
        // 密码
        newPassword:[
          {required:true,validator:chickPassword,trigger:'blur'}
        ],
        // 确认密码
        checkPass:[
            {required:true,validator:confirmPassword,trigger:'blur'}
        ],
      }
    };
  },
  methods: {
    // 添加账号
    submitForm(){
      this.$refs.PasswordModify.validate(valid=>{
        //如果所有的验证都通过
        if(valid){
          // 提交数据给后端
          let params={        
            password:this.PasswordModify.password,
          }
          alert('恭喜你修改成功')

          // 路由跳转
          this.$router.push('/home/accountmanage')
        }else{
          console.log("请重新修改");
          return
          
        }
      })

    },
  }
};
</script>

<style lang="less">
.el-card{
  .el-form{
    .el-form-item{
      margin-bottom: 30px;
    }
  }
}
</style>
