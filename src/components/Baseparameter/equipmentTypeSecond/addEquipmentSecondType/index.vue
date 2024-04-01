<template>
  <div>
    <div class="source">
      <el-page-header content="添加二级设备类型" @back="back" />
    </div>
    <div class="source">
      <el-row>
        <el-form ref="addEquipmentSecondTypeForm" :model="addEquipmentSecondTypeForm = equipmentSecondType" label-width="150px" :inline="false" class="demo-form-inline" :rules="rules">
          <el-form-item label="二级设备类型名称" prop="equipmentSecondTypeName">
            <el-col :span="10">
              <el-input v-model="addEquipmentSecondTypeForm.equipmentSecondTypeName" />
            </el-col>
          </el-form-item>
          <el-form-item label="二级设备类型代码" prop="equipmentSecondTypeCode">
            <el-col :span="10">
              <el-input v-model="addEquipmentSecondTypeForm.equipmentSecondTypeCode" />
            </el-col>
          </el-form-item>
          <el-form-item label="所属一级设备类型" prop="equipmentFirstTypeId">
            <el-select v-model="addEquipmentSecondTypeForm.equipmentFirstTypeId" placeholder="请选择">
              <el-option
                v-for="item in equipmentFirst"
                :key="item.equipmentFirstTypeCode"
                :label="item.equipmentFirstTypeName"
                :value="item.equipmentFirstTypeId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('addEquipmentSecondTypeForm')">提交添加</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import {addEquipmentSecondType, checkEquipmentTypeSecondName, getEquipmentFirstTypeByPage,} from "@/api/baseparameter";

export default {
  name:'addEquipmentSecondType',
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
      equipmentSecondType: {
        equipmentSecondTypeName: '',
        equipmentSecondTypeCode: '',
        equipmentFirstTypeId: '',
      },
      equipmentFirst:[],
      currentPage: 0,


      rules: {
        equipmentSecondTypeName: [
          {required:true,message: '请输入二级设备类型名称',trigger:'blur'},
          {
            validator: checkName, trigger: 'blur'
          }
        ],
        equipmentSecondTypeCode: [
          { required: true, message: '请输入二级设备类型代码', trigger: 'blur' },
        ],
        equipmentFirstTypeId: [
          { required: true, message: '请选择所属一级设备类型', trigger: 'blur' }
        ]
      }
    }
  },
  created() {

  },
  mounted() {
    const params = {
      dataName: ['111'],
      dataValue: "",
      start: this.currentPage,
      limit: 100
    }
    getEquipmentFirstTypeByPage(params).then((response) => {
      this.equipmentFirst = response.data.items
    })
  },
  methods:{
    back() {
      this.$emit('changeDiv', '0')
    },

    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const equipmentSecondType = { ...this.equipmentSecondType }
          addEquipmentSecondType(equipmentSecondType).then(res => {
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
      const equipmentSecondType = { ...this.equipmentSecondType }
      await checkEquipmentTypeSecondName(equipmentSecondType).then((res) => {
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

