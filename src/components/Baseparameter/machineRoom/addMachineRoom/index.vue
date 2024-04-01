<template>
  <div>
    <div class="source">
      <el-page-header content='添加机房' @back='back'/>
    </div>
    <div>
      <el-row>
        <el-form ref='machineRoomFrom' :model='machineRoomFrom = this.machineRoom' label-width='140px' :rules='rules' :inline='false'>
          <el-form-item label='机房名称' prop='machineRoomName'>
            <el-col :span="10">
              <el-input v-model='machineRoomFrom.machineRoomName'/>
            </el-col>
          </el-form-item>
          <el-form-item label='所属单位' prop='postName'>
            <el-col>
              <el-select v-model='machineRoomFrom.postName' @change='changePost' :popper-append-to-body ="false">
                <el-option
                  v-for='item in postAll'
                  :key='item.value'
                  :value='item.postName'
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label='机房管理员' prop='machineAdministrator'>
            <el-col :span="10">
              <el-input v-model='machineRoomFrom.machineAdministrator'/>
            </el-col>
          </el-form-item>
          <el-form-item label='机房面积' prop='machineArea'>
            <el-col :span="10">
              <el-input v-model='machineRoomFrom.machineArea'/>
            </el-col>
          </el-form-item>
          <el-form-item label='机房位置' prop='machineLocation'>
            <el-col :span="10">
              <el-input v-model='machineRoomFrom.machineLocation'/>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click="onSubmit('machineRoomFrom')">添加机房</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getPost } from "@/api/select";
import { addMachineRoom, checkMachineRoomName} from '@/api/baseparameter'

export default {
  name: "addMachineRoom",
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
    getPost().then(response => {
      console.log(response)
      this.postAll = response.data.items
      console.log(this.postAll, 2)
    })
  },
  data() {
    var checkName = async (rule, value, callback) => {
      if(!value) {
        return callback(new Error('机房不能为空'))
      } else {
        await this.getNameRules()
        if (!this.nameRules) {
          callback(new Error('机房已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    }
    return {
      nameRules: false,
      postAll: [],
      machineRoom: {
        machineRoomName:"",
        machineRoomId:"",
        postId: "",
        status: "",
        machineArea:'',
        machineLocation:'',
        machineAdministrator:'',
      },
      rules: {
        machineRoomName: [
          {required: true, message: '请输入机房名称', trigger: 'blur'},
          {
            validator : checkName, trigger: 'blur'
          }
        ],
        postName: [
          {required:true,message: '请选择单位',trigger:'blur'},
        ],
        machineAdministrator: [
          {required: true, message: '请输入机房管理员', trigger: 'blur'}
        ],
        machineArea: [
          {required: true, message: '请输入机房面积', trigger: 'blur'}
        ],
        machineLocation: [
          {required: true, message: '请选择机房位置', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const machineRoom = {...this.machineRoom }
          addMachineRoom(machineRoom).then(res => {
            this.$alert("提交成功",'提示', {
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
          this.machineRoom.postId=element.postId
        }
      })
    },
    async getNameRules() {
      const machineRoom = {...this.machineRoom}
      await checkMachineRoomName(machineRoom).then((res) => {
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
/deep/.el-select-dropdown__list{
  width: 750px;
}
/deep/.el-select-dropdown__item{
  height: 25px;
}
</style>
