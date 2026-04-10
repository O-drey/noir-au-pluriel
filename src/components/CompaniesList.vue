<template>
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
</template>

<script setup lang="ts">
import UICards from "./UI/UICards.vue"
import type { Company } from "@/types/companies"

const props = defineProps<{ companies: Company[] }>()
</script>
