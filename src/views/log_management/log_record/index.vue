<template>
  <div>
    <div class='grid-content bg-purple'>
      <i class='el-icon-s-order' /><span>日志管理</span>
    </div>
    <div class='app-container' style='height: 100%'>
      <el-row :gutter='24'>
        <el-col>
          <div class='grid-content bg-purple-dark'>
            <span style="color: #ffffff">日志记录</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter='10'>
        <el-col :span='8'  style='height: 83vh;'>
          <div >
          <el-row style="flex-direction: column;" >
            <el-calendar v-model='date'
                         @input='handleDateChange'
                         style='background-color: rgba(34,116,236,0.22);height: 40vh;  '>
              <template slot='dateCell' slot-scope='{ data }'>
                <div :class="data.isSelected ? 'is-selected' : ''">
                  {{ data.day.split('-').slice(2).join('-') }}
                  <div
                    v-for='(item ,index) in scheduleData'
                    :key>
                    <div v-if='item[0].indexOf(data.day) != -1' class='haveData'>
                    </div>
                  </div>
                </div>
              </template>
            </el-calendar>
            <div id='roleChart' style='height: 43vh; background-color: rgba(34,81,236,0.22); '>
            </div>
            </el-row>
          </div>
        </el-col>
        <el-col :span='5'>
          <div >
          <el-table
            v-if="refreshTable"
            v-loading="listLoading"
            element-loading-text="Loading"
            highlight-current-row
            stripe
            height="83vh"
            :row-style="{height:'6.26vh',width:''}"
            :cell-style="{padding:'0px' ,borderColor:'#C0C0C0'}"
            :header-cell-style="{borderColor:'#C0C0C0'}"
            @row-click="searchLogByDateAndRole"
            :data="userData"
            border
            show-header
            :default-expand-all="isExpand">
            <el-table-column align="center" type="index" />
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table
                  @row-click="searchLogByDateAndUser"
                  :data="props.row.children" :cell-style="{background:'pink'}">
                  <el-table-column  align="center" width="48"/>
                  <el-table-column  align="center" type="index"/>
                  <el-table-column  prop="realName" label="用户" ></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="postName" label="单位"></el-table-column>
          </el-table>
          </div>
        </el-col>
        <el-col :span='1'>
          <div style='height: 83vh; background-color: rgba(170,238,238,0.6)'></div>
        </el-col>
        <el-col :span='10' style='height: 83vh;'>
          <div>
          <el-table
            margin-left="0px"
            height='83vh'
            :row-style="{height:'7vh'}"
            :cell-style="{padding:'0px' ,borderColor:'#C0C0C0'}"
            :header-cell-style="{borderColor:'#C0C0C0'}"
            v-loading="listLoading"
            :disable='true'
            :data='tableData'
            element-loading-text='Loading'
            border
            highlight-current-row
            stripe
          >
            <el-table-column align="center" type="index" :index="typeIndex" width="60"/>
            <el-table-column
              v-for='(item,index) in basicValue'
              :key='index'
              :label='item.label'
              :prop='item.value'
              :formatter='item.formatter'
              align='center'
            >
            </el-table-column>
          </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  getLogDataUserByTime,
  getLogData,
  getLogDataByTime,
  getLogDataByDateAndUser, getLogDateAndCount, getCurrentDayLogData,getRoleAndCountByCurrentDay
} from '@/api/log_management'
import moment from 'moment'
import {getPostByPage} from "@/api/baseparameter";
import {getRealNameAllWithUser} from "@/api/select";

export default {
  name: 'logRecord',
  data() {
    return {
      userData:[],
      refreshTable:true,
      isExpand:false,
      roleData:[],
      listLoading: true,
      tempTableData:[],
      postTotal:'',
      departmentTotal:'',
      date: null,
      tableData: [],
      total: 0,
      currentPage:1,
      limit:2000,
      handlersData: [],
      timeParams: '',
      dateArr: [],
      year: '',
      month: '',
      basicValue: [
        {
          value: 'message',
          label: '操作行为'
        },
        {
          value: 'user',
          label: '操作用户：单位-部门-用户名'
        },
        {
          value: 'time',
          label: '具体时间'
        }
      ],
      scheduleData: {},
      counts: [],
      isGetDataBySpecifiedDate:false,

    }
  },
  created() {
  },
  mounted() {
    this.fetchData()
    //获取从当天开始按日期降序的数据
    this.getLogData()
    //默认显示当天操作用户
    this.getCurrentDayDate()
    //操作频率统计
    this.frequencyChart()
    //获取有用户操作的日期和该日期操作的次数
    getLogDateAndCount().then(response => {
      this.scheduleData = response.data.items
      this.counts = response.data.items
      // console.log('用户操作的日期和该日期操作的次数', this.scheduleData)
    })
    // rxr
    // 在组件mounted时绑定resize事件，当窗口大小发生变化时自动调整图表大小
    window.addEventListener('resize', this.handleResize);
    // 创建Echarts实例并绘制饼状图
    this.handleResize();
  },

  methods: {
//传输单位及用户
    fetchData() {
      this.listLoading = true
      getRealNameAllWithUser().then(res=>{
        this.postTotal = res.data.items.length
        this.roleData = res.data.items
        this.tempTableData = this.roleData
        this.listLoading = false
        console.log("+++",this.roleData)
      })
    },
    //分页连续展示   currentPage页码  limit每页数量
    typeIndex(index){
      return index+(this.currentPage-1)*this.limit + 1
    },
/*    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`)
      this.limit=val
      this.getLogData()
    },
    //页数变化
    handleCurrentChange(val) {
      this.currentPage=val
      const params = {
        start: this.currentPage-1,
        limit: this.limit,
      }
      getLogData(params).then((response) => {
        this.tableData = response.data.items
        this.total = response.data.total
      })
    },*/
    //获取从当天开始按日期降序的数据
    getLogData(){
      this.listLoading = true
      const params = {
        start: this.currentPage-1,
        limit: this.limit
      }
      getLogData(params).then(response => {
        for(let i=0;i<response.data.items.length;i++){
          if(response.data.items[i].user !== "null — null — null"){
            this.tableData.push(response.data.items[i])
          }
        }
        // this.tableData = response.data.items
        // console.log("this.tableData",this.tableData)
        this.total = response.data.total
      })
      this.listLoading=false
    },
    //当天默认操作用户
    getCurrentDayDate() {
      this.listLoading = true
      const currentDate = moment(new Date()).format('YYYY-MM-DD')
      //进行两个接口数据进行匹配//前端进行数据处理，用以展示树状表格
      Promise.all([getCurrentDayLogData(currentDate), getRealNameAllWithUser()]).then(([logResponse, userResponse]) => {
        this.handlersData = logResponse.data.items;
        this.roleData = userResponse.data.items;
        console.log("this.handlersData",this.handlersData)
        console.log("this.roleData",this.roleData)
        this.postTotal = this.roleData.length;
        this.tempTableData = this.roleData;
        //返回符合条件的数据
        let matchedData = [];
        for (let i = 0; i < this.roleData.length; i++) {
          let child = this.roleData[i];
          let childrenMatched = [];
          for (let j = 0; j < child.children.length; j++) {
            let grandchild = child.children[j];
            for (let k = 0; k < this.handlersData.length; k++) {
              let data = this.handlersData[k];
              let result
              //8月15日后data的数据形式-"中国地震台网中心 — 数据管理员 — 台网中心超级管理员"
              // 将字符串分割成数组，以 " — " 为分隔符
              const partsArray = data.user.split(" — ");

              if (partsArray.length >= 3) {
                // 获取数组中第三个元素（索引为2），即第二个 "-" 后的字符串
                result = partsArray[2];
              }else{
                //8月15日前的数据形式-“台网中心超级管理员”
                result = data.user
              }
              if (grandchild.realName === result) {
                grandchild.time = data.time;
                child.time = data.time
                childrenMatched.push(grandchild);
              }
            }
          }
          if (childrenMatched.length > 0) {
            let matchedChild = Object.assign({}, child);
            matchedChild.children = childrenMatched;
            matchedData.push(matchedChild);
          }
        }
        // 将匹配的用户数据分配给 userData 变量，并设置标志变量为 true
        this.userData = matchedData;
      })
      this.listLoading =  false
    },

    //选择日志时间进行返回用户以及行为
    handleDateChange(date) {
      // 重置相关变量，以避免显示旧数据
      this.tableData = []
      this.userData = [];
      this.handlersData = [];
      this.roleData = [];
      this.postTotal = 0;
      this.tempTableData = [];
      this.listLoading = true;
      // this.refreshTable = false;
      this.timeParams = moment(date).format('YYYY-MM-DD')
      const timeParams = this.timeParams
      console.log("timeParams",timeParams)
      // 标志变量，指示数据是否已准备好在模板中使用
      let dataReady = false;
      // 获取日志数据和用户数据//前端进行数据处理，用以展示树状表格
      Promise.all([getLogDataUserByTime(timeParams), getRealNameAllWithUser()]).then(([logResponse, userResponse]) => {
        this.handlersData = logResponse.data.items;
        console.log("this.handlersData",this.handlersData)
        this.roleData = userResponse.data.items;
        this.postTotal = this.roleData.length;
        this.tempTableData = this.roleData;
        // 处理数据，构建匹配的用户数据
        let matchedData = [];
        for (let i = 0; i < this.roleData.length; i++) {
          let child = this.roleData[i];
          let childrenMatched = [];
          for (let j = 0; j < child.children.length; j++) {
            let grandchild = child.children[j];
            for (let k = 0; k < this.handlersData.length; k++) {
              let data = this.handlersData[k];
              let result
              //8月15日后data的数据形式-"中国地震台网中心 — 数据管理员 — 台网中心超级管理员"
              // 将字符串分割成数组，以 " — " 为分隔符
              const partsArray = data.user.split(" — ");

              if (partsArray.length >= 3) {
                // 获取数组中第三个元素（索引为2），即第二个 "-" 后的字符串
                result = partsArray[2];
              }else{
                //8月15日前的数据形式-“台网中心超级管理员”
                result = data.user
              }
              // console.log(result);
              if (grandchild.realName === result) {
                grandchild.time = data.time;
                child.time = data.time
                childrenMatched.push(grandchild);
              }
            }
          }
          if (childrenMatched.length > 0) {
            let matchedChild = Object.assign({}, child);
            matchedChild.children = childrenMatched;
            matchedData.push(matchedChild);
          }
        }
        // 将匹配的用户数据分配给 userData 变量，并设置标志变量为 true
        this.userData = matchedData;
        // console.log("222",this.userData)
        dataReady = true;
        // 获取日志数据
        getLogDataByTime(timeParams).then(response => {
          this.tableData = []
          for(let i=0;i<response.data.items.length;i++){
            if(response.data.items[i].user !== "null — null — null"){
              this.tableData.push(response.data.items[i])
              console.log(11111)
            }
          }
          // this.tableData = response.data.items
          console.log("this.tableData",this.tableData)
          this.total = response.data.total
          this.refreshTable = true; // 将表格刷新标志变量设置为 true
        })
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        this.listLoading = false;
      });
      // 等待数据准备就绪，并且标志变量设置为 true，才将表格中的数据设置为匹配的用户数据
      const checkDataReady = setInterval(() => {
        if (dataReady) {
          clearInterval(checkDataReady);
          this.roleData = this.userData;
        }
      }, 100);
    },
    //绑定点击查找的单位下所有用户操作行为
    searchLogByDateAndRole(row) {
      const params = {
        userName: row.postName,
        time: moment(row.time).format('YYYY-MM-DD')
      }
      console.log("params",params)
      //接口获取前端传取时间参数和相应单位下所有用户操作行为
      getRoleAndCountByCurrentDay(params).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
        console.log("表单2",this.tableData)
      })
    },
    //绑定点击查找的用户操作行为
    searchLogByDateAndUser(row) {
      const params = {
        userName: row.realName,
        time: moment(row.time).format('YYYY-MM-DD')
      }
      //接口获取前端传取时间参数和相应用户操作行为
      getLogDataByDateAndUser(params).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
        console.log("表单",this.tableData)
      })
    },
    frequencyChart() {
      const myChart = this.$echarts.init(document.getElementById('roleChart'))//获取容器元素
      getLogDateAndCount().then(response => {
        this.counts = response.data.items
        const xAxisData = [] // 处理横坐标日期
        const seriesData = [] // 处理纵坐标操作次数
        const today = moment() // 获取当前日期
        for (let i = 6; i >= 0; i--) {
          const date = today.clone().subtract(i, 'days') // 获取最近7天的日期
          xAxisData.push(date.format('MM-DD')) // 格式化日期
          const item = this.counts.find(item => moment(item[0]).isSame(date, 'day')) // 查找该日期对应的次数
          seriesData.push(item ? item[1] : 0) // 如果有次数，则添加次数，否则添加0
        }

        const option = {

          title: {
            text: '一周操作频率',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            name: '日期',
            nameTextStyle: {
              color: '#333',
              fontSize: 16
            }
          },
          yAxis: {
            type: 'value',
            name: '操作频数',
            nameTextStyle: {
              color: '#333',
              fontSize: 16
            }
          },
          series: [
            {
              data: seriesData,
              type: 'bar'
            }
          ]
        }//设置初始化配置项
        this.myChart = myChart;
        myChart.setOption(option);//设置option
      })
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

<style lang='scss' scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-dark {
  background: #304156;
}

.bg-condition {
  line-height: 50px;
  height: 54px;
  margin: 0px !important;
  background: #d3dce6;
}

.el-timeline {
  height: 100%;
  margin-top: 15px;

}

.el-row {
  min-height: 100%;
}

body, html {
  height: 100%;
}

.box {
  width: 100%;
}

.is-selected {
  color: #1989FA;
}


</style>

<style>
.el-calendar-table .el-calendar-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 4px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  position: relative;

}

.haveData {
  width: 95%;
  height: 95%;
  position: absolute;
  top: 1%;
  background-color: rgba(0, 255, 255, 0.44);
}
</style>






