<template>
  <div class="lg:gap-x-8 lg:gap-y-6">
    <span class="block font-medium mb-6"
      >{{ companies.length }} entreprise{{ companies.length > 1 ? "s" : "" }} et
      créateur/créatrices</span
    >
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <UICards
        v-for="company in companies"
        :name="company.name"
        :href="`/entreprise/${company.id}`"
        :img="company.logo"
        :description="company.description"
        :categories="company.categories"
      />
    </div>
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
