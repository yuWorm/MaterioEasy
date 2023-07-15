<script setup>
import DemoFormLayoutHorizontalForm from './components/DemoFormLayoutHorizontalForm.vue'
import DemoFormLayoutHorizontalFormWithIcons from './components/DemoFormLayoutHorizontalFormWithIcons.vue'
import DemoFormLayoutMultipleColumn from './components/DemoFormLayoutMultipleColumn.vue'
import DemoFormLayoutVerticalForm from './components/DemoFormLayoutVerticalForm.vue'
import DemoFormLayoutVerticalFormWithIcons from './components/DemoFormLayoutVerticalFormWithIcons.vue'
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" md="6">
        <!-- 👉 Horizontal Form -->
        <VCard title="Horizontal Form">
          <VCardText>
            <DemoFormLayoutHorizontalForm />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        <!-- 👉 Horizontal Form with Icons -->
        <VCard title="Horizontal Form with Icons">
          <VCardText>
            <DemoFormLayoutHorizontalFormWithIcons />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        <!-- 👉 Vertical Form -->
        <VCard title="Vertical Form">
          <VCardText>
            <DemoFormLayoutVerticalForm />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        <!-- 👉 Vertical Form with Icons -->
        <VCard title="Vertical Form with Icons">
          <VCardText>
            <DemoFormLayoutVerticalFormWithIcons />
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12">
        <!-- 👉 Multiple Column -->
        <VCard title="Multiple Column">
          <VCardText>
            <DemoFormLayoutMultipleColumn />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
