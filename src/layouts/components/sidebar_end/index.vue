<template>
  <a href="https://themeselection.com/item/materio-vuetify-vuejs-admin-template" target="_blank" rel="noopener noreferrer"
    style="margin-left: 7px;">
    <img :src="upgradeBanner" alt="upgrade-banner" transition="scale-transition" class="upgrade-banner mx-auto"
      style="max-width: 230px;" />
  </a>
</template>

<script setup>
import upgradeBannerDark from '@images/pro/upgrade-banner-dark.png';
import upgradeBannerLight from '@images/pro/upgrade-banner-light.png';
import { useTheme } from 'vuetify';
const vuetifyTheme = useTheme()

const upgradeBanner = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? upgradeBannerLight : upgradeBannerDark
})
</script>
