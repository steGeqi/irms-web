<template>
  <div style="width: 100%; height: 100%; background-color: rgba(158,161,161,0.23)">
    <div>
      <el-table
        v-loading="loading"
        element-loading-text="正在生成统计报表，请稍等..."
        element-loading-spinner="el-icon-loading"
        height="66vh"
        :fit="true"
        :data='tableData'
        show-summary
        border
        highlight-current-row
        :row-style="{height:'6vh'}"
        :cell-style="{padding:'0px',borderColor:'#C0C0C0', fontSize: '20px' }"
        :header-cell-style="{ borderColor: '#C0C0C0', backgroundColor: 'yellow', color: 'rgba(241,20,20,0.76)', fontSize: '20px'}"
      >
        <el-table-column
          v-for="(item,index) in tableLis"
          :key="index"
          :label="item.label"
          :prop="item.value"
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getInfo} from "@/api/dashboard";
import {mapGetters} from "vuex";

export default {
  name: "statisticalTable",
  data(){
    return{
      loading: true,
      roleId:this.$store.state.user.roleid,
      userName:this.$store.state.user.post_name,
      roleName:this.$store.state.user.roles,
      businessSystemNumber: [],
      businessSonSystemNumber: [],
      fixEquipmentNumber: [],
      normalEquipmentNumber:[],
      scrapEquipmentNumber: [],
      totalEquipmentNumber:[],
      tableData:[],
      allPostName:[],
      tableLis:[
        {
          value: 'postName',
          label: '单位名称'
        },
        {
          value: 'totalEquipmentNumber',
          label: '填报设备数量'
        },
        {
          value: 'normalEquipmentNumber',
          label: '在用设备数量'
        },
        {
          value: 'fixEquipmentNumber',
          label: '停用设备数量'
        },
        {
          value: 'scrapEquipmentNumber',
          label: '报废设备数量'
        },
        {
          value: 'businessSonSystemNumber',
          label: '业务子系统数量'
        },
        {
          value: 'businessSystemNumber',
          label: '业务系统数量'
        },
      ],
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  async mounted() {
    await this.getDataAndHandlePostName()
    this.handleMakeTableData()
  },

  methods:{
 async getDataAndHandlePostName(){
      let params={
        postName:this.userName,
        roleId: this.roleId,
        roleName:this.roleName[0],
      }
      await getInfo(params).then(res=>{
        const {scrapCount, business, businessSon, fixCount, normalCount, subCount} = res.data;
        this.totalEquipmentNumber = subCount  //设备总数
        this.normalEquipmentNumber = normalCount //在用设备
        this.fixEquipmentNumber = fixCount
        this.scrapEquipmentNumber = scrapCount
        this.businessSystemNumber = business
        this.businessSonSystemNumber = businessSon
      })

      let repetitivePostName = []
      if (this.roles[0] === '超级管理员') {
        if(this.businessSystemNumber !== null){
          this.businessSystemNumber.forEach(item=>{repetitivePostName.push(item[0])})
        }
        if(this.totalEquipmentNumber !== null){
          this.totalEquipmentNumber.forEach(item=>{repetitivePostName.push(item[0])})
        }
        if(this.businessSonSystemNumber !== null){
          this.businessSonSystemNumber.forEach(item=>{repetitivePostName.push(item[0])})
        }
        if(this.fixEquipmentNumber !== null){
          this.fixEquipmentNumber.forEach(item=>{repetitivePostName.push(item[0])})
        }
        if(this.scrapEquipmentNumber !== null){
          this.normalEquipmentNumber.forEach(item=>{repetitivePostName.push(item[0])})
        }
        if(this.scrapEquipmentNumber !== null){
          this.scrapEquipmentNumber.forEach(item=>{repetitivePostName.push(item[0])})
        }
      }else {
        if(this.totalEquipmentNumber !== null){
          this.totalEquipmentNumber.forEach(item=>{repetitivePostName.push(item[0])})
        }else if(this.businessSystemNumber !== null){
          this.businessSystemNumber.forEach(item=>{repetitivePostName.push(item[0])})
        }
      }
      this.allPostName = repetitivePostName.filter((value, index, self) => {return self.indexOf(value) === index;})
    },
    handleMakeTableData(){
      this.tableData = this.allPostName.map(post=>{
        const totalEquipmentNumber = this.totalEquipmentNumber === null ? 0 : this.totalEquipmentNumber.find(item => item[0] === post)
        const normalEquipmentNumber = this.normalEquipmentNumber === null ? 0 : this.normalEquipmentNumber.find(item => item[0] === post)
        const fixEquipmentNumber = this.fixEquipmentNumber === null ? 0 : this.fixEquipmentNumber.find(item => item[0] === post)
        const scrapEquipmentNumber = this.scrapEquipmentNumber === null ? 0 : this.scrapEquipmentNumber.find(item => item[0] === post)
        const businessSystemNumber = this.businessSystemNumber === null ? 0 : this.businessSystemNumber.find(item => item[0] === post)
        const businessSonSystemNumber = this.businessSonSystemNumber === null ? 0 : this.businessSonSystemNumber.find(item => item[0] === post)

        const tempTotalEquipmentNumber = totalEquipmentNumber ? totalEquipmentNumber[1] : 0
        const tempNormalEquipmentNumber = normalEquipmentNumber ? normalEquipmentNumber[1] : 0
        const tempFixEquipmentNumber = fixEquipmentNumber ? fixEquipmentNumber[1] : 0
        const tempScrapEquipmentNumber = scrapEquipmentNumber ? scrapEquipmentNumber[1] : 0
        const tempBusinessSystemNumber = businessSystemNumber ? businessSystemNumber[1] : 0
        const tempBusinessSonSystemNumber = businessSonSystemNumber ? businessSonSystemNumber[1] : 0
        return{
          postName: post,
          totalEquipmentNumber: tempTotalEquipmentNumber,
          normalEquipmentNumber: tempNormalEquipmentNumber,
          fixEquipmentNumber: tempFixEquipmentNumber,
          scrapEquipmentNumber: tempScrapEquipmentNumber,
          businessSystemNumber: tempBusinessSystemNumber,
          businessSonSystemNumber: tempBusinessSonSystemNumber,
        }
      })
      this.tableData.sort((a, b) => b.totalEquipmentNumber - a.totalEquipmentNumber);
      this.$emit('get-table-data', this.tableData)
      this.loading = false
    },
  },

}
</script>

<style scoped lang="less">
/deep/.el-table_1_column_1{
  background-color: rgba(0, 216, 255, 0.23);
}

/deep/.el-icon-loading:before {
  content: "\e6cf";
  font-size: 50px;
}
/deep/.el-loading-spinner .el-loading-text {
  color: #409EFF;
  margin: 3px 0;
  font-size: 20px;
}

/deep/.el-table__footer-wrapper tbody td.el-table__cell {
  background-color: rgba(231, 114, 114, 0.53);
  color: #fa0000;
  font-size: 25px;
}
/deep/.el-table .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/deep/.el-table{
  overflow:visible !important;
}
</style>
