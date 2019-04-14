<template>
  <div class="goods-manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>商品管理</h3>
      </div>
      <div>
        <el-form size="mini" :inline="true" :model="searchForm" class="demo-form-inline">
          <!-- 分类 -->
          <el-form-item label="选择分类" prop="classification">
            <el-select v-model="searchForm.classification" placeholder="请选择分类">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="酒水类" value="酒水类"></el-option>
              <el-option label="服装类" value="服装类"></el-option>
              <el-option label="家居类" value="家居类"></el-option>
              <el-option label="电子通讯类" value="电子通讯类"></el-option>
              <el-option label="家居类" value="家居类"></el-option>
            </el-select>
          </el-form-item>
          <!-- 关键字 -->
          <el-form-item label="关键字">
            <el-input v-model="searchForm.keyword" placeholder="商品名称或条形码"></el-input>
          </el-form-item>
          <!-- 查询按钮 -->
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <hr>
      <!-- 表单 -->
      <el-table
        ref="tableData"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="bar_code" label="商品条形码" width="130"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="130"></el-table-column>
        <el-table-column prop="classification" label="所属分类" width="100"></el-table-column>
        <el-table-column prop="price" label="售价(元)" width="100"></el-table-column>
        <el-table-column prop="PurchasePrice" label="促销价(元)" width="100"></el-table-column>
        <el-table-column prop="MarketValue" label="市场价(元)" width="100"></el-table-column>
        <el-table-column prop="stock" label="库存" width="80"></el-table-column>
        <el-table-column prop="totalInventory" label="库存总额(元)" width="130"></el-table-column>
        <!-- 管理 -->
        <el-table-column label="管理">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改的模态框 -->
      <el-dialog title="修改商品" :visible.sync="dialogFormVisible" width="400px">
        <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
          <!-- 用户名称 -->
          <el-form-item label="名称:" prop="name">
            <el-input type="text" v-model="editForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <!--所属分类 -->
          <el-form-item prop="classification" label="所属分类" width="100">
            <el-select v-model="editForm.classification" placeholder="-----选择分类-----">
              <el-option value="酒水类"></el-option>
              <el-option value="服装类"></el-option>
              <el-option value="家居类"></el-option>
              <el-option value="电子通讯类"></el-option>
              <el-option value="家居类"></el-option>
            </el-select>
          </el-form-item>
          <!-- 售价 -->
          <el-form-item label="售价:" prop="price">
            <el-input type="text" v-model="editForm.price" autocomplete="off"></el-input>
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
      searchForm: {
        keyword: "",
        classification: ""
      },
      editForm: {
        name: "",
        classification: "",
        price: ""
      },

      rules: {
        // 模态框账号验证
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        price: [{ required: true, message: "售价不能为空", trigger: "blur" }]
      },

      tableData: [],
      currentPage: 1, //当前页
      pageSize: 3,
      total: 0, //总条数
      dialogFormVisible: false,
      editId: "",
      selectedId: []
    };
  },
  methods: {
    // 分页数据
    goodslistpage() {
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.searchForm.keyword,
        classification: this.searchForm.classification
      };
      // 发送请求  把数据给后端
      this.request
        .get("/goods/goodslistpage", params)
        .then(res => {
          // 接受后端传过来的数据
          let { total, data } = res;
          // 赋值给对应的变量
          this.total = total;
          this.tableData = data;
          if (!data.length && this.currentPage !== 1) {
            this.currentPage -= 1;
            this.goodslistpage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //修改
    handleEdit(id) {
      // 显示模态框
      this.dialogFormVisible = true;
      // 保存要修改的id
      this.editId = id;
      // 发请求传id给后端
      this.request
        .get("/goods/editgoods", { id })
        .then(res => {
          // 数据回填
          (this.editForm.name = res[0].name),
            (this.editForm.classification = res[0].classification),
            (this.editForm.price = res[0].price);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存修改的数据
    saveEdit() {
      // 获取表单里的数据
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 关闭
          this.dialogFormVisible = false;
          // 收集参数
          const params = {
            name: this.editForm.name,
            price: this.editForm.price,
            classification: this.editForm.classification,
            editId: this.editId
          };
          console.log(params);

          // 发请求给后端
          this.request
            .post("/goods/savegoods", params)
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
              this.goodslistpage();
            })
            .catch(err => {
              console.log(err);
            });
        }
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
      if (!this.selectedId.length) {
        // 弹错误提示
        this.$message.error("请选择后，在进行删除");
        return;
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
            .get("/goods/batchdelet", params)
            .then(res => {
              // 接受后端响应回来的数据
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                // 刷新列表
                this.goodslistpage();
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
    // 删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 发送请求  传数据给后端
          this.request
            .get("/goods/delgoods", { id })
            .then(res => {
              // 接受后端发回来的数据
              let { code, reason } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                // 刷新列表
                this.goodslistpage();
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
    // 分页
    // 每页条数的改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.goodslistpage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.goodslistpage();
    },
    // 查询
    search() {
      this.goodslistpage();
    }
  },
  // 生命周期   钩子函数
  created() {
    this.goodslistpage();
  }
};
</script>

<style>
</style>
