<template>
  <v-dialog v-model="show" persistent :width="props.width" :loading="props.loading">
    <v-sheet>
      <v-card-item>
        <template v-slot:prepend>
          <v-card-title>
            {{ props.title }}
          </v-card-title>
        </template>

        <v-divider vertical class="mx-2"></v-divider>

        <template v-slot:append>
          <v-btn @click="show = false" icon="$close" size="large" variant="text"></v-btn>
        </template>
      </v-card-item>
      <div p-5>
        <slot />
      </div>

      <v-card-actions v-if="props.showFooter">
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="show = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="onSave">
          Save
        </v-btn>
      </v-card-actions>
    </v-sheet>

  </v-dialog>
</template>

<script setup>
const props = defineProps({
  width: {
    type: Number,
    default: 800,
  },
  title: {
    type: String,
    default: '',
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:visible', 'onSave'])

const onSave = () => {
  console.log("保存")
  emit('onSave')
}

const show = computed({
  get() {
    return props.visible
  },
  set(v) {
    emit('update:visible', v)
  },
})
</script>

