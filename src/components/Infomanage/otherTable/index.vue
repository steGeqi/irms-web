<template>
  <div class='shadows'>
    <div class='shadows paddingLeft'>
      <slot />
    </div>
    <div class='content'>
      <div v-if="hh !== '2'">
        <el-button @click='addLine'>新增行</el-button>
        <el-button v-show='form.length !== 1 && form.length !== ch' @click='delLine'>删除行</el-button>
      </div>
      <div class='table'>
        <el-table
          :data='form'
          border
          highlight-current-row
          stripe
        >
          <af-table-column v-for='(value,key,index) in lable' :key='index' align='center' :label='value'>
            <template slot-scope='scope'>
              <el-input v-model='scope.row[key]' :disabled="hh==='2'" @input='checkData(scope.row)' />
            </template>
          </af-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { validateIP, validateMAC } from '@/api/validate'

export default {
  props: {
    hh: {
      type: String,
      default() {
        return '0'
      },
      required: false
    },
    ch: {
      type: Number,
      default() {
        return 0
      },
      required: false
    },
    form: {
      type: Array,
      required: true
    },
    lable: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      validationTimeout: 0,
    }
  },
  methods: {

    async checkData(row) {

      clearTimeout(this.timerId)

      this.timerId = setTimeout(async () => {
        const checkSwitch = validateMAC(row.macAddress)
        const checkIp = validateIP(row.ipAddress)
        if (!checkIp) {
          await this.$message({ message: 'IP地址填写错误', type: 'error' })
        }
        if (!checkSwitch) {
          await this.$message({ message: 'MAC地址填写错误', type: 'error' })
        }
        if (!checkIp || !checkSwitch) {
          this.$emit('IpOrMacWrong', 'wrong')
        } else {
          this.$emit('IpOrMacWrong', 'success')
        }
        this.timerId = 0
      }, 800)


    },
    addLine() {
      console.log(this.ch)
      const obj = this.form[0]
      const newObj = {}
      for (const key in obj) {
        newObj[key] = ''
      }
      this.form.push(newObj)
    },
    delLine() {
      this.form.pop()
    }
  }
}
</script>

<style scoped>
.shadows {
  box-shadow: 0 0 4px #0000004d !important;
  margin-top: 35px;
}

.paddingLeft {
  padding-left: 10px;
}

.label-style {
  text-align: center;
  border-right: 1px solid #c7c3c3b8;
  border-top: 1px solid #c7c3c3b8;
}

.content {
  padding: 10px;
}

.table {
  border: 1px solid #c7c3c3b8;
  margin-top: 10px;
}

.active {
  border-color: red;
}
</style>
