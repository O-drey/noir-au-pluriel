<template>
  <form
    :action="action"
    :method="method"
    :name="name"
    :autoComplete="autoComplete"
    :noValidate="novalidate"
    @submit.prevent="onSubmit"
  >
    <slot name="content"></slot>
    <slot name="cta"></slot>
  </form>
</template>

<script setup lang="ts">
const props = defineProps<{
  action?: string
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  name: string
  autoComplete?: "on" | "off"
  novalidate?: boolean
  onSubmit: () => void
}>()
</script>

<style scoped></style>
