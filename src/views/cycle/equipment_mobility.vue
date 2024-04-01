<template>
  <div class="infobody">
    <div class="grid-content bg-purple">
      <i class="el-icon-s-order" /><span>全生命周期管理</span>
    </div>
    <div class="app-container">
      <div class="show">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">设备移动</div>
          </el-col>
        </el-row>
        <el-row :gutter="10" class="bg-condition">
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <span>查询条件：</span>
          </el-col>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
            <el-select
              v-model="DataName"
              placeholder="详细字段查询"
              multiple
              size="medium"
            >
              <el-option
                v-for="(item, index) in dataname"
                :key="index"
                :label="item.label"
                :value="item.value"
                class="searchInput"
              />
            </el-select>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <el-input
              v-model="inputValue"
              placeholder="输入查询内容"
              clearable
              size="medium"
            />
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <el-button
              size="medium"
              type="primary"
              icon="el-icon-search"
              clearable="true"
              @click="search()"
              >搜索</el-button
            >
          </el-col>
        </el-row>
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
          <el-table-column type="index"  :index="typeIndex" align="center" />
          <af-table-column
            v-for="(value, key, index) in labels"
            :key="index"
            align="center"
            :label="value"
          >
            <template slot-scope="scope">
                <el-select v-if="scope.row.isEdit && key ==='machineRoomName'" @change="changeRoom(scope.row)" v-model="scope.row[key]" placeholder="请选择">
                  <el-option
                    v-for="item in machineRoomAll"
                    :key="item.value"
                    :value="item.machineRoomName"
                    :title='item.machineRoomName'
                  />
                </el-select>
                <el-select v-else-if="scope.row.isEdit && key ==='cabinetName'" v-model="scope.row[key]" placeholder="请选择">
                  <el-option
                    v-for="item in cabinetAll"
                    :key="item.value"
                    :value="item.cabinetName"
                  />
                </el-select>
                <el-input v-else-if="scope.row.isEdit && (key ==='cabinetUStart' || key ==='cabinetUEnd')" v-model="scope.row[key]" placeholder="请选择">
                </el-input>
                <span v-else>{{ scope.row[key] }}</span>
            </template>
          </af-table-column>
          <el-table-column align="center" label="操作" width="200px" fixed='right'>
            <template slot-scope="scope">
              <el-button v-if="scope.row.isEdit"
                size="mini"
                @click="handleDetail(scope.$index, scope.row)"
                >{{scope.row.isEdit ? '取消' : '详情'}}</el-button
              >
              <el-button
                size="mini"
                @click="handleMove(scope.$index, scope.row)"
                >{{scope.row.isEdit ? '提交' : '移动'}}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="limit"
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
import { hunhe1 } from '@/layout/mixin/cycleMix'
import { updatePosition } from '@/api/cycleInfo'
import user from '@/store/modules/user'
import { getMachineRoom,getCabinet } from '@/api/select'

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
  mixins: [hunhe1],
  data() {
    return {
      roleid: user.state.roleid,
      machineRoomAll: [],
      cabinetAll: [],
      start:0,
      limit:10,
      isEdit:false,
      tab_name: '0',
      list: null,
      total: 0,
      currentPage: 1,
      DataName: 'all',
      initname: ['123'],
      department: '',
      inputValue: '',
      postname: '',
      input3: '',
      listLoading: true,
      singalInfo: {},
      dataname: [
        {
          value: 'basicInfoId',
          label: '设备ID'
        },
        {
          value: 'postName',
          label: '所属单位'
        },
        {
          value: 'departmentName',
          label: '所属部门'
        },
        {
          value: 'equipmentName',
          label: '设备名'
        },
        {
          value: 'machineRoomName',
          label: '安装位置'
        },
        {
          value: 'cabinetName',
          label: '机柜编号'
        },

      ],
      value: '',
      labels: {
        basicInfoId:'设备ID',
        postName: '所属单位',
        departmentName: '所属部门',
        equipmentTypeName: '设备类型',
        // equipmentName: '设备名',
        // brandName: '设备品牌',
        machineRoomName: '安装位置',
        cabinetName: '机柜编号',
        cabinetUStart: '柜内U位开始位',
        cabinetUEnd: '柜内U位结束位',
        // onlineTime: '上线时间',
        // hostName: '主机名',
        // guaranteePeriod: '保修期',
        // offlineTime: '下线时间'
      }
    }
  },
  async created() {
    this.fetchData()
    let a = 0
    a = await this.handleAsync(a)
    //console.log(a);
  },
  methods: {
    search(){
      this.start = 0
      this.fetchData()
    },
    async handleAsync(val){
      return new Promise((resolve,reject)=>{
        let arr = [1,2,3]
        for (let i = 0; i < arr.length; i++) {
          const e = arr[i];
          setTimeout(() => {
            if (e == 2) {
              val = e;
              //console.log(val);
              resolve(val)
            }

          }, 1000);
        }
      })
    },
    handleDetail(index, row) {
      if (row.isEdit) {
        row.isEdit = !row.isEdit;
      }
    },
    handleMove(index, row) {
      row.isEdit = !row.isEdit;
      if (!row.isEdit) {
        let machineRoomId = ''
        let cabinetId = ''
        this.machineRoomAll.forEach(element => {
          if (element.machineRoomName === row.machineRoomName) {
              machineRoomId = element.machineRoomId;
            }
          })
        this.cabinetAll.forEach(element => {
          if (element.cabinetName === row.cabinetName) {
              cabinetId = element.cabinetId;
            }
          })
        //console.log(machineRoomId,cabinetId);
        const params = {
          equipmentId: row.equipmentId,
          machineRoomId,
          cabinetId,
          cabinetUStart: row.cabinetUStart,
          cabinetUEnd: row.cabinetUEnd
        }
        updatePosition(params).then( res=>{
          if(res.data === 'u位冲突'){
            this.$message({
              message: 'U位冲突，不能移动',
              type: 'error'
            });
          }else {
            this.$message({
              message: '移动成功',
              type: 'success'
            });
          }
          console.log(res.data)
          this.fetchData()
        } )
      }else{
        getMachineRoom(row.postId).then(response => {
          this.machineRoomAll = response.data.items
          this.fetchCabinet(row.machineRoomName)
        })
      }
    },
    handleCurrentChange(val) {
      this.start = (val - 1) * this.limit
      this.fetchData()
    },
    async changeRoom(row) {
      let val = row.machineRoomName
      await this.fetchCabinet(val)
      //console.log(this.cabinetAll[0].cabinetName);
      row.cabinetName = this.cabinetAll[0].cabinetName
    },
    async fetchCabinet(val) {
      return new Promise((resolve,reject) => {
        this.machineRoomAll.forEach(element => {
          if (element.machineRoomName === val) {
            getCabinet(element.machineRoomId).then(response => {
              this.cabinetAll = response.data.items
              //console.log(this.cabinetAll[0].cabinetName);
              resolve()
            })
          }
        })
      })
    },
    typeIndex(index){
      return index+(this.currentPage-1)*this.limit + 1
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
<!-- <style  lang="less" scoped>
/* //需要覆盖的组件样式 */

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
  height: 380px;
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
</style> -->
