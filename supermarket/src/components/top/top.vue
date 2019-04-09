<template>
  <div class="top">
    <el-row>
      <el-col :span="20">
        <h3>
          <i class="el-icon-star-off"></i>
          华联超市管理系统
        </h3>
      </el-col>
      <el-col :span="4">
        <el-col :span="12">
          <div class="photo">
          <img height="100%" width="100%" src="./kobe.jpg" alt="">
        </div>
        </el-col>
        <el-col :span="12">
        <el-dropdown>
          <span class="el-dropdown-link" style="color:#fff">
            苏二狗
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </el-col>
       
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.photo {
  width: 50px;
  height: 50px;
  background-color: #fff;
  margin-top: 5px;
  border-radius: 50%;
  img{
       border-radius: 50%;
  }
}
</style>
