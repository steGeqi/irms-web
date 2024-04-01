<template>
  <div style="height: 100%;width: 100%;">
    <dv-border-box-13>
      <div>
        <div>
          <el-row>
            <el-col :span="12"><dv-decoration-7 style="position: absolute;width:20rem;height:50px; margin-left:6rem; margin-top: 5px; font-size: 18px;color:rgba(0,234,255,0.96);">{{title}}</dv-decoration-7></el-col>
            <el-col :span="12"><el-button round class="changeShow" v-text="isShowChinaLocalization" @click="changeShow"></el-button></el-col>
          </el-row>
        </div>
        <div style="height: 100%; width: 90%;margin-left: 20px;">
          <div id="equipmentOrChinaLocalizationProportion" style="height: 25vh; width: 100%;">

          </div>
        </div>
      </div>
    </dv-border-box-13>
  </div>
</template>

<script>
import {getDepartment, getPost} from "@/api/select";
import { getChinaLocalization, getDepartmentAllCountData} from '@/api/dashboard'
import {mapGetters} from "vuex";
import * as echarts from "echarts";

export default {
  data() {
    return {
      isShowChinaLocalization:'国产设备',
      showEquipmentOrChinaLocalizationProportion: '设备占比',
      departmentAllName: [],
      listData: [],
      postAllName: [],
      equipmentAllName: [],
      ChinaLocalizationAllName: [],
      title:'',
    }
  },
  computed: {
    ...mapGetters([
      'roleid',
      'role_department_id',
      'role_name',
      'roles'
    ])
  },
  mounted() {
    this.initDataByCurrentRole()
    // 在组件mounted时绑定resize事件，当窗口大小发生变化时自动调整图表大小
    window.addEventListener('resize', this.handleResize);
    // 创建Echarts实例并绘制饼状图
    this.handleResize();
  },
  methods: {
    //处理单位名字
    async handelPostCountData() {
      let list = []
      let result = []
      await getPost().then(response => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({postName: list[i].postName})
      }
      return result
    },
    async handleDepartmentCountData() {
      let list = []
      let result = []
      await getDepartment(this.roleid).then(response => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({departmentName: list[i].departmentName})
      }
      return result
    },
    async handlePostOrDepartmentAllCountData() {
      let list = []
      let result = []
      await getDepartmentAllCountData().then((response) => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({name: list[i].name, value: list[i].total})
      }
      return result
    },
    async handleChinaLocalizationAllCountData() {
      let list = []
      let result = []
      await getChinaLocalization().then((response) => {
        list = response.data.items
      })
      for (let i = 0; i < list.length; i++) {
        result.push({name: list[i].name, value: list[i].total})
      }
      return result
    },
    async initDataByCurrentRole() {
      if (this.roles[0] === '超级管理员') {
        this.title = '各单位设备 / 国产设备占比'
        // 获取所有单位名字
        this.postAllName = await this.handelPostCountData()
        // 获取各单位设备总数
        this.equipmentAllName = await this.handlePostOrDepartmentAllCountData()
        // 获取各单位国产设备总数
        this.ChinaLocalizationAll = await this.handleChinaLocalizationAllCountData()
        // 根据已知数据构建listData数组
        this.listData = this.postAllName.map(post => {
          // 查找对应单位设备总数
          const equipmentCountObj = this.equipmentAllName.find(item => item.name === post.postName)
          // 查找对应单位国产设备总数
          const ChinaLocalizationCountObj = this.ChinaLocalizationAll.find(item => item.name === post.postName)

          // 获取设备总数和国产设备总数，如果找不到对应项，默认为0
          const equipmentCount = equipmentCountObj ? equipmentCountObj.value : 0
          const ChinaLocalizationCount = ChinaLocalizationCountObj ? ChinaLocalizationCountObj.value : 0
          // 返回组合的对象
          return {
            name: post.postName,
            value: this.showEquipmentOrChinaLocalizationProportion === '设备占比' ? equipmentCount : ChinaLocalizationCount,
          };
        });

      } else {
        this.title = '各部门设备 / 国产设备占比'
        // 获取所有部门名字
        this.departmentAllName = await this.handleDepartmentCountData()
        // 获取各部门设备总数
        this.equipmentAllName = await this.handlePostOrDepartmentAllCountData()
        // 获取各单位国产设备总数
        this.ChinaLocalizationAll = await this.handleChinaLocalizationAllCountData()
        // 根据已知数据构建listData数组
        this.listData = this.departmentAllName.map(department => {
          // 查找对应单位设备总数
          const equipmentCountObj = this.equipmentAllName.find(item => item.name === department.departmentName)
          // 查找对应单位国产设备总数
          const ChinaLocalizationCountObj = this.ChinaLocalizationAll.find(item => item.name === department.departmentName)

          // 获取设备总数和国产设备总数，如果找不到对应项，默认为0
          const equipmentCount = equipmentCountObj ? equipmentCountObj.value : 0
          const ChinaLocalizationCount = ChinaLocalizationCountObj ? ChinaLocalizationCountObj.value : 0
          // 返回组合的对象
          return {
            name: department.departmentName,
            value: this.showEquipmentOrChinaLocalizationProportion === '设备占比' ? equipmentCount : ChinaLocalizationCount,
          };
        });
      }
      this.listData = this.listData.filter(item => item.value !== 0);
      this.initEcharts()
    },

    initEcharts() {
      let pieData = this.listData.map(item => ({ value: item.value, name: item.name }));
      const chartDom = document.getElementById('equipmentOrChinaLocalizationProportion');
      const myChart = echarts.init(chartDom);
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 1,
          top: 5,
          bottom: 20,
          textStyle:{
            fontSize: 15,
            color: function() {
              return (
                "rgb(" +
                Math.round(Math.random() * 255) +
                ", " +
                Math.round(Math.random() * 255) +
                ", " +
                Math.round(Math.random() * 255) +
                ")"
              );
            }
          },
          pageIconColor:'#ffffff',
          pageIconInactiveColor:'rgba(255,255,255,0.9)',
          pageTextStyle:{
            color:'#FFFFFF',
          }
        },
        series: [
          {
            left:190,
            type: 'pie',
            radius: ['40%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              formatter(param) {
                return param.name + ' (' + param.percent  + '%)';
              }
            },
            emphasis: {
              label: {
                color:'rgba(23,194,211,0.96)',
                show: true,
                fontSize: 18,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: pieData
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
    changeShow(){
        if(this.isShowChinaLocalization === '国产设备'){
          this.isShowChinaLocalization = '设备'
          this.showEquipmentOrChinaLocalizationProportion='国产设备占比'
          this.initDataByCurrentRole()
        }else {
          this.isShowChinaLocalization = '国产设备'
          this.showEquipmentOrChinaLocalizationProportion='设备占比'
          this.initDataByCurrentRole()
        }
    },
  },
  beforeDestroy() {
    // 在组件销毁前解绑resize事件
    window.removeEventListener('resize', this.handleResize);
  },
}
</script>
<style lang="less" scoped>
.changeShow{
  background-color: rgba(22, 87, 185, 0.56);
  color: rgba(0, 216, 255, 0.83);
  border: none;
  margin-top: 2vh;
  margin-left: 21vw;
  //width: 5.5rem; /* 调整按钮的宽度 */
  //height: 2.2rem; /* 调整按钮的高度 */
  //line-height: 0.5rem; /* 设置行高与按钮高度相同，以垂直居中文本 */
  //padding-left: 1rem; /* 向左移动文本，可以根据需要调整数值 */
}
</style>
