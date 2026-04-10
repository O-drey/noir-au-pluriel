<template>
  <div class="lg:gap-x-8 lg:gap-y-6">
    <span class="block font-medium mb-6">
      {{ companies.length }} entreprise{{ companies.length > 1 ? "s" : "" }} et
      créateur/créatrices
    </span>
    <!-- <label for="trier">
      <span>Trier par </span>
      {{ selectedSortingType }}
      <select v-model="selectedSortingType">
        <option value="name-ascending">Ordre alphabétique (A-Z)</option>
        <option value="name-descending">
          Ordre alphabétique inversé (Z-A)
        </option>
        <option value="newest">Du plus récent au plus ancien</option>
        <option value="oldest">Du plus ancien au plus récent</option>
      </select>
    </label> -->
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
// import { computed, ref } from "vue"
// import { sortCompanies } from "@/composables/companies"
import UICards from "./UI/UICards.vue"
import type { Company } from "@/types/companies"

const props = defineProps<{ companies: Company[] }>()

// const {
//   sortCompaniesByNameAscending,
//   sortCompaniesByNameDescending,
//   sortCompaniesByNewest,
//   sortCompaniesByOldest,
// } = sortCompanies()

// const sorted = [...props.companies]
// const selectedSortingType = ref<string>("newest")

// const companies = computed(() => {
//   if (selectedSortingType.value === "name-ascending")
//     sortCompaniesByNameAscending(sorted)
//   else if (selectedSortingType.value === "name-descending")
//     sortCompaniesByNameDescending(sorted)
//   else if (selectedSortingType.value === "oldest") sortCompaniesByOldest(sorted)
//   else sortCompaniesByNewest(sorted)
//   return sorted
// })
</script>
