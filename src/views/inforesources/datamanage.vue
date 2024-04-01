<template>
  <div class='infobody'>
    <div class='grid-content bg-purple'><i class='el-icon-s-order' /><span>信息资源管理</span></div>
    <horizontalTable v-if='showButton' />
    <div class='app-container' v-if='!showButton'>
      <div class='show'>
        <el-row>
          <el-col :span='24'>
            <div class='grid-content bg-purple-dark'><span style="color: #ffffff">信息数据导入</span></div>
          </el-col>
        </el-row>
        <el-row
          :gutter='10'
          class='bg-condition'
        >
          <el-col :span='12'>
            <el-button-group style='float: left;margin-left: 0px;margin-top:5px'>
              <el-button type='primary' size='large' @click='dialogFormVisible = true' icon='el-icon-printer'>
                导入详细表文件
              </el-button>
              <el-button type='primary' size='large' @click='downloadFile()' icon='el-icon-download'>下载模板
              </el-button>
              <el-button size='larger' type='success' @click='upLoadTableData' icon='el-icon-upload el-icon--right'>
                上传所有文件
              </el-button>
              <el-button size='larger' type='danger' @click='clearTable' icon='el-icon-s-release'>清空列表</el-button>
            </el-button-group>
          </el-col>
          <el-col :span='12'>
            <el-button style="margin-top: 5px; float:right" size='larger' type='info' @click='switchPage' icon='el-icon-s-release'>综合表导入</el-button>
          </el-col>
        </el-row>
        <el-table
          :header-cell-style='headStyle'
          :cell-style='headStyle'
          :data='tableData'
          style='width: 100%'>
          <el-table-column
            prop='name'
            label='文件名称'
            width='170'>
          </el-table-column>
          <el-table-column
            prop='data'
            label='设备名称'
            width='240'
          >
            <template slot-scope='scope'>
              <el-tag
                class='statusTg'
                size='medium'
                type='primary'
                disable-transitions>{{ scope.row.data.equipmentBaseInfo.equipmentName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop='data'
            label='设备编号'
            width='170'>
            <template slot-scope='scope'>
              <el-tag
                class='statusTg'
                type='primary'
                disable-transitions>{{ scope.row.data.equipmentBaseInfo.basicInfoId }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop='data'
            label='部门'
            width='180'>
            <template slot-scope='scope'>
              <el-tag
                class='statusTg'
                type='primary'
                disable-transitions>{{ scope.row.data.equipmentBaseInfo.departmentName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop='status'
            label='文件状态'
            width='130'>
            <template slot-scope='scope'>
              <el-tag
                class='statusTg'
                :type="scope.row.status === '读取失败' ? 'danger' : 'success'"
                disable-transitions>{{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop='uploadStatus'
            label='上传状态'
            width='130'>
            <template slot-scope='scope'>
              <el-tag
                class='statusTg'
                :type="scope.row.uploadStatus === '待上传' ? 'warning' : (scope.row.uploadStatus === '上传成功' ?'success': (scope.row.uploadStatus === '上传中' ?'primary': 'danger'))"
                disable-transitions>{{ scope.row.uploadStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label='操作'>
            <template slot-scope='scope'>
              <el-button
                @click='handupload(scope.$index, scope.row)' :disabled='disabled' size='small'>上传
              </el-button>
              <el-button
                type='danger'
                @click='handleDelete(scope.$index)' :disabled='disabled' size='small'>删除
              </el-button>
              <el-button
                @click='checkReplay(scope.$index, scope.row)' :visible.sync='showDialog'>查看反馈信息
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title=' 文件导入详情' :visible.sync='dialogFormVisible'>
      <div class='uploadCard'>
        <el-upload
          :limit='999'
          :on-exceed='handleExceed'
          class='upload-demo'
          action=''
          :multiple='true'
          :on-change='handleChange'
          :on-remove='handleRemove'
          :file-list='fileList'
          :auto-upload='false'
        >
          <el-button size='larger' type='primary' @click='cleanBtn()'>选取文件</el-button>
          <div slot='tip' style='font-size: 18px;position: relative;top: 15px'>
            <p>注意事项：</p>
            <p>1.只能上传填写后的<span style='color: red'>模板文件.</span></p>
            <p>2.文件后缀必须为<span style='color: red'>xlsx、xls、csv</span>其中一个。</p>
            <!--            <p>3.文件数量不超过<span style="color: red">10个</span>。</p>-->
          </div>
        </el-upload>
      </div>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='checkoutFile()'>确 定</el-button>
        <el-button @click='closeDialog()'>取 消</el-button>
      </div>
    </el-dialog>
    <!--    查看导入反馈-第一版        -->
    <el-dialog title='反馈信息展示' :visible.sync='backinfoDialog'>
      <el-descriptions class='margin-top' title='' :column='2' border>
        <el-descriptions-item v-for='item in repalyData' :key='item.key' >
          <template slot='label'>
            {{ item.key }}
          </template>
          <el-tag :type="item.values === 'update' ? 'success' : 'primary'">
            {{ item.values === 'update' ? '更新' : item.values }}
          </el-tag>

        </el-descriptions-item>
      </el-descriptions>
      <el-button @click='resultBtn()' type='primary'>确定</el-button>
    </el-dialog>

    <!--    查看导入反馈-第二版        -->
    <!--    <el-dialog title="反馈信息展示" :visible.sync="backinfoDialog">-->
    <!--      <el-table-->
    <!--        :data="tableUpdateData"-->
    <!--        highlight-current-row-->
    <!--        style="width: 100%" border>-->
    <!--        <el-table-column type="expand" :data="detailedTableUpdateData">-->
    <!--          <template slot-scope="props">-->
    <!--            <el-form label-position="left" inline class="demo-table-expand" v-for="item in detailedTableUpdateData">-->
    <!--              <el-form-item label="字段名">-->
    <!--                <span>{{ item.key() }}</span>-->
    <!--              </el-form-item>-->
    <!--              <el-form-item label="更新状态">-->
    <!--                <span>{{ props.row.name }}</span>-->
    <!--              </el-form-item>-->
    <!--            </el-form>-->
    <!--          </template>-->
    <!--        </el-table-column>-->
    <!--        <el-table-column label="小表名" prop="tableName"></el-table-column>-->
    <!--        <el-table-column prop="operation" label="" ></el-table-column>-->
    <!--      </el-table>-->
    <!--    </el-dialog>-->


    <el-dialog
      :visible.sync='showDialog'
      width='40%'
      title='导入结果反馈'>
      <div style='text-align:center;font-size: 10px'>
        <!--需要弹出的内容部分-->
        <el-descriptions :column='1'>
          <el-descriptions-item v-for='(item,index) in tableData' :key='index'>
            <template slot='label'>
              <i></i>
              <!--              这里显示文件名-->
              {{ item.name }}
            </template>
            <!--            这里显示上传成功或者上传失败的原因-->
            <el-tag
              size='small'
              :type="item.uploadStatus === '上传成功' ? 'success' :'danger' ">
              {{ item.uploadStatus === '上传成功' ? '上传成功' : item.uploadStatus }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <el-button @click='uploadBtn()' type='primary'>确定</el-button>
      </div>
    </el-dialog>


  </div>

</template>

<script>
import {
  analysisReply,
  getEquipment, getUploadData,
  importfile
} from '@/utils/xlsx'
import { importExcel } from '@/api/import'
import { addEquipment, AddExcel, addExcel } from '@/api/table'
import horizontalTable from '@/components/Infomanage/importExcel/horizontalTable.vue'
import index from 'async'
// import { addEquipment, getbasic } from '@/api/table'

export default {
  name: 'Datamanage',
  computed: {
    index() {
      return index
    }
  },
  components: {
    horizontalTable
  },
  data() {
    return {
      showButton: true,
      value: '信息资产基础信息表',
      // fileTaypes: [{
      //   value: '信息资产基础信息表',
      //   label: '资产信息表'
      // }, {
      //   value: '汇总表',
      //   label: '汇总表'
      // }],

      //导入结果反馈
      tableUpdateData: [],
      detailedTableUpdateData: [],

      showDialog: false,
      disabled: false,
      name: '',
      dialogFormVisible: false,
      backinfoDialog: false,
      dialogForm: {},
      formLabelWidth: '120px',
      fileList: [],
      checkList: [],
      excelData: {
        total: 0,
        equipments: []
      },
      tableData: [],
      repalyInfo: [],
      repalyData: [],

      //统计导入结果
      uploadResult: {
        success: 0,
        fail: 0
      },
      submitResult: {
        success: 0,
        fail: 0
      },
      submitOutcome: {
        '读取成功': '',
        '读取失败': ''
      },
      uploadOutcome: {
        '上传成功': '',
        '上传失败': ''
      },
      uploadSumxx: {
        failure: ''
      },
      replayData: {},
      checkReplayResult: []
    }
  },
  methods: {
    switchPage() {
      this.showButton = !this.showButton
    },
    uploadBtn() {
      this.showDialog = false
    },
    resultBtn() {
      this.backinfoDialog = false
    },
    cleanBtn() {
      this.uploadResult = {
        success: 0,
        fail: 0
      }
      this.uploadSumxx = {
        failure: ''
      }
      this.clearTable()
    },


    headStyle() {
      return 'text-align:center;font-size:16px;color:black'
    },
    // 选择文件
    handleChange(file) {
      const types = file.name.split('.')[1]
      this.fileTemp = file.raw
      if (this.fileTemp) {
        if ((types === 'xlsx') || (types === 'xls') || (types === 'csv')) {
          let obj = {
            name: file.name,
            value: file.raw
          }
          this.fileList.push(obj)
          // console.log(this.fileList)
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
    // 确认文件
    checkoutFile() {
      this.dialogFormVisible = false
      this.checkList = this.fileList
      this.submitUpload()
      // console.log(this.excelData)
      this.tableData = this.excelData.equipments
      // console.log(this.tableData)
      this.fileList = []
    },

    // 读取文件
    async submitUpload() {
      // let submitSuccess = []
      let submitFail = []
      if (this.checkList.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择文件！'
        })
      } else {
        for (let index = 0; index < this.checkList.length; index++) {
          const outdata = await importfile(this.checkList[index].value, this.value)
          //console.log("@",this.checkList[index].value.name)
          const postName = this.$store.state.user.post_name
          const userInfo = this.$store.state.user
          const { equipment, readStatus } = getEquipment(outdata, postName ,userInfo)
          //console.log(equipment)
          //console.log(readStatus)
          // debugger
          if (readStatus === 22 || readStatus === 20) {
            let obj = {
              name: this.checkList[index].name,
              data: equipment,
              status: '读取成功',
              uploadStatus: '待上传'
            }
            this.excelData.equipments.push(obj)
            this.submitResult.success = this.submitResult.success + 1
            //this.submitOutcome = this.submitOutcome[this.checkList[index].value.name] = "读取成功"
            // this.submitOutcome.读取成功= this.submitOutcome.读取成功+ this.checkList[index].value.name + "；"

          } else {
            this.$message({
              type: 'error',
              message: '基础表信息读取错误'
            })
            let obj = {
              name: this.checkList[index].name,
              data: equipment,
              status: '读取失败',
              uploadStatus: '读取失败'
            }
            this.excelData.equipments.push(obj)
            this.submitResult.fail = this.submitResult.fail + 1
          }
        }
        // const h = this.$createElement;
        // await this.$msgbox({
        //   // title: '上传的文件',
        //   message: h('p', null, [
        //     h('h2',{style:'color=blue'},'读取成功：'),
        //     h('h3', null, this.submitOutcome.读取成功),
        //     h('h2',{style:'color=red'},'读取失败：'),
        //     h('h3', null, this.submitOutcome.读取失败)
        //   ]),
        //   confirmButtonText: '确定',

        //cancelButtonText: '取消',
        // beforeClose: (action, instance, done) => {
        //   if (action === 'confirm') {
        //     instance.confirmButtonLoading = true;
        //     instance.confirmButtonText = '执行中...';
        //     setTimeout(() => {
        //       done();
        //       setTimeout(() => {
        //         instance.confirmButtonLoading = false;
        //       }, 300);
        //     }, 3000);
        //   } else {
        //     done();
        //   }
        // }
        //})
        // this.uploadFunc()
      }
    },
    // 发送请求
    //上传文件
    uploadFunc(index, data) {
      const equipments = []
      this.dialogFormVisible = false
      this.disabled = true
      let importData = {
        equipments: [],
        total: 1
      }
      importData.equipments.push(data)
      // console.log(importData)
      importExcel(importData).then((res) => {
        this.loading = false
        if (res.status === 200) {
          // this.$message({
          //   message: '文件上传成功！',
          //   type: 'success'
          // })
          this.tableData[index].uploadStatus = '上传成功'
          this.repalyInfo[index] = res.data
          this.uploadResult.success = this.uploadResult.success + 1
        } else {
          this.tableData[index].uploadStatus = '上传失败'
          this.uploadResult.fail = this.uploadResult.fail + 1
          this.uploadSumxx.failure = this.uploadSumxx.failure + this.checkList[index].value.name + ';'
          //this.uploadOutcome.上传失败 = this.uploadOutcome.上传失败 + this.checkList[index].value.name + ";"
          this.repalyInfo[index] = res.data
        }
      }).catch((error) => {
        this.tableData[index].uploadStatus = '上传失败'
        this.uploadResult.fail = this.uploadResult.fail + 1
        AddExcel({ equipments: equipments }).then(res => {
          //获得数据
          console.log('@@', res)
        }).catch(err => {
          console.log(err)
        })
      }).finally(() => {
        this.disabled = false
        console.log('*', this.tableData[index].uploadStatus)
        if (this.uploadResult.success + this.uploadResult.fail === this.tableData.length) {
          console.log('￥', this.tableData)

          // this.tableData.forEach(function(items){
          //   const obj = {
          //     key:items.name,
          //     value:items.uploadStatus
          //   }
          //   this.replayData[obj.key]=obj.value
          // })
          // AddExcel({ equipments: equipments }).then(res => {
          //   //获得数据
          //   console.log('@@',res)
          //   //result单个表的对象
          //   const result = getUploadData(res.data,res.message)
          //   console.log('#',result)
          //   this.replayData.push(result)
          //   // this.showDialog=true
          // }).catch(err => {
          //   console.log(err)
          // })

          this.showDialog = true


          // if(this.uploadResult.success=== this.tableData.length){
          //   const h = this.$createElement;
          //   this.$msgbox({
          //     title: '导入结果统计',
          //     message: h('p', null, [
          //       h('h2', null,'全部上传成功'),
          //     ]),
          //     confirmButtonText: '确定'
          //   }).then(_ => {
          //     this.uploadResult={
          //       success:0,
          //       fail:0
          //     }
          //     //location.reload();
          //     this.clearTable()
          //     this.uploadSumxx={
          //       failure:''
          //     }
          //   })
          // }else{
          //   const h = this.$createElement;
          //   this.$msgbox({
          //     title: '导入结果统计',
          //     message: h('p', null, [
          //       h('h2',null,'上传失败：'),
          //       h('h3',null,this.uploadSumxx.failure),
          //     ]),
          //     confirmButtonText: '确定'
          //   }).then(_ => {
          //     this.uploadResult={
          //       success:0,
          //       fail:0
          //     }
          //     this.uploadSumxx={
          //       failure:''
          //     }
          //     this.clearTable()
          //   })
          // }
        }
      })
    },
    // 手动移除
    handleRemove(fileList) {
      this.fileList = fileList
    },
    // 数量限制
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 10 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      // this.fileList = []
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.fileList = []
    },
    downloadFile() {
      // templatefile.xlsx存储在public文件夹下
      let a = document.createElement('a')
      a.href = './static/templatefile.xlsx'
      a.download = '信息资产基础信息表(模板).xlsx'
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()
    },
    // 单个文件上传
    handupload(index, row) {
      if (row.uploadStatus === '上传成功') {
        this.$message({
          type: 'warning',
          message: '该文件已上传'
        })
      } else {
        row.uploadStatus = '上传中'
        this.uploadFunc(index, row.data)
      }
    },


    // 上传 table data
    upLoadTableData() {
      if (this.tableData.length !== 0) {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].uploadStatus !== '上传成功' && this.tableData[i].uploadStatus !== '读取失败') {
            this.tableData[i].uploadStatus = '上传中'
            this.uploadFunc(i, this.tableData[i].data)
          }
        }
      } else {
        this.$message({
          type: 'error',
          message: '暂无文件可上传'
        })
      }
    },


    // 查看反馈信息
    checkReplay(index, row) {
      if (this.repalyInfo[index] === undefined) {
        this.$message({
          type: 'error',
          message: '服务器错误，暂无反馈信息'
        })
      } else{
        this.repalyData = analysisReply(this.repalyInfo[index])
        this.backinfoDialog = true
      }
    },
    // 删除
    handleDelete(index) {
      Array.prototype.remove = function(from, to) {
        let rest = this.slice((to || from) + 1 || this.length)
        this.length = from < 0 ? this.length + from : from
        return this.push.apply(this, rest)
      }
      this.tableData.remove(index)
      console.log(this.tableData)
    },
    // 清空列表
    clearTable() {
      this.tableData = []
      this.excelData.equipments = []
      // this.$message({
      //   type:'success',
      //   message:'上传列表已清空'
      // })
      //this.fetchData()
      //location.reload();
      this.uploadResult = {
        success: 0,
        fail: 0
      }
    }
  }
}
</script>

<style lang='less' scoped>
.statusTg {
  font-size: 16px;
}

.tile-content {
  padding: 9px;
  margin-bottom: 20px;
}

.shadows {
  box-shadow: 0 0 4px #0000004d !important;
}

.searchInput {
  height: 40px;
  text-align: center;
  color: #0b0c10;
  background-color: #deecff;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #304156;
}

.bg-purple {
  background: #d3dce6;
}

.bg-condition {
  line-height: 50px;
  text-align: center;
  height: 54px;
  margin: 0px !important;
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.app-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.grid-content {
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
}

.font {
  font-size: 18px;
}

.el-cascader .el-input {
  width: 130px;
}

.el-pagination > * {
  font-size: 18px;
}

.block {
  text-align: center;
}
</style>
<style lang='less'>

.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.myel_row {
  margin-bottom: 2px !important;
  background-color: #d3dce6;
  margin-left: 0px !important;
  margin-right: 0px !important;
}

.radio_class {
  display: inline-block;
  height: 2rem;
  width: 100%;
}

</style>
