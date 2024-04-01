<template>
  <div class="update_detail">
    <div class="source">
      <el-page-header content="单位信息" @back="back" />
    </div>
    <div class="source">
      <el-row>
        <el-form ref="postForm" :model="postForm = this.post" label-width="120px" :inline="false" class="demo-form-inline" :rules="rules">
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
          <el-form-item v-show="currentShow === '3'">
            <el-button type="primary" @click="onSubmit('postForm')">完成修改</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import { checkPostName, checkPostCode, updatePostAction} from '@/api/baseparameter'

export default {
  name: 'updatePost',
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
      post: {
        postId:'',
        postName:'',
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
  created() {
    //console.log(this.row)
    //console.log(this.currentShow)
    this.initPostData()
  },
  mounted() {
    //console.log(this.currentShow+"---------------------------------")
    const list = document.getElementsByClassName('update_detail')[0]
    const inputDom = list.getElementsByTagName('input')
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
          const post = { ...this.post }
          updatePostAction(post).then(res => {
            this.$alert("修改成功", '提示', {
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
          return false;
        }
      });
    },
    // 验证用户名是否存在
    async getNameRules() {
      const params = {
        postId:this.post.postId,
        postName: this.post.postName,
        action:"update"
      }
      await checkPostName(params).then((res) => {
        if (res.data.valid === true) {
          this.nameRules = true
        } else {
          this.nameRules = false
        }
      })
    },
    async getCodeRules() {
      const params = {
        postId:this.post.postId,
        postCode: this.post.postCode,
        action:"update"
      }
      await checkPostCode(params).then((res) => {
        if (res.data.valid === true) {
          this.codeRules = true
        } else {
          this.codeRules = false
        }
      })
    },
    initPostData(){
      this.post=this.row
    }
  }
}
</script>

<style lang="less" scoped>
.source {
  padding: 24px;
}
</style>
