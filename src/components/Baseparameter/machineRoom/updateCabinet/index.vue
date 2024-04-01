<template>
  <div>
    <div class="source">
      <el-page-header content='修改机柜' @back='back'/>
    </div>
    <div>
      <el-row>
        <el-form ref='cabinetFrom' :model='cabinetFrom = this.cabinet' label-width='120px' :rules='rules' :inline='false'>
          <el-form-item label='机柜名称' prop='cabinetName'>
            <el-col>
              <el-input v-model='cabinetFrom.cabinetName'/>
            </el-col>
          </el-form-item>
          <el-form-item v-show="currentShow === '4'">
            <el-button type='primary' @click="onSubmit('cabinetFrom')">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>

import { updateCabinetAction } from '@/api/baseparameter'

export default {
  name: "UpdateCabinet",
  components:{

  },
  props: {
    row: {
      type: Object,
      required: true
    },
    currentShow: {
      type: String,
      required: true
    }
  },
  created() {
    this.initCabinet()
  },
  data() {
    return {
      nameRules: false,
      postAll: [],
      cabinet: {
        cabinetName:""
      },
    }
  },
  methods: {
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      // console.log('00000',formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const cabinet = {...this.cabinet }
          // console.log('00001110',this.cabinet)
          updateCabinetAction(cabinet).then(res => {
            this.$alert("更新成功",'提示', {
              confirmButtonText: '确定',
              type: 'info',
              showClose: false
            }).then(() => {
              this.back()
            })
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!!');
          return false
        }
      })
    },
    initCabinet() {
      this.cabinet=this.row[0]
    },
  }
}
</script>

<style scoped>
.source {
  padding: 24px;
}
</style>
