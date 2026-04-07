<template>
  <button
    v-if="!href"
    :size="size"
    :color="color"
    @click="onClick"
    :class="[
      'rounded-sm font-medium h-fit cursor-pointer transition-all duration-250 ease-in',
      btnSize,
      btnColor,
    ]"
  >
    {{ label }}
  </button>
  <RouterLink
    v-else
    :to="href"
    :class="[
      'rounded-sm font-medium h-fit transition-all duration-250 ease-in',
      btnSize,
      btnColor,
    ]"
    >{{ label }}</RouterLink
  >
  <!-- ajouter classe active pour les liens -->
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: "button" | "submit" | "reset"
  alt?: string
  href?: string
  label: string
  size?: "s" | "m" | "l" | "block"
  color?: "primary" | "grey" | "ghost"
  onClick?: () => void
}>()

const btnColor =
  props.color === "grey"
    ? "bg-gray-300 text-black hover:bg-gray-600 hover:text-white"
    : props.color === "ghost"
      ? "bg-none hover:bg-black/10"
      : "bg-black text-white hover:bg-gray-100 hover:text-black"

const btnSize =
  props.size === "s"
    ? "py-1.5 px-1.5"
    : props.size === "m"
      ? "py-2 px-2"
      : props.size === "l"
        ? "py-4 px-3"
        : "py-6 px-4 width-full"
</script>
