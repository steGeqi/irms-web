<template>
  <div class="infoBody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>基础信息管理</span></div>
    <div class="app-container">
      <div v-if="ifShow === '0'"
           class="show"
      >
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <span style="color: #ffffff">业务系统管理</span>
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
            业务系统查询：
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
              @click="businessSystemFirstLevelSearch()"
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
              @click="addFirstLevelBusinessSystem()"
            >添加业务系统</el-button>
          </el-col>
          </el-row>
        <el-table
          height="68vh"
          :row-style="{height:'6.26vh'}"
          :cell-style="{padding:'0px',borderColor:'#C0C0C0' }"
          :header-cell-style="{borderColor:'#C0C0C0'}"
          v-loading="listLoading"
          :data="tableData"
          element-loading-text="Loading"
          highlight-current-row
          border
          stripe
        >
          <el-table-column align="center" type="index" :index="typeIndex"/>
          <el-table-column
            v-for="(item,index) in header"
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
        <add-first-level-business-system @changeDiv="changeDiv"></add-first-level-business-system>
      </div>
      <div v-if="ifShow === '2'">
        <update-first-level-business-system :row="row" @changeDiv="changeDiv"></update-first-level-business-system>
      </div>
    </div>
  </div>
</template>

<script>
import {
  deleteFirstLevelBusinessSystem, getAllFirstLevelBusinessSystem,
  getFirstLevelBusinessSystemByPage, SearchBusinessSystemFirstLevel
} from "@/api/baseparameter";
import addFirstLevelBusinessSystem
  from "@/components/Baseparameter/FirstLevelBusinessSystem/addFirstLevelBusinessSystem";
import updateFirstLevelBusinessSystem
  from "@/components/Baseparameter/FirstLevelBusinessSystem/updateFirstLevelBusinessSystem";

export default {
  name: 'business_system_first',
  components:{addFirstLevelBusinessSystem,updateFirstLevelBusinessSystem},
  data(){
    return{
      ifShow:'0',
      listLoading: false,
      tableData:[],
      inputValue:'',
      currentPage: 1,
      limit:10,
      row:{},
      total: 0,
      isSearch:false,
      isEdit:false,
      header: [ //表头
        {
          value: 'businessSystemFirstName',
          label: '业务系统名称',
        },
        {
          value: 'postName',
          label: '单位名称',
        }
      ],
    }
  },
  created() {
    this.showData() //渲染表格数据
  },
  mounted() {

  },
  methods:{
    showData(){
      this.isSearch =  false
      this.listLoading = true
      const params = {
        start: (this.currentPage-1)*this.limit,
        limit: this.limit,
      }
      //调用接口获取数据
      getFirstLevelBusinessSystemByPage(params).then(response=>{
        this.tableData = response.data.items
        this.listLoading = false
      })
      getAllFirstLevelBusinessSystem().then(res => {
        this.total = res.data.total
        console.log(res)
      })
      setTimeout(()=>{this.listLoading = false},1000)
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`)
      this.limit=val
      this.showData()
    },
    handleCurrentChange(val) {
      this.currentPage=val
      const params = {
        start: (val - 1)*this.limit,
        limit: this.limit,
        inputName :this.inputValue
      }
      if(this.isSearch===true){
        SearchBusinessSystemFirstLevel(params).then(response=>{
          console.log(response)
          this.tableData = response.data.items
          this.total = response.data.total
        })
      }else {
        getFirstLevelBusinessSystemByPage(params).then((response) => {
          this.tableData = response.data.items
          this.listLoading = false
        })
      }

    },
    //弹出添加业务系统页面
    addFirstLevelBusinessSystem(){
      this.ifShow = '1'
      this.showData()
    },
    //删除业务系统
    handleDelete(index, row) {
      const businessSystemFirstId = row.businessSystemFirstId

      this.$alert(`是否永久删除业务系统: \"${row.businessSystemFirstName}\"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action) => {
          if (action === 'confirm') {
            deleteFirstLevelBusinessSystem(businessSystemFirstId).then(response=>{
              this.$alert(response.data, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                showClose: false
              }).then(() => {
                this.showData()
              })
            })
          }
        }
      })

    },
    //查询业务系统
    businessSystemFirstLevelSearch(){
      this.isSearch = true
      const params = {
        start: this.currentPage-1,
        limit: this.limit,
        inputName :this.inputValue
      }
      console.log(params)
      SearchBusinessSystemFirstLevel(params).then(response=>{
        this.tableData = response.data.items
        this.total = response.data.total
      })
    },
    //修改业务系统
    handleEdit(index, row) {
      this.row = row
      this.ifShow = '2'
      this.isEdit = true

      // this.showData()
    },
    typeIndex(index){
      return index+(this.currentPage-1)*this.limit + 1
    },
    changeDiv(value) {
      this.ifShow = value
      this.currentPage = 1
      this.showData()
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
.bg-condition {
  line-height: 50px;
  text-align: center;
  height: 54px;
  margin: 0px !important;
  background: #d3dce6;
}
.block{
  text-align: center;
}
</style>
