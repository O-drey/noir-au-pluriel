<template>
  <RouterLink :to="href">
    <div
      class="shadow shadow-gray-300 rounded-lg drop-shadow-sm inset-shadow-2xs rounded-t-full space-y-6"
    >
      <div class="aspect-square h-auto w-full overflow-hidden">
        <img
          :src="img"
          alt=""
          aria-roledescription="presentation"
          class="h-full w-full object-center object-contain"
        />
      </div>
      <div>
        <h3>{{ name }}</h3>
        <div class="flex gap-4">
          <UIChip
            v-for="category in categories"
            :key="category"
            :text="CATEGORIES[category]"
          />
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import UIChip from "./UIChip.vue"
import { CATEGORIES } from "@/composables/categories"
import type { CategoriesKeys } from "@/composables/categories"

const props = defineProps<{
  name: string
  img: string
  href: string
  categories: CategoriesKeys[]
}>()
</script>
