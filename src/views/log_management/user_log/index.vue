<template>
  <div>
    <div class="grid-content bg-purple"><i class="el-icon-s-order"/><span>日志管理</span></div>
    <div class="app-container">
      <div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <span style="color: #ffffff">用户日志</span>
            </div>
          </el-col>
        </el-row>
        <el-row style="width: 100%;height: 78vh;">
          <el-col :span="7" style="height: 78vh;" class="my-calendar">
            <el-calendar v-model="date"
                         @input='handleDateChange'
                         style="background-color: rgba(34,152,236,0.3); height: 78vh; ">
            </el-calendar>
          </el-col>
          <el-col :span="17" style="height: 78vh;">
            <el-table border :data="tableList">
              <template v-if="operationUnitAndCount.length==0">
                <el-table-column label="单位" align="center" prop="unitName"></el-table-column>
                <el-table-column label="操作次数" align="center" prop="count"></el-table-column>
              </template>
              <template v-else v-for="(val,index) in operationUnitAndCount.length>3?3:operationUnitAndCount.length">
                <el-table-column label="单位" align="center" prop="unitName">
                  <template slot-scope="scope" v-if="scope.$index*3+index<operationUnitAndCount.length">{{operationUnitAndCount[scope.$index*3+index].unitName}}</template>
                </el-table-column>
                <el-table-column label="操作次数" align="center" prop="count">
                  <template slot-scope="scope" v-if="scope.$index*3+index<operationUnitAndCount.length">{{operationUnitAndCount[scope.$index*3+index].count}}</template>
                </el-table-column>
              </template>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
import {
  getLogDataUser,
  getOperationCount, getPostAndOperationCount,
  getUserAndCountByCurrentDay
} from "@/api/log_management";
import moment from "moment/moment";
import {getPost} from "@/api/select";

export default {
  name: "userLog",
  data() {
    return {
      date: null,
      listLoading: false,
      handlersData: [],
      handlers: [
        {
          value: 'unitName',
          label: '单位'
        },
        {
          value: 'count',
          label: '操作次数'
        }
      ],
      operationUnitAndCount: [],
      operationCount: [],
      operationUnit: [],
      selectedDate: '',
      returnResult1: [],
      returnResult2: [],
      tableList:[],
    }
  },
  created() {
    this.getUnitAndCount()

  },
  mounted() {
  },
  methods: {
    async handleDateChange(date) {
      this.listLoading = true;
      this.operationCount = [];
      this.operationUnit = [];
      this.returnResult1 = [];
      this.returnResult2 = [];
      this.tableList = [];
      this.operationUnitAndCount = [];
      this.selectedDate = moment(date).format('YYYY-MM-DD')
      this.returnResult1 = await getUserAndCountByCurrentDay(this.selectedDate)
      console.log("日期",this.selectedDate)
      console.log("该天数据",this.returnResult1)
      if (this.returnResult1.data !== "没有数据！") {
        this.operationCount = this.returnResult1.data.items;  //获取该天有操作的单位及其操作次数

        this.returnResult2 = await getPost();
        this.operationUnit = this.returnResult2.data.items;  //获取所有单位

        const realNameCount = {};
        for (let i = 0; i < this.operationCount.length; i++) {
          let realName = this.operationCount[i][0];  //获取操作单位的名称
          let count = this.operationCount[i][1];  //获取操作次数
          realNameCount[realName] = count;
        }

        const unitNames = [];
        for (let i = 0; i < this.operationUnit.length; i++) {
          const unitName = this.operationUnit[i].postName; //获取操作用户的名称
          if (unitNames.indexOf(unitName) === -1) { //realNames.indexOf(realName) === -1 的含义是：如果数组 realNames 中不存在当前操作单位的名称 realName，则返回 true，否则返回 false。
            unitNames.push(unitName);  //把所有单位的名称添加到数组 unitNames
          }
        }

        for (let i = 0; i < unitNames.length; i++) {
          const unitName = unitNames[i]; //依次获取单位
          const count = realNameCount[unitName] || 0;   //第i个单位的获取操作次数
          this.operationUnitAndCount.push({unitName, count}); //把获取到的单位名称和获取到的操作次数加到数组 operationUnitAndCount 中
        }
        this.handlersData = this.operationUnitAndCount  //把数组 operationUnitAndCount赋值给表单数据绑定字段

        if(this.handlersData.length>0){
          let num=Math.ceil(this.handlersData.length/3)
          for (let j = 0; j < num; j++) {
            this.tableList.push({})
          }
        }

        this.listLoading = false;
      } else {
        alert("此日期没有数据！")
        this.listLoading = false;
        this.handlersData = [];
      }
    },

/*    async getUnitAndCount() {
      this.listLoading = true;
      this.returnResult1 = await getOperationCount();
      this.operationCount = this.returnResult1.data.items;  //获取有操作的用户及其操作次数

      this.returnResult2 = await getLogDataUser();
      this.operationUser = this.returnResult2.data.items;  //获取所有用户

      const realNameCount = {};
      for (let i = 0; i < this.operationCount.length; i++) {
        let realName = this.operationCount[i][0];  //获取操作用户的名称
        let count = this.operationCount[i][1];  //获取操作次数
        realNameCount[realName] = count;
      }

      const realNames = [];
      for (let i = 0; i < this.operationUser.length; i++) {
        const realName = this.operationUser[i].realname; //获取操作用户的名称
        if (realNames.indexOf(realName) === -1) { //realNames.indexOf(realName) === -1 的含义是：如果数组 realNames 中不存在当前操作用户的名称 realName，则返回 true，否则返回 false。
          realNames.push(realName);  //把所有用户的名称添加到数组 realNames
        }
      }

      for (let i = 0; i < realNames.length; i++) {
        const realName = realNames[i]; //因此获取用户
        const count = realNameCount[realName] || 0;   //第i个用户的获取操作次数
        this.operationUserAndCount.push({realName, count}); //把获取到的用户名称和获取到的操作次数加到数组 operationUserAndCount 中
      }
      this.handlersData = this.operationUserAndCount  //把数组 operationUserAndCount赋值给表单数据绑定字段
      this.listLoading = false;
    },*/


    async getUnitAndCount() {
      this.listLoading = true;
      this.returnResult1 = await getPostAndOperationCount();
      this.operationCount = this.returnResult1.data.items;  //获取有操作的单位及其操作次数

      this.returnResult2 = await getPost();
      this.operationUnit = this.returnResult2.data.items;  //获取所有单位

      const realNameCount = {};
      for (let i = 0; i < this.operationCount.length; i++) {
        let realName = this.operationCount[i][0];  //获取操作单位的名称
        let count = this.operationCount[i][1];  //获取操作次数
        realNameCount[realName] = count;
      }

      const unitNames = [];
      for (let i = 0; i < this.operationUnit.length; i++) {
        const unitName = this.operationUnit[i].postName; //获取操作用户的名称
        if (unitNames.indexOf(unitName) === -1) { //realNames.indexOf(realName) === -1 的含义是：如果数组 realNames 中不存在当前操作单位的名称 realName，则返回 true，否则返回 false。
          unitNames.push(unitName);  //把所有单位的名称添加到数组 unitNames
        }
      }

      for (let i = 0; i < unitNames.length; i++) {
        const unitName = unitNames[i]; //依次获取单位
        const count = realNameCount[unitName] || 0;   //第i个单位的获取操作次数
        this.operationUnitAndCount.push({unitName, count}); //把获取到的单位名称和获取到的操作次数加到数组 operationUnitAndCount 中
      }
      this.handlersData = this.operationUnitAndCount  //把数组 operationUnitAndCount赋值给表单数据绑定字段

      if(this.handlersData.length>0){
          let num=Math.ceil(this.handlersData.length/3)
          for (let j = 0; j < num; j++) {
            this.tableList.push({})
          }
        }

      this.listLoading = false;
    },




  }
}
</script>

<style lang="less" scoped>
.bg-purple-dark {
  background: #304156;
}

.bg-purple {
  background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}

.app-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.haveData {
  width: 95%;
  height: 95%;
  line-height: 60px;
  position: absolute;
  top: 1%;
  background-color: rgba(0, 255, 255, 0.44);
  color: #c50d0d;
}

p {
  margin: 10px auto;;
}

</style>


<style>
.my-calendar .el-calendar-table .el-calendar-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 4px;
  height: 85px;
  line-height: 85px;
  text-align: center;
  position: relative;
}
</style>

