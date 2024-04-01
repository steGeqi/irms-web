<template>
  <div class='infobody'>
    <div class='grid-content bg-purple'>
      <i class='el-icon-s-order' /><span>全生命周期管理</span>
    </div>
    <div class='app-container'>
      <div class='show'>
        <el-row>
          <el-col :span='24'>
            <div class='grid-content bg-purple-dark'>资源申请</div>
          </el-col>
        </el-row>
        <el-row :gutter='10' class='bg-condition'>
          <el-col :lg='2' :md='2' :sm='2' :xl='2' :xs='2'>
            <span>查询条件：</span>
          </el-col>
          <el-col :lg='3' :md='3' :sm='3' :xl='3' :xs='3'>
            <el-select
              v-model='DataName'
              multiple
              placeholder='详细字段查询'
              size='medium'
            >
              <el-option
                v-for='(item, index) in dataname'
                :key='index'
                :label='item.label'
                :value='item.value'
                class='searchInput'
              />
            </el-select>
          </el-col>
          <el-col :lg='4' :md='4' :sm='4' :xl='4' :xs='4'>
            <el-input
              v-model='inputValue'
              clearable
              placeholder='输入查询内容'
              size='medium'
            />
          </el-col>
          <el-col :lg='2' :md='2' :sm='2' :xl='2' :xs='2'>
            <el-button
              clearable='true'
              icon='el-icon-search'
              size='medium'
              type='primary'
              @click='search()'
            >搜索
            </el-button
            >
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
          <el-table-column :index='(index) => {return index + (this.currentPage - 1) * this.limit + 1}' align='center'
                           fixed='left'

                           show-overflow-tooltip type='index' />
          <af-table-column
            v-for='(value, key, index) in labels'
            :key='index'
            :label='value'
            align='center'
            width='180px'
          >
            <template slot-scope='scope'>
              <el-form :ref='labels' :model='labels'>
                <el-form-item style='height:20px'>
                  <el-input v-if="scope.row.isEdit && (key ==='ipAddress' || key ==='macAddress')"
                            v-model='scope.row[key]' placeholder='请输入'>
                  </el-input>
                  <span v-else>{{ scope.row[key] }}</span>
                </el-form-item>
              </el-form>
            </template>
          </af-table-column>
          <el-table-column align='center' fixed='right' label='操作' width='200px'>
            <template slot-scope='scope'>
              <el-button
                :style="{ display: scope.row.isEdit===false?'none':'' }"
                size='mini'
                @click='handleDetail(scope.$index, scope.row)'
              >{{ scope.row.isEdit ? '取消' : '详情' }}
              </el-button
              >
              <el-button
                size='mini'
                @click='handleMove(scope.$index, scope.row)'
              >{{ scope.row.isEdit ? '提交' : '申请' }}
              </el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class='block'>
          <el-pagination
            :current-page='currentPage'
            :page-size='limit'
            :total='total'
            layout='total, sizes, prev, pager, next, jumper'
            @size-change='handleSizeChange'
            @current-change='handleCurrentChange'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBasicInfoNetworkByPage, updateBasicInfoNetwork } from '@/api/IP_address'
import user from '@/store/modules/user'

import { validateIP, validateMAC } from '@/api/validate'

export default {
  data() {
    return {
      roleid: user.state.roleid,
      start: 0,
      limit: 10,
      currentPage: 1,
      total: 0,
      isEdit: false,
      list: null,
      DataName: '',
      initname: [],
      inputValue: '',
      listLoading: true,
      dataname: [
        {
          value: 'postName',
          label: '所属单位'
        },
        {
          value: 'departmentName',
          label: '所属部门'
        },
        {
          value: 'basicInfoId',
          label: '设备编号'
        },
        {
          value: 'equipmentName',
          label: '设备名'
        },
        {
          value: 'brandName',
          label: '设备品牌'
        },

        {
          value: 'network_card_name',
          label: '网卡名'
        },
        {
          value: 'ip_address',
          label: 'IP 地址'
        },
        {
          value: 'MAC_address',
          label: 'MAC 地址'
        },
        {
          value: 'machineRoomName',
          label: '安装位置'
        },
        {
          value: 'cabinetName',
          label: '机柜编号'
        },
        {
          value: 'onlineTime',
          label: '上线时间'
        },
        {
          value: 'hostName',
          label: '主机名'
        },
        {
          value: 'guaranteePeriod',
          label: '保修期'
        }
      ],
      value: '',
      labels: {
        postName: '所属单位',
        departmentName: '所属部门',
        basicInfoId: '设备编号',
        equipmentTypeName: '设备类型',
        equipmentName: '设备名',
        ipAddress: 'IP 地址',
        macAddress: 'MAC 地址',
        networkCardName: '网卡名',
        brandName: '设备品牌',
        onlineTime: '上线时间',
        hostName: '主机名',
        guaranteePeriod: '保修期',
        machineRoomName: '安装位置',
        cabinetName: '机柜编号'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      if (this.DataName.length === 0) {
        this.initname = ['111']
      } else {
        this.initname = JSON.parse(JSON.stringify(this.DataName))
      }
      const params = {
        dataName: this.initname,
        dataValue: this.inputValue,
        status: '0',
        start: (this.currentPage - 1) * this.limit,
        limit: this.limit
      }
      getBasicInfoNetworkByPage(params).then((res) => {
        this.total = res.data.total
        let data = []
        res.data.items.forEach(element => {
          element[0].isEdit = false
          data.push(Object.assign(element[1], element[0]))
        })
        this.list = data
        this.listLoading = false
      })
    },

    search() {
      this.start = 0
      this.currentPage = 1
      this.fetchData()
    },

    handleSizeChange(val) {
      this.limit = val
      this.fetchData()
    },

    handleDetail(index, row) {
      if (row.isEdit) {
        row.isEdit = !row.isEdit
      }
    },

    handleMove(index, row) {
      row.isEdit = !row.isEdit
      if (!row.isEdit) {
        const params = {
          equipmentId: row.equipmentId,
          ip_address: row.ipAddress,
          mac_address: row.macAddress,
          network_card_name: row.networkCardName
        }
        // 判断 IP和MAC格式是否正确
        const checkIp = validateIP(params.ip_address)
        const checkSwitch = validateMAC(params.mac_address)
        if (checkIp && checkSwitch) {
          updateBasicInfoNetwork(params).then(res => {
            this.$message({
              message: '申请成功',
              type: 'success'
            })
          })
        } else {
          this.$message({
            message: '申请失败，IP地址或MAC地址有误',
            type: 'error'
          })
          this.fetchData()
        }
      } else {
        // 不提交申请
      }
    },
    handleCurrentChange(val) {
      this.start = (val - 1) * this.limit
      this.currentPage = val
      this.fetchData()
    }

  }
}
</script>

<style lang='less' scoped>

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
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-condition {
  line-height: 50px;
  text-align: center;
  height: 54px;
  margin: 0 !important;
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

/* 需要覆盖的组件样式 */
<style lang='less' scoped>
.el-select-dropdown__item {
  height: 30px;
  flex: 1 0 25%;
  margin: 10px;
}

// 必须给子元素一个上层class名才不会影响到其他页面同名组件
.el-select-dropdown__list {
  margin-right: 20px;
  margin-left: 5px;
  margin-top: 5px;
  height: auto;
  width: 600px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: stretch;
}

.el-scrollbar {
  // height: 380px;
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

</style>
