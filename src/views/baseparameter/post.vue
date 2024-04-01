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
              <span style="color: #ffffff">单位管理</span>
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
              class="select"
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
              @click="addPost()"
            >添加单位</el-button>
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
          <el-table-column align="center" label="操作" width="250px">
            <template slot-scope="scope">
              <el-button
                type='success' plain
                size='mini'
                @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button>
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
        <addPost @changeDiv="changeDiv" />
      </div>
      <div v-if="ifUpdate === '2' || ifUpdate === '3'">
        <updatePost :row="row" :current-show="ifUpdate" @changeDiv="changeDiv" />
      </div>
    </div>
  </div>
</template>

<script>
import {delPost, getPostByPage} from '@/api/baseparameter'
import addPost from '@/components/Baseparameter/post/addPost'
import updatePost from '@/components/Baseparameter/post/updatePost'

export default {
  components: {
    addPost,
    updatePost
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
      currentPage:1,
      limit:10,
      initName:'',
      inputValue: '',
      dataName: 'all',
      ifUpdate: '0',
      listLoading: true,
      basicvalue: [
        {
          value: 'postName',
          label: '单位名称'
        },
        {
          value: 'postCode',
          label: '单位代码'
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
      this.currentPage = 1
      this.fetchData()
    },
    // 综合数据管理展示与查询--lry
    fetchData() {
      // //console.log(this.basicValue)
      // 判断处理---解决空值与后台逻辑不符合问题----时间紧待优化
      this.listLoading = true
      // //console.log(this.basicValue)
      // 判断处理---解决空值与后台逻辑不符合问题----时间紧待优化
      if (this.dataName === 'all' || this.dataName.length === 0) {
        //console.log(this.dataName)
        this.initName = ['postName', 'postCode']
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
      getPostByPage(params).then((response) => {
        console.log("params",params)
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },

    addPost() {
      this.ifUpdate ='1'
    },
    handleDetail(index, row) {
      this.ifUpdate ='2'
      this.row = row
    },
    handleEdit(index, row) {
      this.ifUpdate ='3'
      this.row = row
    },
    handleDelete(index, row) {
      this.$alert(`是否永久删除单位:\"${row.postName}\"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delPost(row.postId).then((response) => {
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
      getPostByPage(params).then((response) => {
        console.log("response",response)
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
    // handleSizeChange(val) {
    //   //console.log(`每页 ${val} 条`)
    //   this.limit=val
    //   this.fetchData()
    // },
    // handleCurrentChange(val) {
    //   this.currentPage=val
    //   const params = {
    //     dataName: this.initName,
    //     dataValue: this.inputValue,
    //     start: this.currentPage-1,
    //     limit: 10
    //   }
    //   getPostByPage(params).then((response) => {
    //     this.list = response.data.items
    //     this.total = response.data.total
    //     this.listLoading = false
    //   })
    // },
    // changeDiv(value) {
    //   this.ifUpdate = value
    //   this.fetchData()
    // }
  }
}
</script>

<style lang="less" scoped>
//.select-container {
//  height: 40px;
//  overflow: hidden;
//}

.select {
  height: 100%;
}

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
