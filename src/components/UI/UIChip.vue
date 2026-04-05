<template>
  <span class="rounded-sm bg-gray-200 p-1 text-sm h-fit inline-flex">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
import type { CategoriesKeys } from "@/composables/categories"
import type { MentionsKeys } from "@/composables/mentions"

const props = defineProps<{ text: string | CategoriesKeys | MentionsKeys }>()
</script>
