<template>
  <div class="info-body">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>基础信息管理</span></div>
    <div class="app-container" >
      <!--  如果ifUpdate === 0 则展示表单页面, 如果ifUpdate===3 则弹出编辑框    -->
      <div v-show="ifUpdate === '0'"
           class="show">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
              <span style="color: #ffffff">部门管理</span>
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
            <!--    multiple属性设置可多选        -->
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
            <!--   clearable属性设置可去除         -->
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
              @click="searchData()"
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
              @click="addDepartment()"
            >添加部门</el-button>
          </el-col>
        </el-row>
      <el-table
        v-if="refreshTable"
        :data="tableData"
        height="70vh"
        :row-style="{height:'6.26vh'}"
        v-loading="listLoading"
        :default-expand-all="isExpand"
        element-loading-text="Loading"
        stripe
        highlight-current-row
        border
        show-header
        style="width: 100%">
        <el-table-column align="center" type="index" />
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                :data="props.row.children" :cell-style="{background:'pink'}">
                <el-table-column  align="center" width="48"/>
                <el-table-column  align="center" type="index"/>
                <el-table-column  prop="departmentName" label="部门" ></el-table-column>
                <el-table-column  prop="departmentCode" label="部门代码"  ></el-table-column>
                <el-table-column  label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">编辑</el-button>
                    <el-button size="mini" @click="handleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="postName" label="部门所属单位"></el-table-column>
          <el-table-column prop="postCode"  label="" ></el-table-column>
          <el-table-column prop="operation" label="" ></el-table-column>
      </el-table>


      </div>
      <div v-if="ifUpdate === '1'">
        <addDepartment @changeDiv="changeDiv" />
      </div>
      <div v-if="ifUpdate === '2'">
        <updateDepartment :row="row"  :current-show="ifUpdate" @changeDiv="changeDiv"></updateDepartment>
      </div>

    </div>
  </div>
</template>

<script>
import {getDepartment, getPost, getPostAllWithDepartment} from "@/api/select";
import addDepartment from "@/components/Baseparameter/department/addDepartment";
import updateDepartment from "@/components/Baseparameter/department/updateDepartment";
import {delPostDepartment} from "@/api/baseparameter";
export default {
  components: {
    addDepartment,
    updateDepartment
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
      refreshTable:true,
      isExpand:false,
      listLoading: true,
      tableData: [],
      tempTableData:[],
      postTotal:'',
      departmentTotal:'',
      inputValue: '',
      dataName: '',
      ifUpdate: '0',
      basicValue: [
        {
          value: 'departmentName',
          label: '部门名称',
        },
        {
          value: 'departmentCode',
          label: '部门代码'
        },
        {
          value: 'postName',
          label: '所属单位'
        }
      ],
    }
  },
  mounted() {
    this.fetchData()
    // ------------------------------获取数据开始------------------------------------------------------
   /* getPost().then(response => {
      this.listLoading = true
      this.postTotal = response.data.items.length
      let total = response.data.items.length
      let promises = []
      this.departmentTotal=0
      for (let i = 0; i < total; i++) {
        let postId = response.data.items[i].postId
        promises.push(
          getDepartment(postId).then(response => {
            //this.departmentTotal += response.data.items.length
            let item = {
              postName: '',
              postCode: i>=10?i:'0'+i,
              children: []
            }
            if(response.data.items.length > 0){
              item.postName = response.data.items[0].postName
              let departments = response.data.items
              for (let department of departments) {
                item.children.push({
                  postId:response.data.items[0].postId,
                  postName:response.data.items[0].postName,
                  departmentId: department.departmentId,
                  departmentCode:department.departmentCode,
                  departmentName:department.departmentName,
                  edit: this.handleEdit,
                  delete: this.handleDelete
                })
              }
              return item
            }
          })
        )

      }
      // console.log("++++++++++++++++++++++",promises)
      Promise.all(promises).then(results => {
        for (let result of results) {
          this.tableData.push(result)
          this.departmentTotal += result.children.length
        }
        this.listLoading = false
      })
      console.log("--------------------",this.tableData)
      this.tempTableData = this.tableData
      //console.log(this.tableData)
    })*/

    //------------------------------获取数据结束------------------------------------------------------
  },
  created() {

  },
  methods: {
    //----------------------搜索功能searchData()实现开始-------------------------------------------------------------
    searchData() {

      this.listLoading = true;
      this.tableData =  this.tempTableData ;
      let searchResults = [];
      if(this.inputValue !== ''){
        if(this.dataName.length === 0){
          searchResults = this.tableData.filter(data => {
            let resultData1 = (data.children.some(child => child.departmentName.includes(this.inputValue)))
            let resultData2 = (data.children.some(child => child.departmentCode.includes(this.inputValue)))
            let resultData3 = (data.postName.includes(this.inputValue))
            return resultData1 + resultData2 + resultData3
          });
          this.isExpand=true;
        }else{
          searchResults = this.tableData.filter(data => {
            if(this.dataName[0]===this.basicValue[0].value){
              return(data.children.some(child => child.departmentName.includes(this.inputValue)))
            }
            if(this.dataName[0]===this.basicValue[1].value){
              return (data.children.some(child => child.departmentCode.includes(this.inputValue)))
            }
            if(this.dataName[0]===this.basicValue[2].value){
              return (data.postName.includes(this.inputValue))
            }else {
              return null;
            }
          });
          this.isExpand=true;
        }
      }else{
        searchResults = this.tableData;
        this.isExpand=false;
      }
      this.refreshTable = false;
      this.tableData = searchResults;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
      this.listLoading = false;
      // setTimeout(() => {
      //   let searchResults = [];
      //   if (this.inputValue !== '') {
      //     searchResults = this.tableData.filter(data => {
      //       if(this.dataName[0]===this.basicValue[0].value){
      //         return(data.children.some(child => child.departmentName.includes(this.inputValue)))
      //       }
      //       if(this.dataName[0]===this.basicValue[1].value){
      //         return (data.children.some(child => child.departmentCode.includes(this.inputValue)))
      //       }
      //       if(this.dataName[0]===this.basicValue[2].value){
      //         return (data.postName.includes(this.inputValue))
      //       }else {
      //         return null;
      //       }
      //     });
      //     this.isExpand=true;
      //   } else {
      //     searchResults = this.tableData;
      //     this.isExpand=false;
      //   }
      //   //console.log(searchResults)
      //
      // }, 200);
    },
    //----------------------搜索功能searchData()实现结束-------------------------------------------------------------

    fetchData() {
      this.listLoading = true
      getPostAllWithDepartment().then(res=>{
        this.postTotal = res.data.items.length
        this.tableData = res.data.items
        this.tempTableData = this.tableData
        this.listLoading = false
        console.log("+++",this.tableData)
      })
    },
    addDepartment() {
      this.ifUpdate = '1'
    },
    handleEdit(index, row) {
      this.ifUpdate = '2'
      this.row = row
    },
    handleDelete(index, row) {
      this.$alert(`是否永久删除部门:\"${row.departmentName}\"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delPostDepartment(row.departmentId).then((response) => {
              this.$alert(response.data, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                showClose: false
              }).then(() => {
                this.fetchData()
                this.Refresh()
              })
            })
          }
        }
      })
    },

    changeDiv(value) {
      this.ifUpdate = value
      this.fetchData()
      // this.Refresh()
      this.searchData()

    },
  }


}
</script>

<style lang="less" scoped>
//*{
//  font-size: 18px;
//}
.count{
  background-color: #304156;
  color: #ffffff;
  height: 65px;
  line-height: 65px;
  font-size: 20px;
  .countPost{
    margin-left: 100px;
    margin-right: 100px;
  }
  .countDepartment{
    margin-right: 100px;
  }
}

.searchInput {
  height: 40px;
  text-align: center;
  color: #0b0c10;
  background-color: #deecff;
}
.bg-purple-dark {
  background: #304156;
}
.bg-purple {
  background: #d3dce6;
}
.app-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}

.bg-condition {
  line-height: 50px;
  text-align: center;
  height: 54px;
  margin: 0px !important;
  background: #d3dce6;
}

</style>

<style lang="less">
.el-table--border th.el-table__cell, .el-table__fixed-right-patch {
  border-bottom: 1px solid #EBEEF5;
  background-color: beige;
}


</style>
