<script setup>
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
// Components
import BackTop from '@/components/common/BackTop.vue'
import Footer from './footer/index.vue'
import Header from './header/index.vue'
import SiderBar from './sidebar/index.vue'
import SideBarEnd from './sidebar_end/index.vue'


</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <Header @toggle-nav-active="toggleVerticalOverlayNavActive" />
    </template>

    <template #vertical-nav-content>
      <SiderBar />
    </template>

    <template #after-vertical-nav-items>
      <!-- 👉 illustration -->
      <SideBarEnd />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- Back Top -->
    <BackTop />
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
