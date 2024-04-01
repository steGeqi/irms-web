<!--原版本-->
<!--<template>
  <div class="main"  style='overflow: auto;position:relative;padding-bottom: 20px'>
    <dv-loading v-show='loading'>Loading...</dv-loading>
    <div class="card">
      <div class="roomCard" v-for="(item,index) in ComputerRoomCard" >
        <dv-border-box-13>
          <div style="height:90%; width:90%; position:absolute;left:1rem; top:2rem">
            <el-row style="margin-bottom: 10px">
              <el-col :span="5">
                <img :src=logoSrc+item.postId+logoImgetype style="width:4rem;border-radius: 4rem;position: relative;bottom: 0">
              </el-col>
              <el-col :span="17" :offset="2">
&lt;!&ndash;                <div class="roomData">&ndash;&gt;
&lt;!&ndash;                  <span>中国地震局</span>&ndash;&gt;
&lt;!&ndash;                </div>&ndash;&gt;
                <div class="roomData">
                  <span>{{item.postName}}</span>
                </div>
                <div class="roomData">
                  <span class="roomName">{{item.machineRoomName}}</span>
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
                    disable-transitions>{{item.status === "0" ? "正常" : "维修中" }}</el-tag>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" size="large" @click="CheckComputerRoom(index)">进入机房</el-button>
              </el-col>
            </el-row>
          </div>
        </dv-border-box-13>
      </div>
    </div>
  </div>
</template>

<script>
import {getAllmachineroom} from "@/api/machineRoom";

export default {
  name: 'digtal_computer_room',
  data() {
    return{
      loading:true,
      ComputerRoomCard:[],
      logoSrc:'/unitLogo/',// logo放在public 文件夹下 使用绝对路径即可
      logoImgetype:'.png'
    };
  },
  mounted() {
    const data = {
      dataName:['111'],
      dataValue:'',
      status:'',
      start:0,
      limit:9999
    }
    getAllmachineroom(data).then((res) => {
      // //console.log(111111)
      this.loading = false
      //console.log(res.data.items)
      this.ComputerRoomCard = res.data.items
    })
  },
  methods:{
    CheckComputerRoom(index){
      //console.log(this.ComputerRoomCard[index])
      // debugger
      var unit = this.ComputerRoomCard[index].unit
      var department =this.ComputerRoomCard[index].postName
      var installation_position = this.ComputerRoomCard[index].machineRoomName
      var unitid = this.ComputerRoomCard[index].postId
      var machineRoomId = this.ComputerRoomCard[index].machineRoomId
      // //console.log(unit,department)
      // //console.log(this.ComputerRoomCard[index])
      this.$store.commit('machineRoom/SET_UnitId',unitid)
      this.$store.commit('machineRoom/SET_MashRoomId',machineRoomId)
      this.$store.commit('machineRoom/SET_Unit',unit)
      this.$store.commit('machineRoom/SET_DEPARTMENT',department)
      this.$store.commit('machineRoom/SET_InstallPosition',installation_position)
      this.$router.push({ name:'computerRoom'})
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.main{
  width: 100%;
  height: 100vh;
  background: #041135;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.card{
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
}
.roomCard{
  width: 18rem;
  height: 10rem;
  margin-left: 2rem;
  margin-top: 1rem;
}
.roomCard .roomData{
  width: 100%;
  position: relative;
  margin-bottom: 0.5rem;
}
.roomCard .roomData span{
  width:80%;
  color:#FFFFFF;
  text-shadow:0 0 25px #00d8ff;
  font-size:18px;
  font-weight: 900
}
.roomCard .roomData .roomName{
  color:#20dbfd;
  text-shadow:0 0 25px #00d8ff;
}

::-webkit-scrollbar {
  width: 6px; /* 竖向滚动条宽度 */
  height: 6px; /* 横向滚动条高度 */
}
::-webkit-scrollbar-thumb {
  border-radius: 10px; /* 滚动条样式 */
  -webkit-box-shadow: #ffffff;  /* 内阴影 */
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
  background: #adaeb0;  /* 竖向滑块颜色 */
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
</style>-->















<!--搜索版-->
<!--<template>
  <div class="Online_digital_computer_room_panel">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>信息资源管理</span></div>
    <div class="app-container" >
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
            >搜索</el-button>
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
              @click="Refresh()"
            >返回数字机房首页</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="main"  style='overflow: auto;position:relative;padding-bottom: 20px'>
    <dv-loading v-show='loading'>Loading...</dv-loading>
    <div class="card">
      <div class="roomCard" v-for="(item,index) in ComputerRoomCard" >
        <dv-border-box-13>
          <div style="height:90%; width:90%; position:absolute;left:1rem; top:2rem">
            <el-row style="margin-bottom: 10px">
              <el-col :span="5">
                <img :src=logoSrc+item.postId+logoImgetype style="width:4rem;border-radius: 4rem;position: relative;bottom: 0">
              </el-col>
              <el-col :span="17" :offset="2">
                &lt;!&ndash;                <div class="roomData">&ndash;&gt;
                &lt;!&ndash;                  <span>中国地震局</span>&ndash;&gt;
                &lt;!&ndash;                </div>&ndash;&gt;
                <div class="roomData">
                  <span>{{item.postName}}</span>
                </div>
                <div class="roomData">
                  <span class="roomName">{{item.machineRoomName}}</span>
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
                  disable-transitions>{{item.status === "0" ? "正常" : "维修中" }}</el-tag>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" size="mini" @click="CheckComputerRoom(index)">进入机房</el-button>
              </el-col>
            </el-row>
          </div>
        </dv-border-box-13>
      </div>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
import {getAllmachineroom} from "@/api/machineRoom";

export default {
  name: 'digtal_computer_room',
  data() {
    return{
      loading:true,
      ComputerRoomCard:[],
      tempTotalData:[],
      logoSrc:'/unitLogo/',// logo放在public 文件夹下 使用绝对路径即可
      logoImgetype:'.png',
      dataName: 'all',
      inputValue: '',
      basicValue: [
        {
          value: 'postName',
          label: '所属单位'
        },
        {
          value: 'machineRoomName',
          label: '机房名称'
        },
        {
          value: 'status',
          label: '机房状态'
        }
      ],
    };
  },
  mounted() {
    const data = {
      dataName:['111'],
      dataValue:'',
      status:'',
      start:0,
      limit:9999
    }
    getAllmachineroom(data).then((res) => {
      //console.log(res.data.items)
      res.data.items.forEach(function (e){
        console.log(e.postName)
      })
      // //console.log(111111)
      this.loading = false
      //console.log(res.data.items)
      this.ComputerRoomCard = res.data.items
      this.tempTotalData = res.data.items
    })
  },
  methods:{
    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;刷新功能开始-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
    Refresh(){
      location.reload();
    },
    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;刷新功能结束-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;

    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;搜索功能searchData()实现开始&#45;&#45;赵长开-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
    searchData() {
      this.listLoading = true;
      this.ComputerRoomCard = this.tempTotalData;
        setTimeout(() => {
          let searchResults = [];
          if (this.inputValue !== '') {
            searchResults = this.ComputerRoomCard.filter(data => {
              if(this.inputValue==="正常"){
                let tempValue = "0";
                return data.status.includes(tempValue)
              }else if(this.inputValue === "维修中"){
                let tempValue = "1";
                return data.status.includes(tempValue)
              }else if(data.postName.includes(this.inputValue) || data.machineRoomName.includes(this.inputValue)){
                return (
                  data.postName.includes(this.inputValue) ||
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
        }, 200);
    },
    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;搜索功能searchData()实现结束-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;

    CheckComputerRoom(index){
      //console.log(this.ComputerRoomCard[index])
      // debugger
      var unit = this.ComputerRoomCard[index].unit
      var department =this.ComputerRoomCard[index].postName
      var installation_position = this.ComputerRoomCard[index].machineRoomName
      var unitid = this.ComputerRoomCard[index].postId
      var machineRoomId = this.ComputerRoomCard[index].machineRoomId
      // //console.log(unit,department)
      // //console.log(this.ComputerRoomCard[index])
      this.$store.commit('machineRoom/SET_UnitId',unitid)
      this.$store.commit('machineRoom/SET_MashRoomId',machineRoomId)
      this.$store.commit('machineRoom/SET_Unit',unit)
      this.$store.commit('machineRoom/SET_DEPARTMENT',department)
      this.$store.commit('machineRoom/SET_InstallPosition',installation_position)
      this.$router.push({ name:'computerRoom'})
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.main{
  width: 100%;
  height: 100vh;
  background: #041135;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.card{
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
}
.roomCard{
  width: 18rem;
  height: 10rem;
  margin-left: 2rem;
  margin-top: 1rem;
}
.roomCard .roomData{
  width: 100%;
  position: relative;
  margin-bottom: 0.5rem;
}
.roomCard .roomData span{
  width:80%;
  color:#FFFFFF;
  text-shadow:0 0 25px #00d8ff;
  font-size:18px;
  font-weight: 900
}
.roomCard .roomData .roomName{
  color:#20dbfd;
  text-shadow:0 0 25px #00d8ff;
}

::-webkit-scrollbar {
  width: 6px; /* 竖向滚动条宽度 */
  height: 6px; /* 横向滚动条高度 */
}
::-webkit-scrollbar-thumb {
  border-radius: 10px; /* 滚动条样式 */
  -webkit-box-shadow: #ffffff;  /* 内阴影 */
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
  background: #adaeb0;  /* 竖向滑块颜色 */
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

</style>

<style lang="less" scoped>
*{
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
</style-->>










<!--搜索加分级测试版-->
<template>
  <div class="Online_digital_computer_room_panel">
    <div
      v-if="ifUpdate === '0'"
    >
      <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>信息资源管理</span></div>
      <div class="app-container"  >
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
              <span>单位查询：</span>
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
                type="primary"
                icon="el-icon-search"
                class="check"
                style="max-height: 500px"
                clearable="true"
                @click="searchData()"
              >查询</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="main"  style='overflow: auto;position:relative;padding-bottom: 20px'>
          <dv-loading v-show='loading'>Loading...</dv-loading>
          <div class="card">
            <div class="roomCard" v-for="(item,index) in unit" >
              <dv-border-box-13>
                <div style=" height:70%; width:90%; position:absolute;left:1rem; top:1.5rem;" >
                  <el-col style="width: 35%;height: 100%;text-align: center;padding-top: 25px;">
                    <img :src=logoSrc+item.postId+logoImgetype style="width:4rem;border-radius: 4rem;position: relative;bottom: 0">
                  </el-col>
                  <el-col style="width: 65%;height: 100%">
                    <el-row style="width: 100%;height: 50%;text-align: center;padding-top: 20px;color: floralwhite">
                      {{item.postName}}
                    </el-row>
                    <el-row style="width: 100%;height: 50%;text-align: center;padding-top: 10px;">
                      <el-button type="primary"
                                 class="enter"
                                 style="max-height: 500px"
                                 @click="enterComputerRooms(item.postName,item.postId)">进入机房群</el-button>
                    </el-row>
                  </el-col>
                </div>
              </dv-border-box-13>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="ifUpdate === '1'">
      <search-computer-room-by-post-name v-bind:postName="this.postName" :postId="this.postId"   @changeDiv="changeDiv"></search-computer-room-by-post-name>
    </div>
  </div>
</template>

<script>
import {getPost} from "@/api/select";
import searchComputerRoomByPostName from "@/components/Infomanage/searchComputerRoomByPostName"
export default {
  name: 'digital_computer_room',
  components: {
    searchComputerRoomByPostName
  },
  data() {
    return{
      loading:true,
      tempPost:'',
      ifUpdate: '0',
      unitAll:[],
      unit:[],
      logoSrc:'/unitLogo/',// logo放在public 文件夹下 使用绝对路径即可
      logoImgetype:'.png',
      dataName: 'all',
      inputValue: '',
      basicValue: [
        {
          value: 'postName',
          label: '所属单位'
        }
      ],
    };
  },
  mounted() {
    const data = {
      dataName:['111'],
      dataValue:'',
    }


    //--------------------获取单位开始-赵长开------------
    this.fetchData()
    //--------------------获取单位结束-赵长开------------

  },
  methods:{
    fetchData(){
      getPost().then(response => {
        this.unitAll = response.data.items
        this.unit = response.data.items
        this.loading = false
      })
    },
    //----------------------搜索功能searchData()实现开始--赵长开-----------------------------------------------------------
    searchData() {
      this.listLoading = true;
      this.unit = this.unitAll
      setTimeout(() => {
        let searchResults = [];
        if (this.inputValue !== '') {
          searchResults = this.unit.filter(data => {
          if(data.postName.includes(this.inputValue)){
              return (
                data.postName.includes(this.inputValue)
              )
            }
          });
        } else {
          searchResults = this.unit;
        }
        this.unit = searchResults;
        this.listLoading = false;
      }, 200);
    },
    //----------------------搜索功能searchData()实现结束-------------------------------------------------------------

    //--------------通过单位获取对应的全部机房--开始--赵长开------
    enterComputerRooms(postName,postId){
      this.postName = postName
      this.postId=postId
      this.ifUpdate = '1'
    },
    changeDiv(value) {
      this.loading=true;
      this.fetchData()
      this.ifUpdate = value
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.main{
  width: 100%;
  height: 82vh;
  background: #041135;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.card{
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
}
.roomCard{
  width: 18rem;
  height: 10rem;
  margin: 1rem;
}
.enter {
  min-height: 30px;
  min-width: 110px;
}
.check {
  min-height: 35px;
  min-width: 80px;
}

::-webkit-scrollbar {
  width: 6px; /* 竖向滚动条宽度 */
  height: 6px; /* 横向滚动条高度 */
}
::-webkit-scrollbar-thumb {
  border-radius: 10px; /* 滚动条样式 */
  -webkit-box-shadow: #ffffff;  /* 内阴影 */
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
  background: #adaeb0;  /* 竖向滑块颜色 */
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

*{
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

.cardStyle{
  flex-direction: row;
  justify-content: space-around;
}
</style>



















































<!--备份代码-->
<!--
<template>
  <div class="Online_digital_computer_room_panel">
    <div class="grid-content bg-purple"><i class="el-icon-s-order" /><span>信息资源管理</span></div>
    <div class="app-container" >
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
            >搜索</el-button>
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
              @click="Refresh()"
            >返回数字机房首页</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="main"  style='overflow: auto;position:relative;padding-bottom: 20px'>
        <dv-loading v-show='loading'>Loading...</dv-loading>
        <div class="card">
          <div class="roomCard" v-for="(item,index) in ComputerRoomCard" >
            <dv-border-box-13>
              <div style="height:90%; width:90%; position:absolute;left:1rem; top:2rem">
                <el-row style="margin-bottom: 10px">
                  <el-col :span="5">
                    <img :src=logoSrc+item.postId+logoImgetype style="width:4rem;border-radius: 4rem;position: relative;bottom: 0">
                  </el-col>
                  <el-col :span="17" :offset="2">
                    <div class="roomData">
                      <span>{{item.postName}}</span>
                    </div>
                    <div class="roomData">
                      <span class="roomName">{{item.machineRoomName}}</span>
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
                      disable-transitions>{{item.status === "0" ? "正常" : "维修中" }}</el-tag>
                  </el-col>
                  <el-col :span="8">
                    <el-button type="primary" size="mini" @click="CheckComputerRoom(index)">进入机房</el-button>
                  </el-col>
                </el-row>
              </div>
            </dv-border-box-13>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getAllmachineroom} from "@/api/machineRoom";

export default {
  name: 'digtal_computer_room',
  data() {
    return{
      loading:true,
      ComputerRoomCard:[],
      tempTotalData:[],
      logoSrc:'/unitLogo/',// logo放在public 文件夹下 使用绝对路径即可
      logoImgetype:'.png',
      dataName: 'all',
      inputValue: '',
      basicValue: [
        {
          value: 'postName',
          label: '所属单位'
        },
        {
          value: 'machineRoomName',
          label: '机房名称'
        },
        {
          value: 'status',
          label: '机房状态'
        }
      ],
    };
  },
  mounted() {
    const data = {
      dataName:['111'],
      dataValue:'',
      status:'',
      start:0,
      limit:9999
    }
    getAllmachineroom(data).then((res) => {
      //console.log(res.data.items)
      res.data.items.forEach(function (e){
        console.log(e.postName)
      })
      // //console.log(111111)
      this.loading = false
      //console.log(res.data.items)
      this.ComputerRoomCard = res.data.items
      this.tempTotalData = res.data.items
    })
  },
  methods:{
    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;刷新功能开始-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
    Refresh(){
      location.reload();
    },
    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;刷新功能结束-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;

    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;搜索功能searchData()实现开始&#45;&#45;赵长开-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
    searchData() {
      this.listLoading = true;
      this.ComputerRoomCard = this.tempTotalData;
      setTimeout(() => {
        let searchResults = [];
        if (this.inputValue !== '') {
          searchResults = this.ComputerRoomCard.filter(data => {
            if(this.inputValue==="正常"){
              let tempValue = "0";
              return data.status.includes(tempValue)
            }else if(this.inputValue === "维修中"){
              let tempValue = "1";
              return data.status.includes(tempValue)
            }else if(data.postName.includes(this.inputValue) || data.machineRoomName.includes(this.inputValue)){
              return (
                data.postName.includes(this.inputValue) ||
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
      }, 200);
    },
    //&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;搜索功能searchData()实现结束-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;

    CheckComputerRoom(index){
      //console.log(this.ComputerRoomCard[index])
      // debugger
      var unit = this.ComputerRoomCard[index].unit
      var department =this.ComputerRoomCard[index].postName
      var installation_position = this.ComputerRoomCard[index].machineRoomName
      var unitid = this.ComputerRoomCard[index].postId
      var machineRoomId = this.ComputerRoomCard[index].machineRoomId
      // //console.log(unit,department)
      // //console.log(this.ComputerRoomCard[index])
      this.$store.commit('machineRoom/SET_UnitId',unitid)
      this.$store.commit('machineRoom/SET_MashRoomId',machineRoomId)
      this.$store.commit('machineRoom/SET_Unit',unit)
      this.$store.commit('machineRoom/SET_DEPARTMENT',department)
      this.$store.commit('machineRoom/SET_InstallPosition',installation_position)
      this.$router.push({ name:'computerRoom'})
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.main{
  width: 100%;
  height: 100vh;
  background: #041135;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.card{
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
}
.roomCard{
  width: 18rem;
  height: 10rem;
  margin-left: 2rem;
  margin-top: 1rem;
}
.roomCard .roomData{
  width: 100%;
  position: relative;
  margin-bottom: 0.5rem;
}
.roomCard .roomData span{
  width:80%;
  color:#FFFFFF;
  text-shadow:0 0 25px #00d8ff;
  font-size:18px;
  font-weight: 900
}
.roomCard .roomData .roomName{
  color:#20dbfd;
  text-shadow:0 0 25px #00d8ff;
}

::-webkit-scrollbar {
  width: 6px; /* 竖向滚动条宽度 */
  height: 6px; /* 横向滚动条高度 */
}
::-webkit-scrollbar-thumb {
  border-radius: 10px; /* 滚动条样式 */
  -webkit-box-shadow: #ffffff;  /* 内阴影 */
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
  background: #adaeb0;  /* 竖向滑块颜色 */
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

</style>

<style lang="less" scoped>
*{
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
</style>-->
