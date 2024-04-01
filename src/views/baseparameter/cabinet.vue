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
              <span style='color: #ffffff'>机柜管理</span>
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
                v-for='(item,index) in setDataName'
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
              @click='addCabinet()'
            >添加机柜
            </el-button>
          </el-col>
        </el-row>
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
      <div v-if="ifUpdate === '2'">
        <addCabinet @changeDiv='changeDiv' />
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
  getCabinetTotal,
  getCabinetByPage,
  delCabinet,
  addMachineRoom
} from '@/api/baseparameter'
import InfoTemplate from '@/components/Infomanage/InfoTemplate'
import { getCabinet, getPost } from '@/api/select'
import { mapGetters } from 'vuex'
import UpdateCabinet from '@/components/Baseparameter/machineRoom/updateCabinet/index.vue'
import AddMachineRoom from '@/components/Baseparameter/machineRoom/addMachineRoom/index.vue'
import MachineRoomTable from '@/components/Infomanage/importExcel/machineRoomTable.vue'
import AddCabinet from '@/components/Baseparameter/machineRoom/addCabinet/index.vue'

export default {
  components: {
    AddCabinet,
    AddMachineRoom,
    UpdateCabinet,
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
        cabinetName: '',
        machineRoomId: '',
        postId: '',
        status: '',
        machineRoomName: '',
        postName: '',

      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      cabinetId: '',
      cabinetLoading: true,
      cabinetAll: [],
      // drawer: false,
      list: '',
      total: 0,
      currentPage: 1,
      limit: 10,
      initName: '',
      inputValue: '',
      dataName: 'all',
      ifUpdate: '0',
      listLoading: true,
      setDataName:[
        {
          value: 'c.cabinetName',
          label: '机柜名称'
        },
        {
          value: 'm.machineRoomName',
          label: '所属机房'
        },
        {
          value: 'm.postName',
          label: '所属单位'
        },
      ],
      basicvalue: [
        {
          value: '0.cabinetName',
          label: '机柜名称'
        },
        {
          value: '1.machineRoomName',
          label: '所属机房'
        },
        {
          value: '1.postName',
          label: '所属单位'
        },
      ],
      value: '',
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.fetchData()

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
        start: this.currentPage - 1,
        limit: this.limit
      }
      const numparams = {
        dataName: this.initName,
        dataValue: this.inputValue,
        status: ''
      }
      console.log(112233,params)
      console.log(332211,numparams)
      getCabinetTotal(numparams).then((response) => {
        this.total = response.data
      })
      // console.log(this.initName)
      getCabinetByPage(params).then((response) => {
        this.list = response.data.items
        this.listLoading = false
        console.log("信息",this.list)
      })
    },

    addCabinet() {
      //添加机房组件
      this.ifUpdate = '2'
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
      // this.drawer = true
      this.fetchCabinet(row)
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
      getCabinetByPage(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
        console.log("111",this.list)
      })
    },
    changeDiv(value) {
      this.ifUpdate = value
      this.fetchData()
    },

    cabinetDetail(index, row) {
      this.row = row
      // this.drawer = false
      this.ifUpdate = '1'
    },
    cabinetEdit(index, row) {
      this.row = row

      // this.drawer = false
      this.ifUpdate = '4'
    },
    cabinetDelete(index, row) {
      this.row = row
      console.log("信息333",this.row)
      this.$alert(`是否永久删除机柜：\"${row[0].cabinetName}\"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delCabinet(row[0].cabinetId).then((response) => {
              console.log("123123123",row[0].cabinetId)
              this.$alert(response.data, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                showClose: false
              }).then(() => {
                this.dataName = []
                this.drawer = false
                this.fetchData()
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
        console.log("333",val.machineRoomId)
        this.cabinetAll = response.data.items
        console.log("444",this.cabinetAll)
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
