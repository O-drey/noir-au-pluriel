<template>
  <RouterLink :to="href">
    <div
      class="bg-white rounded-4xl space-y-6 sm:max-w-full overflow-hidden p-6"
    >
      <div class="aspect-square h-auto w-full overflow-hidden">
        <img
          :src="img"
          alt=""
          aria-roledescription="presentation"
          class="h-full w-full object-center object-contain"
        />
      </div>
      <div class="space-y-2">
        <h3 class="text-lg font-semibold">{{ name }}</h3>
        <p class="text-normal truncate text-gray-600">{{ description }}</p>
      </div>
      <div class="flex gap-2 flex-nowrap overflow-hidden">
        <UIChip
          v-for="category in categories"
          :key="category"
          :text="CATEGORIES[category]"
        />
        <!-- <UIChip v-if="hiddenCount > 0" :text="`+${hiddenCount}`" /> -->
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from "vue"
import UIChip from "./UIChip.vue"
import { CATEGORIES } from "@/composables/categories"
import type { CategoriesKeys } from "@/composables/categories"

const props = defineProps<{
  name: string
  img: string
  href: string
  description: string
  categories: CategoriesKeys[]
  // maxVisible: 2
}>()

// const visibleChips = computed(() => props.categories.slice(0, props.maxVisible))
// const hiddenCount = computed(() =>
//   Math.max(0, props.categories.length - props.maxVisible),
// )
</script>
