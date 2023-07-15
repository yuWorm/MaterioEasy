<template>
  <div class="back-top">
    <v-fab-transition>
      <v-btn fab v-show="show" size="x-large" density="default" @click="toTop" transition="fab-transition"
        icon="mdi-chevron-up"></v-btn>
    </v-fab-transition>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const show = ref(false);

const cubic = (value) => Math.pow(value, 3)

const easeInOutCubic = (value) => value < 0.5 ?
  cubic(value * 2) / 2 :
  1 - cubic((1 - value) * 2) / 2

const toTop = () => {
  // 记录开始时间
  const beginTime = Date.now()
  // 初始位置
  const beginValue = document.documentElement.scrollTop;
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
  const frameFunc = () => {
    // 进度，500ms 内将页面滚动到顶部
    const progress = (Date.now() - beginTime) / 500
    if (progress < 1) {
      // 根据进度修改 scrollTop 的值
      document.documentElement.scrollTop = beginValue * (1 - easeInOutCubic(progress))
      rAF(frameFunc)
    } else {
      document.documentElement.scrollTop = 0
    }
  }
  rAF(frameFunc)
}



const handleScroll = () => {
  if (document.documentElement.scrollTop + document.body.scrollTop > 300) {
    show.value = true
  } else {
    show.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-top {
  position: fixed;
  z-index: 99;
  inset-block-end: 20px;
  inset-inline-end: 20px;
}
</style>
