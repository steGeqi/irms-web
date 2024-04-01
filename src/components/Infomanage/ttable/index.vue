<template>
  <div>
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span><slot name="header" /></span></div>
    <div class="app-container">
      <div v-show="!ifUpdate" class="show">
        <el-row>
          <el-col :span="24"><div class="grid-content bg-purple-dark"><slot name="top" /></div></el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2"><div class="grid-content bg-purple">查询条件：</div></el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content bg-purple-light">
            <span>单位</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div></el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content bg-purple">
            <span>部门</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select></div></el-col>
          <el-col :xs="4" :sm="5" :md="5" :lg="5" :xl="4">
            <div class="grid-content bg-purple-light">
              <span>其他</span>
              <el-cascader :options="options" :show-all-levels="false" />
            </div>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-col>
          <el-col :xs="1" :sm="1" :md="1" :lg="3" :xl="1"><el-button type="info" @click="addInfo()">添加设备信息</el-button></el-col>
        </el-row>
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          highlight-current-row
          stripe
        >
          <el-table-column type="index" />
          <el-table-column v-for="(value,key,index) in labels" :key="index" align="center" :label="value">
            <template slot-scope="scope">
              {{ scope.row[key] }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="250px">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button>
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div v-show="ifUpdate">
        <addinfo @ifUpdateChange="updateIfupdate" />
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Addinfo from '@/components/Infomanage/addInfo'

export default {
  components: {
    Addinfo
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
  props: {
    labels: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      currentPage1: 5,
      input3: '',
      ifUpdate: false,
      listLoading: true,
      singalInfo: {},
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      value: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    addInfo() {
      this.ifUpdate = true
    },
    handleDetail(index, row) {
      //console.log(index, row)
    },
    handleEdit(index, row) {
      //console.log(index, row)
    },
    handleDelete(index, row) {
      //console.log(index, row)
    },
    updateIfupdate(e) {
      this.ifUpdate = e
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`)
      this.limit=val
      this.fetchData()
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped>
//*{
//  font-size: 18px;
//}
.el-row {
  margin-bottom: 20px;
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
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.grid-content{
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}
//.font{
//  font-size: 18px;
//}
.el-cascader .el-input {
    width: 130px;
  }
//.el-pagination > *{
//  font-size: 18px;
//}
.block{
  text-align: center;
}
</style>
