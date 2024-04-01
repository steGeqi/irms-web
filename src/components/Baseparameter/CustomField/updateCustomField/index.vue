<template>
  <div class='update_detail'>
    <div class='source'>
      <el-page-header content='字段信息' @back='back' />
    </div>
    <div class='source'>
      <el-row>
        <el-form ref='fieldForm' :model='fieldForm = this.field' label-width='auto' :inline='false'
                 class='demo-form-inline' :rules='rules'>
          <el-form-item label='字段名称（数据库标识）' prop='fieldName'>
            <el-col :span='10'>
              <el-input :disabled='true' v-model='fieldForm.fieldName' ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label='字段标签(页面显示文字)' prop='fieldLabel'>
            <el-col :span='10'>
              <el-input v-model='fieldForm.fieldLabel' />
            </el-col>
          </el-form-item>
          <el-form-item v-show="currentShow === '3'">
            <el-button type='primary' @click="onSubmit('fieldForm')">完成修改</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { checkFieldName, checkFieldLabel, updateCustomField } from '@/api/baseparameter'

export default {
  name: 'updateCustomField',
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
  data() {
    var checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('单位不能为空'))
      } else {
        await this.getNameRules()
        if (!this.nameRules) {
          callback(new Error('单位已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    }
    var checkLabel = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('单位代码不能为空'))
      } else {
        await this.getLabelRules()
        if (!this.labelRules) {
          callback(new Error('单位代码已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    }
    return {
      nameRules: false,
      labelRules: false,
      field: {
        id: '',
        fieldName: '',
        fieldLabel: ''
      },
      rules: {
        fieldName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
          {
            validator: checkName, trigger: 'blur'
          }
        ],
        fieldLabel: [
          { required: true, message: '请输入单位代码', trigger: 'blur' },
          {
            validator: checkLabel, trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.initFieldData()
  },
  mounted() {
    //console.log(this.currentShow+"---------------------------------")
    const list = document.getElementsByClassName('update_detail')[0]
    const inputDom = list.getElementsByTagName('input')
    //详情则不可编辑
    if (this.currentShow === '2') {
      inputDom.forEach(e => {
        const parentNode = e.parentNode
        e.disabled = true
        parentNode.classList.add('is-disabled')
      })
    } else {
      inputDom.forEach(e => {
        const parentNode = e.parentNode
        e.disabled = false
        parentNode.classList.remove('is-disabled')
      })
    }
  },
  methods: {
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const field = { ...this.field }
          updateCustomField(field).then(res => {
            this.$alert('修改成功', '提示', {
              confirmButtonText: '确定',
              type: 'info',
              showClose: false
            }).then(() => {
              this.back()
            })
          }).catch(err => {
            //console.log(err)
          })
        } else {
          //console.log('error submit!!');
          return false
        }
      })
    },
    // 验证用户名是否存在
    async getNameRules() {
      const params = {
        id: this.field.id,
        fieldName: this.field.fieldName,
        action: 'update'
      }
      await checkFieldName(params).then((res) => {
        if (res.data.valid === true) {
          this.nameRules = true
        } else {
          this.nameRules = false
          this.nameRulesMessage = res.data.message
        }
      })
    },
    async getLabelRules() {
      const params = {
        id: this.field.id,
        fieldLabel: this.field.fieldLabel,
        action: 'update'
      }
      await checkFieldLabel(params).then((res) => {
        if (res.data.valid === true) {
          this.labelRules = true
        } else {
          this.labelRules = false
          this.labelRulesMessage = res.data.message
        }
      })
    },
    initFieldData() {
      this.field = this.row
    }
  }
}
</script>

<style lang='less' scoped>
.source {
  padding: 24px;
}
</style>
