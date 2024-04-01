<template>
  <div>
    <div class="source">
      <el-page-header content="添加一级设备类型" @back="back" />
    </div>
    <div class="source">
      <el-row>
        <el-form ref="addEquipmentFirstTypeForm" :model="addEquipmentFirstTypeForm = equipmentFirstType" label-width="150px" :inline="false" class="demo-form-inline" :rules="rules">
          <el-form-item label="一级设备类型名称" prop="equipmentFirstTypeName">
            <el-col :span="10">
              <el-input v-model="addEquipmentFirstTypeForm.equipmentFirstTypeName" />
            </el-col>
          </el-form-item>
          <el-form-item label="一级设备类型代码" prop="equipmentFirstTypeCode">
            <el-col :span="10">
              <el-input v-model="addEquipmentFirstTypeForm.equipmentFirstTypeCode" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('addEquipmentFirstTypeForm')">提交添加</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import {addEquipmentFirstType, checkEquipmentTypeFirstName,} from "@/api/baseparameter";

export default {
  name:'addEquipmentFirstType',
  data(){
    var checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('设备类型名称不能为空'))
      } else {
        await this.getNameRules()
        if (!this.nameRules) {
          callback(new Error('设备已存在，请重新输入'))
        } else {
          callback()
        }
      }
      callback()
    }
    return{
      equipmentFirstType: {
        equipmentFirstTypeName: '',
        equipmentFirstTypeCode: '',
      },

      rules: {
        equipmentFirstTypeName: [
          {required:true,message: '请输入一级设备类型',trigger:'blur'},
          {
            validator: checkName, trigger: 'blur'
          }
        ],
        equipmentFirstTypeCode: [
          { required: true, message: '请输入一级设备类型代码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods:{
    back() {
      this.$emit('changeDiv', '0')
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const equipmentFirstType = { ...this.equipmentFirstType }
          addEquipmentFirstType(equipmentFirstType).then(res => {
            this.$alert("添加成功", '提示', {
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
    async getNameRules() {
      const equipmentFirstType = { ...this.equipmentFirstType }
      await checkEquipmentTypeFirstName(equipmentFirstType).then((res) => {
        if (res.data.valid === true) {
          this.nameRules = true
        } else {
          this.nameRules = false
        }
      })
    },
  }
}
</script>

<style>
.source {
  padding: 24px;
}
</style>
