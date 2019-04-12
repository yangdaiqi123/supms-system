<template>
  <div class="account-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>账号管理</h3>
      </div>
      <el-table
        ref="tableData"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- 选择框 -->
        <el-table-column type="selection" width="55"></el-table-column>
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
            <el-button size="mini" @click="handleEdit(scope.row.id)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 修改的模态框 -->
      <el-dialog title="修改账号" :visible.sync="dialogFormVisible" width="400px">
        <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
          <!-- 用户名称 -->
          <el-form-item label="用户名称:" prop="account">
            <el-input type="text" v-model="editForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 选择用户组 -->
          <el-form-item label="选择用户组：" prop="userGroup">
            <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 5, 10,20,30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 批量选择 -->
      <div style="margin-top: 20px">
        <el-button type="danger" @click="batchdelet">批量删除</el-button>
        <el-button type="success" @click="deselected">取消选择</el-button>
      </div>
    </el-card>
  </div>
</template>
 


<script>
// 引入moment
import moment from "moment";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页
      pageSize:3,
      dialogFormVisible: false,
      //模态框
      editForm: {
        account: "",
        user_group: ""
      },
      rules: {
        // 模态框账号验证
        account: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 3, max: 6, message: "账号长度在3-6位", trigger: "blur" }
        ]
      },
      selectedId: [],
      editId: "",
      total:0 //总条数
    };
  },
  methods: {
    // 分页数据
    getAccountListPage(){
      let params={
        currentPage:this.currentPage,
        pageSize:this.pageSize
      }
      // 发送请求
      this.request.get('/account/accountListPage',params)
      .then(res=>{
        // 接受后端返回来的数据
        let{total,data}=res;
        // 赋值给对应的变量
        this.total=total;
        this.tableData=data;

        if(!data.length && this.currentPage !==1){
          this.currentPage -=1
          this.getAccountListPage()
        }

      })
      .catch(err=>{
        console.log(err);
        
      })
    },

    // 修改账号
    handleEdit(id) {
      // 显示模态框
      this.dialogFormVisible = true;
      // 保存要修改的id
      this.editId = id;
      // 发送请求传id给后端
      this.request
        .get("/account/editaccount", { id })
        .then(res => {
          // 数据回填
          (this.editForm.account = res[0].account),
            (this.editForm.userGroup = res[0].user_group);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存修改的账号
    saveEdit() {
      //获取表单里面的数据
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 关闭
          this.dialogFormVisible = false;
          // 收集参数
          const params = {
            account: this.editForm.account,
            userGroup: this.editForm.userGroup,
            editId: this.editId
          };
          // 发送请求  传id给后台
          this.request
            .post("/account/saveEdit", params)
            .then(res => {
              // 接受后端响应回来的数据
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
              } else if (code === 1) {
                this.$message.error(reason);
              }
              // 刷新列表
              this.getAccountListPage()
            })
            .catch(err => {
              console.log(err);
            });
        } else {
        }
      });
    },
    // 删除数据
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送请求，传id给后端
          this.request
            .get("/account/delaccount", { id })
            .then(res => {
              // 接受后端响应回来的数据
              let { code, reason } = res;
              if (code === 0) {
                //成功
                this.$message({
                  type: "success",
                  message: reason
                });
                // 刷新列表
                 this.getAccountListPage()
              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 取消选择
    deselected() {
      this.$refs.tableData.clearSelection();
    },
    handleSelectionChange(val) {
      this.selectedId = val.map(v => v.id);
    },
    // 批量删除
    batchdelet() {

      // 无选择给出错误提示
      if(!this.selectedId.length){
        // 弹错误提示
        this.$message.error("请选择后，在进行删除");
        return
      }
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 获取id
          let params = {
            idArr: this.selectedId
          };
          // 发送请求把id传给后端
          this.request
            .get("/account/batchdelet", params)
            .then(res => {
              // 接受后端响应回来的数据
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                // 刷新列表
               this.getAccountListPage()
              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 每条页数
    handleSizeChange(val) {
      this.pageSize=val;
      this.getAccountListPage();
    },
    // 当前页码改变
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getAccountListPage();
    }
  },
  // 生命周期 钩子函数
  created() {
    this.getAccountListPage();
   
  },
  // 过滤器
  filters: {
    // 过滤时间
    filterDate(time) {
      return moment(time).format("YYYY-MM-DD hh:mm:ss");
    }
  }
};
</script>

<style>
</style>
