<template>
  <div class="system-info">
    <!-- 面板组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>系统信息</h3>
      </div>
      <el-alert title="商品总数：500。已经销售的总金额：890.00。库存商品总价：1235.88" type="info" show-icon></el-alert>
      <el-alert title="导入数据" type="success" :closable="false" show-icon></el-alert>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <!-- 销售排行 -->
              <span>销售排行</span>
            </div>
            <!-- 列表 -->
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="TradeName" label="商品名称" width="400"></el-table-column>
              <el-table-column prop="SalesVolume" label="销量"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card class="box-card">
            <!-- 缺货的商品 -->
            <div slot="header" class="clearfix">
              <span>缺货的商品</span>
            </div>
            <!-- 列表 -->
            <el-table :data="ShortageData" stripe style="width: 100%">
              <el-table-column prop="TradeName" label="商品名称" width="180"></el-table-column>
              <el-table-column prop="Stock" label="库存"></el-table-column>
              <el-table-column label="操作">
                <template>
                  <el-button size="mini">入库</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 销售排行列表
      tableData: [
        {
          TradeName: "你的霸王防脱",
          SalesVolume: 999
        },
        {
          TradeName: "他的海飞丝去屑",
          SalesVolume: 11
        },
        {
          TradeName: "她的阿道夫",
          SalesVolume: 133
        },
        {
          TradeName: "我的飘柔",
          SalesVolume: 11
        }
      ],
      // 缺货商品列表
      ShortageData: [
        {
          TradeName: "你的优乐美",
          Stock: 30
        },
        {
          TradeName: "他的哇哈哈",
          Stock: 20
        },
        {
          TradeName: "我的爽歪歪",
          Stock: 10
        },
        {
          TradeName: "大家的小茗同学",
          Stock: 0
        }
      ]
    };
  }
};
</script>

<style lang="less">
.box-card {
  .el-card__header {
    padding: 10px 20px;
    background-color: #e9e9e9;
  }
  .el-alert {
    margin-bottom: 10px;
  }
}
</style>
