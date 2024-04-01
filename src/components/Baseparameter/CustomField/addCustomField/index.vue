<template>
  <div>
    <div class="source">
      <el-page-header content="添加字段" @back="back" />
    </div>
    <div class="source">
      <el-row>
        <el-form ref="fieldForm" :model="fieldForm = field" label-width="auto" :inline="false" class="demo-form-inline" :rules="rules">
          <el-form-item label="字段名称(数据库标识)" prop="fieldName">
            <el-col :span="10">
              <el-input v-model="fieldForm.fieldName" />
            </el-col>
          </el-form-item>
          <el-form-item label="字段标签（页面显示文字）" prop="fieldLabel">
            <el-col :span="10">
              <el-input v-model="fieldForm.fieldLabel" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('fieldForm')">添加字段</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { checkFieldLabel, checkFieldName, createCustomField } from '@/api/baseparameter'

export default {
  name: 'addField',
  data() {
    let checkName =async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('字段名称不能为空'))
      } else {
        await this.getNameRules()
        if (!this.nameRules) {
          callback(new Error('字段已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    }
    let checkCode =async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('字段不能为空'))
      } else {
        await this.getLabelRules()
        if (!this.codeRules) {
          callback(new Error('字段标签已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    }
    return {
      nameRules: false,
      codeRules: false,
      nameRulesMessage:'',
      codeRulesMessage:'',
      field: {
        fieldName: '',
        fieldLabel: ''
      },
      rules: {
        fieldName: [
          { required: true, message: '请输入字段名称', trigger: 'blur' },
          {
            validator: checkName, trigger: 'blur'
          }
        ],
        fieldLabel: [
          { required: true, message: '请输入字段标签', trigger: 'blur' },
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
          const field = { ...this.field }
          createCustomField(field).then(res => {
            this.$alert("提交成功", '提示', {
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
          return false;
        }
      });
    },
    // 验证字段名是否存在
    async getNameRules() {
      const params = {
        fieldId:'',
        fieldName: this.field.fieldName,
        action:"add"
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
        fieldId:'',
        fieldLabel: this.field.fieldLabel,
        action:"add"
      }
      await checkFieldLabel(params).then((res) => {
        if (res.data.valid === true) {
          this.codeRules = true
        } else {
          this.codeRules = false
          this.codeRulesMessage = res.data.message
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
</style>
