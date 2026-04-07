<template>
  <nav class="overflow-hidden">
    <ul
      class="flex flex-col gap-8 text-base font-medium sm:flex-row bg-white rounded-xl p-4 justify-center"
    >
      <li v-for="item in menu" :key="item.value">
        <UIButton
          :label="item.name"
          size="m"
          color="grey"
          :onClick="
            () => filter(item.value as CategoriesKeys | Company['status'])
          "
        />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { Company } from "@/types/companies"
import { ref } from "vue"
import UIButton from "./UIButton.vue"
import type { CategoriesKeys } from "@/composables/categories"
defineProps<{ menu: { value: string; name: string }[] }>()
defineEmits<{ "update:menu": [value: string] }>()

const activeFilter = ref<CategoriesKeys | Company["status"] | null>(null)

const filter = (value: CategoriesKeys | Company["status"]) => {
  activeFilter.value = activeFilter.value === value ? null : value
}
</script>
