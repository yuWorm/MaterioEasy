<template>
  <div flex items-center>
    <div :style="{ width: contentWidth + 'px' }" flex-shrink-0>
      <slot />
    </div>
  </div>
</template>

<script setup>

defineProps({
  label: {
    type: String,
    default: '',
  },
  labelWidth: {
    type: Number,
    default: 80,
  },
  contentWidth: {
    type: Number,
    default: 220,
  },
})
</script>
