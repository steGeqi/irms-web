<template>
  <div>
    <div class="source">
      <el-page-header content="添加单位" @back="back" />
    </div>
    <div class="source">
      <el-row>
        <el-form ref="postForm" :model="postForm = post" label-width="120px" :inline="false" class="demo-form-inline" :rules="rules">
          <el-form-item label="单位名称" prop="postName">
            <el-col :span="10">
              <el-input v-model="postForm.postName" />
            </el-col>
          </el-form-item>
          <el-form-item label="单位代码" prop="postCode">
            <el-col :span="10">
              <el-input v-model="postForm.postCode" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('postForm')">添加单位</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { createPost, checkPostName, checkPostCode } from '@/api/baseparameter'

export default {
  name: 'addPost',
  data() {
    var checkName =async (rule, value, callback) => {
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
    var checkCode =async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('单位代码不能为空'))
      } else {
        await this.getCodeRules()
        if (!this.codeRules) {
          callback(new Error('单位代码已存在，请重新输入'))
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
      post: {
        postName: '',
        postCode: ''
      },
      rules: {
        postName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
          {
            validator: checkName, trigger: 'blur'
          }
        ],
        postCode: [
          { required: true, message: '请输入单位代码', trigger: 'blur' },
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
          const post = { ...this.post }
          createPost(post).then(res => {
            this.$alert("提交成功", '提示', {
              confirmButtonText: '确定',
              type: 'info',
              showClose: false
            }).then(() => {
              this.back()
            })
            //console.log(res)
          }).catch(err => {
            //console.log(err)
          })
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    // 验证用户名是否存在
    async getNameRules() {
      const params = {
        postId:'',
        postName: this.post.postName,
        action:"add"
      }
      await checkPostName(params).then((res) => {
        if (res.data.valid === true) {
          this.nameRules = true
        } else {
          this.nameRules = false
          this.nameRulesMessage = res.data.message
        }
      })
    },
    async getCodeRules() {
      const params = {
        postId:'',
        postCode: this.post.postCode,
        action:"add"
      }
      await checkPostCode(params).then((res) => {
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
