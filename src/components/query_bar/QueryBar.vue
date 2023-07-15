<template>
  <div bg="#fafafc" flex items-start justify-between b-1 rounded-8 p-6 bc-ccc dark:bg-black>
    <n-space wrap :size="[35, 15]">
      <slot />
    </n-space>

    <div flex-shrink-0>
      <v-btn color="primary" @click="emit('reset')">重置</v-btn>
      <v-btn ml-1 color="primary" @click="emit('search')">搜索</v-btn>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['search', 'reset'])
</script>
