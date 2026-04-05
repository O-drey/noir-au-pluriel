<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-6">
    <UICards
      v-for="company in companies"
      :name="company.name"
      :href="`/entreprise/${company.id}`"
      :img="company.logo"
      :categories="company.categories"
    />
  </div>
</template>

<script setup lang="ts">
// import { storeToRefs } from "pinia"
// import { useCompanyStore } from "@/stores/useCompanyStore"
import UICards from "./UI/UICards.vue"
import type { Company } from "@/types/companies"

defineProps<{ companies: Company[] }>()
// const store = useCompanyStore()
// const { companies } = storeToRefs(store)
</script>
