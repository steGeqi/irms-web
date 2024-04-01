<template>
  <div>
    <div class='source'>
      <el-page-header content='修改用户' @back='back' />
    </div>
    <div class='source'>
      <el-row>
        <el-form ref='user' :model='user' label-width='150px' :inline='false' class='demo-form-inline'
                 :rules='rules'>
          <el-form-item label='用户名称' prop='realname'>
            <el-col :span='10'>
              <el-input v-model='user.realname' />
            </el-col>
          </el-form-item>
          <el-form-item label='登陆账号' prop='username'>
            <el-col :span='10'>
              <el-input v-model='user.username' />
            </el-col>
          </el-form-item>
          <el-form-item label='登录密码' prop='password'>
            <el-col :span='10'>
              <el-input v-model='user.password' show-password />
            </el-col>
          </el-form-item>
          <el-form-item label='角色权限' prop='groupId'>
            <el-select v-model='user.groupId' @change='changeGroupAndPost' placeholder='请选择'>
              <el-option
                v-for='item in groupAll'
                :key='item.name'
                :label='item.name'
                :value='item.id'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='所属单位' prop='postId'>
            <el-select v-model='user.postId' @change='changeGroupAndPost' placeholder='请选择'
                       :popper-append-to-body='false'>
              <el-option
                v-for='item in postAll'
                :key='item.postName'
                :label='item.postName'
                :value='item.postId'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='所属部门' prop='departmentId'>
            <el-select v-model='user.departmentId' placeholder='请选择' :popper-append-to-body='false'>
              <el-option
                v-for='item in departmentAll'
                :key='item.departmentName'
                :label='item.departmentName'
                :value='item.departmentId'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='用户电话' prop='telephone'>
            <el-col :span='10'>
              <el-input v-model='user.telephone' />
            </el-col>
          </el-form-item>
          <el-form-item label='账号状态' prop='status'>
            <el-select v-model='user.status' placeholder='请选择'>
              <el-option
                v-for="item in [
                  { 'label': '激活', 'value': '0' },
                  { 'label': '冻结', 'value': '1' }]"
                :key='item.label'
                :label='item.label'
                :value='item.value'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' @click="onSubmit('user')">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import user from '@/store/modules/user'
import { getPost } from '@/api/select'
import {
  checkRealName,
  checkUserName,
  getDepartmentByGroupIdAndPostName,
  getGroupAll,
  updateFosUserAction
} from '@/api/user'

export default {
  name: 'updateUser',
  props: ['row'],
  data() {
    const checkRealName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户姓名不能为空'))
      } else {
        await this.getNameRule1()
        if (!this.nameRules) {
          callback(new Error('用户姓名已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    }
    const checkUserName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('登陆账号不能为空'))
      } else {
        await this.getNameRule2()
        if (!this.nameRules) {
          callback(new Error('登陆账号已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    }
    return {
      roleId: user.state.roleid,
      postAll: [],
      departmentAll: [],
      groupAll: [],
      user: {
        realname: this.row.realname,
        username: this.row.username,
        password: this.row.password,
        groupId: this.row.groupid,
        postId: this.row.roleid,
        departmentId: this.row.roleDepartmentId,
        telephone: this.row.telephone,
        status: this.row.isdel ==='激活' ? '0' : '1',
        action: 'update'
      },
      rules: {
        realname: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          {
            validator: checkRealName, trigger: 'blur'
          }
        ],
        username: [
          { required: true, message: '请输入登陆账号', trigger: 'blur' },
          {
            validator: checkUserName, trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入登陆密码', tigger: 'blur' }
        ],
        groupId: [
          { required: true, message: '请输入角色', tigger: 'blur' }
        ],
        postId: [
          { required: true, message: '请输入单位', tigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请输入部门', tigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入电话', tigger: 'blur' }
        ],
        status: [
          { required: true, message: '请输入账号状态', tigger: 'blur' }
        ]
      }
    }
  },
  created() {
    getGroupAll().then(res => {
      this.groupAll = res.data.items
    })
    getPost().then(response => {
      this.postAll = response.data.items
    })
    this.init()
  },
  methods: {
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            userId: this.row.id,
            realname: this.user.realname, // 用户姓名
            username: this.user.username, // 登录帐号
            password: this.user.password, //密码
            groupId: this.user.groupId, // 权限对应的id
            postId: this.user.postId, // 单位的id
            departmentId: this.user.departmentId, // 部门
            telephone: this.user.telephone, // 电话
            status: this.user.status, // 帐号状态
            controlid: '' // 暂时为空的字段
          }
          updateFosUserAction(params).then(res => {
            this.$alert('提交成功', '提示', {
              confirmButtonText: '确定',
              type: 'info',
              showClose: false
            }).then(() => {
              this.back()
            })
          }).catch(err => {
            // console.log(err)
          })
        } else {
          return false
        }
      })
    },

    // 初始化
    init() {
      const params = {
        'groupId': this.row.groupid,
        'postId': this.row.roleid
      }
      getDepartmentByGroupIdAndPostName(params).then(res => {
        this.departmentAll = res.data.items
      })
    },


    // 获取部门
    changeGroupAndPost() {
      this.user.departmentId = ''
      const params = {
        'groupId': this.user.groupId,
        'postId': this.user.postId
      }
      getDepartmentByGroupIdAndPostName(params).then(res => {
        this.departmentAll = res.data.items
      })
    },

    //  验证添加的用户姓名是否存在
    async getNameRule1() {
      const user = {
        userId: this.row.id,
        realname: this.user.realname,
        action: this.user.action
      }
      await checkRealName(user).then((res) => {
        this.nameRules = res.data.valid === true
      })
    },

    //  验证添加的登陆账号是否存在
    async getNameRule2() {
      const user = {
        userId: this.row.id,
        userName: this.user.username,
        action: this.user.action
      }
      await checkUserName(user).then((res) => {
        this.nameRules = res.data.valid === true
      })
    }

  }
}
</script>


<style lang='less' scoped>
.source {
  padding: 24px;
}
.el-select-dropdown__item {
  height: 30px;
  flex: 1 0 14%;
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
  max-height: 100vh!important;
}

</style>
