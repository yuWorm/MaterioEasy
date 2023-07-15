<template>
  <div class="page-progress" v-show="lodding">
    <v-progress-linear color="primary" indeterminate :height="5"></v-progress-linear>
  </div>
</template>

<script setup>
const lodding = ref(false)
const show = (isShow) => {
  lodding.value = isShow
}

defineExpose({
  show
})
</script>

<style scoped>
.page-progress {
  position: fixed;
  z-index: 999;
  inline-size: 100vw;
  inset-block-start: 0;
}
</style>
