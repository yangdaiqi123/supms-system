<template>
  <div class="sales-total">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>销售数据统计</h3>
      </div>
      <el-row>
        <el-col :span="24">
          时间:
          <el-date-picker
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            default-value="2010-10-01"
          ></el-date-picker>
          <!-- 销售统计下拉框 -->
          <el-dropdown size="medium" split-button trigger="click" style="margin-left:10px">
            销售情况统计
            <el-dropdown-menu>
              <el-dropdown-item>10</el-dropdown-item>
              <el-dropdown-item>20</el-dropdown-item>
              <el-dropdown-item>30</el-dropdown-item>
              <el-dropdown-item>40</el-dropdown-item>
              <el-dropdown-item>50</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="medium" type="success" style="margin-left:10px">查询</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
