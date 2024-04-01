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
                <span style='color: #ffffff'>自定义字段管理</span>
              </div>
            </el-col>
          </el-row>
          <el-row
            :gutter='10'
            class='bg-condition'
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
                @click='addCustomField()'
              >添加字段
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
              v-for='(item,index) in basicValue'
              :key='index'
              :label='item.label'
              :prop='item.value'
              :formatter='item.formatter'
              align='center'
            >
            </el-table-column>
            <el-table-column align='center' label='操作' width='250px'>
              <template slot-scope='scope'>
<!--                <el-button-->
<!--                  type='success' plain-->
<!--                  size='mini'-->
<!--                  @click='cabinetDetail(scope.$index, scope.row)'-->
<!--                >详情-->
<!--                </el-button>-->
                <el-button
                  type='primary' plain
                  size='mini'
                  @click='customFieldEdit(scope.$index, scope.row)'
                >编辑
                </el-button>
                <el-button
                  size='mini'
                  type='danger'
                  text
                  @click='customFieldDelete(scope.$index, scope.row)'
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
<!--        <div v-if="ifUpdate === '1'">-->
<!--          <InfoTemplate :pre-row='row' @changeDiv='changeDiv' />-->
<!--        </div>-->
        <div v-if="ifUpdate === '2'">
          <add-custom-field @changeDiv='changeDiv' />
        </div>
        <div v-if="ifUpdate === '3'">
          <update-custom-field :row='row' :current-show='ifUpdate' @changeDiv='changeDiv' />
        </div>
      </div>
    </div>
</template>

<script>
import AddMachineRoom from '@/components/Baseparameter/machineRoom/addMachineRoom/index.vue'
import UpdateCabinet from '@/components/Baseparameter/machineRoom/updateCabinet/index.vue'
import InfoTemplate from '@/components/Infomanage/InfoTemplate/index.vue'
import MachineRoomTable from '@/components/Infomanage/importExcel/machineRoomTable.vue'
import { mapGetters } from 'vuex'
import {
  delCabinet, delCustomField,
  getCustomFieldByPage
} from '@/api/baseparameter'
import AddCustomField from '@/components/Baseparameter/CustomField/addCustomField/index.vue'
import UpdateCustomField from '@/components/Baseparameter/CustomField/updateCustomField/index.vue'

export default {
  name: 'custom_field',
  components: {
    AddCustomField,
    UpdateCustomField,
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
          value: 'fieldName',
          label: '字段名称'
        },
        {
          value: 'fieldLabel',
          label: '字段标签'
        }
      ],
      basicValue: [
        {
          value: 'fieldName',
          label: '字段名称'
        },
        {
          value: 'fieldLabel',
          label: '字段标签'
        }
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
      this.listLoading = true
      if (this.dataName === 'all' || this.dataName.length === 0) {
        console.log(this.dataName)
        this.initName = ['111']
      } else {
        this.initName = JSON.parse(JSON.stringify(this.dataName))
      }
      const params = {
        dataName: this.initName,
        dataValue: this.inputValue,
        start: this.currentPage - 1,
        limit: this.limit
      }
      getCustomFieldByPage(params).then((response) => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
        console.log("信息",this.list)
      })
    },

    addCustomField() {
      //添加组件
      this.ifUpdate = '2'
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
      getCustomFieldByPage(params).then((response) => {
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
    // cabinetDetail(index, row) {
    //   this.row = row
    //   this.ifUpdate = '1'
    // },
    customFieldEdit(index, row) {
      this.row = row
      this.ifUpdate = '3'
    },
    customFieldDelete(index, row) {
      this.row = row
      this.$alert(`是否永久删除字段：\"${row.fieldName}\"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
            delCustomField(row.id).then((response) => {
              console.log("删除ID",row.id)
              this.$alert(response.data, '提示', {
                confirmButtonText: '确定',
                type: 'info',
                showClose: false
              }).then(() => {
                this.dataName = []
                this.fetchData()
              })
            })
          }
        }
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
