<template>
  <RouterLink to="/" class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
    <div class="d-flex" v-html="logo" />

    <h1 class="font-weight-medium leading-normal text-xl text-uppercase">
      MaterioEasy
    </h1>
  </RouterLink>
</template>

<script setup>
import logo from '@images/logo.svg?raw';
</script>
