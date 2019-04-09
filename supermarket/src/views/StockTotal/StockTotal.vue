<template>
  <div class="stock-total">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>进货统计</h3>
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
