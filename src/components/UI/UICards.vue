<template>
  <div class="bg-white rounded-4xl space-y-6 sm:max-w-full overflow-hidden p-6">
    <div class="aspect-square h-auto w-full overflow-hidden">
      <img
        :src="img"
        alt=""
        aria-roledescription="presentation"
        ref="imgRef"
        class="h-full w-full object-center object-contain"
        :loading="imgIsVisible ? 'eager' : 'lazy'"
      />
    </div>
    <div class="space-y-2">
      <RouterLink :to="href">
        <h3 class="text-lg font-semibold">{{ name }}</h3>
      </RouterLink>
      <p class="text-normal truncate text-gray-600">{{ description }}</p>
    </div>
    <div
      class="flex gap-2 flex-nowrap overflow-hidden overflow-x-auto scroll-x snap-x snap-mandatory"
    >
      <UIChip
        v-for="category in categories"
        :key="category"
        :text="CATEGORIES[category]"
        class="snap-center"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import UIChip from "./UIChip.vue"
import { CATEGORIES } from "@/composables/categories"
import type { CategoriesKeys } from "@/composables/categories"

const props = defineProps<{
  name: string
  img: string
  href: string
  description: string
  categories: CategoriesKeys[]
}>()

const imgRef = ref<HTMLImageElement>()
const imgIsVisible = ref(false)
let observer: IntersectionObserver

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        imgIsVisible.value = true
        observer.disconnect() //
      }
    },
    { threshold: 0.1 },
  )

  if (imgRef.value) observer.observe(imgRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>
