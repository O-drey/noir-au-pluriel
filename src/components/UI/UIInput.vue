<template>
  <label :for="labelFor">
    <div class="font-medium text-xl">{{ label }}</div>
    <span v-if="hint" class="font-medium block">{{ hint }}</span>
    <input
      :type="type ?? 'text'"
      :id="labelFor"
      :name="labelFor"
      :autocomplete="autocomplete ? 'on' : 'off'"
      :autocapitalize="autocapitalize"
      :alt="alt"
      :required="required"
      :value="type === 'file' ? undefined : modelValue"
      @input="
        type !== 'file' &&
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="py-3.5 px-4 border border-gray-300 rounded-sm focus-visible:border-2 focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-transparent"
  /></label>
</template>

<script setup lang="ts">
import { ref } from "vue"
const props = defineProps<{
  type?: "text" | "number" | "file" | "email"
  alt?: string
  id?: string
  autocapitalize?: "sentences" | "words" | "characters"
  autocomplete?: "on" | "off"
  label: string
  labelFor: string
  hint?: string
  modelValue?: string
  name?: string
  required?: boolean
}>()

defineEmits<{ "update:modelValue": [value: string] }>()
</script>
