<template>
  <div class="goods-add">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>添加商品</h3>
      </div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 所属分类 -->
        <el-form-item label="所属分类" prop="classification">
          <el-select v-model="ruleForm.classification" placeholder="-----选择分类-----">
            <el-option value="酒水类"></el-option>
            <el-option value="服装类"></el-option>
            <el-option value="家居类"></el-option>
            <el-option value="电子通讯类"></el-option>
            <el-option value="家居类"></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品条形码 -->
        <el-form-item label="商品条形码" prop="barCode">
          <el-input v-model="ruleForm.barCode" style="width:200px"></el-input>
          <el-button type="success" size="medium">生成条形码</el-button>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="ruleForm.name" style="width:200px"></el-input>
        </el-form-item>
        <!-- 商品售价 -->
        <el-form-item label="商品售价" prop="price">
          <el-input v-model="ruleForm.price" style="width:200px"></el-input>元
        </el-form-item>
        <!-- 市场价 -->
        <el-form-item label="市场价" prop="MarketValue">
          <el-input v-model="ruleForm.MarketValue" style="width:200px"></el-input>元
        </el-form-item>
        <!-- 商品进价 -->
        <el-form-item label="商品进价" prop="PurchasePrice">
          <el-input v-model="ruleForm.PurchasePrice" style="width:200px"></el-input>元
        </el-form-item>
        <!-- 入库数量 -->
        <el-form-item label="入库数量" prop="stock">
          <el-input v-model="ruleForm.stock" style="width:100px"></el-input>
        </el-form-item>
        <!-- 商品重量 -->
        <el-form-item label="商品重量" prop="weight">
          <el-input v-model="ruleForm.weight" style="width:200px"></el-input>
        </el-form-item>
        <!-- 商品单位 -->
        <el-form-item label="商品单位" prop="commodityUnit">
         <el-select v-model="ruleForm.commodityUnit" placeholder="-----选择单位-----">
            <el-option value="个"></el-option>
            <el-option value="条"></el-option>
            <el-option value="件"></el-option>
            <el-option value="克"></el-option>
            <el-option value="千克"></el-option>
          </el-select>
        </el-form-item>
        <!-- 会员优惠 -->
        <el-form-item label="会员优惠" prop="commodityUnit">
          <el-radio v-model="radio" label="1">享受</el-radio>
          <el-radio v-model="radio" label="2">不享受</el-radio>
        </el-form-item>
        <!-- 是否促销 -->
        <el-form-item label="是否促销" prop="Promotion">
          <el-radio v-model="radio1" label="1">启用</el-radio>
          <el-radio v-model="radio1" label="2">禁用</el-radio>
        </el-form-item>
        <!-- 添加 -->
        <el-form-item>
          <el-button type="success" @click="onSubmit">添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
      

<script>
// 引入qs
import qs from "qs";
export default {
  data() {
    return {
      ruleForm: {
        classification: ""
      },
      rules: {
        classification: [
          { required: true, message: "-----选择分类-----", trigger: "change" }
        ],
        barCode: [{ required: true, message: "商品条形码不能位空", trigger: "blur" }],
        name: [{ required: true, message: "商品名称不能为空", trigger: "blur" }],
        price: [{ required: true, message: "商品售价不能为空", trigger: "blur" }]
      },
      radio: "1",
      radio1: "1"
    };
  },
  methods: {
    // 添加账号
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        //如果所有的验证都通过
        if (valid) {
          // 提交数据给后端
          let params = {
            classification: this.ruleForm.classification,
            barCode: this.ruleForm.barCode,
            name: this.ruleForm.name,
            price: this.ruleForm.price,
            MarketValue: this.ruleForm.MarketValue,
            PurchasePrice: this.ruleForm.PurchasePrice,
            stock: this.ruleForm.stock,
            weight: this.ruleForm.weight,
          };
          // 发送请求  把数据给后端
          this.request.post('/goods/goodsadd',params)
          .then(res=>{
            // 接受后端返回来的数据
            let{code,reason}=res;
            // 判断
            if(code === 0){
              // 成功
              this.$message({
                type:"success",
                message:reason
              });
              this.$router.push('/home/goodsManage')
            }else if(code === 1){
              this.$message.error(reason)
            }
          })
          .catch(err=>{
            console.log(err);           
          })
        } else {
          console.log("请重新添加");
          return;
        }
      });
    }


  }
};
</script>

<style lang="less">
</style>
