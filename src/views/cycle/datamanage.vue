<template>
  <div>
    <DataManage></DataManage>
  </div>
</template>
<script>
import DataManage from '@/views/inforesources/datamanage.vue'
export default {
    components: {
      'DataManage': DataManage  //将别名demo 变成 组件 Demo
    }
  }
</script>
