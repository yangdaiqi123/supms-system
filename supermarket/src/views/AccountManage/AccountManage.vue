<template>
  <div class="account-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>账号管理</h3>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <!-- 用户名称 -->
        <el-table-column prop="account" label="用户名称" width="300"></el-table-column>
        <!-- 用户组 -->
        <el-table-column prop="user_group" label="用户组" width="300"></el-table-column>
        <!-- 账号创建日期 -->
        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.create_date |filterDate }}</template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <!-- 批量选择 -->
      <div style="margin-top: 20px">
        <el-button type="danger">批量删除</el-button>
        <el-button type="success">取消选择</el-button>
      </div>
    </el-card>
  </div>
</template>
 


<script>
// 引入moment
import moment from 'moment';
export default {
  data() {
    return {
      tableData: [    ],
      currentPage: 1, //当前页

      total: 20 //总条数
    };
  },
  methods: {
    handleEdit() {},
    handleDelete() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  // 生命周期 钩子函数
  created(){
    // 请求账号数据
    this.request.get('/account/accountlist')
      .then(res=>{
        console.log(res);
        this.tableData=res;
      })
      .catch(err=>{
        console.log(err);
        
      })
  },
  filters: {
    // 过滤时间
    filterDate (time) {
      return moment(time).format('YYYY-MM-DD hh:mm:ss')
    }
  }
}


</script>

<style>
</style>
