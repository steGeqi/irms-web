<template>
  <div>
    <div class="source">
      <el-page-header content="添加部门" @back="back" />
    </div>
    <div class="source">
      <el-row>
        <el-form ref="departmentForm" :model="departmentForm = department" label-width="120px" :inline="false" class="demo-form-inline" :rules="rules">
          <el-form-item label="所属单位" prop="postName">
            <el-col :span="10">
              <el-select v-model="departmentForm.postName" @change="changePost" :popper-append-to-body ="false">
                <el-option
                  v-for="item in postAll"
                  :key="item.value"
                  :value="item.postName"
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="部门名称" prop="departmentName">
            <el-col :span="10">
              <el-input v-model="departmentForm.departmentName" />
            </el-col>
          </el-form-item>
          <el-form-item label="部门代码" prop="departmentCode">
            <el-col :span="10">
              <el-input v-model="departmentForm.departmentCode" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('departmentForm')">添加部门</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { createDepartment, checkDepartmentName, checkDepartmentCode } from '@/api/baseparameter'
import {getPost} from "@/api/select";
import {mapGetters} from "vuex";

export default {
  name: 'addDepartment',
  computed:{
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    const data = {
      role:this.roles[0],
      postid:this.$store.state.user.roleid,
    }
    getPost(data).then(response => {
      console.log(response)
      this.postAll = response.data.items
      this.postAll.forEach(element => {
        if (element.postId === this.roleid) {
          console.log(element.postName)
          this.department.postName = element.postName
          this.department.postId=element.postId
        }
      })
    })
  },
  data() {
    var checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('部门不能为空'))
      } else {
        await this.getNameRules()
        if (!this.nameRules) {
          callback(new Error('部门已存在，请重新输入'))
          // this.department.departmentName = ''
          } else {
          callback()
          }
      }
      callback()
    }
    var checkCode = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('部门代码不能为空'))
      } else {
        await this.getCodeRules()
        if (!this.codeRules) {
          callback(new Error('部门代码已存在，请重新输入'))
          // this.department.departmentCode = ''
          } else {
          callback()
          }
      }
      callback()
    }

    return {
      nameRules: false,
      codeRules: false,
      postRules:false,
      postAll: [],
      department: {
        departmentName: '',
        departmentCode: '',
        postId:'',
        postName:''
      },
      rules: {
        postName: [
          {required:true,message: '请选择单位',trigger:'blur'},
        ],
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: checkName, trigger: 'blur'
          }
        ],
        departmentCode: [
          { required: true, message: '请输入部门代码', trigger: 'blur' },
          {
            validator: checkCode, trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const department = { ...this.department }
          createDepartment(department).then(res => {
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
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 验证用户名是否存在
    async getNameRules() {
      const department = { ...this.department }
      await checkDepartmentName(department).then((res) => {
        if (res.data.valid === true) {
          this.nameRules = true
        } else {
          this.nameRules = false
        }
      })
    },
    async getCodeRules() {
      const department = { ...this.department }
      await checkDepartmentCode(department).then((res) => {
        if (res.data.valid === true) {
          this.codeRules = true
        } else {
          this.codeRules = false
        }
      })
    },
    changePost(val) {
      this.postAll.forEach(element => {
        if (element.postName === val) {
          this.department.postId=element.postId
        }
      })
    },
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
  height: 26px;
}
</style>
