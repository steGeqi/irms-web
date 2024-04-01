<template>
  <div v-else class="bg-main">
    <!-- 头部开始 -->
    <div class="title_wrap">
      <div class="left_line"></div>
      <div class="right_line"></div>
      <div class="shine"></div>
      <div>
        <div class="title">
          <span class="title-text">设备概况可视化平台</span>
        </div>
      </div>
      <el-button round class="download_report" v-text="downloadReport" @click="generateStatisticalReports"></el-button>
    </div>
    <el-dialog
      title="设备填报情况统计表"
      :visible.sync="dialogVisible"
      width="90%"
    >
      <statisticalTable @get-table-data='getTableData'></statisticalTable>
      <div style="margin: 60px 50px 20px;">
        <span slot="footer" class="dialog-footer">
          <el-button class="download" type="primary" :loading="buttonLoading" @click="downloadStatisticalTable">下 载</el-button>
          <el-button class="download" type="primary" @click="dialogVisible = false">取 消</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 头部结束 -->
    <!-- 主体部分开始 -->
    <div class="main">
      <!-- 左边板块 -->
      <div class="left-sidebar">
        <div class="anlageuebersicht">
          <anlageuebersicht></anlageuebersicht>
        </div>
        <div class="carouselList">
          <carouselList style="width: 100%;"></carouselList>
        </div>
        <div class="equipmentAndMachineRoomProportion">
          <equipmentAndMachineRoomProportion></equipmentAndMachineRoomProportion>
        </div>
      </div>
      <!-- 中间板块 -->
      <div class="middle-content">
        <div class="map">
          <echartsMap></echartsMap>
        </div>
      </div>
      <!-- 右边板块 -->
      <div class="right-sidebar">
        <div class="equipmentStatus">
          <equipmentStatus></equipmentStatus>
        </div>
        <div class="equipmentStatusCarouselList">
          <operationCountCarouselList></operationCountCarouselList>
        </div>
        <div class="commonEquipmentInformation">
          <commonEquipmentInformation></commonEquipmentInformation>
        </div>
      </div>
    </div>
    <!-- 主体部分结束 -->
  </div>
</template>
<script>
import anlageuebersicht from "@/components/visualization/anlageuebersicht";
import carouselList from "@/components/visualization/carouselList";
import echartsMap from "@/components/visualization/echartsMap";
import commonEquipmentInformation from "@/components/visualization/commonEquipmentInformation";
import equipmentStatus from "@/components/visualization/equipmentStatus";
import operationCountCarouselList from "@/components/visualization/operationCountCarouselList";
import equipmentAndMachineRoomProportion from "@/components/visualization/equipmentAndMachineRoomProportion";
import {getInfo} from "@/api/dashboard";
import {getExcelDemo4} from "@/api/get_excel";
import statisticalTable from "@/components/visualization/statisticalTable";

export default {
  components: {
    anlageuebersicht, carouselList, commonEquipmentInformation,
    echartsMap, equipmentAndMachineRoomProportion, equipmentStatus, operationCountCarouselList, statisticalTable
  },
  data() {
    return {
      dialogVisible: false,
      downloadReport: "生成统计报表",
      roleId: this.$store.state.user.roleid,
      userName: this.$store.state.user.post_name,
      roleName: this.$store.state.user.roles,
      resultArray: [],
      tableData:[],
      buttonLoading:true
    }
  },
  mounted() {
    let params = {
      postName: this.userName,
      roleId: this.roleId,
      roleName: this.roleName[0],
    }
    // getInfo(params).then(res => {
    //   this.resultArray.push(res.data);
    // })
  },
  methods: {
    async generateStatisticalReports() {
      this.dialogVisible = true
    },
    downloadStatisticalTable() {
      this.dialogVisible = false
      getExcelDemo4(this.tableData)
    },
    getTableData(val){
      this.tableData=val
      this.buttonLoading=false
    }
  }
}

</script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
}

.bg-main {
  width: 100%;
  background: url(../../assets/dashboard_imgs/bg.png) no-repeat 0 0 / cover;
  color: white;
  text-align: center;
  min-height: calc(100vh - 50px);
  align-items: stretch;
}

.main {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 1%;
  justify-content: space-around;

  .left-sidebar {
    width: 27vw;

    .carouselList {
      width: 27vw;
      height: 40vh;
    }
  }

  .middle-content {
    .map {
      width: 35vw;
    }
  }

  .right-sidebar {
    width: 27vw;

    .equipmentStatusCarouselList {
      width: 27vw;
      height: 40vh;
    }
  }
}

.left-sidebar,
.right-sidebar {
  display: flex;
  flex-direction: column;
}

.middle-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-sidebar > div,
.middle-content > div,
.right-sidebar > div {
}

.title_wrap {
  top: 10px;
  height: 6vh;
  width: 100%;
  background-image: url("../../assets/img/top.png");
  background-size: cover;
  background-position: center center;
  position: relative;
  margin-bottom: 4px;
}

.shine {
  position: absolute;
  bottom: -26px;
  background-image: url("../../assets/img/guang.png");
  background-position: 80px center;
  width: 100%;
  height: 56px;
}

.left_line,
.right_line {
  position: absolute;
  top: -2px;
  width: 140px;
  height: 6px;
  background-image: url("../../assets/img/headers/juxing1.png");
}

.left_line {
  left: 5%;
}

.right_line {
  right: 5%;
  transform: rotate(180deg);
}

.title {
  position: relative;
  text-align: center;
  background-size: cover;
  color: transparent;
  height: 3.5rem;
  line-height: 3rem;
}

.title-text {
  font-size: 2.8rem;
  font-weight: 900;
  letter-spacing: 0.5rem;
  width: 100%;
  background: linear-gradient(92deg, #0072FF 0%, #00EAFF 48.8525390625%, #01AAFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.download_report {
  background-color: rgba(22, 87, 185, 0.56);
  width: 11rem;
  border: rgba(255, 255, 255, 0.54);
  position: absolute;
  top: 1rem;
  right: 3%;
  color: rgba(0, 216, 255, 0.83);
  font-size: 1.3rem;
}

.download_report:hover {
  background-color: #ffffff;
}

.classLeftHeight {
  margin-top: 0.8rem;
  min-height: 86vh;
}

.classCenterHeight {
  margin-top: 0.9rem;
  min-height: 86vh;
}

.classRightHeight {
  margin-top: 1vh;
  min-height: 86vh;
}

.anlageuebersicht {
  height: 15vh;
}


.departmentAndEquipmentType {
  height: 31vh;
}

.map {
  height: 86vh;
}

.equipmentAndMachineRoomProportion {
  height: 31vh;
}

.equipmentStatus {
  height: 15vh;
}


.commonEquipmentInformation {
  height: 31vh;
}

.download {
  height: 40px;
  width: 100px;
  font-size: 20px;
  margin: 0 30px;
}

/deep/ .el-dialog__title {
  line-height: 24px;
  font-size: 30px;
  color: #131712;
}

/deep/ .el-dialog__body {
  padding: 3px 20px; //上下3px 左右20px
}

</style>




