<template>
  <div class='addFirstLevelBusinessSystem-panel'>
    <div class='add-business-system'>
      <el-page-header content='添加业务系统' @back='back' />
    </div>
    <div class='add-business-system'>
      <el-row>
        <el-form ref='addInformation' :model='addInformation' label-width='140px' :inline='false' :rules='rules'>
          <el-form-item label='所属单位' prop='postName'>
            <el-col :span='10'>
              <el-select v-model='addInformation.postName' :popper-append-to-body='false'>
                <!--:popper-append-to-body ="false"使此元素可以跳出全局样式另外设置-->
                <el-option
                  v-for='item in postAll'
                  :key="item.value"
                  :value='item.postName'
                />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label='业务系统名称' prop='businessSystemFirstName'>
            <el-col :span='10'>
              <el-input v-model='addInformation.businessSystemFirstName' />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click="onSubmit('addInformation')">添加业务系统</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { checkFirstLevelBusinessSystemName, createFirstLevelBusinessSystem } from '@/api/baseparameter'
import { getPost } from '@/api/select'

export default {
  name: 'addFirstLevelBusinessSystem',
  data() {
    const checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('业务系统不能为空'))
      } else {
        await this.getNameRules()
        if (!this.nameRules) {
          callback(new Error('该业务系统已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    }
    return {
      roleId: this.$store.state.user.roleid,
      roleName: this.$store.state.user.role_name,
      postAll: [],
      addInformation: {
        businessSystemFirstName: '',
        postName: ''
      },
      rules: {
        postName: [
          { required: true, message: '请选择所属单位', trigger: 'blur' }
        ],
        businessSystemFirstName: [
          { required: true, message: '请输入业务系统名称', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    getPost().then(response => {
      this.postAll = response.data.items
      this.postAll.forEach(element => {
        if (element.postId === this.roleid) {
          this.addInformation.postName = element.postName
        }
      })
    })
  },
  methods: {
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addInformation.postId = this.roleId
          const params = this.addInformation
          console.log('-----', params)
          createFirstLevelBusinessSystem(params).then(res => {
            console.log('--------------------', res)
            this.$alert('提交成功', '提示', {
              confirmButtonText: '确定',
              type: 'info',
              showClose: false
            }).then(() => {
              this.back()
            })
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },

    // 验证添加的业务系统是否存在
    async getNameRules() {
      const params = this.addInformation
      await checkFirstLevelBusinessSystemName(params).then((res) => {
        console.log(res)
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

<style lang='less' scoped>
.add-business-system {
  padding: 24px;
}

//覆盖全局样式代码
/deep/ .el-select-dropdown__list {
  width: 750px;
}

/deep/ .el-select-dropdown__item {
  height: 26px;
}
</style>
