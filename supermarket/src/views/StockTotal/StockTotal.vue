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

      <div id="box" style="height:400px"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  mounted(){
    var res={
      catedata:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      value:[100,500,700,320,800,120,1000,2000,900,430,100,540]
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
                data:['进货']
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
                    "name":"进货",
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
