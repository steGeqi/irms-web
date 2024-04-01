<template>
  <div style="height: 100%;width: 100%;">
    <dv-border-box-13>
      <div>
        <dv-decoration-7 style="width:100%;height:50px; font-size: 18px;color:rgba(0,234,255,0.96);">设备总览</dv-decoration-7>
        <div style="height: 70%;width: 96%;">
          <el-row>
            <el-col :span="8" style="color:#00ffd9;">
              <div style="font-size: 40px;margin-bottom: 10px;">{{allEquipmentNumber}}</div>
              <span style="font-size: 20px"><i class="el-icon-tickets" style="margin-right: 5px;"></i>总设备数</span>
            </el-col>
            <el-col :span="8" style="color:#00c4ff;">
              <div style="font-size: 40px;margin-bottom: 10px;">{{businessSystemCount}}</div>
              <span style="font-size: 20px"><i class="el-icon-tickets" style="margin-right: 5px;"></i>业务子系统</span>
            </el-col>
            <el-col :span="8" style="color:#b7ff00;">
              <div style="font-size: 40px;margin-bottom: 10px;">{{overGuaranteePeriodEquipmentCount}}</div>
              <span style="font-size: 20px"><i class="el-icon-tickets" style="margin-right: 5px;"></i>过保设备</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </dv-border-box-13>
  </div>

</template>

<script>
import {
  getBusinessSystemCount, getEndEquipmentCount,
  getEquipmentCount,
  getOverGuaranteePeriodCount, getPauseEquipmentCount
} from "@/api/cockpit_data";

export default {
  name: "anlageuebersicht",
  data(){
    return{
      businessSystemCount:0,
      overGuaranteePeriodEquipmentCount:0,
      useEquipmentNumber: '',
      pauseEquipmentNumber: '',
      endEquipmentNumber: '',
      allEquipmentNumber: 0,
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
     async initData(){
       const [res1, res2, res3,res4,res5] = await Promise.all([
         getEquipmentCount(),
         getPauseEquipmentCount(),
         getEndEquipmentCount(),
         getBusinessSystemCount(),
         getOverGuaranteePeriodCount()
       ])
       this.useEquipmentNumber = res1.data.total
       this.pauseEquipmentNumber = res2.data.total
       this.endEquipmentNumber = res3.data.total
       this.businessSystemCount = res4.data
       this.overGuaranteePeriodEquipmentCount = res5
       this.allEquipmentNumber = this.useEquipmentNumber + this.pauseEquipmentNumber + this.endEquipmentNumber
    },
  }

}
</script>

<style scoped>
</style>
