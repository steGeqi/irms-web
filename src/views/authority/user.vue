<template>
  <div class='infobody'>
    <div class='grid-content bg-purple'>
      <i class='el-icon-s-order' /><span>系统信息管理</span>
    </div>
    <div class='app-container'>
      <div v-if="ifShow === '0'"
           class='show'
      >
        <el-row>
          <el-col :span='24'>
            <div class='grid-content bg-purple-dark'>
              <span style='color: #ffffff'>用户信息管理</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter='10' class='bg-condition'>
          <el-col
            :xs='2'
            :sm='2'
            :md='2'
            :lg='2'
            :xl='2'
          >
            <span>查询条件：</span>
          </el-col>
          <el-col
            :xs='3'
            :sm='3'
            :md='3'
            :lg='3'
            :xl='3'
          >
            <el-select
              v-model='dataName'
              placeholder='详细字段查询'
              multiple
              size='medium'
              class='select'
            >
              <el-option
                v-for='(item,index) in dataname'
                :key='index'
                :label='item.label'
                :value='item.value'
                class='searchInput'
              />
            </el-select>
          </el-col>
          <el-col
            :xs='4'
            :sm='4'
            :md='4'
            :lg='4'
            :xl='4'
          >
            <el-input
              v-model='inputValue'
              placeholder='输入查询内容'
              clearable
              size='medium'
            />
          </el-col>
          <el-col :xs='3' :sm='3' :md='3' :lg='3' :xl='3'>
            <el-button
              size='medium'
              type='primary'
              icon='el-icon-search'
              clearable='true'
              @click='search()'
            >搜索
            </el-button>
          </el-col>
          <el-col :xs='2' :sm='2' :md='2' :lg='2' :xl='2'>
            <el-button
              size='medium'
              type='primary'
              icon='el-icon-plus'
              clearable='true'
              @click='add_user()'
            >添加用户
            </el-button>
          </el-col>
        </el-row>
        <el-table
          :disable='true'
          height='70vh'
          v-loading='listLoading'
          :data='tableData'
          border
          element-loading-text='Loading'
          highlight-current-row
          stripe
          :row-style="{height:'6.26vh'}"
          :cell-style="{padding:'0px',borderColor:'#C0C0C0' }"
          :header-cell-style="{borderColor:'#C0C0C0'}"
        >
          <el-table-column :index='(index) => {return index + (this.currentPage - 1) * this.limit + 1}'
                           align='center'
                           fixed='left'
                           show-overflow-tooltip type='index' />
          <el-table-column
            v-for='(item, index) in dataname'
            :key='index'
            :prop='item.value'
            :label='item.label'
            :formatter='item.formatter'
            header-align='center'
            align='center'
            show-overflow-tooltip
          />
          <el-table-column align='center' label='操作' width='300px'>
            <template slot-scope='scope'>
              <el-button @click='updateUser(scope.row)' type='info' size='small' icon='el-icon-edit'
                         v-if='scope.row.name !== roles[0]'>修改
              </el-button>
              <el-button @click='deleteUser(scope.row)' type='danger' size='small' icon='el-icon-delete'
                         v-if='scope.row.name !== roles[0]'>删除
              </el-button>
              <el-button @click='isdeleteUser(scope.row)' type='warning' size='small' icon='el-icon-video-play'
                         :class="scope.row.name === roles[0] ? 'StyleChange' : 'StyleRemainsUnchanged'"
              >{{ scope.row.isdel === '冻结' ? '激活' : '冻结' }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class='block'>
          <el-pagination
            @size-change='handleSizeChange'
            @current-change='handleCurrentChange'
            :current-page='currentPage'
            layout='total, sizes, prev, pager, next, jumper'
            :total='totalCount'
          >
          </el-pagination>
        </div>
      </div>
      <div v-if="ifShow === '1'">
        <add-user @changeDiv='changeDiv'></add-user>
      </div>
      <div v-if="ifShow === '2'">
        <update-user :row='row' @changeDiv='changeDiv'></update-user>
      </div>
    </div>
  </div>

</template>

<script>
import { deleteFosUser, getFosUserByPage, isdeleteFosUser } from '@/api/user'
import UpdateUser from '@/components/authority/user/updateUser/index.vue'
import AddUser from '@/components/authority/user/addUser/index.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: { AddUser, UpdateUser },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  data() {
    return {
      ifShow: '0',
      row: {},
      limit: 10,
      action: '',
      initName: '',
      listLoading: true,
      stateAll: [
        { 'id': '1', 'value': '冻结' },
        { 'id': '0', 'value': '激活' }
      ],
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 0,
      dataName: [],
      inputValue: '',
      dataname: [
        {
          value: 'realname',
          label: '用户姓名'
        },
        {
          value: 'username',
          label: '登录帐号'
        },
        {
          value: 'role',
          label: '单位（部门）'
        },
        {
          value: 'name',
          label: '角色'
        },
        {
          value: 'telephone',
          label: '电话'
        },
        {
          value: 'isdel',
          label: '状态'
        }
      ]
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {

    changeDiv(value) {
      this.ifShow = value

      this.fetchData()
    },

    add_user() {
      this.ifShow = '1'
    },

    search() {
      this.currentPage = 1
      this.fetchData()
    },

    fetchData() {
      this.listLoading = true

      if (this.dataName === 'all' || this.dataName.length === 0) {
        this.initName = ['111']
      } else {
        this.initName = JSON.parse(JSON.stringify(this.dataName))
      }

      let params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        start: (this.currentPage - 1) * this.limit,
        limit: this.limit
      }

      getFosUserByPage(params).then(res => {
          let data = []
          res.data.items.forEach(element => {
            data.push(Object.assign(element[1], element[0]))
          })
          for (let i of data) {
            i.isdel = i.isdel == '0' ? '激活' : '冻结'
          }
          this.tableData = data
          this.totalCount = res.data.total  //  减去自身账号
          this.listLoading = false
        }
      )
    },
    handleSizeChange(val) {
      this.limit = val
      this.currentPage = 1
      this.fetchData()
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
      this.fetchData()
    },
    isdeleteUser(row) {
      console.log(row)
      let params = {
        id: row.id
      }
      isdeleteFosUser(params).then(() => {
        this.fetchData()
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    },
    //删除用户弹窗
    deleteUser(row) {
      this.$alert(`是否永久删除用户：\"${row.realname}\"信息`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            deleteFosUser(row.id).then((response) => {
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

    updateUser(row) {
      this.row = row
      this.ifShow = '2'
    }
  }
}

</script>

<style lang='less' scoped>
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

.el-select-dropdown__item {
  padding: 0 35px;
  overflow: hidden;
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

.el-pagination > * {
  font-size: 18px;
}

.block {
  text-align: center;
}

.StyleChange {
  text-align: center;
}

.StyleRemainsUnchanged {

}
</style>
