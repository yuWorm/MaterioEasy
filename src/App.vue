<script setup>
const o = (p, s) => {
  console.log(p)
  return 'a'
}
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
