<script setup>

</script>

<template>
  <VApp>
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component"></component>
      </KeepAlive>
    </RouterView>
    <UpgradeToPro />
  </VApp>
</template>
