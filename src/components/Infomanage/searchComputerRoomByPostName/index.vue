<!--根据单位搜索进入该单位的机房群-->
<template>
  <div class="Online_digital_computer_room_panel">
<div v-if="isShow==='0'">
  <div class="grid-content bg-purple"><i class="el-icon-s-order"/><span>信息资源管理</span></div>
  <div class="app-container">
    <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <span style="color: #ffffff">线上数字机房</span>
          </div>
        </el-col>
      </el-row>
      <el-row
        :gutter="10"
        class="bg-condition"
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
            v-model="dataName"
            placeholder="详细字段查询"
            multiple
            size="medium"
          >
            <el-option
              v-for="(item,index) in basicValue"
              :key="index"
              :label="item.label"
              :value="item.value"
              class="searchInput"
            />
          </el-select>
        </el-col>
        <el-col
          :xs="3"
          :sm="3"
          :md="3"
          :lg="3"
          :xl="3"
        >
          <el-input
            v-model="inputValue"
            placeholder="输入查询内容"
            clearable
            size="medium"
          />
        </el-col>
        <el-col
          :xs="2"
          :sm="2"
          :md="2"
          :lg="2"
          :xl="2"
        >
          <el-button
            size="medium"
            type="primary"
            icon="el-icon-search"
            clearable="true"
            @click="searchData()"
            class="check"
            style="max-height: 500px"
          >搜索
          </el-button>
        </el-col>
        <el-col
          :xs="2"
          :sm="2"
          :md="2"
          :lg="2"
          :xl="2">
          <el-button
            size="medium"
            type="primary"
            @click="Back()"
            class="return"
            style="max-height: 500px"
          >返回数字机房首页
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="computerRoomContainer" style='overflow: auto;position:relative;padding-bottom: 20px'>
      <dv-loading v-show='loading'>Loading...</dv-loading>
      <div class="card">
        <div class="roomCard" v-for="(item,index) in ComputerRoomCard">
          <dv-border-box-13 style="height: 11rem">
            <div style="height:90%; width:90%; position:absolute;left:1rem; top:2rem">
              <el-row style="margin-bottom: 10px">
                <el-col :span="5">
                  <img :src=logoSrc+item.postId+logoImgetype
                       style="width:4rem;border-radius: 4rem;position: relative;bottom: 0">
                </el-col>
                <el-col :span="17" :offset="2">
                  <div class="roomData"  style="margin-left: 25px">
                    <span>{{ item.postName }}</span>
                  </div>
                  <div class="roomData"  style="margin-left: 25px">
                    <span class="roomName">{{ item.machineRoomName}}</span>
                    <br>
                    <span class="roomName">机柜数量：{{item.CabinetinNum}}</span>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="9">
                  <div class="roomData">
                    <span>机房状态：</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <el-tag
                    size="small"
                    :type="item.status === '0' ? 'success' : 'danger'"
                    class="logo"
                    style="max-height: 500px"
                    disable-transitions>{{ item.status === "0" ? "正常" : "维修中" }}
                  </el-tag>
                </el-col>
                <el-col :span="8">
                  <el-button type="primary"
                             size="mini"
                             @click="CheckComputerRoom(index)"
                             class="enter"
                             style="max-height: 500px">进入机房</el-button>
                </el-col>
              </el-row>
            </div>
          </dv-border-box-13>
        </div>
      </div>
    </div>
  </div>
</div>
<!--    <div v-if="isShow==='2'" :is-active="isFullScreen">-->
<!--      <computer-room v-bind:machineRoomId="this.machineRoomId" v-if="isFullScreen" @exit-full-screen="exitFullScreen"-->
<!--                     @changeDiv5="changeDiv5"></computer-room>-->
<!--    </div>-->
    <view-full-screen :is-active="isFullScreen" v-if="isShow==='2'">
      <computer-room v-bind:machineRoomId="this.machineRoomId" v-if="isFullScreen" @exit-full-screen="exitFullScreen"
                     @changeDiv5="changeDiv5"></computer-room>
    </view-full-screen>
  </div>
</template>

<script>
import {getAllmachineroom} from "@/api/machineRoom";
import {getPostMachineRoom} from "@/api/dashboard";
import { getCabinetinMachineRoom } from '@/api/select'
import computerRoom from "@/components/Infomanage/computerRoom/index.vue";
import ViewFullScreen from '@/components/Infomanage/computerRoom/ViewFullScreen'

export default {
  name: 'search-computer-room-by-post-name',
  props: ['postName', 'postId'],
  components: {computerRoom,ViewFullScreen},
  data() {
    return {
      CabinetinMachineRoomNum:[],
      CabinetinNum: '',
      isFullScreen: true,

      isShow: '0',
      postName: this.postName,
      postId: this.postId,
      loading: true,
      ComputerRoomCard: [],
      tempTotalData: [],
      logoSrc: '/unitLogo/',// logo放在public 文件夹下 使用绝对路径即可
      logoImgetype: '.png',
      dataName: 'all',
      inputValue: '',
      basicValue: [
        {
          value: 'machineRoomName',
          label: '机房名称'
        },
        {
          value: 'status',
          label: '机房状态'
        }
      ],
      machineRoomId:''
    };
  },
   mounted() {
    this.fetchData();
  },
  watch: {
    postName(val) {
      this.postName = val;
      this.fetchData();
    }
  },


  methods: {
    changeDiv5(value) {
      this.isShow = value;
      this.isFullScreen = true
    },
    exitFullScreen(){
      this.exitFullScreen = false
    },
    //--------------返回功能开始---------------------
    Back() {
      console.log(0);
      this.ComputerRoomCard = [];
      this.$emit('changeDiv', '0')
    },
    //--------------返回功能结束---------------------

    //----------------------搜索功能searchData()实现开始--赵长开-----------------------------------------------------------
    searchData() {
      this.listLoading = true;
      this.ComputerRoomCard = this.tempTotalData;
      console.log("this.ComputerRoomCard",this.ComputerRoomCard)
      setTimeout(() => {
        let searchResults = [];
        if (this.inputValue !== '') {
          searchResults = this.ComputerRoomCard.filter(data => {
            if (this.inputValue === "正常") {
              let tempValue = "0";
              return data.status.includes(tempValue)
            } else if (this.inputValue === "维修中") {
              let tempValue = "1";
              return data.status.includes(tempValue)
            } else if (data.machineRoomName.includes(this.inputValue)) {
              return (
                data.machineRoomName.includes(this.inputValue)
              )
            }
          });
        } else {
          searchResults = this.ComputerRoomCard;
        }
        //console.log(searchResults)
        this.ComputerRoomCard = searchResults;
        this.listLoading = false;
      }, 500);
    },
    //----------------------搜索功能searchData()实现结束-------------------------------------------------------------


    CheckComputerRoom(index) {
      //console.log(this.ComputerRoomCard[index])
      // debugger
      var unit = this.ComputerRoomCard[index].unit
      var department = this.ComputerRoomCard[index].postName
      var installation_position = this.ComputerRoomCard[index].machineRoomName
      var unitid = this.ComputerRoomCard[index].postId
      var machineRoomId = this.ComputerRoomCard[index].machineRoomId
      var machineArea = this.ComputerRoomCard[index].machineArea
      var machineAdministrator = this.ComputerRoomCard[index].machineAdministrator
      var machineLocation = this.ComputerRoomCard[index].machineLocation
      var CabinetinNum =this.ComputerRoomCard[index].CabinetinNum

      console.log( 'unit,department',unit,department)
      console.log('this.ComputerRoomCard[index]',this.ComputerRoomCard[index])
      this.machineRoomId = this.ComputerRoomCard[index].machineRoomId
      console.log('this.machineRoomId',this.machineRoomId)
      console.log("this.ComputerRoomCard[index]",this.ComputerRoomCard[index])

      this.$store.commit('machineRoom/SET_UnitId', unitid)
      this.$store.commit('machineRoom/SET_MachineRoomId', machineRoomId)
      this.$store.commit('machineRoom/SET_Unit', unit)
      this.$store.commit('machineRoom/SET_DEPARTMENT', department)
      this.$store.commit('machineRoom/SET_InstallPosition', installation_position)
      this.$store.commit('machineRoom/SET_MachineAdministrator', machineAdministrator)
      this.$store.commit('machineRoom/SET_MachineArea', machineArea)
      this.$store.commit('machineRoom/SET_MachineLocation', machineLocation)
      this.$store.commit('machineRoom/SET_CabinetinNum', CabinetinNum)
      // this.$router.push({name: 'computerRoom'})
      this.isShow = '2'
    },

    fetchData() {
      this.loading = true;
      getCabinetinMachineRoom().then((res) =>{
        this.CabinetinMachineRoomNum = res.data.CabinetinMachineRoom;
      })
      getPostMachineRoom(this.postId).then((res) => {
        console.log("getPostMachineRoom",res)
        setTimeout(() => {
          let searchResults = [];
          searchResults = res.data.items;
          this.ComputerRoomCard = searchResults;
          for(let j=0;j<this.CabinetinMachineRoomNum.length;j++) {
            for (let i = 0; i < this.ComputerRoomCard.length; i++) {
              if (this.ComputerRoomCard[i].machineRoomId === this.CabinetinMachineRoomNum[j][0]) {
                this.ComputerRoomCard[i].CabinetinNum = this.CabinetinMachineRoomNum[j][1];
              }
            }
          }
          console.log('this.ComputerRoomCard',this.ComputerRoomCard)
          this.tempTotalData = this.ComputerRoomCard;
          this.listLoading = false;
          this.loading = false
        }, 200)
      })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.computerRoomContainer{
  width: 100%;
  height: 82vh;
  background: #041135;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  height: 10rem;
}

.check {
  min-height: 35px;
  min-width: 80px;
}
.return {
  min-height: 35px;
  min-width: 170px;
}
.enter {
  min-height: 26px;
  min-width: 95px;
}
.logo {
  text-align: center;
  min-width: 50px;
}
.roomCard {
  width: 18rem;
  height: 10rem;
  margin-left: 2rem;
  margin-top: 1rem;
}

.roomCard .roomData {
  width: 100%;
  position: relative;
  margin-bottom: 0.5rem;
}

.roomCard .roomData span {
  width: 80%;
  color: #FFFFFF;
  text-shadow: 0 0 25px #00d8ff;
  font-size: 18px;
  font-weight: 900
}

.roomCard .roomData .roomName {
  color: #20dbfd;
  text-shadow: 0 0 25px #00d8ff;
}

::-webkit-scrollbar {
  width: 6px; /* 竖向滚动条宽度 */
  height: 6px; /* 横向滚动条高度 */
}

::-webkit-scrollbar-thumb {
  border-radius: 10px; /* 滚动条样式 */
  -webkit-box-shadow: #ffffff; /* 内阴影 */
  background-color: #ffffff; /* 滚动条颜色 */
}

::-webkit-scrollbar-thumb:hover {
  background-color: #ffffff; /* 滚动条悬浮颜色 */
}

::-webkit-scrollbar-track-piece {
  background: #ffffff; /* 滚动条背景颜色 */
}

::-webkit-scrollbar-button {
  background-color: #ffffff; /* 定义两端按钮的样式 */
}

::-webkit-scrollbar-corner {
  background: #ffffff; /* 右下角重合处的样式*/
}


/* 单独设置悬浮颜色 */
::-webkit-scrollbar-thumb:vertical {
  background: #adaeb0; /* 竖向滑块颜色 */
}

::-webkit-scrollbar-thumb:horizontal {
  background: #adaeb0; /* 横向滑块颜色 */
}

/* 单独设置滚动条背景色 */
::-webkit-scrollbar-track-piece:vertical {
  background: #ffffff;
}
::-webkit-scrollbar-track-piece:horizontal {
  background: #ffffff;
}


.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}
* {
  font-size: 18px;
}
.app-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
.searchInput {
  height: 40px;
  text-align: center;
  color: #0b0c10;
  background-color: #deecff;
}
</style>
