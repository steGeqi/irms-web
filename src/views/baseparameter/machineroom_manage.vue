<template>
  <div class='infobody'>
    <div class='grid-content bg-purple'><i class='el-icon-s-order' /><span>基础信息管理</span></div>
    <div class='app-container'>
      <div
        v-show="ifUpdate === '0'"
        class='show'
      >
        <el-row>
          <el-col :span='24'>
            <div class='grid-content bg-purple-dark'>
              <span style='color: #ffffff'>机房管理</span>
            </div>
          </el-col>
        </el-row>
        <el-row
          :gutter='10'
          class='bg-condition'
        >
          <el-col :span='2'>
            <span>查询条件：</span>
          </el-col>
          <el-col :span='2'>
            <el-select
              v-model='dataName'
              placeholder='详细字段查询'
              multiple
              size='medium'
            >
              <el-option
                v-for='(item,index) in basicvalue'
                :key='index'
                :label='item.label'
                :value='item.value'
                class='searchInput'
              />
            </el-select>
          </el-col>
          <el-col :span='3'>
            <el-input
              v-model='inputValue'
              placeholder='输入查询内容'
              clearable
              size='medium'
            />
          </el-col>
          <el-col :span='2.5'>
            <el-button
              size='medium'
              type='primary'
              icon='el-icon-search'
              clearable='true'
              @click='search()'
            >搜索
            </el-button>
          </el-col>
          <el-col :span='2.5'>
            <el-button
              size='medium'
              type='primary'
              @click='addMachine()'
            >添加机房
            </el-button>
          </el-col>
          <el-col :span='2'>
            <el-button
              size='medium'
              type='primary'
              @click='importMachine()'
            >导入机房信息
            </el-button>
          </el-col>
        </el-row>
        <el-dialog title='新增机房' :visible.sync='dialogFormVisible'>
          <el-form :model='form'>
            <el-form-item label='机房名称' :label-width='formLabelWidth'>
              <el-input v-model='form.MachineRoomName' autocomplete='off'></el-input>
            </el-form-item>
            <el-form-item label='单位' prop='postId' :label-width='formLabelWidth'>
              <!-- <el-select v-model="value" placeholder="请选择单位" @change="changeSelect">
                <el-option
                  v-for="item in options"
                  :key="item.postId"
                  :lable="item.name"
                  :value="item.postId">
                </el-option>
              </el-select> -->
              <el-select v-model='form.postId' placeholder='请选择'>
                <el-option
                  v-for='item in postAll'
                  :key='item.postId'
                  :label='item.postName'
                  :value='item.postId'>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='机房管理员' :label-width='formLabelWidth'>
              <el-input v-model='form.machineAdministrator' autocomplete='off'></el-input>
            </el-form-item>
            <el-form-item label='机房面积' :label-width='formLabelWidth'>
              <el-input v-model='form.machineArea' autocomplete='off'></el-input>
            </el-form-item>
            <el-form-item label='机房位置' :label-width='formLabelWidth'>
              <el-input v-model='form.machineLocation' autocomplete='off'></el-input>
            </el-form-item>
          </el-form>
          <div slot='footer' class='dialog-footer'>
            <el-button @click='dialogFormVisible = false'>取 消</el-button>
            <el-button type='primary' @click='ceateMachineRoom()'>确 定</el-button>
          </div>
        </el-dialog>
        <el-table
          height='70vh'
          :row-style="{height:'6.26vh'}"
          :cell-style="{padding:'0px',borderColor:'#C0C0C0' }"
          :header-cell-style="{borderColor:'#C0C0C0'}"
          v-loading='listLoading'
          :disable='true'
          :data='list'
          element-loading-text='Loading'
          border
          highlight-current-row
          stripe
        >
          <el-table-column align='center' type='index' :index='typeIndex' show-overflow-tooltip />
          <el-table-column
            v-for='(item,index) in basicvalue'
            :key='index'
            :label='item.label'
            :prop='item.value'
            :formatter='item.formatter'
            align='center'
          >
          </el-table-column>
          <el-table-column align='center' label='操作' width='250px'>
            <template slot-scope='scope'>
              <el-button
                type='success' plain
                size='mini'
                @click='handleDetail(scope.$index, scope.row)'
              >详情
              </el-button>
              <el-button
                type='primary' plain
                size='mini'
                @click='handleEdit(scope.$index, scope.row)'
              >编辑
              </el-button>
              <el-button
                size='mini'
                type='danger'
                text
                @click='handleDelete(scope.$index, scope.row)'
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class='block'>
          <el-pagination
            :page-size='10'
            :current-page='currentPage'
            layout='total, sizes, prev, pager, next, jumper'
            :total='total'
            @size-change='handleSizeChange'
            @current-change='handleCurrentChange'
          />
        </div>
      </div>
      <div v-if="ifUpdate === '1'">
        <InfoTemplate :pre-row='row' @changeDiv='changeDiv' />
      </div>
      <el-drawer
        direction='rtl'
        :visible.sync='drawer'
        :with-header='false'>
        <div>
          <el-table
            :row-style="{height:'6.26vh'}"
            :cell-style="{padding:'0px'}"
            v-loading='listLoading'
            :disable='true'
            :data='cabinetAll'
            element-loading-text='Loading'
            border
            highlight-current-row
            stripe
          >
            <el-table-column align='center' type='index' />
            <el-table-column
              v-for='(item,index) in cabinetColumn'
              :key='index'
              :label='item.label'
              :prop='item.value'
              :formatter='item.formatter'
              align='center'
            >
            </el-table-column>
            <el-table-column align='center' label='操作' width='250px'>
              <template slot-scope='scope'>
                <el-button
                  type='success' plain
                  size='mini'
                  @click='cabinetDetail(scope.$index, scope.row)'
                >详情
                </el-button>
                <el-button
                  type='primary' plain
                  size='mini'
                  @click='cabinetEdit(scope.$index, scope.row)'
                >编辑
                </el-button>
                <el-button
                  size='mini'
                  type='danger'
                  text
                  @click='cabinetDelete(scope.$index, scope.row)'
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-drawer>
      <div v-if="ifUpdate === '2'">
        <addMachineRoom @changeDiv='changeDiv' />
      </div>
      <div v-if="ifUpdate === '3'">
        <updateMachineRoom :row='row' :current-show='ifUpdate' @changeDiv='changeDiv' />
      </div>
      <div v-if="ifUpdate === '4'">
        <UpdateCabinet :row='row' :current-show='ifUpdate' @changeDiv='changeDiv' />
      </div>
      <div v-if="ifUpdate === 'importMachine'">
        <machineRoomTable @changeDiv='changeDiv' />
      </div>
    </div>
  </div>

</template>

<script>
import {
  delMachineRoom,
  getMachineRoomByPage,
  getMachineRoomTotal,
  delCabinet,
  addMachineRoom
} from '@/api/baseparameter'
import InfoTemplate from '@/components/Infomanage/InfoTemplate'
import { getCabinet, getPost } from '@/api/select'
import { mapGetters } from 'vuex'
import UpdateMachineRoom from '@/components/Baseparameter/machineRoom/updateMachineRoom/index.vue'
import UpdateCabinet from '@/components/Baseparameter/machineRoom/updateCabinet/index.vue'
import AddMachineRoom from '@/components/Baseparameter/machineRoom/addMachineRoom/index.vue'
import MachineRoomTable from '@/components/Infomanage/importExcel/machineRoomTable.vue'

export default {
  components: {
    AddMachineRoom,
    UpdateCabinet,
    UpdateMachineRoom,
    InfoTemplate,
    MachineRoomTable
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
      postAll: [],
      form: {
        MachineRoomName: '',
        machineRoomId: '',
        postId: '',
        status: '',
        machineArea: '',
        machineLocation: '',
        machineAdministrator: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      cabinetId: '',
      cabinetLoading: true,
      cabinetAll: [],
      drawer: false,
      list: null,
      total: 0,
      currentPage: 1,
      limit: 10,
      initName: '',
      inputValue: '',
      dataName: 'all',
      ifUpdate: '0',
      listLoading: true,
      basicvalue: [
        {
          value: 'machineRoomName',
          label: '机房名称'
        },
        {
          value: 'postName',
          label: '所属单位'
        },
        {
          value: 'machineArea',
          label: '机房面积(㎡)'
        },
        {
          value: 'machineLocation',
          label: '机房位置'
        },
        {
          value: 'machineAdministrator',
          label: '机房管理员'
        },
        ],
      cabinetColumn: [
        {
          value: 'cabinetName',
          label: '机柜名称'
        }
      ],
      value: '',
      realRole: '',
      realChact: '',
      realRoleid: ''
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.fetchData()
    // this.realChact=this.$store.state.user.role_department_name
    // this.realRole=this.$store.state.user.role_name.split('/')[0] //这个
    this.realRoleid = this.$store.state.user.roleid

  },
  methods: {
    search() {
      this.start = 0
      this.currentPage = 1
      this.fetchData()
    },
    // 综合数据管理展示与查询--lry
    fetchData() {
      // console.log(this.basicValue)
      // 判断处理---解决空值与后台逻辑不符合问题----时间紧待优化
      this.listLoading = true
      // console.log(this.basicValue)
      // 判断处理---解决空值与后台逻辑不符合问题----时间紧待优化
      if (this.dataName === 'all' || this.dataName.length === 0) {
        console.log(this.dataName)
        this.initName = ['111']
      } else {
        // console.log(JSON.parse(JSON.stringify(this.dataName)))
        this.initName = JSON.parse(JSON.stringify(this.dataName))
      }
      const params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        status: '',
        start: (this.currentPage - 1) * this.limit,
        limit: this.limit
      }
      const numparams = {
        dataName: this.initName,
        dataValue: this.inputValue,
        status: '',
      }
      console.log(112233,params)
      console.log(332211,numparams)
      getMachineRoomTotal(numparams).then((response) => {
        this.total = response.data
        // console.log('111',this.total)
      })
      // console.log(this.initName)
      getMachineRoomByPage(params).then((response) => {
        this.list = response.data.items
        this.listLoading = false
      })
    },

    addMachine() {
      //添加机房组件
      this.ifUpdate = '2'

      // //添加机房弹窗
      // //清除Form表单上一次输入的值
      // this.form.machineArea=""
      // this.form.machineAdministrator=""
      // this.form.machineLocation=""
      // this.form.MachineRoomName=""
      // this.form.postId=""
      //
      // // this.ifUpdate ='1'
      // this.dialogFormVisible = true
      // // 取值有问题
      // const data ={
      //   role:this.roles[0], //这个地方是realRole 写成了roles
      //   postid:this.realRoleid
      // }
      // console.log(data)
      // getPost(data).then(response => {
      //   this.postAll = response.data.items
      // })
      // // if(this.realChact !=="超级管理员"){
      // //   this.postAll = []
      // //   var obj = {
      // //    postId: this.realRoleid,
      // //    postName: this.realRole
      // //   }
      // //   this.postAll.push(obj)
      // // }else{
      // //   getPost().then(response => {
      // //     // console.log(response.data.items)
      // //     this.postAll = response.data.items
      // //     // console.log(this.postAll);
      // //     // console.log(this.options);
      // //   })
      // // }

    },

    importMachine() {
      this.ifUpdate = 'importMachine'
    },
    ceateMachineRoom() {
      addMachineRoom(this.form).then(response => {
        console.log(response)
        this.$alert('新增成功', '提示', {
          confirmButtonText: '确定',
          type: 'info',
          showClose: false
        }).then(() => {
          this.dataName = ''
          this.dialogFormVisible = false
          this.fetchData()
        })
      })
    },
    handleDetail(index, row) {
      // this.ifUpdate ='2'
      // this.row = row
      this.drawer = true
      this.fetchCabinet(row)
    },
    handleEdit(index, row) {
      console.log(row)
      this.row = row
      this.ifUpdate = '3'
    },
    handleDelete(index, row) {
      this.$alert(`是否永久删除机房：\"${row.machineRoomName}\"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delMachineRoom(row.machineRoomId).then((response) => {
              console.log('***', row.machineRoomId)
              this.$alert(response.data, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                showClose: false
              }).then(() => {
                this.dataName = ''
                this.fetchData()
              })
            })
          }
        }
      })
    },
    handleSizeChange(val) {
      this.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      const params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        status: '',
        start: val - 1,
        limit: this.limit
      }
      getMachineRoomByPage(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    changeDiv(value) {
      this.ifUpdate = value
      this.fetchData()
    },

    cabinetDetail(index, row) {
      this.row = row
      this.drawer = false
      this.ifUpdate = '1'
    },
    cabinetEdit(index, row) {
      this.row = row
      this.drawer = false
      this.ifUpdate = '4'
    },
    cabinetDelete(index, row) {
      this.$alert(`是否永久删除机柜：\"${row.cabinetName}\"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delCabinet(row.cabinetId).then((response) => {
              this.$alert(response.data, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                showClose: false
              }).then(() => {
                this.dataName = 'all'
                this.drawer = false
              })
            })
          }
        }
      })
    },
    confirm() {
      alert(this.cabinetId)

    },
    fetchCabinet(val) {
      this.cabinetLoading = true
      getCabinet(val.machineRoomId).then(response => {
        this.cabinetAll = response.data.items
        this.cabinetLoading = false
      })
    },
    typeIndex(index) {
      return index + (this.currentPage - 1) * this.limit + 1
    }
  }
}
</script>

<style lang='less' scoped>
//*{
//  font-size: 18px;
//}

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
</style>
