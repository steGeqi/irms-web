<template>
  <div style="height: 100%;width: 100%;">
    <dv-border-box-13>
      <div>
        <dv-decoration-7 style="width:100%;height:50px; font-size: 18px;color:rgba(0,234,255,0.96);">各状态设备数
        </dv-decoration-7>
        <div style="height: 100%;width: 100%;display: flex; justify-content: center; align-items: center;">
          <el-row style="height: 100%;width: 90%;display: flex; justify-content: center; align-items: center;">
            <el-col :span="8" style="color:#ffffff;">
              <div style="font-size: 40px;margin-bottom: 10px;">{{ useEquipmentNumber }}</div>
              <span style="font-size: 20px"><i class="el-icon-tickets" style="margin-right: 5px;"></i>在用设备</span>
            </el-col>
            <el-col :span="8" style="color:rgb(0,216,255);">
              <div style="font-size: 40px;margin-bottom: 10px;">{{ pauseEquipmentNumber }}</div>
              <span style="font-size: 20px"><i class="el-icon-tickets" style="margin-right: 5px;"></i>停用设备</span>
            </el-col>
            <el-col :span="8" style="color:rgba(239,41,41,0.92);">
              <div style="font-size: 40px;margin-bottom: 10px;">{{ endEquipmentNumber }}</div>
              <span style="font-size: 20px"><i class="el-icon-tickets" style="margin-right: 5px;"></i>报废设备</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </dv-border-box-13>
  </div>

</template>

<script>
import {
  getBusinessSystemCount,
  getEndEquipmentCount,
  getEquipmentCount, getOverGuaranteePeriodCount,
  getPauseEquipmentCount
} from "@/api/cockpit_data";

export default {
  name: "equipmentStatus",
  data() {
    return {
      useEquipmentNumber: '',
      pauseEquipmentNumber: '',
      endEquipmentNumber: '',
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData(){
      const [res1, res2, res3] = await Promise.all([
        getEquipmentCount(),
        getPauseEquipmentCount(),
        getEndEquipmentCount(),
      ])
      this.useEquipmentNumber = res1.data.total
      this.pauseEquipmentNumber = res2.data.total
      this.endEquipmentNumber = res3.data.total
    },
  }

}
</script>

<style scoped>

</style>
