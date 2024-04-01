<template>
  <div>
    <div class="source">
      <el-page-header content="设备信息" @back="back" />
    </div>
    <div class="temp-container">
      <div
        v-show="ifUpdate === '0'"
        class="show"
      >
        <el-table
          v-loading="listLoading"
          :diisable="true"
          :data="list"
          element-loading-text="Loading"
          height="70vh"
          :row-style="{height:'6.26vh'}"
          :cell-style="{padding:'0px'}"
          border
          highlight-current-row
          stripe
          @cell-dblclick="tbCellDoubleClick"
        >
          <el-table-column
            type="index"
            :index='(index) => {return index + (this.currentPage - 1) * this.limit + 1}'
            align="center"
            label='序号'
            width='60'
          />
          <el-table-column
            v-for="(item,index) in dataname"
            :key="index"
            :label="item.label"
            :prop="item.value"
            :formatter="item.formatter"
            :width=flexColumnWidth(item.label,item.value)
            align="center"
            show-overflow-tooltip
          >

          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="250px"
          >
            <template slot-scope="scope">
              <el-button
                type="success" plain
                size="mini"
                @click="handleDetail(scope.$index, scope.row)"
              >详情</el-button>
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
      <div v-if="ifUpdate === '1'">
        <addInfo @changeDiv="changeDiv" />
      </div>
      <div v-if="ifUpdate === '2' || ifUpdate === '3'">
        <updateInfo
          :row="row"
          :current-show="ifUpdate"
          @changeDiv="changeDiv"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import addInfo from '@/components/Infomanage/addInfo'
import updateInfo from '@/components/Infomanage/updateInfo'
import { delPostDepartment } from '@/api/baseparameter'

export default {
  // 引用vue reload方法
  inject: ['reload'],
  props: {
    preRow: {
      type: Object,
      required: true
    }
  },
  components: {
    addInfo,
    updateInfo
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
      guaranteePeriodID: '保修期:',
      editionID: '中间件版本:',
      typeID: 'CPU类型:',
      type: 0,
      currentPage:1,
      edition: 0,
      guaranteePeriod: 0,
      restaurants: [],
      foad: [],
      cpu_middle_guar: 'all',
      initdata: [],
      dialogVisible: false,
      row: {},
      list: null,
      total: 0,
      start: 0,
      limit: 10,
      DataName: 'all',
      keyname: [],
      initname: ['123'],
      department: '',
      inputValue: '',
      postname: '',
      input3: '',
      ifUpdate: '0',
      listLoading: true,
      singalInfo: {},
      initval: [],
      dataname: [
        {value: "basicInfoId", label:"设备编号"},
        {value: "postName", label:"所属单位名称"},
        {value: "departmentName", label:"所属部门名称"},
        {value: "equipmentTypeName", label:"设备类型"},
        {
          value: "trueOrVirtual",
          label:"实体机/虚拟机",
          formatter:function(row){
            let trueOrVirtual = row.trueOrVirtual === '1' ? '实体机' : row.trueOrVirtual === '' ? '' : '虚拟机'
            return trueOrVirtual
          }
        },
        {value: "isChinaLocalization", label:"硬件是否国产化"},
        {value: "equipmentName", label:"设备名称"},
        {value: "equipmentAdminName", label:"设备管理员"},
        {value: "equipmentAdminPhone", label:"设备管理员电话"},
        {value: "appAdminName", label:"应用管理员"},
        {value: "appAdminPhone", label:"应用管理员电话"},
        {
          value: "onlineTime",
          label: '上线时间',
          formatter: function (row) {
            let time = row.onlineTime
            if (time == null) {
              return null
            } else {
              //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
              var date = new Date(time)
              var year = date.getFullYear()
              /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
              var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
              var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              // 拼接
              // return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
              return year + '-' + month + '-' + day
            }
          }
        },
        {
          value: "offlineTime",
          label: '下线时间',
          formatter: function (row) {
            let time = row.offlineTime
            if (time == null) {
              return null
            } else {
              //时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
              var date = new Date(time)
              var year = date.getFullYear()
              /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
              var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
              var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
              var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
              var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
              var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
              // 拼接
              // return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
              return year + '-' + month + '-' + day
            }
          }
        },
        {
          value: 'status',
          label: '设备状态',
          formatter: function (row) {//还需要修改上方newList
            let status = row.status
            console.log(status)
            switch (status) {
              case '0':
                status = '在用'
                break
              case '1':
                status = '停用'
                break
              case '2':
                status = '报废'
                break
              default:
                status = '状态异常'
                break
            }
            return status
          }

        },
        {value: "isTransfer", label:"是否存在调拨"},
        {value: "transferRecord", label:"设备调拨记录"},
        {value: "transferRecordTime", label:"设备调拨时间"},
        {value: "isMoving", label:"是否存在移动"},
        {value: "movingRecord", label:"设备移动记录"},
        {value: "movingRecordTime", label:"设备移动时间"},
        {value: "machineRoomName", label:"安装位置"},
        {value: "cabinetName", label:"机柜号"},
        {value: "cabinetUStart", label:"机柜开始U位"},
        {value: "cabinetUEnd", label:"机柜结束U位"},
        {value: "guaranteePeriod", label:"保修期"},
        {value: "pool", label:"所属资源池"},
        {value: "hostName", label:"主机名"},
        {value: "businessApplicationName", label:"业务应用名称"},
        {value: "businessSystem", label:"所属业务子系统"},
        {value: "businessSystemLevel", label:"所属业务子系统等保等级"},
        {value: "businessSystemFirstName", label:"所属业务系统"},
        {value: "isTestBusinessSystem", label:"正式业务/实验业务"},
        {value: "ipAddress", label:"IP地址"},
        {value: "macAddress", label:"MAC地址"},
        {value: "type", label:"CPU型号"},
        {value: "configMemoryCorenessOrCapacity", label:"内存容量（GB）"},
        {value: "softwareOperatingSystemEdition", label:"操作系统版本"},
        {value: "edition", label:"中间件品牌规格"},
        {value: "softwareDatabaseEdition", label:"数据库版本"},
        {
          value: 'businessOrExperimental',
          label: '业务机/实验机',
          formatter: function(row) {
            let businessOrExperimental = row.businessOrExperimental === '1' ? '实验机' : (row.businessOrExperimental==='0' ? '业务机': '')
            return businessOrExperimental
          }
        },
        {
          value: 'mainOrBackup',
          label: '主机/备机',
          formatter: function(row) {
            let mainOrBackup = row.mainOrBackup === '0' ? '主机' : (row.mainOrBackup ==='' ? '':'备机')
            return mainOrBackup
          }
        },
        {
          value: 'migratable',
          label: '是否可迁移',
          formatter: function(row) {
            let migratable = row.migratable === '0' ? '是' : (row.migratable ==='' ? '':'否')
            return migratable
          }
        },
        {
          value: 'shelfOff',
          label: '是否可下架',
          formatter: function(row) {
            let shelfOff = row.shelfOff === '0' ? '是' : (row.shelfOff ==='' ? '':'否')
            return shelfOff
          }
        },
        {value: "brandName", label:"品牌"},
        {value: "brandModelName", label:"型号"},
        {value: "serialNumber", label:"序列号"},
        {value: "deploymentEnvironment", label:"部署环境（互联网/地震行业网/政务外网/应急指挥信息网/其他）"},
        {value: "remarks", label:"备注"},
        {value: "singleAndDoublePowerSupply", label:"单双电源"},
        {value: "agreedToTemporaryShutdown", label:"是否同意临时关停（是/否）"},
        {value: "installSafetyMonitoringSoftware", label:"是否安装安全监测软件"},
        {value: "deployStrongPassword", label:"是否部署强口令"},
        {value: "cloudServiceUnit", label:"云服务单位"},
        {value: "leasedComputingResources", label:"租用计算资源情况（CPU核数）（个）"},
        {value: "leasedStorageResources", label:"租用存储资源情况（TB）"},
        {value: "leasedNetworkBandwidth", label:"租用网络带宽（兆）"},
        {value: "termOfLease", label:"租用期限（年）"},
        // {value: "domainName", label:"域名"},
        // {value: "domainNameRegistrationService", label:"域名注册服务商"},
        {value: "ns", label:"NS记录"},
        {value: "cname", label:"CNAME记录（别名）"},
        {value: "useCDN", label:"是否使用CDN"},
        {value: "networkArea", label:"网络区域"},
        {value: "accessLocation", label:"接入位置"},
      ],
      value: '',
    }
  },
  created() {
    //console.log(this.initname)
    this.fetchData()
    // this.getInitValue(this.initdata)
  },
  mounted() {
    this.restaurants = this.loadAll()
    // console.log(this.initval);
  },
  methods: {
    back() {
      this.$emit('changeDiv', '0')
    },
    createFilter(queryString) {
      //console.log(queryString)
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      //console.log(this.foad)
      return this.foad
    },

    tbCellDoubleClick(row, column, cell, event) {
      //console.log(cell)
      this.$alert(row[column.property], '单元格值', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    },
    // 综合数据管理展示与查询--lry
    fetchData() {
      this.listLoading = true
      console.log(this.preRow)
      // 判断处理---解决空值与后台逻辑不符合问题----时间紧待优化
      if (this.DataName === 'all' || this.DataName.length === 0) {
        //console.log(this.DataName)
        this.initname = ['111']
      } else {
        this.initname = JSON.parse(JSON.stringify(this.DataName))
      }
      this.initname=['cabinetId']
      const params = {
        dataName: this.initname,
        dataValue: this.preRow.cabinetId ==null ? this.preRow[0].cabinetId:this.preRow.cabinetId,
        status: "0",
        start: this.start,
        limit: this.limit
      }
      console.log("this.start,this.limit",this.start,this.limit)
      getList(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        console.log("this.list",this.list)
        //console.log("List---------");
        //console.log(this.list)
        this.listLoading = false
      })
    },
    handleDetail(index, row) {
      console.log("999999999999999999999", row)
      this.row = row
      this.ifUpdate = '2'
    },
    handleEdit(index, row) {
      //console.log(index, row)
      this.row = row
      this.ifUpdate = '3'
    },
    handleDelete(row) {
      delPostDepartment(row.equipmentId).then((response) => {
        this.$alert(response.data, '提示', {
          confirmButtonText: '确定',
          type: 'info',
          showClose: false
        }).then(() => {
          this.fetchData()
        })
      })
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`)
      this.limit = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(this.preRow)
      this.currentPage = val
      const params = {
        dataName: this.initname,
        dataValue: this.preRow.cabinetId,
        status: "0",
        start: (val - 1) * this.limit,
        // start: val - 1,
        limit: this.limit
      }
      getList(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    changeDiv(value) {
      this.ifUpdate = value
      this.fetchData()
    },
    /**
     * el-table-column 自适应列宽
     * @param prop_label: 表名
     * @param table_data: 表格数据
     */
    flexColumnWidth(label, prop) {
      return this.getTextWidth(label) * 1.7 + 40 + 'px'
    },
    /**
     * 使用span标签包裹内容，然后计算span的宽度 width： px
     * @param valArr
     */
    getTextWidth(str) {
      let width = 0
      const html = document.createElement('span')
      html.innerText = str
      html.className = 'getTextWidth'
      document.querySelector('body').appendChild(html)
      width = document.querySelector('.getTextWidth').offsetWidth
      document.querySelector('.getTextWidth').remove()
      return width
    },
  }
}
</script>
<style lang="less" scoped>
.source {
  padding: 24px;
}
</style>
