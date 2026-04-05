<template>
  <div class="space-y-12 mb-12">
    <div class="rounded-2xl bg-linear-500 from-amber-600 to-amber-800 p-12">
      <h1>Noir au pluriel</h1>
      <span>L'annnuaire des marques black-owned francophones.</span>
      <p>
        Vous souhaitez soutenir des entreprises et créateurices
        afro-descendantes ? Consultez l'annuaire, vous trouverez probablement ce
        quelque chose qui fera battre votre cœur !
      </p>
    </div>

    <div class="space-y-8">
      <nav>
        <ul
          class="flex flex-col gap-8 text-base font-medium sm:flex-row bg-gray-100 rounded-xl p-4 justify-center"
        >
          <li v-for="item in menu" :key="item.value">
            <UIButton
              :label="item.name"
              :onClick="filter(item.value as CategoriesKeys)"
            />
          </li>
        </ul>
      </nav>
      <CompaniesList :companies="companies" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { menu } from "@/composables/menu"
import CompaniesList from "../components/CompaniesList.vue"
import { storeToRefs } from "pinia"
import { useCompanyStore } from "@/stores/useCompanyStore"
import type { CategoriesKeys } from "@/composables/categories"
import UIButton from "@/components/UI/UIButton.vue"
import { computed } from "vue"

const store = useCompanyStore()
const { companies } = storeToRefs(store)

const filter = (value: CategoriesKeys) => {
  computed(() =>
    companies.value.filter((company) => company.categories.includes(value)),
  )
  return companies.value
}
</script>
