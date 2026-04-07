<template>
  <label :for="labelFor">
    <div class="font-medium text-xl mb-2">{{ label }}</div>
    <span v-if="hint" class="font-medium block">{{ hint }}</span>
    <textarea
      :id="labelFor"
      :name="labelFor"
      :autocomplete="autocomplete ? 'on' : 'off'"
      :autocapitalize="autocapitalize"
      :maxlength="maxLength"
      :required="required"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="py-3.5 px-4 border border-gray-300 rounded-sm focus-visible:border-2 focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-transparent w-full resize-none"
    ></textarea>
    <span class="text-sm"
      >{{ modelValue?.length }} / {{ maxLength }} caractères maximum.</span
    >
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  id?: string
  autocapitalize?: "sentences" | "words" | "characters"
  autocomplete?: "on" | "off"
  label: string
  labelFor: string
  hint?: string
  modelValue?: string
  name?: string
  maxLength: number
  required?: boolean
}>()

defineEmits<{ "update:modelValue": [value: string] }>()
</script>
