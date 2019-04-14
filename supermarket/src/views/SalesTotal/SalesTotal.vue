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
      <!-- echarts -->
      <div id="box" style="height:400px">

      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  mounted(){
    var res={
      catedata:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      value:[100,500,1000,5200,3000,100,5000,7000,900,430,100,540]
    }
    let {catedata, value} = res;

    this.salescharts(catedata, value);

  },
  methods:{
    salescharts(catedata=[],value=[]){
      // dom初始化
      let myChart=this.echarts.init(document.getElementById('box'))
      let option={
         tooltip: {
                show: true
            },
            legend: {
                data:['销量']
            },
            xAxis : [
                {
                    type : 'category',
                    data : catedata
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    "name":"销量",
                    "type":"line",
                    "data":value
                }
            ]
      }
      // 生成报表
      myChart.setOption(option)
    }

  }
};
</script>

<style>
</style>
