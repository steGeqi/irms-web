<template>
    <div>
        单独文件导出进度
        <el-progress :percentage="pgs.per1" ></el-progress>
        总导出进度
        <el-progress :percentage="pgs.per2" :format="format"></el-progress>
        <h3>{{info}}</h3>
    </div>
</template>
<script>
import Promise from 'v-calendar/lib/v-calendar.common'

export default {
  data () {
    return {
      pgs:{
        per1:0,
        per2:0,
      },
      flag:0,
      info:""
    }
  },
  created() {
    this.test()
  },
  methods: {
    test(){
      let _this = this
      let num = 0
      let LocalStorage = window.localStorage
      let item = setInterval(()=>{
        num ++
        let report_info = LocalStorage.getItem('report_form_info')
        if(num >= 20 && !report_info){
          clearInterval(item)
          if(_this.pgs.per2 == 100){
            _this.info = "导出成功"
          }
        }
        if(!report_info) return
        let item_list = report_info.split(";")
        let now_sub = 0
        let sun_num_list = [0,0]
        report_info = [item_list[0].split(","),item_list[1].split(',')]
        for(let i in report_info[1]){
          if(report_info[1][i] !== "0"){

            console.log("i",i)
            now_sub = parseInt(i)
            // console.log("now_sub",now_sub)
          }
          sun_num_list[0] += parseInt(report_info[0][i])
          sun_num_list[1] += parseInt(report_info[1][i])
        }
        // console.log("report_info",report_info)
        // console.log("sun_num_list",sun_num_list)
        // console.log("now_sub",now_sub)


        _this.pgs.per2 = parseInt((sun_num_list[1] / sun_num_list[0])*100)
        // _this.pgs.per1 = parseInt((parseInt(report_info[1][now_sub]) / parseInt(report_info[0][now_sub]))*100)
        if(_this.pgs.per2 === 100){
          _this.pgs.per1 = 100
        }
        if(_this.pgs.per1 === 100 && _this.pgs.per2 !== 100 && this.flag === 1){
          _this.pgs.per1 = 0
          this.flag = 0
        }else if(this.flag === 1){
          _this.pgs.per1 = parseInt(( report_info[1][now_sub] / report_info[0][now_sub] )*100)
        }
        console.log("_this.pgs.per1",_this.pgs.per1)

      },200)

    },

    format(percentage) {
      return percentage === 100 ? '✔️️' : `${percentage}%`;
    },
  },
  watch: {
    'pgs.per2'(newValue, oldValue) {
      console.log(`count 从 ${oldValue} 变为 ${newValue}`);
      this.flag = 1
      // 在这里可以执行在 count 变化时的操作
      // if(this.pgs.per2 !== 100){
      //   this.pgs.per1 = 0
      //   console.log("this.pgs.per1",this.pgs.per1)
      // }

    }
  }
};
</script>
