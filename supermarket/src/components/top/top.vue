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
            <img height="100%" width="100%" src="./kobe.jpg" alt>
          </div>
        </el-col>
        <el-col :span="12">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link" style="color:#fff">
              {{account}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import local from "@/utils/local";
export default {
  data() {
    return {
      account: ""
    };
  },
  methods: {
    handleCommand(command) {
      if (command === "personal") {
       this.$router.push('/home/personal')
      } else if (command === "logout") {
        // 清楚token
        local.remove("s_t_t_w_h_n666");
        // 退出提示
        this.$message({
          type: "success",
          message: "退出成功，欢迎下次回来"
        });
        this.$router.push("/login");
      }
    },
    // 获取当前登陆账号
    getCurrentAccount() {
      this.request
        .get("/login/currentaccount")
        .then(res => {
          this.account = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getCurrentAccount();
  }
};
</script>

<style lang="less">
.photo {
  width: 50px;
  height: 50px;
  background-color: #fff;
  margin-top: 5px;
  border-radius: 50%;
  img {
    border-radius: 50%;
  }
}
</style>
