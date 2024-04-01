<!--
<template>
  <div class="dashboard-container">
    <el-col :span="24">
      <el-card
        v-loading="loading"
        element-loading-text="文件上传中"
        shadow="always"
        class="card"
      >
        <div slot="header" class="clearfix">
          <span><i class="el-icon-folder-add" /> 设备安装</span>
        </div>
        <el-row :gutter="20" style="margin-bottom: 2vh">
          <el-col :span="4"><el-button type="primary" size="small" @click="dialogFormVisible = true">导入设备Excel文件</el-button></el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-dialog title=" 设备安装详情" :visible.sync="dialogFormVisible">
      <div class="uploadCard">
        <el-upload
          :limit="5"
          :on-exceed="handleExceed"
          class="upload-demo"
          action=""
          :multiple="true"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">导入设备excel文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过5个。</div>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEquipment,
  importfile
} from '@/utils/xlsx'
import { importExcel } from '@/api/import'

import { mapState } from "vuex";
export default {
  name: 'Dashboard',
  computed: {
    ...mapState({
       print:state=>state.print.all
    })
   },
  data() {
    return {
      value: '信息资产基础信息表',
      loading: false,
      name: '',
      dialogFormVisible: false,
      tableData: [{
        date: '1',
        name: 'irms'
      }],
      fileList: [],
      excelData: {
        total: 0,
        equipments: []
      }
    }
  },
  methods: {
    // 选择文件
    handleChange(file) {
      const types = file.name.split('.')[1]
      this.fileTemp = file.raw
      if (this.fileTemp) {
        if ((types === 'xlsx') || (types === 'xlc') || (types === 'xlm') || (types === 'xls') || (types === 'xlt') || (types ===
          'xlw') || (types === 'csv')) {
          this.fileList.push(file.raw)
        } else {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请重新上传！'
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请上传附件！'
        })
      }
    },
    // 上传文件
    async submitUpload() {
      if (this.fileList.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择文件！'
        })
      } else {
        for(let index = 0;index < this.fileList.length;index++){
          const outdata = await importfile(this.fileList[index], this.value)
          const postName = this.$store.state.user.roleid
          const {equipment,readStatus} = getEquipment(outdata,postName)
          if(readStatus == 22) {
            this.excelData.equipments.push(equipment)
          }
        }
      }
      this.uploadFunc()
    },
    // 发送请求
    uploadFunc() {
      //console.log(this.$store.state['user']['role_id'])
      this.excelData.total = this.excelData.equipments.length
      this.dialogFormVisible = false
      this.loading = true
      // //console.log(this.excelData)
      if(this.excelData.equipments.length > 0) {
        importExcel(this.excelData).then((res) => {
          this.loading = false
          this.$message({
            message: '文件上传成功！',
            type: 'success'
          })
        }).finally(() =>{
          this.excelData = {
          total: 0,
          equipments: []
        }
          this.fileList = []
          this.loading = false
        })
      }else{
        this.loading = false
        this.fileList = []
        this.excelData = {
          total: 0,
          equipments: []
        }
      }
    },
    // 手动移除
    handleRemove(fileList) {
      this.fileList = fileList
    },
    // 数量限制
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      this.fileList = []
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  position: absolute;
  top: 5vh;
  bottom: 5vh;
  left: 2vw;
  right: 2vw;
}
.clearfix{
  font-size: 20px;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-table&#45;&#45;border::after,
.el-table&#45;&#45;group::after,
.el-table::before {
  background-color: transparent !important;
}

.uploadCard{
  width: 80%;
  padding-left: 7%;
}
.upload-demo{
  height: 80%;
}

</style>
-->
