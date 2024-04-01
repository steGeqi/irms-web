<template>
  <div>
    <div v-show="ifUpdate==='0'" >
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <span style="color: #ffffff">设备管理</span>
        </div>
      </el-col>
    </el-row>
      <el-row
        :gutter="10"
        class="bg-condition"
      >
        <el-col
          :xs="1"
          :sm="1"
          :md="1"
          :lg="1"
          :xl="1">
          <el-button
            size="medium"
            :plain="true"
            @click="Refresh()"
          >返回</el-button>
        </el-col>
      </el-row>
      <el-table
        height="76.5vh"
        :row-style="{height:'6.26vh'}"
        :cell-style="{padding:'0px'}"
        v-loading="listLoading"
        :disable="true"
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        stripe
      >
        <el-table-column align="center" type="index" />
        <el-table-column  prop="basicInfoId" label="设备编号" ></el-table-column>
        <el-table-column  prop="equipmentName" label="设备名称" ></el-table-column>
        <el-table-column  prop="postName" label="设备所属单位" ></el-table-column>
        <el-table-column  prop="departmentName" label="设备所属部门" ></el-table-column>
        <el-table-column  align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              @click="handleDetail(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="ifUpdate === '2'">
      <updateInfo
        :row="row"
        :current-show="ifUpdate"
        @changeDiv="changeDiv"
      />
    </div>
  </div>
</template>

<script>
import {getEquipmentByBusinessSystemId} from "@/api/baseparameter";
import updateInfo from "@/components/Infomanage/updateInfo";
export default {
  name:'searchEquipmentByBusinessSystem',
  props:['tempBusinessSystemNameId'],
  components: {
    updateInfo,
  },
  data(){
    return{
      list:[],
      listLoading:true,
      row:{},
      ifUpdate:'0',
    }
  },
  mounted() {
    const tempBusinessSystemNameId = this.tempBusinessSystemNameId
    this.listLoading = true
    getEquipmentByBusinessSystemId(tempBusinessSystemNameId).then(res=>{
      console.log("**********1111",res)
      if(res.data === "该业务系统下没有设备"){
        this.list = []
        this.listLoading = false
        alert(res.data)
      }else {
        this.list = res.data.items
        this.listLoading = false
      }

    })
  },
  methods:{
    //--------------刷新功能开始---------------------
    Refresh(){
      location.reload();
    },
    //--------------刷新功能结束---------------------

    handleDetail(index, row) {
      this.row = row
      this.ifUpdate = '2'
    },
    changeDiv(value) {
      this.ifUpdate = value
    }

  }
}

</script>



<style lang="less" scoped>
*{
  font-size: 18px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple-dark {
  background: #304156;
}
.bg-condition {
  line-height: 50px;
  text-align: center;
  height: 54px;
  margin: 0px !important;
  background: #d3dce6;
}
.grid-content {
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}
</style>








