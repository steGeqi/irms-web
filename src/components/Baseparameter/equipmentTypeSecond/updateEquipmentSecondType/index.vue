<template>
  <div>
    <div class="source">
      <el-page-header content="修改二级设备类型" @back="back" />
    </div>
    <div class="source">
      <el-row>
        <el-form ref="updateEquipmentSecondTypeForm" :model="updateEquipmentSecondTypeForm = equipmentSecondType" label-width="150px" :inline="false" class="demo-form-inline" :rules="rules">
          <el-form-item label="二级设备类型名称" prop="equipmentSecondTypeName">
            <el-col :span="10">
              <el-input v-model="updateEquipmentSecondTypeForm.equipmentSecondTypeName" />
            </el-col>
          </el-form-item>
          <el-form-item label="二级设备类型代码" prop="equipmentSecondTypeCode">
            <el-col :span="10">
              <el-input v-model="updateEquipmentSecondTypeForm.equipmentSecondTypeCode" />
            </el-col>
          </el-form-item>
          <el-form-item label="所属一级设备类型" prop="equipmentFirstTypeId">
            <el-select v-model="updateEquipmentSecondTypeForm.equipmentFirstTypeId" placeholder="请选择">
              <el-option
                v-for="item in equipmentFirst"
                :key="item.equipmentFirstTypeCode"
                :label="item.equipmentFirstTypeName"
                :value="item.equipmentFirstTypeId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('updateEquipmentSecondTypeForm')">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  checkEquipmentTypeSecondName, getEquipmentFirstTypeByPage,
  updateEquipmentSecondType,
} from "@/api/baseparameter";

export default {
  name:'updateEquipmentSecondType',
  props: ['row'],
  data(){
    const checkName = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error('设备类型名称不能为空'))
      } else {
        callback()
      }
    };
    return{
      equipmentSecondType: {
        equipmentSecondTypeName: this.row.equipmentTypeName,
        equipmentSecondTypeCode: this.row.equipmentTypeCode,
        equipmentSecondTypeId:this.row.equipmentTypeId,
        equipmentFirstTypeId:this.row.equipmentFirstTypeId
      },
      equipmentFirst:[],
      currentPage: 0,

      rules: {
        equipmentSecondTypeName: [
          {required:true,message: '请输入二级设备类型',trigger:'blur'},
          {
            validator: checkName, trigger: 'blur'
          }
        ],
        equipmentSecondTypeCode: [
          { required: true, message: '请输入二级设备类型代码', trigger: 'blur' }
        ],
        equipmentFirstTypeId: [
          {required: true, message: '请选择所属一级设备类型',trigger: 'blur'}
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
          updateEquipmentSecondType(equipmentSecondType).then(res => {
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
          console.log('error submit!!');
          return false;
        }
      });
    },
    /*async getNameRules() {
      const equipmentSecondType = { ...this.equipmentSecondType }
      await checkEquipmentTypeSecondName(equipmentSecondType).then((res) => {
        if (res.data.valid === true) {
          this.nameRules = true
        } else {
          this.nameRules = false
        }
      })
    },*/
  }
}
</script>

<style>
.source {
  padding: 24px;
}
</style>
