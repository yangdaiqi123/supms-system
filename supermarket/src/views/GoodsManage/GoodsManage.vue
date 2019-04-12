<template>
  <div class="goods-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>商品管理</h3>
      </div>
      <el-row>
        <el-col :span="6">
          <!-- 所属分类 -->
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="classification">
              <el-select v-model="ruleForm.classification" placeholder="-----选择分类-----">
                <el-option value="酒水类"></el-option>
                <el-option value="服装类"></el-option>
                <el-option value="家居类"></el-option>
                <el-option value="电子通讯类"></el-option>
                <el-option value="家居类"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="18">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <!-- 查询 -->
            <el-form-item label="关键字" prop="query">
              <el-input v-model="ruleForm.query" style="width:200px"></el-input>
              <span>(商品名称，条形码)</span>
              <el-button type="success" size="medium">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <hr>
      <!-- 表单 -->
      <el-table ref="tableData" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="bar_code" label="商品条形码" width="130"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="130"></el-table-column>
        <el-table-column prop="classification" label="所属分类" width="100"></el-table-column>
        <el-table-column prop="price" label="售价(元)" width="100"></el-table-column>
        <el-table-column prop="PurchasePrice" label="促销价(元)" width="100"></el-table-column>
        <el-table-column prop="MarketValue" label="市场价(元)" width="100"></el-table-column>
        <el-table-column prop="stock" label="库存" width="100"></el-table-column>
        <el-table-column prop="totalInventory" label="库存总额(元)" width="130"></el-table-column>
        <!-- 管理 -->
        <el-table-column label="管理">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 5, 10,20,30]"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// 引入moment
import moment from "moment";
export default {
  data() {
    return {
      ruleForm: {
        classification: ""
      },
      rules: {},
      tableData: [],
      currentPage: 1, //当前页
      total: 20 //总条数
    };
  },
  methods: {

    //修改
    handleEdit() {},
    // 删除
    handleDelete() {},
    // 分页
    handleSizeChange() {},
    handleCurrentChange() {}
  },

  // 生命周期   钩子函数
  created() {
    // 请求账号数据
    this.request
      .get("/goods/goodslist")
      .then(res => {
        this.tableData = res;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
