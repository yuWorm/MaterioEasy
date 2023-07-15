<template>
  <div class="d-flex h-100 align-center">
    <!-- 👉 Vertical nav toggle in overlay mode -->
    <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
      <VIcon icon="mdi-menu" />
    </IconBtn>

    <!-- 👉 Search -->
    <div class="d-flex align-center cursor-pointer" style="user-select: none;">
      <!-- 👉 Search Trigger button -->
      <IconBtn>
        <VIcon icon="mdi-magnify" />
      </IconBtn>

      <span class="d-none d-md-flex align-center text-disabled">
        <span class="me-3">Search</span>
        <span class="meta-key">&#8984;K</span>
      </span>
    </div>

    <VSpacer />

    <IconBtn class="me-2" href="https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free"
      target="_blank" rel="noopener noreferrer">
      <VIcon icon="mdi-github" />
    </IconBtn>

    <IconBtn class="me-2">
      <VIcon icon="mdi-bell-outline" />
    </IconBtn>

    <NavbarThemeSwitcher class="me-2" />

    <UserProfile />
  </div>
</template>

<script setup>
import NavbarThemeSwitcher from './components/NavbarThemeSwitcher.vue';
import UserProfile from './components/UserProfile.vue';

const emits = defineEmits(['toggleNavActive'])

const toggleVerticalOverlayNavActive = active => {
  emits('toggleNavActive', active)
}
</script>
