<template>
  <div class="view-full-screen" v-if="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ViewFullScreen',
  props: {
    isActive: Boolean
  }
}
</script>

<style scoped>
.view-full-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white; /* 设置全屏时的背景色 */
  z-index: 1200;
}
</style>
