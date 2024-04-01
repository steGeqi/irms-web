<template>
  <div style="height: 100%;width: 100%;">
    <dv-border-box-13>
      <div>
        <dv-decoration-7 style="width:100%;height:60px; font-size: 18px;color:rgba(0,234,255,0.96);">常见设备信息统计</dv-decoration-7>
        <div style="height: 31vh; margin-top: -4vh; margin-left: 10px;" id="commonEquipmentInformation">

        </div>
      </div>
    </dv-border-box-13>
  </div>

</template>

<script>
import * as echarts from "echarts";
import {getCommonEquipmentInformationAndCount} from "@/api/dashboard";

export default {
  name: "commonEquipmentInformation",
  data(){
    return{
      count:[]
    }
  },
  mounted() {
    this.initData()
    // 在组件mounted时绑定resize事件，当窗口大小发生变化时自动调整图表大小
    window.addEventListener('resize', this.handleResize);
    // 创建Echarts实例并绘制饼状图
    this.handleResize();
  },
  methods: {
    initData(){
      getCommonEquipmentInformationAndCount().then(res=>{
        const {
          commonSoftwareCount,
          businessSystemFirstLevelsCount,
          secondProtectedBusinessSonSystemCount,
          homemadeCount,
          earlyWarningEquipmentCount
        } = res.data;
        this.count.push(homemadeCount[0])
        this.count.push(earlyWarningEquipmentCount[0])
        this.count.push(businessSystemFirstLevelsCount[0])
        this.count.push(commonSoftwareCount[0])
        this.count.push(secondProtectedBusinessSonSystemCount[0])
      }).then(this.initChart)
    },
    initChart() {
      const chartDom = document.getElementById('commonEquipmentInformation');
      const myChart = echarts.init(chartDom);
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['国产设备', '预警设备', '业务系统', '通用软件','等保二级'],
          axisLine: {
            show: true,
          },
          axisTick: {
            show: true,
          },
          axisLabel: {
            color: '#fff',
            fontSize:15,
            textStyle: {
              align: 'center', // 文字右对齐
            },
          },

        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true,
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            color: '#fff',
          },

        },
        series: [
          {
            data: this.count,
            type: 'bar',
            colorBy:"data",
            label: {
              show: true,
              fontSize:20,
              position: 'top', // 设置标签显示在柱状图顶部
              color: 'rgb(0,216,255)', // 标签文字颜色
            },
          }
        ]
      };
      // 保存Echarts实例，以便在resize事件处理函数中调用
      this.myChart = myChart;
      option && myChart.setOption(option);
    },
    handleResize() {
      if (this.myChart) {
        // 调用Echarts实例的resize方法，重新绘制图表
        this.myChart.resize();
      }
    },
  },
  beforeDestroy() {
    // 在组件销毁前解绑resize事件
    window.removeEventListener('resize', this.handleResize);
  },
}
</script>

<style scoped>

</style>
