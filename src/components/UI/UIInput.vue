<template>
  <label :for="labelFor">
    <div
      :class="[
        'font-medium mb-2',
        labelSize === 's' ? 'text-base' : ' text-xl',
      ]"
    >
      {{ label }} <span v-if="required">*</span>
    </div>
    <span v-if="hint" class="font-medium block text-sm">{{ hint }}</span>
    <input
      :type="type ?? 'text'"
      :id="labelFor"
      :name="labelFor"
      :autocomplete="autocomplete ? 'on' : 'off'"
      :autocapitalize="autocapitalize"
      :alt="alt"
      :accept="acceptedFormats"
      :required="required"
      :value="type === 'file' ? undefined : modelValue"
      @input="
        type !== 'file' &&
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="py-3.5 px-4 border border-gray-300 rounded-sm focus-visible:border-2 focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:ring-black focus-visible:border-transparent w-full"
    />
    <span v-if="hintBelow" class="font-medium block text-sm mt-1">{{
      hintBelow
    }}</span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: "text" | "number" | "file" | "email" | "password"
  alt?: string
  id?: string
  autocapitalize?: "sentences" | "words" | "characters"
  autocomplete?: "on" | "off"
  label: string
  labelFor: string
  hint?: string
  hintBelow?: string
  modelValue?: string
  name?: string
  required?: boolean
  labelSize?: "s" | "m"
  acceptedFormats?: string
}>()

defineEmits<{ "update:modelValue": [value: string] }>()
</script>
