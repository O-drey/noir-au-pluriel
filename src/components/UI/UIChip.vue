<template>
  <span
    class="rounded-full border border-gray-200 px-2 py-0.5 text-sm h-fit inline-flex"
  >
    {{ text }}
  </span>
</template>

<script setup lang="ts">
import type { CategoriesKeys } from "@/composables/categories"
import type { MentionsKeys } from "@/composables/mentions"

const props = defineProps<{ text: string | CategoriesKeys | MentionsKeys }>()
</script>
