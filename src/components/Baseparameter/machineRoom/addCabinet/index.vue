<template>
  <div>
    <div class="source">
      <el-page-header content='添加机柜' @back='back'/>
    </div>
    <div>
      <el-row>
        <el-form ref='machineRoomFrom' :model='machineRoomFrom ' label-width='140px' :rules='rules' :inline='false'>
          <el-form-item label="所属单位" prop="postName">
            <el-col :span="10">
              <el-select v-model="machineRoomFrom.postName" @change="changePost" :popper-append-to-body ="false" :disabled="true">
                <el-option
                  v-for="item in postAll"
                  :key="item.value"
                  :value="item.postName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="所属机房" prop="machineRoomName">
            <el-col :span="10">
              <el-select @change='changeMachineRoom' v-model="machineRoomFrom.machineRoomName" placeholder="请选择" :popper-append-to-body ="false">
                <el-option
                  v-for="item in machineRoomAll"
                  :key="item.value"
                  :value="item.machineRoomName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label='机柜名称' prop='cabinetName'>
            <el-col :span="10">
              <el-input v-model='machineRoomFrom.cabinetName'/>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click="onSubmit('machineRoomFrom')">添加机柜</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import {getPost, getMachineRoom} from "@/api/select";
import {
  createCabinet,
  checkCabinetName,
} from '@/api/baseparameter'
import user from "@/store/modules/user";

export default {
  name: "addCabinet",
  components: {},
  data() {
    const checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('机柜不能为空'))
      } else {
        await this.getNameRules()
        if (!this.nameRules) {
          callback(new Error('机柜已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    }
    return {
      roleid: user.state.roleid,
      nameRules: false,
      postAll: [],
      machineRoomAll: [],
      machineRoomFrom: {
        postName: '',
        cabinetId: '',
        machineNameId: '',
        cabinetName: '',
      },
      rules: {
        cabinetName: [
          {required: true, message: '请输入机柜名称', trigger: 'blur'},
          {
            validator: checkName, trigger: 'blur'
          }
        ],
        machineName: [
          {required: true, message: '请选择机房', trigger: 'blur'},
        ],
        postName: [
          {required: true, message: '请选择单位', trigger: 'blur'},
        ],
      }
    }
  },
  created() {
    getPost().then(response => {
      // console.log(response)
      this.postAll = response.data.items
      this.postAll.forEach(element => {
        if (element.postId === this.roleid) {
          this.machineRoomFrom.postName = element.postName
        }
      })
    })
    getMachineRoom(this.roleid).then(response => {
      console.log("00000000000000", response)
      this.machineRoomAll = response.data.items
      this.machineRoomFrom.machineName = this.machineRoomAll[0].machineName
      this.machineRoomFrom.machineRoomId = this.machineRoomAll[0].machineRoomId
    })
  },

  methods: {
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const machineRoomFrom = {...this.machineRoomFrom}
          console.log("88888888888888888", machineRoomFrom)
          createCabinet(machineRoomFrom).then(res => {
            this.$alert("提交成功", '提示', {
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
    changePost(val) {
      this.postAll.forEach(element => {
        if (element.postName == val) {
          getMachineRoom(element.postId).then(response => {
            this.machineRoomAll = response.data.items
            this.machineRoomFrom.machineName = this.machineRoomAll[0].machineName
          })
        }
      })
    },
    changeMachineRoom(val) {
      console.log("选择的机房名称：",val)
      this.machineRoomAll.forEach(element => {
        if (element.machineRoomName == val) {
          this.machineRoomFrom.machineRoomId=element.machineRoomId
        }
      })
    },
    // 验证添加机柜是否存在
    async getNameRules() {
      const machineRoomFrom = {...this.machineRoomFrom}
      await checkCabinetName(machineRoomFrom).then((res) => {
        if (res.data.valid === true) {
          this.nameRules = true
        } else {
          this.nameRules = false
        }
      })
    }
  }
}

</script>

<style lang="less" scoped>
.source {
  padding: 24px;
}
.el-select-dropdown__item {
  flex: 1 0 15%;
  margin: 10px;
}
/deep/.el-select-dropdown__list {
  margin: 5px 20px 20px 5px!important;
  height: auto!important;
  width: 1400px!important;
  display: flex!important;
  justify-content: space-between!important;
  flex-direction: row!important;
  flex-wrap: wrap!important;
  align-content: flex-start!important;
  align-items: stretch!important;
  max-height: 67vh!important;
  overflow-y: auto;
}
/deep/.el-select-dropdown__item{
  height: 25px;
}

/deep/ .el-popper{
  top: 40px !important;
}
</style>
