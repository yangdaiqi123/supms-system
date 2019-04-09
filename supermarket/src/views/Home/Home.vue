<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <!-- 左侧导航 -->
        <LeftNav></LeftNav>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 头部 -->
          <Top></Top>
        </el-header>
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
        <el-footer>
          <Bottom></Bottom>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入组件
import LeftNav from "@/components/leftNav/leftNav.vue";
import Top from "@/components/top/top.vue";
import Bottom from "@/components/bottom/bottom.vue";
export default {
  // 注册组件
  components: {
    LeftNav,
    Top,
    Bottom
  }
};
</script>

<style lang="less">
.home {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
     
      background-color:#0C2836;
      color: #0C2836;
      text-align: center;
      line-height: 200px;
    }
    .el-container {
      .el-header {
        background-color:#0C2836;
        color:#fff;
        line-height: 60px;
      }
      .el-footer {
        font-size:12px;
        line-height: 60px;
        border-top: 1px solid #2d3a4b;
      }

      .el-main {
        
        background-color: #fff;
      }
    }
  }
}
</style>
