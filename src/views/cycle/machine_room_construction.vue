<!--
 * @Description: 机房施工
 * @Author:  wr
 * @Date: 2022-10-02 17:40:04
 * @LastEditTime: 2022-11-24 19:44:32
 * @LastEditors:
-->
<template>
  <div class="infobody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>全生命周期管理</span></div>
    <div class="app-container">
      <div
        class="show"
      >
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">机房施工</div>
          </el-col>
        </el-row>
        <el-row
          :gutter="10"
          class="bg-condition"
        >
          <el-col
            :xs="2"
            :sm="2"
            :md="2"
            :lg="2"
            :xl="2"
          >
            <span>查询条件：</span>
          </el-col>
          <el-col
            :xs="3"
            :sm="3"
            :md="3"
            :lg="3"
            :xl="3"
          >
            <el-select
              v-model="DataName"
              placeholder="详细字段查询"
              multiple
              size="medium"
            >
              <el-option
                v-for="(item,index) in basicvalue"
                :key="index"
                :label="item.label"
                :value="item.value"
                class="searchInput"
              />
            </el-select>
          </el-col>
          <el-col
            :xs="4"
            :sm="4"
            :md="4"
            :lg="4"
            :xl="4"
          >
            <el-input
              v-model="inputValue"
              placeholder="输入查询内容"
              clearable
              size="medium"
            />
          </el-col>
          <el-col
            :xs="2"
            :sm="2"
            :md="2"
            :lg="2"
            :xl="2"
          >
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-search"
              clearable="true"
              @click="search()"
            >搜索</el-button>
          </el-col>
        </el-row>
        <el-tabs v-model="tab_name" type="border-card" @tab-click="changeTab">
          <el-tab-pane label="正常机房" name="0">
            <el-table
              height="70vh"
              v-loading='listLoading'
              :data='list'
              border
              element-loading-text='Loading'
              highlight-current-row
              stripe
              :row-style="{height:'6.26vh'}"
              :cell-style="{padding:'0px',borderColor:'#C0C0C0' }"
              :header-cell-style="{borderColor:'#C0C0C0'}"
            >
              <el-table-column align="center" type="index" :index="typeIndex"/>
              <el-table-column
                v-for="(item,index) in basicvalue"
                :key="index"
                :label="item.label"
                :prop="item.value"
                :formatter="item.formatter"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="status" align="center" label="机房状态" width="200">
                <el-tag type="primary">正常</el-tag>
              </el-table-column>
              <el-table-column align="center" label="操作" width="250px">
                <template slot-scope="scope">
<!--                  <el-button-->
<!--                    size="mini"-->
<!--                    @click="handleDetail(scope.$index, scope.row)"-->
<!--                  >详情</el-button>-->
                  <el-button
                    size="mini"
                    @click="handleConstruct(scope.$index, scope.row)"
                  >施工</el-button>

<!--                  <el-button-->
<!--                    size="mini"-->
<!--                    @click="handleConstruct(scope.$index, scope.row)"-->
<!--                  >删除</el-button>-->

                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="施工机房" name="1">
            <el-table
              height="70vh"
              :row-style="{height:'6.26vh'}"
              :cell-style="{padding:'0px',borderColor:'#C0C0C0' }"
              :header-cell-style="{borderColor:'#C0C0C0'}"
              v-loading="listLoading"
              :disable="true"
              :data="list"
              element-loading-text="Loading"
              border
              highlight-current-row
              stripe
            >
              <el-table-column align="center" type="index" :index="typeIndex" show-overflow-tooltip/>
              <el-table-column
                v-for="(item,index) in basicvalue"
                :key="index"
                :label="item.label"
                :prop="item.value"
                :formatter="item.formatter"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="tag"  align="center" label="标签" width="200">
                <el-tag type="danger">施工</el-tag>
              </el-table-column>
              <el-table-column align="center" label="操作" width="200px">
                <template slot-scope="scope">
<!--                  <el-button-->
<!--                    size="mini"-->
<!--                    @click="handleDetail(scope.$index, scope.row)"-->
<!--                  >详情</el-button>-->
                  <el-button
                    size="mini"
                    @click="handleRecover(scope.$index, scope.row)"
                  >正常</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div class="block">
          <el-pagination
            :page-size="limit"
            :current-page="currentPage"
            layout="total, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getMachineRoomByPage,getMachineRoomTotal,changeStatus } from '@/api/baseparameter'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      start:0,
      limit:10,
      currentPage: 1,
      tab_name: '0',
      list: null,
      total: 0,
      DataName: 'all',
      initname: ['123'],
      department: '',
      inputValue: '',
      postname: '',
      input3: '',
      listLoading: true,
      singalInfo: {},
      value: '',
      basicvalue: [
        {
          value: 'machineRoomName',
          label: '机房名称'
        },
        {
          value: 'postName',
          label: '所属单位'
        },
        // {
        //   value: 'status',
        //   label: '机房状态',
        //   formatter:function (row) {
        //     var status= row.status
        //     switch (status){
        //       case "0":
        //         status="正常"
        //         break
        //       case "1":
        //         status="维修中"
        //         break
        //     }
        //     return  status;
        //   },
        //   // render: (h, params) => {
        //   //     return h('p',params.row.userName||'匿名')
        //   // }

        // }
      ],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    search(){
      this.start = 0
      this.currentPage=1
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      if (this.DataName === 'all' || this.DataName.length === 0) {
        //console.log(this.DataName)
        this.initName = ['111']
      } else {
        this.initName = JSON.parse(JSON.stringify(this.DataName))
      }
      const params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        status:this.tab_name,
        start: this.start,
        limit: this.limit
      }
      const numparams = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: this.tab_name
      }
      // getMachineRoomTotal(numparams).then((response) => {
      //   this.total = response.data
      // })
      getMachineRoomByPage(params).then((response) => {
        this.total = response.data.total
        this.list = response.data.items
        this.listLoading = false
      })
    },

    handleDetail(index, row) {
      //console.log(index, row)
    },
    handleConstruct(index, row) {
      //console.log(index, row)
      changeStatus({ id: row.machineRoomId, status: '1' }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchData()
      }).catch(err => {
        //console.log(err)
      })
    },
    handleRecover(index, row) {
      //console.log(index, row)
      changeStatus({ id: row.machineRoomId, status: '0' }).then(res => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.fetchData()
      }).catch(err => {
        //console.log(err)
      })
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`)
      this.limit=val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage=val
      this.start = (val - 1)
      this.fetchData()
    },
    changeTab(name) {
      //console.log(this.tab_name)
      this.start=0
      this.currentPage=1
      this.fetchData()
    },
    //序号排序
    typeIndex(index){
      return index+(this.currentPage-1)*this.limit +1
    }
  }
}
</script>

<style lang="less" scoped>
//*{
//  font-size: 18px;
//}
.el-select-dropdown .el-scrollbar {
  position: relative;
}
.searchInput {
  height: 40px;
  text-align: center;
  color: #0b0c10;
  background-color: #deecff;
}
// .el-scrollbar {
//   overflow: hidden;
//   position: relative;
// }

.el-row {
  //margin-bottom: 20px;
  /* &:last-child {
      margin-bottom: 0;
    } */
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-condition {
  line-height: 50px;
  text-align: center;
  height: 54px;
  margin: 0px !important;
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.app-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.grid-content {
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}
.font {
  font-size: 18px;
}
.el-cascader .el-input {
  width: 130px;
}
.el-pagination > * {
  font-size: 18px;
}
.block {
  text-align: center;
}
</style>
<style  lang="less" scoped>
/* //需要覆盖的组件样式 */
// .el-scrollbar /deep/
.el-select-dropdown__item {
  height: 30px;
  flex: 1 0 25%;
  margin: 10px;
}

// 必须给子元素一个上层class名才不会影响到其他页面同名组件
.el-select-dropdown__list {
  margin-right: 20px;
  margin-left: 5px;
  margin-top: 5px;
  height: auto;
  width: 600px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: stretch;
}
.el-scrollbar {
  // height: 380px;
  overflow: hidden;
  position: relative;
}
.el-scrollbar .el-scrollbar__wrap {
  overflow: auto;
  height: 100%;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #1d1e1f;
  background-color: #d2d2d2;
}
.el-scrollbar__bar.is-vertical > div {
  width: 0;
}
//.el-button--primary {
//  height: 58px;
//  color: #fff;
//  background-color: #409eff;
//  border-color: #409eff;
//}
</style>

