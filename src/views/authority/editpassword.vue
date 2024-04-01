<template>
<div>
  <el-container>
    <el-header style="height: 40px"><i class="el-icon-s-home" style="margin-right: 10px" ></i >修改密码</el-header>
    <el-main>
      <div class="editpass-container">
        <div class="modiflypassword-top-side"><i class="el-icon-lock" style="margin-right: 20px; margin-left:20px"></i>修改密码</div>
        <div class="modiflypassword-container">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="输入旧密码" prop="oldPassWord">
              <el-input type="password" v-model="ruleForm.oldPassWord" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="输入新密码" prop="newPassword">
              <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="再次输入新密码" prop="confirmPassword">
              <el-input type="password" v-model="ruleForm.confirmPassword" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
              <el-button @click="resetForm('ruleForm')">清空</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
  </el-container>

</div>
</template>

<script>
import resetPassword from "@/api/resetPassword";

export default {
  // name: "个人信息管理",
  name:'editpassword',
  data() {
    //校验原密码是否正确
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback();
      } else {
        const parmas={oldPassword:value}
        //--------------------------校验原密码-------------------------------------
        resetPassword.checkOldPassword(parmas).then((res)=>{
          if (res.data.valid ===true){
            callback()
          }else {
            if(res.data.valid === false){
              callback(new Error('原密码错误'))
              //console.log(res.data.valid,"原密码错误")
            }else {
              callback(new Error(res.data.message));
            }
            callback()
          }
        })
        //------------------------------------------------------------------------
      }
    };


    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback();
      }  else {
        if(value === this.ruleForm.oldPassWord){
          callback(new Error('新旧密码不能一样'))
        }else {
          callback();
        }
        callback();
      }
    };
    const checkNewPassword = (rule, value, callback) => {
      if(value === ''){
        callback();
      }else {
        if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        }else {
          callback();
        }
        callback()
      }
    };
    return {
      ruleForm: {
        oldPassWord: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassWord: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: checkNewPassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //----------------------------更新密码----------------------
          alert('验证通过,可以提交修改密码了!');
          const parmas={oldPassword:this.ruleForm.oldPassWord,newPassword:this.ruleForm.newPassword,newPassword1:this.ruleForm.confirmPassword}
          resetPassword.updatePassword(parmas).then((res)=>{
            if (res.data.success) {
              alert("修改密码成功!")
            }else {
              alert("验证不通过");
              return false;
            }

          })

          //--------------------------------------------------------------
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.modiflypassword-container {
  width: 1000px;
  margin-left: 100px;
  height: 250px;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 40px;
  border-radius: 4px;
}
.modiflypassword-top-side {
  height: 40px;
  border-radius: 4px;
  line-height: 40px;
  color: #FFFFff;
  background-color: #304156;
  margin-bottom: 20px;
}
.editpass-container {
  box-shadow: 0px 0px 5px #000;
  border-radius: 4px;
}
</style>












































<!--<template>-->
<!--  <div>-->
<!--    <el-container>-->
<!--      <el-header style="height: 40px"><i class="el-icon-s-home" style="margin-right: 10px" ></i >修改密码</el-header>-->
<!--      <el-main>-->
<!--        <div class="editpass-container">-->
<!--          <div class="modiflypassword-top-side"><i class="el-icon-lock" style="margin-right: 20px; margin-left:20px"></i>修改密码</div>-->
<!--          <div class="modiflypassword-container">-->
<!--            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">-->
<!--              <el-form-item label="输入旧密码" prop="oldPassWord">-->
<!--                <el-input type="password" v-model="ruleForm.oldPassWord" autocomplete="off" show-password></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="输入新密码" prop="newPassword">-->
<!--                <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off" show-password></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="再次输入新密码" prop="confirmPassword">-->
<!--                <el-input type="password" v-model="ruleForm.confirmPassword" autocomplete="off" show-password></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item>-->
<!--                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>-->
<!--                <el-button @click="resetForm('ruleForm')">重置</el-button>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-main>-->
<!--    </el-container>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import pwd from "@/api/editpassword";-->

<!--export default {-->
<!--  // name: "个人信息管理",-->
<!--  name:'editpassword',-->
<!--  data() {-->
<!--    const validatePass = (rule, value, callback) => {-->
<!--      if (value === '') {-->
<!--        callback();-->
<!--      } else {-->
<!--        // if(value !== 旧密码){-->
<!--        //   callback(new Error('原密码错误,请重新输入'))-->
<!--        // }else {-->
<!--        //   callback()-->
<!--        // }-->
<!--        callback();-->
<!--      }-->
<!--    };-->


<!--    const validatePass2 = (rule, value, callback) => {-->
<!--      if (value === '') {-->
<!--        callback();-->
<!--      }  else {-->
<!--        if(value === this.ruleForm.oldPassWord){-->
<!--          callback(new Error('新旧密码不能一样'))-->
<!--        }else {-->
<!--          callback();-->
<!--        }-->
<!--        callback();-->
<!--      }-->
<!--    };-->
<!--    const checkNewPassword = (rule, value, callback) => {-->
<!--      if(value === ''){-->
<!--        callback();-->
<!--      }else {-->
<!--        if (value !== this.ruleForm.newPassword) {-->
<!--          callback(new Error('两次输入密码不一致!'));-->
<!--        }else {-->
<!--          callback();-->
<!--        }-->
<!--        callback()-->
<!--      }-->
<!--    };-->
<!--    return {-->
<!--      ruleForm: {-->
<!--        oldPassWord: '',-->
<!--        newPassword: '',-->
<!--        confirmPassword: ''-->
<!--      },-->
<!--      rules: {-->
<!--        oldPassWord: [-->
<!--          { validator: validatePass, trigger: 'blur' }-->
<!--        ],-->
<!--        newPassword: [-->
<!--          { validator: validatePass2, trigger: 'blur' }-->
<!--        ],-->
<!--        confirmPassword: [-->
<!--          { validator: checkNewPassword, trigger: 'blur' }-->
<!--        ]-->
<!--      }-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    submitForm(formName) {-->
<!--      this.$refs[formName].validate((valid) => {-->
<!--        if (valid) {-->
<!--          alert('submit!');-->
<!--          //使用post请求发送更新修改密码-->
<!--        } else {-->
<!--          //console.log('error submit!!');-->
<!--          return false;-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--    resetForm(formName) {-->
<!--      this.$refs[formName].resetFields();-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--.modiflypassword-container {-->
<!--  width: 1000px;-->
<!--  margin-left: 100px;-->
<!--  height: 250px;-->
<!--}-->
<!--.el-header {-->
<!--  background-color: #B3C0D1;-->
<!--  color: #333;-->
<!--  line-height: 40px;-->
<!--  border-radius: 4px;-->
<!--}-->
<!--.modiflypassword-top-side {-->
<!--  height: 40px;-->
<!--  border-radius: 4px;-->
<!--  line-height: 40px;-->
<!--  color: #FFFFff;-->
<!--  background-color: #304156;-->
<!--  margin-bottom: 20px;-->
<!--}-->
<!--.editpass-container {-->
<!--  box-shadow: 0px 0px 5px #000;-->
<!--  border-radius: 4px;-->
<!--}-->
<!--</style>-->
