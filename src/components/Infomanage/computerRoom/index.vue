<template>
  <div class = "mains">
    <dv-loading>Loading...</dv-loading>

    <!-- 模型悬浮时显示的气泡 -->
    <div v-if="showTooltip" style="position: fixed" class="tooltip"
         :style="{ top: `${tooltipPosition.y}px`, left: `${tooltipPosition.x}px` }">
      <table
        border
        height="40"
        style="width: 100%;color: #FFFFFF;text-align: center;left: 5%;top:30%;font-size:20px;margin-top: 10px;margin-bottom: 10px" >
        <tr style="height: 45px;">
          <th style="color: #0a72c7;width: 210px">机柜名：</th>
          <th><span style="color:#20dbfd;text-shadow:0 0 25px #00d8ff;font-size:20px;font-family:yjsz;font-weight: 900;">{{ clickedCabinetName }}</span></th>
        </tr>
      </table>
      <el-table
        :data="tooltipText"
        border
        :header-cell-style="{textAlign: 'center',color:'#20dbfd',background:'#142437',}"
        :cell-style="{ textAlign: 'center',color:'#20dbfd',background:'#142437',fontSize: '16px',}"
        style="position:relative;background: rgba(0,0,0,0);"
      >
        <el-table-column
          v-for="columns in equipmentTableColumns"
          :prop="columns.prop"
          :key='columns.index'
          :label="columns.label"
          width="183">
        </el-table-column>
      </el-table>
    </div>

    <div class="app">
      <el-header style="background:#142437;height: 7rem;">
        <el-row :gutter="20" style="height: 5rem;display: flex">
          <el-col :span="3"><dv-decoration-8 :color=datavcolor style="width:300px;height:50px;position: absolute;left: 0" /></el-col>
          <el-col :span="8" :offset="5"><h1 style="text-align: center;position:relative;color:#20dbfd;;text-shadow:0 0 25px #00d8ff;font-weight: 900">{{computerTitle}}</h1></el-col>
          <el-col :span="3" :offset="3" ><dv-decoration-8 :color=datavcolor :reverse="true" style="width:300px;height:50px;position: absolute;right: 0" /></el-col>

          <el-input v-model="inputEquipmentType" clearable style="z-index:99;position: absolute;bottom: -20px;right: 320px;width: 220px" placeholder="请输入设备类型"></el-input>
          <el-button  type="primary"  style="z-index:99;position: absolute;bottom: -20px;right: 240px;" @click="searchEquipmentType">搜索</el-button>

          <el-button id="getcomputerroom" type="danger"  style="z-index:99;position: absolute;bottom: -20px;right: 100px;" v-show="datacard" @click="handchangedatacardstate" >关闭机房信息</el-button>
          <el-button id="getcomputerroom" type="primary"  style="z-index:99;position: absolute;bottom: -20px;right: 100px;" v-show="showButton" plain @click="handchangedatacardstate">打开机房信息</el-button>
          <el-button id="getcomputerroom" type="primary"  style="z-index:99;position: absolute;bottom: -20px;right: 20px;" @click="backPage">返回</el-button>
        </el-row >
        <el-row :gutter="20" style="height: 2rem">
          <el-col :span="8" :offset="8" style="text-align: center;color: #cdddf7"><dv-decoration-5 :color=datavcolor :dur="2" class="dv-decoration-5"  /></el-col>
        </el-row >
        <dv-decoration-10 class="dv-decoration-10"  />
      </el-header>
    </div>

    <div id="container" ref="canvasContainer"></div>

      <!--左上角数据表格-->
      <dv-border-box-8  class="msgTable-8-top" v-show="datacard"><dv-border-box-1>
      <!--标题-->
        <dv-decoration-7 class="decoration-7-top" >机房信息概况</dv-decoration-7>
      <!--图标-->
        <el-col class="top-img">
          <img  class="img" :src=logoSrc+this.unitid+this.logoImgetype  alt="" >
        </el-col>
        <!--注释1：管理员、机房面积、机房位置-->
        <table class="top-table" border="1" cellspacing="0" cellpadding="0">
          <tr style="height: 45px">
            <th style="color: #FFFFFF;width: 110px;text-align: center;">管理员：</th>
            <th><span class="top-span-1">{{this.roomBasicInfo.machineAdministrator === undefined ? "数据格式错误" : this.roomBasicInfo.machineAdministrator}}</span></th>
          </tr>
          <tr style="height: 45px">
            <th style="color: #FFFFFF;width: 80px;text-align: center;">机房面积：</th>
            <th><span class="top-span-2" >{{this.roomBasicInfo.machineArea === undefined ? "数据格式错误" : this.roomBasicInfo.machineArea}}</span></th>
          </tr>
          <tr style="height: 45px">
            <th style="color: #FFFFFF;width: 80px;text-align: center;">机房位置：</th>
            <th><span class="top-span-3" >{{this.roomBasicInfo.machineLocation === undefined ? "数据格式错误" : this.roomBasicInfo.machineLocation}}</span></th>
          </tr>
        </table>
<!--        注释1结束-->
<!--        注释2：设备总数、单位机房数、机房机柜数、机房设备数-->
        <table style="width: 92%;color: #FFFFFF;position: relative;left: 3%;top:-10px;font-size:20px;" border="1" cellspacing="0" cellpadding="0">
          <tr style="height: 60px;width: 55%">
            <th style="width: 34.9%;">设备总数:</th>
            <th class="th-1">{{this.equipmentBaseInfo.total}}</th>
            <th style="width: 34.9%;">单位机房数:</th>
            <th class="th-2" >{{this.equipmentBaseInfo.machineRoomCount}}</th>
          </tr>
          <tr style="height: 60px;width: 45%" >
            <th>机房机柜数:</th>
            <th class="th-3">{{this.equipmentBaseInfo.cabinetCount}}</th>
            <th>机房设备数:</th>
            <th class="th-4">{{this.equipmentBaseInfo.equipmentCount}}</th>
          </tr>
        </table>
<!--        注释2结束-->
      </dv-border-box-1></dv-border-box-8>
      <!--左上角数据表格结束-->

    <dv-border-box-8 class="msgTable-echarts" style="top: 30rem;" v-show="datacard">
      <dv-border-box-1>
        <dv-decoration-7 class="decoration-7-bottom-1" >访问当前单位下属机房频率</dv-decoration-7>
<!--        <dv-scroll-board style="left:4.5%;width:90%;height:80%;padding-top:3%;text-align: center" />-->
        <div id="echarts" style="height: 24rem;width:23rem;top: 2rem;left:0.7rem;position: absolute;text-align: center;z-index: 98"></div>
      </dv-border-box-1>
    </dv-border-box-8>

    <dv-border-box-8 class="msgTable-echarts" style="height: 23rem;width:25rem;position: absolute;top: 7rem;  right: 0.5rem;" v-show="datacard">
      <dv-border-box-1>
      <dv-decoration-7 class="decoration-7-top" >机柜设备数量</dv-decoration-7>
      <dv-scroll-board :config="config" style="left:4.5%;width:90%;height:80%;padding-top:3%;text-align: center" />
      </dv-border-box-1>
    </dv-border-box-8>

    <dv-border-box-8 class="msgTable-echarts" :style="{height:boxHeight}"  v-show="datacard" style="height: 40vh;width:25rem;position: absolute;top: 31rem;  right: 0.5vw;">
      <dv-border-box-1>
        <dv-decoration-7 class="decoration-7-top" >机房机柜</dv-decoration-7>
      <el-row class="el-row-bottom">
        <el-table
        :style="{height:computedHeight}"
          border
          class="show_table"
          flex="right"
          height="85%"
          :data="tableData"
          :header-cell-style="{textAlign: 'center',color:'#20dbfd',background:'#142437',}"
          :cell-style="{ textAlign: 'center',color:'#20dbfd',background:'#142437',}"
          style="top: 0%;background: rgba(20,36,55,0.3);">
          <el-table-column  type="index" label="#"  show-overflow-tooltip ></el-table-column>
          <el-table-column prop="cabinetName" label="机柜名称" ></el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
          >
            <template v-slot:="scope">
              <el-button
                type="success"
                plain
                size="mini"
                @click="cabinetDetail(scope.$index, scope.row)"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      </dv-border-box-1>
    </dv-border-box-8>

    <el-dialog
      :visible.sync="showEquipment"
      v-if="showEquipment"
      width="100%"
      :with-header="false">
      <InfoTemplate :pre-row="row" @changeDiv="changeDiv" />
    </el-dialog>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import * as THREE from "three";
import * as TWEEN from 'tween.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { getCabinet } from '@/api/select'
import InfoTemplate from '@/components/Infomanage/InfoTemplate'
import {getEquipmentCount} from "@/api/cockpit_data";
import {getPostMachineRoom,getEquipmentNum} from "@/api/dashboard";
import {getList} from "@/api/table";
import { getCabinetByEquipmentType, getEquipmentByCabinet, getVisitTotalOfCurrentPost } from '@/api/baseparameter'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import axios from 'axios'
import async from 'async'
import * as echarts from 'echarts'
import moment from 'moment/moment'

export default {
  name:'computerRoom',
  components: {
    InfoTemplate
  },
  data() {
    return {
      machineRoomName:this.$store.state.machineRoom.installation_position,
      postName:this.$store.state.machineRoom.department,
      resultArray:[],
      config:{},
      echartsInstance: null,
      myChart: null,
      isFullScreen: false,
      datavcolor:['#0e94eb','#0e94eb'],
      computerTitle: '',
      datacard:true,
      showButton:false,
      loading:true,
      showEquipment:false,
      logosrc:'',
      roomBasicInfo:{ // 左上角机房信息概况
        machineAdministrator:'',
        machineLocation:'',
        machineArea:'',
      } ,
      equipmentBaseInfo:{
        total:0,
        machineRoomCount:0,
        cabinetCount:0,
        equipmentCount:0
      },
      tableData:[],
      clickedCabinet:[],
      clickedCabinetName:'',

      inputEquipmentType:'',

      equipmentTableData:[],
      equipmentTableColumns:[
        {
          prop:'equipmentName',
          label:'设备名称'
        },
        {
          prop:'cabinetUStart',
          label: '起始U位'
        },
        {
          prop: 'cabinetUEnd',
          label: '结束U位'
        }
      ],

      isRotating:false,
      // equipmentClickedCount:[
      //   //机柜1中设备(从右向左)
      //   {'服务器022':0,
      //     '服务器023':0,
      //     '服务器024':0,
      //     '服务器025':0,
      //     '服务器026':0
      //   },
      //   //机柜2中设备
      //   {
      //     '服务器016':0,
      //     '服务器017':0,
      //     '服务器018':0,
      //     '服务器019':0,
      //     '服务器020':0,
      //     '服务器021':0
      //   },
      //   //机柜3中设备
      //   {
      //     '服务器009':0,
      //     '服务器010':0,
      //     '服务器011':0,
      //     '服务器012':0,
      //     '服务器013':0,
      //     '服务器014':0
      //   },
      //   //机柜4中设备
      //   {
      //     '服务器002':0,
      //     '服务器003':0,
      //     '服务器004':0,
      //     '服务器005':0,
      //     '服务器006':0,
      //     '服务器007':0
      //   }
      // ],
      equipmentClickedSum:0,
      isMoving:false,

      cabinetNum:0,

      showTooltip: false,
      tooltipPosition: { x: 0, y: 0 },
      tooltipText : [],

      machineRoomId:this.machineRoomId,

      cabinetArrayByEquipmentType:[],

      unitid:'',
      logoSrc:'/unitLogo/',// logo放在public 文件夹下 使用绝对路径即可
      logoImgetype:'.png',
      echartsData:[],
      AllechartsData:[],
      machineModel:null,
      cabinetModel:null,
      cabinetModelArray:[],
      visitMachineRoom:[],
      isWidening:false,
      xAxisData:[],
      seriesData:[],

    };
  },
  created() {
    // this.full()
    this.isFullScreen = true
  },
  // watch: {
  //   '$data.inputEquipmentType':{
  //     handler(oldData,newData){
  //       console.log("this.inputEquipmentType",this.inputEquipmentType)
  //     },
  //     deep: true
  //   },
  // },
  computed: {
    boxHeight() {
      if (this.equipmentBaseInfo.cabinetCount === 0) {
        return '18vh';
      } else if (this.equipmentBaseInfo.cabinetCount === 1) {
        return '19vh';
      } else if (this.equipmentBaseInfo.cabinetCount === 2) {
        return '25vh';
      } else if (this.equipmentBaseInfo.cabinetCount === 3) {
        return '30vh';
      } else if (this.equipmentBaseInfo.cabinetCount === 4) {
        return '35vh';
      } else if (this.equipmentBaseInfo.cabinetCount === 5) {
        return '40vh';
      } else {
        // 在这里你可以根据其他情况返回不同的高度
        return '45vh';
      }
    },
    computedHeight() {
      if (this.equipmentBaseInfo.cabinetCount === 0) {
        return '9.5vh';
      } else if (this.equipmentBaseInfo.cabinetCount === 1) {
        return '10.1vh';
      } else if (this.equipmentBaseInfo.cabinetCount === 2) {
        return '15.5vh';
      } else if (this.equipmentBaseInfo.cabinetCount === 3) {
        return '20.5vh';
      } else if (this.equipmentBaseInfo.cabinetCount === 4) {
        return '26vh';
      } else if (this.equipmentBaseInfo.cabinetCount === 5) {
        return '31.1vh';
      } else {
        // 在这里你可以根据其他情况返回不同的高度
        return '36vh';
      }
    },
  },

  async mounted() {
    //小机房
    this.spritePosition1 = [
      //1-5机柜
      [14,20,32],
      [14,20,22],
      [14,20,12],
      [14,20, 2],
      [14,20,-8],
      //6-10机柜
      [-1,20,32],
      [-1,20,22],
      [-1,20,12],
      [-1,20, 2],
      [-1,20,-8],
      //11-15机柜
      [-16,20,32],
      [-16,20,22],
      [-16,20,12],
      [-16,20, 2],
      [-16,20,-8],
      //16-20机柜
      [-31,20,32],
      [-31,20,22],
      [-31,20,12],
      [-31,20, 2],
      [-31,20,-8],
    ],
    //大机房
    this.spritePosition2 = [
      //1-5机柜
      [44,20,32],
      [44,20,22],
      [44,20,12],
      [44,20, 2],
      [44,20,-8],
      //6-10机柜
      [29,20,32],
      [29,20,22],
      [29,20,12],
      [29,20, 2],
      [29,20,-8],
      //11-15机柜
      [14,20,32],
      [14,20,22],
      [14,20,12],
      [14,20, 2],
      [14,20,-8],
      //16-20机柜
      [-1,20,32],
      [-1,20,22],
      [-1,20,12],
      [-1,20, 2],
      [-1,20,-8],
      //21-25机柜
      [-16,20,32],
      [-16,20,22],
      [-16,20,12],
      [-16,20, 2],
      [-16,20,-8],
      //26-30机柜
      [-31,20,32],
      [-31,20,22],
      [-31,20,12],
      [-31,20, 2],
      [-31,20,-8],
      //31-35机柜
      [-46,20,32],
      [-46,20,22],
      [-46,20,12],
      [-46,20, 2],
      [-46,20,-8],
      //36-40机柜
      [-61,20,32],
      [-61,20,22],
      [-61,20,12],
      [-61,20, 2],
      [-61,20,-8],
    ]
    this.spritePosition = [
      //1-5机柜
      [-1,20,32],
      [-1,20,22],
      [-1,20,12],
      [-1,20, 2],
      [-1,20,-8],
      //6-10机柜
      [-16,20,32],
      [-16,20,22],
      [-16,20,12],
      [-16,20, 2],
      [-16,20,-8],
      //11-15机柜
      [14,20,32],
      [14,20,22],
      [14,20,12],
      [14,20, 2],
      [14,20,-8],
      //16-20机柜
      [-31,20,32],
      [-31,20,22],
      [-31,20,12],
      [-31,20, 2],
      [-31,20,-8],
      //21-25机柜
      [-46,20,32],
      [-46,20,22],
      [-46,20,12],
      [-46,20, 2],
      [-46,20,-8],
      //26-30机柜
      [29,20,32],
      [29,20,22],
      [29,20,12],
      [29,20, 2],
      [29,20,-8],
      //31-35机柜
      [-61,20,32],
      [-61,20,22],
      [-61,20,12],
      [-61,20, 2],
      [-61,20,-8],
      //36-40机柜
      [44,20,32],
      [44,20,22],
      [44,20,12],
      [44,20, 2],
      [44,20,-8],
    ]
    this.cabinetArray = ['机柜门011', '机柜门012', '机柜门013', '机柜门014', '机柜门015',
      '机柜门021', '机柜门022', '机柜门023', '机柜门024', '机柜门025',
      '机柜门031', '机柜门032', '机柜门033', '机柜门034', '机柜门035',
      '机柜门041', '机柜门042', '机柜门043', '机柜门044', '机柜门045',
      '机柜门051', '机柜门052', '机柜门053', '机柜门054', '机柜门055',
      '机柜门061', '机柜门062', '机柜门063', '机柜门064', '机柜门065',
      '机柜门071', '机柜门072', '机柜门073', '机柜门074', '机柜门075',
      '机柜门081', '机柜门082', '机柜门083', '机柜门084', '机柜门085',
    ],
    this.cabinetClickCount = {
      '机柜门011':0,
      '机柜门012':0,
      '机柜门013':0,
      '机柜门014':0,
      '机柜门015':0,

      '机柜门021':0,
      '机柜门022':0,
      '机柜门023':0,
      '机柜门024':0,
      '机柜门025':0,

      '机柜门031':0,
      '机柜门032':0,
      '机柜门033':0,
      '机柜门034':0,
      '机柜门035':0,

      '机柜门041':0,
      '机柜门042':0,
      '机柜门043':0,
      '机柜门044':0,
      '机柜门045':0,

      '机柜门051':0,
      '机柜门052':0,
      '机柜门053':0,
      '机柜门054':0,
      '机柜门055':0,

      '机柜门061':0,
      '机柜门062':0,
      '机柜门063':0,
      '机柜门064':0,
      '机柜门065':0,

      '机柜门071':0,
      '机柜门072':0,
      '机柜门073':0,
      '机柜门074':0,
      '机柜门075':0,

      '机柜门081':0,
      '机柜门082':0,
      '机柜门083':0,
      '机柜门084':0,
      '机柜门085':0,
    },
    this.camera =  null,
    this.scene =  null,
    this.renderer =  null,
    this.mesh =  null,
    this.mode = null,
    this.raycaster = new THREE.Raycaster(),
    this.mouse = new THREE.Vector2(),
    this.rotationSpeed = 0.02,

    this.initCount()
    this.visitTotalOfCurrentPost()

    window.addEventListener('resize', this.handleResize2);
    // 创建Echarts实例并绘制饼状图
    this.handleResize2();
    let params = {
      machineRoomName: this.machineRoomName,
      postName: this.postName,
    }
    await getEquipmentNum(params).then(res => {
      if(res.data.localizationNum == null){
        // console.log('没有设备信息')
      }else {
        this.resultArray.push(res.data.localizationNum);
        // console.log('+++++++++++++', this.resultArray)
        for (let i = 0; i < this.resultArray[0].length; i++) {
          this.echartsData.push({
            name: this.resultArray[0][i][0],
            value: this.resultArray[0][i][1]
          })
        }
      }
    })

    //获取当前机房下的机柜
    // this.fetchData()
    if (this.$store.state.machineRoom.department === '') {
      this.$router.push({path: '/inforesources/digital_computer_room'})
    } else {
      this.computerTitle = this.$store.state.machineRoom.department + this.$store.state.machineRoom.installation_position
      this.unitid = this.$store.state.machineRoom.unitid
      let machineRoomId = this.$store.state.machineRoom.machineRoomId
      await getCabinet(machineRoomId).then((res) => {
        this.tableData = res.data.items
        console.log('res',res)
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].clickedCount = 0
          this.clickedCabinet.push(this.tableData[i])
        }
        this.clickedCabinet.forEach((element) => {
          let equipmentArray = []
          console.log("element.cabinetId",element.cabinetId)
          console.log("this.postName",this.postName)
          getEquipmentByCabinet(element.cabinetId,this.postName).then((res) => {

            // console.log("res",res)
            res.data.forEach((element) => {
              let equipmentObject = {
                equipmentName: '',
                cabinetUStart: '',
                cabinetUEnd: ''
              }
              // console.log("element",element)
              equipmentObject.equipmentName = element[0]
              equipmentObject.cabinetUStart = element[1]
              equipmentObject.cabinetUEnd = element[2]
              equipmentArray.push(equipmentObject)
              // console.log('equipmentObject',equipmentObject)
            })
            // console.log("equipmentArray",equipmentArray)
          }).catch((error) => {
            // console.log("Promise rejected:", error);
          });
          this.equipmentTableData.push(equipmentArray)
          // console.log("this.equipmentTableData",this.equipmentTableData)
        })
      })
    }


    // 监听鼠标按下事件
    document.addEventListener('mousedown', this.onMouseDown);
    // 添加鼠标移动事件监听
    document.addEventListener('mousemove', this.onMouseMove);
    // 添加鼠标离开事件监听
    document.addEventListener('mouseleave', this.onMouseLeave);
    // 窗口大小调整事件监听器
    window.addEventListener('resize', this.handleResize);

    let that = this
    setTimeout(async function () {

      that.echartsDraw()
      that.echartsInit()
      that.init();
      that.loadGltf();
      that.createSprite()
      that.animate();
    }, 200);
  },
  beforeDestroy() {
    // window.removeEventListener('resize', this.adjustChartPosition);

    // 移除鼠标事件监听，避免内存泄漏
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseleave', this.onMouseLeave);
    // 移除窗口大小调整事件监听器
    window.removeEventListener('resize', this.handleResize);
    // 在组件销毁前解绑resize事件
    window.removeEventListener('resize', this.handleResize2);


    this.spritePosition = null
    this.cabinetArray = null
    this.cabinetClickCount = null
    this.camera =  null
    this.scene =  null
    this.renderer =  null
    this.mesh =  null
    this.mode = null
    this.raycaster = null
    this.mouse = null
    this.rotationSpeed = null
    this.spritePosition1 = null
    this.spritePosition2 = null

  },
  methods: {
    fetchData(cabinetId) {
      const params = {
        dataName: ['cabinetId'],
        dataValue: cabinetId,
        status: "0",
        start: 0,
        limit: 99999
      }
      // console.log(this.initdata)
      getList(params).then((response) => {
        this.list = response.data.items
        this.total = response.data.total
        // console.log("this.list",this.list)
        //console.log("List---------");
        console.log(this.list)
        this.listLoading = false
      })
    },

    async searchEquipmentType(){
      if(this.inputEquipmentType !== ''){
        let param = {
          postName:this.postName,
          machineRoomName:this.machineRoomName,
          equipmentType:this.inputEquipmentType
        }
        try {
          const res = await getCabinetByEquipmentType(param);
          this.cabinetArrayByEquipmentType = res.data;
          console.log("res.data",res.data)
          if(res.data === null){
            await this.$message({
              message: '未查询到机柜',
              type: 'warning'
            });
          }
          this.createSprite();
        } catch (error) {
          console.error('Error:', error);
        }
      }else{
        this.cabinetArrayByEquipmentType = []
        this.createSprite();
      }
    },


    //为解决threejs射线不准问题，设置全屏
    full() {
      //console.log(this.$store.state.machineRoom.department)
      screenfull.toggle()
    },
    //初始化
    init: function () {
      //  创建场景对象Scene
      this.scene = new THREE.Scene();
      let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(10, 10, 10);
      this.scene.add(directionalLight);
      // 平行光2
      // let directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
      // directionalLight2.position.set(-400, -200, -300);
      // this.scene.add(directionalLight2);
      //环境光
      let ambient = new THREE.AmbientLight(0xffffff, 0.7);
      this.scene.add(ambient);
      //网格模型添加到场景中
      // let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      // let material = new THREE.MeshNormalMaterial({
      //   color: "white"
      // });
      // this.mesh = new THREE.Mesh(geometry, material);
      // this.scene.add(this.mesh);
      // 坐标轴
      // let axes = new THREE.AxesHelper(1000);
      // this.scene.add(axes);
      /**
       * 相机设置
       */
      //透视相机
      let width = window.outerWidth; // 窗口宽度
      let height = window.outerHeight; // 窗口高度
      let k = width / height; // Three.js输出的Canvas画布宽高比
      let fov = 60; // 视场角度
      let near = 1; // 近平面
      let far = 3000; // 远平面

      this.camera = new THREE.PerspectiveCamera(fov, k, near, far);
      this.scene.background = new THREE.Color(0x000000);
      this.camera.position.set(80, 80, 80); // 设置相机位置
      this.camera.lookAt(100, 100, 100); // 设置相机的焦点位置


      /**
       * 创建渲染器对象
       */
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },


    // 加载外部模型
    // 外部模型加载函数
    loadGltf() {
      let self = this;
      let loader = new GLTFLoader();
      //本地模型路径：public/static/mod/Xbot.glb
      loader.load("static/machineRoom.gltf", (gltf) => {  //导入机房模型
        console.log("gltf",gltf)
        self.isLoading = false;//关闭载入中效果
        self.machineModel = gltf.scene;
        // self.machineModel.scale.set(5,5,5);//设置大小比例
        self.machineModel.position.set(0, 0, 0);
        if(this.equipmentBaseInfo.cabinetCount > 20){
          this.isWidening = true
          self.machineModel.traverse((child) => {
            if (child.isMesh) {
              if(child.name === '门A'){
                child.position.x += 33
              }
              if(child.name === '地面001'){
                child.scale.x *= 2.1
              }
              if(child.name === '墙A1' || child.name === '空调1'){
                child.position.x += 37
              }
              if(child.name === '墙A2' || child.name === '空调2'){
                child.position.x -= 37
              }
              if(child.name === '墙B1' || child.name === '墙B2'){
                child.scale.x *= 2
              }
              if(child.name === '地面001_1'){
                child.visible = false
              }
            }
          });
        }
        self.scene.add(self.machineModel); // 将模型引入three
        self.animate();

        loader.load('static/cabinet.gltf', (gltf1) => {  //导入机柜模型
          this.cabinetModel = gltf1.scene;
          this.equipmentBaseInfo.cabinetCount = this.tableData.length
          let column = Math.floor(this.equipmentBaseInfo.cabinetCount / 5)
          let num = this.equipmentBaseInfo.cabinetCount % 5
          console.log("column and num",column,num)
          if(this.isWidening){
            //大机房
            for(let i=0;i<column;i++){
              if(i<8){
                for(let j=0;j<5;j++){
                  let instance = this.cabinetModel.clone();
                  instance.position.set(44-i*15, 2, 32-j*10);
                  self.scene.add(instance);
                  instance.children[1].name = '机柜门0' + (i+1).toString() + (j+1).toString()
                  gltf.scenes.push(instance)
                  this.cabinetModelArray.push(instance)
                }
              }
            }
            for(let j=0;j<num;j++){
              let instance = this.cabinetModel.clone();
              instance.position.set(44-column*15, 2, 32-j*10);
              self.scene.add(instance);
              instance.children[1].name = '机柜门0' + (column+1).toString() + (j+1).toString()
              gltf.scenes.push(instance)
              this.cabinetModelArray.push(instance)
            }
          }else {
            //小机房
            if(column !== 0){
              for(let i=0;i<column;i++){
                for(let j=0;j<5;j++){
                  let instance = this.cabinetModel.clone();
                  instance.position.set(14-i*15, 2, 32-j*10);
                  self.scene.add(instance);
                  instance.children[1].name = '机柜门0' + (i+1).toString() + (j+1).toString()
                  gltf.scenes.push(instance)
                  this.cabinetModelArray.push(instance)
                }
              }
            }
            if(num !== 0){
              for(let j=0;j<num;j++){
                let instance = this.cabinetModel.clone();
                instance.position.set(14-column*15, 2, 32-j*10);
                self.scene.add(instance);
                instance.children[1].name = '机柜门0' + (column+1).toString() + (j+1).toString()
                gltf.scenes.push(instance)
                this.cabinetModelArray.push(instance)
              }
            }
          }

          // //小于等于5个机柜
          // let param = this.equipmentBaseInfo.cabinetCount < 5 ? this.equipmentBaseInfo.cabinetCount : 5
          // for(let j=0;j<param;j++){
          //   let instance = this.cabinetModel.clone();
          //   instance.position.set(-1, 2, 32-j*10);
          //   self.scene.add(instance);
          //   instance.children[1].name = '机柜门01' + (j+1).toString()
          //   gltf.scenes.push(instance)
          //   this.cabinetModelArray.push(instance)
          // }
          // //小于等于10个机柜
          // if(this.equipmentBaseInfo.cabinetCount / 5 >= 1){
          //   let num = this.equipmentBaseInfo.cabinetCount < 10 ? this.equipmentBaseInfo.cabinetCount % 5 : 5
          //   for(let j=0;j<num;j++){
          //     let instance = this.cabinetModel.clone();
          //     instance.position.set(-16, 2, 32-j*10);
          //     self.scene.add(instance);
          //     instance.children[1].name = '机柜门02' + (j+1).toString()
          //     gltf.scenes.push(instance)
          //     this.cabinetModelArray.push(instance)
          //     // console.log("instance",instance)
          //   }
          // }
          // //小于等于15个机柜
          // if(this.equipmentBaseInfo.cabinetCount / 5 >= 2){
          //   let num = this.equipmentBaseInfo.cabinetCount < 15 ? this.equipmentBaseInfo.cabinetCount % 5 : 5
          //   for(let j=0;j<num;j++){
          //     let instance = this.cabinetModel.clone();
          //     instance.position.set(14, 2, 32-j*10);
          //     self.scene.add(instance);
          //     instance.children[1].name = '机柜门03' + (j+1).toString()
          //     gltf.scenes.push(instance)
          //     this.cabinetModelArray.push(instance)
          //     // console.log("instance",instance)
          //   }
          // }
          // //小于等于20个机柜
          // if(this.equipmentBaseInfo.cabinetCount / 5 >= 3){
          //   let num = this.equipmentBaseInfo.cabinetCount < 20 ? this.equipmentBaseInfo.cabinetCount % 5 : 5
          //   for(let j=0;j<num;j++){
          //     let instance = this.cabinetModel.clone();
          //     instance.position.set(-31, 2, 32-j*10);
          //     self.scene.add(instance);
          //     instance.children[1].name = '机柜门04' + (j+1).toString()
          //     gltf.scenes.push(instance)
          //     this.cabinetModelArray.push(instance)
          //     // console.log("instance",instance)
          //   }
          // }
          // //小于等于25个机柜
          // if(this.equipmentBaseInfo.cabinetCount / 5 >= 4){
          //   let num = this.equipmentBaseInfo.cabinetCount < 25 ? this.equipmentBaseInfo.cabinetCount % 5 : 5
          //   for(let j=0;j<num;j++) {
          //     let instance = this.cabinetModel.clone();
          //     instance.position.set(-46, 2, 32 - j * 10);
          //     self.scene.add(instance);
          //     instance.children[1].name = '机柜门05' + (j + 1).toString()
          //     gltf.scenes.push(instance)
          //     this.cabinetModelArray.push(instance)
          //   }
          // }
          // //小于等于30个机柜
          // if(this.equipmentBaseInfo.cabinetCount / 5 >= 5){
          //   let num = this.equipmentBaseInfo.cabinetCount < 30 ? this.equipmentBaseInfo.cabinetCount % 5 : 5
          //   for(let j=0;j<num;j++) {
          //     let instance = this.cabinetModel.clone();
          //     instance.position.set(29, 2, 32 - j * 10);
          //     self.scene.add(instance);
          //     instance.children[1].name = '机柜门06' + (j + 1).toString()
          //     gltf.scenes.push(instance)
          //     this.cabinetModelArray.push(instance)
          //   }
          // }
          // //小于等于35个机柜
          // if(this.equipmentBaseInfo.cabinetCount / 5 >= 6){
          //   let num = this.equipmentBaseInfo.cabinetCount < 35 ? this.equipmentBaseInfo.cabinetCount % 5 : 5
          //   for(let j=0;j<num;j++) {
          //     let instance = this.cabinetModel.clone();
          //     instance.position.set(-61, 2, 32 - j * 10);
          //     self.scene.add(instance);
          //     instance.children[1].name = '机柜门07' + (j + 1).toString()
          //     gltf.scenes.push(instance)
          //     this.cabinetModelArray.push(instance)
          //   }
          // }
          // //小于等于40个机柜
          // if(this.equipmentBaseInfo.cabinetCount / 5 >= 7){
          //   let num = this.equipmentBaseInfo.cabinetCount < 40 ? this.equipmentBaseInfo.cabinetCount % 5 : 5
          //   for(let j=0;j<num;j++) {
          //     let instance = this.cabinetModel.clone();
          //     instance.position.set(44, 2, 32 - j * 10);
          //     self.scene.add(instance);
          //     instance.children[1].name = '机柜门08' + (j + 1).toString()
          //     gltf.scenes.push(instance)
          //     this.cabinetModelArray.push(instance)
          //   }
          // }
        });
      })
    },

    //精灵标签
    createSprite() {
      this.scene.remove(...this.scene.children.filter(child => child instanceof THREE.Sprite));
      for (let i = 0; i < this.tableData.length; i++) {
        const spriteCanvas = document.createElement('canvas');
        const spriteContext = spriteCanvas.getContext('2d');
        spriteCanvas.width = 70; // 根据需要设置宽度
        spriteCanvas.height = 20; // 根据需要设置高度

        // 设置黑色背景，半透明度
        spriteContext.fillStyle = 'rgba(0, 0, 0, 0.3)';
        spriteContext.fillRect(0, 0, spriteCanvas.width, spriteCanvas.height);

        // 设置荧光橙色边框
        spriteContext.strokeStyle = this.cabinetArrayByEquipmentType.includes(this.tableData[i].cabinetName)
          ? '#FF0080' : '#ffa500'
        spriteContext.lineWidth = this.cabinetArrayByEquipmentType.includes(this.tableData[i].cabinetName)
          ? 4 : 2;
        spriteContext.strokeRect(0, 0, spriteCanvas.width, spriteCanvas.height);

        const fontSize = 14; // 设置字体大小
        spriteContext.font = `Bold ${fontSize}px Arial`;

        console.log("this.cabinetArrayByEquipmentType",this.cabinetArrayByEquipmentType)
        // let text = this.cabinetArrayByEquipmentType.includes(this.tableData[i].cabinetName)
        //   ? 'here' : this.tableData[i].cabinetName;

        let text = this.tableData[i].cabinetName;
        const textWidth = spriteContext.measureText(text).width;
        const centerX = (spriteCanvas.width - textWidth) / 2;
        const centerY = spriteCanvas.height / 2 + fontSize / 2

        // 设置荧光蓝色文本颜色
        spriteContext.fillStyle = '#00ffff';
        spriteContext.fillText(text, centerX, centerY);

        const spriteTexture = new THREE.Texture(spriteCanvas);
        spriteTexture.needsUpdate = true;
        const spriteMaterial = new THREE.SpriteMaterial({ map: spriteTexture });
        this.sprite = new THREE.Sprite(spriteMaterial);
        this.sprite.scale.set(10, 5, 1);
        console.log("this.isWidening",this.isWidening)
        if(this.isWidening){
          this.sprite.position.set(this.spritePosition2[i][0], this.spritePosition2[i][1], this.spritePosition2[i][2]);
        }else{
          this.sprite.position.set(this.spritePosition1[i][0], this.spritePosition1[i][1], this.spritePosition1[i][2]);
        }
        this.sprite.center.set(0.5, 0);
        this.scene.add(this.sprite);
      }
    },

    echartsInit(){
      let chartDom = document.getElementById('echarts');
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        toolbox: {
          feature: {
            // saveAsImage: {}
          }
        },
        grid: {
          left: '2%',
          right: '5%',
          bottom: '5%',
          top: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.xAxisData,
            axisLabel: {
              color: 'white' // 设置横轴上的数字颜色为白色
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: 'white' // 设置横轴上的数字颜色为白色
            }
          }
        ],
        series: [
          {
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: this.seriesData,
            lineStyle: {
              color: 'rgba(0, 191, 255, 1)' // 设置线条颜色为荧光白
            },
            smooth: true // 将线条改成平滑的曲线
          },

        ]
      };
      this.myChart = myChart
      option && myChart.setOption(option);

    },


    handleResize() {
      // 更新相机纵横比和渲染器大小
      const newWidth = this.$refs.canvasContainer.clientWidth;
      const newHeight = this.$refs.canvasContainer.clientHeight;

      this.camera.aspect = newWidth / newHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(newWidth, newHeight);

      if (this.myChart) {
        this.myChart.resize();
      }
    },

    // 动画-循环渲染每一帧
    animate() {
      if (this.machineModel) {
        requestAnimationFrame(this.animate);
        this.controls.update();
        TWEEN.update();
        this.renderScene()
        this.renderer.render(this.scene, this.camera);
      }
    },

    //鼠标点击事件
    onMouseDown(event) {
      // console.log('machineRoomId',this.machineRoomId)
      // 计算鼠标点击位置在屏幕坐标的归一化设备坐标（NDC）范围[-1, 1]
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children);
      if (intersects.length > 0) {
        let clickObject = intersects[0].object;
        console.log("clickObject",clickObject.name)
        // console.log('intersects[0].objeccct',intersects[0].object.name)
        // for(let i=0;i<intersects.length;i++){
        //   console.log('被点击的所有',intersects[i].object.name)
        // }
        //机柜门开关
        for (let i = 0; i < 40; i++) {
          // console.log("this.cabinetArray",this.cabinetArray)
          if (clickObject.name === this.cabinetArray[i]) {
            // console.log('点中了')
            this.rotateCabinetDoor(clickObject);
            // let flag = 0
            // let equipmentClickedCountArray = Object.values(this.equipmentClickedCount[i])
            // equipmentClickedCountArray.forEach((element) => {
            //   if (element % 2 !== 0) {
            //     flag = 1
            //   }
            // })
            // // console.log('flag',flag)
            // //设备推入的情况下才能关闭机柜门
            // if (flag === 0) {
            //   // 点击后执行旋转动画
            //   this.rotateCabinetDoor(clickObject);
            //   break
            // }
          }
        }
        //设备移动
        // let shouldStop = true;
        // this.equipmentClickedCount.forEach((elements, index) => {
        //   for (const element of Object.keys(elements)) {
        //     if (clickObject.name === element && Object.values(this.cabinetClickCount[index] % 2 === 1)) {
        //       //点击后执行移动动画
        //       //clickObject为要旋转的模型，index是该模型所处的机柜索引
        //       this.moveEquipment(clickObject, index)
        //       shouldStop = true;
        //       break //结束内层遍历
        //     }
        //   }
        //   if (shouldStop) {
        //     return; // 直接返回，结束外层遍历
        //   }
        // })
      }
    },

    //打开机柜门
    rotateCabinetDoor(targetObject) {
      if (!this.isRotating) {
        this.isRotating = true;
        // console.log('targetObject',targetObject)
        // console.log(222,this.cabinetClickCount[targetObject.name])
        this.cabinetClickCount[targetObject.name] = this.cabinetClickCount[targetObject.name] + 1
        // 根据点击次数的奇偶性来确定目标旋转角度的正负
        const isPositiveRotation = this.cabinetClickCount[targetObject.name] % 2 === 1;
        const targetRotation = isPositiveRotation
          ? targetObject.rotation.y + Math.PI*2 / 3 // 旋转120°
          : targetObject.rotation.y - Math.PI*2 / 3; // 旋转-120°
        const initialRotation = targetObject.rotation.y;
        const duration = 1000; // 旋转动画的持续时间为1000毫秒（1秒）
        const startTime = performance.now();
        const animateRotation = (timestamp) => {
          const progress = timestamp - startTime;
          const rotationProgress = Math.min(progress / duration, 1);
          targetObject.rotation.y = initialRotation + (targetRotation - initialRotation) * rotationProgress;
          if (rotationProgress < 1) {
            requestAnimationFrame(animateRotation);
          } else {
            this.isRotating = false;
          }
        };
        // 启动动画循环
        requestAnimationFrame(animateRotation);
      }
    },

    //拉出设备
    moveEquipment(targetObject, index) {
      if (!this.isMoving) {
        this.isMoving = true
        this.equipmentClickedCount[index][targetObject.name] = this.equipmentClickedCount[index][targetObject.name] + 1
        // 根据点击次数的奇偶性来确定目标移动的正负
        const isPositionMovement = this.equipmentClickedCount[index][targetObject.name] % 2 === 1
        const targetPositionZ = isPositionMovement ? targetObject.position.z - 1 : targetObject.position.z + 1;
        const duration = 1000; // 动画持续时间为1000毫秒（1秒）
        const startTime = performance.now();
        const animatePosition = (timestamp) => {
          const progress = timestamp - startTime;
          const positionProgress = Math.min(progress / duration, 1);
          targetObject.position.z = targetObject.position.z + (targetPositionZ - targetObject.position.z) * positionProgress;
          if (positionProgress < 1) {
            requestAnimationFrame(animatePosition);
          } else {
            this.isMoving = false;
          }
        };
        // 启动动画循环
        requestAnimationFrame(animatePosition);
      }
    },

    //鼠标悬停
    renderScene() {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0) {
        // 鼠标悬停在模型上
        let object = null;
        for (let i=0 ; i<intersects.length;i++){
          if (intersects[i].object.type != "Sprite"){
            object= intersects[i].object;
            break;
          }
        }
        let cabinetArray = Object.keys(this.cabinetClickCount)
        // console.log(intersects[0].object)
        // console.log(object)
        if (cabinetArray.includes(object.name)) {
          // console.log('this.tooltipText',this.tooltipText)
          this.showCabinetData(object.name)
        } else {
          // 不再悬停在模型上，隐藏气泡
          this.showTooltip = false;
        }
      } else {
        // 不再悬停在模型上，隐藏气泡
        this.showTooltip = false;
      }
    },
    onMouseMove(event) {
      // 将鼠标坐标归一化为[-1, 1]
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // 悬停时更新气泡位置
      if (this.showTooltip) {
        this.tooltipPosition.x = event.clientX;
        this.tooltipPosition.y = event.clientY;
      }
    },
    onMouseLeave() {
      // 鼠标离开时，隐藏气泡
      this.tooltipText = '';
      this.tooltipPosition = {x: 0, y: 0}
      this.showTooltip = false;
    },

    //机柜数据交互
    showCabinetData(modelName) {
      //modelName是机柜模型的原名字
      //this.cabinetArray内含机房内不大于四个机柜
      this.cabinetArray.forEach((element, index) => {
        if (this.clickedCabinet.length >= index && element === modelName) {
          //使用可选链运算符（?）来进行安全访问-存在才进行后续操作
          if (this.clickedCabinet[index]?.cabinetName) {
            // console.log('element === modelName')
            this.clickedCabinetName = this.clickedCabinet[index].cabinetName
            // console.log("this.clickedCabinet[index].cabinetName",this.clickedCabinet[index].cabinetName)
            this.tooltipText = this.equipmentTableData[index];

            this.cabinetNum = index;
            this.showTooltip = true;
          }
        }
      })
    },

    backPage() {
      this.$emit('exit-full-screen');
      this.$emit('changeDiv5', '0')
      // this.full()
    },
    handchangedatacardstate() {
      this.datacard = !this.datacard
      this.showButton = !this.showButton
    },
    handleCurrentChange(val) {
      this.dialogVisible = true
      // this.dialog_description = val
    },

    //当前单位下属机房被访问次数统计波形图
    visitTotalOfCurrentPost(){
      getVisitTotalOfCurrentPost(this.postName).then((res) =>{
        console.log("res-----------------",res)
        this.counts = res.data
        this.xAxisData = [] // 处理横坐标日期
        this.seriesData = [] // 处理纵坐标操作次数
        const today = moment() // 获取当前日期
        for (let i = 6; i >= 0; i--) {
          const date = today.clone().subtract(i, 'days') // 获取最近7天的日期
          this.xAxisData.push(date.format('MM-DD')) // 格式化日期
          const item = this.counts.find(item => moment(item[0]).isSame(date, 'day')) // 查找该日期对应的次数
          this.seriesData.push(item ? item[1] : 0) // 如果有次数，则添加次数，否则添加0
        }
        console.log(this.xAxisData)
        console.log(this.seriesData)
      })
    },

    //右上角数据
    initCount() {
      this.roomBasicInfo.machineArea = this.$store.state.machineRoom.machineArea
      this.roomBasicInfo.machineAdministrator = this.$store.state.machineRoom.machineAdministrator
      this.roomBasicInfo.machineLocation = this.$store.state.machineRoom.machineLocation
      // console.log(this.roomBasicInfo.machineArea)
      getEquipmentCount().then((response) => {
        this.equipmentBaseInfo.total = response.data.total
      })
      getPostMachineRoom(this.$store.state.machineRoom.unitid).then((response) => {
        this.equipmentBaseInfo.machineRoomCount = response.data.total
      })
      getCabinet(this.$store.state.machineRoom.machineRoomId).then((response) => {
        this.equipmentBaseInfo.cabinetCount = response.data.total
        this.isWidening = this.equipmentBaseInfo.cabinetCount > 20 ? true : false
      })
      const params = {
        dataName: ['machineRoomId'],
        dataValue: this.$store.state.machineRoom.machineRoomId,
        status: "0",
        start: 0,
        limit: 99999
      }
      getList(params).then((response) => {
        this.equipmentBaseInfo.equipmentCount = response.data.total
      })
    },

    //田累积
    echartsDraw() {
      for(let i=0;i<this.tableData.length;i++){
        this.AllechartsData.push({
          name: this.tableData[i].cabinetName,
          value: 0
        })
      }
      for(let i=0;i<this.tableData.length;i++){
        for(let j=0;j<this.echartsData.length;j++){
          if(this.tableData[i].cabinetName === this.echartsData[j].name){
            this.AllechartsData[i].value =this.echartsData[j].value
          }
        }
      }
      this.config = {
        data: this.AllechartsData.map(AllechartsData => [AllechartsData.name, AllechartsData.value]),
        header: ['机柜名称', '设备数量'],
        align: 'center',
        hoverPause:true,
        rowNum:8,
        headerBGC:'#032146',
        headerHeight:40,
        oddRowBGC:'#426b9d',
        evenRowBGC:'#182b42',
      }

    },
    handleResize2() {
      if (this.myChart) {
        // 调用Echarts实例的resize方法，重新绘制图表
        this.myChart.resize();
      }
    },
    changeDiv(value) {
        this.showEquipment =false
      },

    cabinetDetail(index, row) {
        // console.log("8888888888888888888888",row)
        this.row = row
      // console.log(row.cabinetId)
        this.showEquipment =true
      },
  }
};

</script>

<style scoped>
.mains{
  cursor: pointer;
  position:absolute;
  left:0;
  width: 100%;
  height:100vh;
}
.app{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height:10vh;
  z-index: 100
}
#container {
  position: absolute;
  bottom: 0;
  /*z-index:98;*/
  width:100%;
  height:100%;
}
.msgTable-8-top{
  z-index:99;
  height: 21rem;
  width:25rem;
  position: absolute;
  top: 7rem;
  margin-left: 10px
}
.msgTable-8-bottom{
  z-index:99;
  width:30rem;
  position: absolute;
  right: 0vw;
  margin-right: 10px;
  top:37.5rem;

}
.decoration-7-top{
  width:150px;
  height:30px;
  margin-left: 8rem;
  color: #20dbfd;
  font-size: 18px;
}
.decoration-7-bottom{
  width:150px;
  height:30px;
  margin-left: 10rem;
  color: #20dbfd;
  font-size: 18px;
}
.decoration-7-bottom-1{
  width:300px;
  height:30px;
  margin-left: 3.5rem;
  color: #20dbfd;
  font-size: 18px;
}
.el-row-bottom{
  display:flex;
  justify-content: center;
  width:90%;
  height:86%;
  left: 5%;
  position: absolute;
  top: 3rem
}
.top-img{
  width: 35%;
  height: 50%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.img{
  width:7rem;
  height:7rem;
  border-radius: 4rem;
  position: relative;
  z-index: 99;
  bottom: 0;
  margin-left: 1rem;
}
.top-table{
  margin-top: 0.9rem;
  opacity: 1;
  width: 60%;
  color: #FFFFFF;
  text-align: left;
  position: relative;
  font-size:20px
}
.top-span-1{
  display: flex;
  justify-content: center;
  align-items: center;
  color:#20dbfd;
  text-shadow:0 0 25px #00d8ff;
  font-size:20px;
  font-weight: 800;
}
.top-span-2{
  display: flex;
  justify-content: center;
  align-items: center;
  color:#20dbfd;
  text-shadow:0 0 25px #00d8ff;
  font-size:20px;
  font-family:yjsz;
  font-weight: 900
}
.top-span-3{
  display: flex;
  justify-content: center;
  align-items: center;
  color:#20dbfd;
  text-shadow:0 0 25px #00d8ff;
  font-size:20px;
  font-family:yjsz;
  font-weight: 900
}
.th-1{
  color:#20dbfd;
  text-shadow:0 0 25px #00d8ff;
  font-family:yjsz;
  font-weight: 900;
  text-align: center;
  padding-right: 10px
}
.th-2{
  color:#20dbfd;
  text-shadow:0 0 25px #00d8ff;
  font-family:yjsz;
  font-weight: 900;
  text-align: center;
  padding-right: 10px;
  width: 15%
}
.th-3{
  color:#20dbfd;
  text-shadow:0 0 25px #00d8ff;
  font-family:yjsz;
  font-weight: 900;
  text-align: center;
  padding-right: 10px
}
.th-4{
  color:#20dbfd;
  text-shadow:0 0 25px #00d8ff;
  font-family:yjsz;
  font-weight: 900;
  text-align: center;
  padding-right: 10px
}
.dv-decoration-8-1{
  width:300px;
  height:50px;
  position: absolute;
  left: 0
}
.dv-decoration-8-2{
  width:300px;
  height:50px;
  position: absolute;
  right: 0
}
.el-button-1{
  z-index:99;
  position: absolute;
  bottom: -20px;
  right: 100px;
}
.el-button-2{
  z-index:99;
  position: absolute;
  bottom: -20px;
  right: 20px;
}
.dv-decoration-5{
  width:100%;
  height:40px;
  position: relative;
  bottom:2rem
}
.dv-decoration-10{
  width:100%;
  height:5px;
  position: relative;
  bottom:1rem
}
.h1-top{
  text-align: center;
  position:relative;
  color:#20dbfd;
  text-shadow:0 0 25px #00d8ff;
  font-weight: 900
}
.tooltip {
  position: absolute;
  width: 560px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 20px;
  pointer-events: none;
  text-align: center;
  /* 添加 z-index 确保气泡在画布上方显示 */
  z-index: 100;
}
.bubble {
  position: absolute;
  transform: translate(-50%, -100%);
  z-index: 99;
}
#canvas-container {
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar {
  width: 10px; /* 竖向滚动条宽度 */
  height: 12px; /* 横向滚动条高度 */
}
::-webkit-scrollbar-thumb {
  border-radius: 10px; /* 滚动条样式 */
  -webkit-box-shadow: #ffffff;  /* 内阴影 */
  background-color: #4c4d4d; /* 滚动条颜色 */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #ffffff; /* 滚动条悬浮颜色 */
}

::-webkit-scrollbar-track-piece {
  background: #ffffff; /* 滚动条背景颜色 */
}

/*↓↓↓ 点击“详情”按钮的黑色罩子（不知道咋来的），透明度设为0不让它出现，不能删除！！！*/
.v-modal {
  opacity: 0;
}
.msgTable-echarts{
  z-index:99;
  height: 27rem;
  width:25rem;
  position: absolute;
  top: 24rem;
  margin-left: 10px
}
.el-table__fixed-right-patch {
  position: absolute;
  top: -1px;
  right: 0;
  background-color: BLACK;
}
/*精灵标签样式*/
.spriteLabel{
  font-family: Arial, sans-serif;
  background-color: rgba(255, 0, 0, 0.8); /* 背景颜色和透明度 */
  padding: 5px;
  border: 2px solid #000; /* 背景边框 */
  color: rgb(63, 63, 64);
  white-space: nowrap; /* 防止换行 */
}
</style>
