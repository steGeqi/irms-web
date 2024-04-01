
<template>
  <div class="infoBody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>基础信息管理</span></div>
    <div class="app-container">
      <div v-show="ifShow === '0'"
           class="show"
      >
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <span style="color: #ffffff">业务子系统管理</span>
            </div>
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
              v-model="dataName"
              placeholder="详细字段查询"
              multiple
              size="medium"
            >
              <el-option
                v-for="(item,index) in basicValue"
                :key="index"
                :label="item.label"
                :value="item.value"
                class="searchInput"
              />
            </el-select>
          </el-col>
          <el-col
            :xs="3"
            :sm="3"
            :md="3"
            :lg="3"
            :xl="3"
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
          <el-col
            :xs="1"
            :sm="1"
            :md="1"
            :lg="1"
            :xl="1"
          >
            <el-button
              size="medium"
              type="primary"
              @click="addBusinessSystem()"
            >添加业务子系统</el-button>
          </el-col>
        </el-row>
        <el-table
          height="68vh"
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
            v-for="(item,index) in basicValue"
            :key="index"
            :label="item.label"
            :prop="item.value"
            :formatter="item.formatter"
            align="center"
          >
          </el-table-column>
          <el-table-column align="center" label="操作" width="350px">
            <template slot-scope="scope">
                <el-button
                  type='primary' plain
                  size='mini'
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
              <el-button
                size='mini'
                type='danger'
                text
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
              <el-button
                type='success' plain
                size='mini'
                @click="getEquipmentByBusinessSystemId(scope.$index, scope.row)"
              >查看设备</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="height: 4vh;">
          <el-pagination
            :page-size="10"
            :current-page="currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div v-if="ifShow === '1'">
        <addBusinessSystem @changeDiv="changeDiv" />
      </div>
      <div v-if="ifShow === '2'">
        <updateBusinessSystem :row="row" :current-show="ifShow" @changeDiv="changeDiv"></updateBusinessSystem>
      </div>
      <div v-if="ifShow === '3'">
        <searchEquipmentByBusinessSystem :tempBusinessSystemNameId="this.tempBusinessSystemNameId" :current-show="ifShow" @changeDiv="changeDiv"></searchEquipmentByBusinessSystem>
      </div>
    </div>
  </div>
</template>

<script>
import {delBusinessSystem, getBusinessSystemByPage,} from '@/api/baseparameter'
import addBusinessSystem from '@/components/Baseparameter/businessSystem/addBusinessSystem'
import updateBusinessSystem from '@/components/Baseparameter/businessSystem/updateBusinessSystem'
import searchEquipmentByBusinessSystem from '@/components/Baseparameter/businessSystem/searchEquipmentByBusinessSystem'
export default {
  components:{
    addBusinessSystem,
    updateBusinessSystem,
    searchEquipmentByBusinessSystem
  },
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
      tempBusinessSystemNameId:'',
      list: null,
      total: 0,
      currentPage: 1,
      limit:10,
      basicValueName: '',
      initName:'',
      inputValue: '',
      dataName: 'all',
      ifShow: '0',
      row:{},
      listLoading: true,
      businessSystemParams:{
        businessSystem_Name:'',
        businessSystem_Id:'',
        businessSystemFirstId:''
      },
      basicValue: [

        {
          value: 'businessSystemName',
          label: '业务子系统名称',
        },
        {
          value: 'businessSystemLevel',
          label: '业务系统等级',
        },
        {
          value: 'businessSystemFirstName',
          label: '所属业务系统',
        },
        {
          value: 'departmentName',
          label: '所属部门',
        },
        {
          value: 'postName',
          label: '所属单位'
        }
      ],
      value: '',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    search(){
      this.start=0
      this.currentPage=1
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      if (this.dataName === 'all' || this.dataName.length === 0) {
        this.initName = ['111']
      } else {
        this.initName = JSON.parse(JSON.stringify(this.dataName))
      }
      const params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        start: (this.currentPage-1)*this.limit,
        limit: this.limit,
        status:"0"
      }
      getBusinessSystemByPage(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },

    addBusinessSystem(){
      this.ifShow = '1'
    },
    handleEdit(index, row) {
      //console.log(row)
      this.ifShow ='2'
      this.row = row
    },
    handleDelete(index, row) {
      this.businessSystemParams.businessSystem_Name = row.businessSystemName
      this.businessSystemParams.businessSystem_Id = row.businessSystemId
      this.businessSystemParams.businessSystemFirstId = row.businessSystemFirstId
      const businessSystemParams = {...this.businessSystemParams}
      this.$alert(`是否永久删除业务系统: \"${businessSystemParams.businessSystem_Name}\"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delBusinessSystem(businessSystemParams).then((response) => {
              console.log(businessSystemParams)
              this.$alert(response.data, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                showClose: false
              }).then(() => {
                this.fetchData()
              })
            })
          }
        }
      })
    },

    //通过业务系统搜索设备
    getEquipmentByBusinessSystemId(index, row){
      this.ifShow ='3'
      this.tempBusinessSystemNameId = row.businessSystemId
    },

    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`)
      this.limit=val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage=val
      const params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        start: (val - 1)*this.limit,
        limit: this.limit,
        status:"0"
      }
      getBusinessSystemByPage(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    changeDiv(value) {
      this.ifShow = value
      this.fetchData()
    },
    //分页连续展示   currentPage页码  limit每页数量
    typeIndex(index){
      return index+(this.currentPage-1)*this.limit + 1
    }
  }
}
</script>

<style lang="less" scoped>
/**{
  font-size: 18px;
}*/
.el-select-dropdown .el-scrollbar {
  position: relative;
}
.searchInput {
  height: 40px;
  text-align: center;
  color: #0b0c10;
  background-color: #deecff;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #304156;
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
.el-pagination > *{
  font-size: 18px;
}
.block{
  text-align: center;
}
</style>
