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
      <el-button type="success" style="margin-left:100px" @click="submitForm()">修改</el-button>
    </el-card>
  </div>
</template>

<script>
// 引入验证函数
import { passwordReg } from "@/utils/validator";
import local from '@/utils/local'
export default {
  data() {
    // 旧密码验证
    const chickOldPassword=(rule,value,callback)=>{
      // 发送请求给后端
      this.request.post('/account/passwordmodify',{oldPassword:value})
      .then(res=>{
        // 接受后端发出来的请求
        let{code,reason}=res;
        if(code ===0){
          callback();
        }else if(code === 1){
          callback(new Error(reason))
        }
      })
      .catch(err=>{
        console.log(err);
        
      })
    };
    // 验证新密码

    // 自定义密码验证函数
    const chickPassword = (rule, value, callback) => {
       if (value === '') {
                callback(new Error('请输入新密码'))
            } else if (!passwordReg(value)) {
                callback(new Error('字母开头，3~6位，只能有字符、数字、下划线'))
            } else {
                if (this.PasswordModify.checkPass !== '') {
                    this.$refs.PasswordModify.validateField('checkPass')
                }
                callback()
            }
    
    };
    // 确认密码自定义函数
    const confirmPassword = (rule, value, callback) => {
       if (value === '') {
                callback(new Error('请输入确认新密码'))
            } else if (value !== this.PasswordModify.newPassword) {
                callback(new Error('两次密码不一致'))
            } else {
                callback()
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
          {required:true,validator:chickOldPassword,trigger:'blur'},
       
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
    // 修改密码
    submitForm(){
      this.$refs.PasswordModify.validate(valid=>{
        if(valid){
          let params={
            newPassword: this.PasswordModify.newPassword}

          // 发送请求给后端
          this.request.post('/account/savenewpassword',params)
          .then(res=>{
            // 接受后端发过来的数据
            let{code,reason}=res;
            if(code === 0){
              this.$message({
                type:"success",
                message:reason
              })
              // 删除token
              local.remove('s_t_t_w_h_n666')
              // 跳转到登陆页面
              this.$router.push('/login')
            }else if (code===1){
              this.$message.error(reason)
            }
          })
          .catch(err=>{
            console.log(err);
            
          })
        }
      })

    }

   
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
