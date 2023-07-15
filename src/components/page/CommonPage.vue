<template>
  <AppPage :show-footer="showFooter">
    <header v-if="showHeader" mb-5 flex items-center justify-between px-5>
      <slot v-if="$slots.header" name="header" />
      <template v-else>
        <h2 text-7 font-normal text-hex-333 dark:text-hex-ccc>{{ title || route.meta?.title }}</h2>
        <slot name="action" />
      </template>
    </header>

    <v-card flex-1 rounded-10>
      <slot />
    </v-card>
  </AppPage>
</template>

<script setup>
defineProps({
  showFooter: {
    type: Boolean,
    default: false,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: undefined,
  },
})
const route = useRoute()
</script>
