<template>
  <div class="personal">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>个人中心</h3>
      </div>
      <p>用户名：{{accountInfo.account}}</p>
      <p>用户组：{{accountInfo.user_group}}</p>
      <p>创建时间：{{accountInfo.create_date | filterDate}}</p>
      <el-upload
        class="avatar-uploader"
        action="suergou"
        :http-request="upLoad"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
// 引入模块
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      accountInfo: {},
      imageUrl: ""
    };
  },
  methods: {
    getaccountInfo() {
      this.request
        .get("/account/accountinfo")
        .then(res => {
          this.accountInfo = res[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 头像上传之前
    beforeAvatarUpload(file) {
      // const isJPG=file.type ==='img/jpg';
      const isLt2M=file.size/1024/1024<2;

      // if(!isJPG){
      //   this.$message.error("上传图像只能是JPG格式")
      // }
      if(!isLt2M){
        this.$message.error("上传头像不能超过2M")
      }
      return isLt2M;
    },
    // 自定义上传函数

    upLoad(file) {
      // 创建一个formdata对象
      let formData= new FormData();
      formData.append('file',file.file)
      // 发送给后端
      axios.post('/account/upload',formData,{
        header:{
           'Content-Type': 'multipart/form-data'
        }
      })
      .then(response=>{
           // 接收后端响应的数据
              let {code, reason, path} = response.data;   
              // 判断   
              if (code === 0) {
                  this.$message({
                      type: 'success',
                      message: reason
                  })
                 // 回填头像
                 this.imageUrl = `http://127.0.0.1:777${path}`; 

                //  触发父组件方法
                this.$emit('A')
                
              } else if (code === 1) {
                  this.$message.error(reason)
              }

      })
      .catch(err=>{
        console.log(err);
        
      })

    }
  },

  created() {
    this.getaccountInfo();
  },
  filters: {
    filterDate(val) {
      return moment(val).format("YYYY/MM/DD hh:mm:ss");
    }
  }
};
</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
