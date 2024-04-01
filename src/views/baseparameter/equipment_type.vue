<template>
  <div class="infobody">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>基础信息管理</span></div>
    <div class="app-container">
      <div
        v-show="ifUpdate === '0'"
        class="show"
      >
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <span style="color: #ffffff">二级设备类型管理</span>
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
              @click="fetchData()"
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
              @click="addEquipmentType()"
            >添加二级设备类型</el-button>
          </el-col>
        </el-row>
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
          <el-table-column align="center" type="index" :index="typeIndex" />
          <el-table-column
            v-for="(item,index) in basicvalue"
            :key="index"
            :label="item.label"
            :prop="item.value"
            :formatter="item.formatter"
            align="center"
          >
          </el-table-column>
          <el-table-column align="center" label="操作" width="250px">
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
        <div class="block">
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
       <div v-if="ifUpdate === '1'">
        <addEquipmentSecondType @changeDiv="changeDiv" />
      </div>
      <div v-if="ifUpdate === '2'">
        <updateEquipmentSecondType :row="row" :current-show="ifUpdate" @changeDiv="changeDiv" />
      </div>
    </div>
  </div>
</template>

<script>
import {delEquipmentType, getEquipmentTypeByPage} from '@/api/baseparameter'
import addEquipmentSecondType from "@/components/Baseparameter/equipmentTypeSecond/addEquipmentSecondType";
import updateEquipmentSecondType from "@/components/Baseparameter/equipmentTypeSecond/updateEquipmentSecondType";

export default {
  components: {
    addEquipmentSecondType,
    updateEquipmentSecondType,
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
      list: null,
      total: 0,
      currentPage: 1,
      limit:10,
      basicValue: '',
      initName:'',
      inputValue: '',
      dataName: 'all',
      ifUpdate: '0',
      listLoading: true,
      basicvalue: [
        {
          value: 'equipmentTypeName',
          label: '二级设备类型名称'
        },
        {
          value: 'equipmentTypeCode',
          label: '二级设备类型代码'
        },
        {
          value: 'equipmentFirstTypeName',
          label: '所属一级设备类型'
        }
      ],
      value: '',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 综合数据管理展示与查询--lry
    fetchData() {
      console.log(this.dataName)
      this.listLoading = true
      if (this.dataName === 'all' || this.dataName.length === 0) {
        //console.log(this.dataName)
        this.initName = ['111']
      } else {
        // //console.log(JSON.parse(JSON.stringify(this.dataName)))
        this.initName = JSON.parse(JSON.stringify(this.dataName))
      }
      const params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        start: this.currentPage-1,
        limit: this.limit
      }
      // //console.log(this.initName)
      getEquipmentTypeByPage(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },

    addEquipmentType() {
      this.ifUpdate ='1'
      this.dataName=""
    },
    handleDetail(index, row) {
      this.ifUpdate ='2'
      this.row = row
    },
    handleEdit(index, row) {
      this.ifUpdate ='2'
      this.row = row
    },
    handleDelete(index, row) {
      this.$alert(`是否永久删除:\"${row.equipmentTypeName}\"设备类型`, '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delEquipmentType(row.equipmentTypeId).then((response) => {
              this.$alert(response.data, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                showClose: false
              }).then(() => {
                this.dataName=""
                this.fetchData()
              })
            })
          }
        }
      })
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
        start: this.currentPage-1,
        limit: this.limit
      }
      getEquipmentTypeByPage(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    changeDiv(value) {
      this.ifUpdate = value
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
*{
  //font-size: 18px;
}
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
<style  lang="less">
//覆盖样式
.el-select-dropdown__item {
  height: 30px;
  flex: 1 0 25%;
  margin: 10px;
}
.el-select-dropdown__list {
  margin: 5px 20px 20px 5px;
  height: auto;
  width: 600px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: stretch;
}
.el-select-dropdown__wrap{
  max-height: none;
}
.el-scrollbar {
  height: 100%;
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

.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.myel_row {
  margin-bottom: 2px !important;
  background-color: #d3dce6;
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.radio_class{
  display:inline-block;
  height:2rem;
  width:100%;
}
</style>
