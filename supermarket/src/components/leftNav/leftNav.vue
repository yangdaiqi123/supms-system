<template>
  <div class="left-nav">
    <el-menu
      default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#0C2836"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
    >
      <!-- 系统管理 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/systeminfo">系统信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 账号管理 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-news"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/accountmanage">账号管理</el-menu-item>
          <el-menu-item index="/home/accountadd">添加账号</el-menu-item>
          <el-menu-item index="/home/passwordmodify">密码修改</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 系统管理 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/goodsmanage">商品管理</el-menu-item>
           <el-menu-item index="/home/goodsadd">添加商品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 统计管理 -->
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-loading"></i>
          <span>统计管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/salestotal">销售统计</el-menu-item>
          <el-menu-item index="/home/stocktotal">进货统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {

};
</script>

<style>

</style>
