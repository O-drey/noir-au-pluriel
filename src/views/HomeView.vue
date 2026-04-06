<template>
  <div class="space-y-12 mb-12">
    <div class="rounded-2xl bg-linear-500 from-amber-600 to-amber-800 p-12">
      <h1>Noir au pluriel</h1>
      <span>L'annuaire des marques black-owned francophones.</span>
      <p>
        Vous souhaitez soutenir des entreprises et créateurices
        afro-descendantes ? Consultez l'annuaire, vous trouverez probablement ce
        quelque chose qui fera battre votre cœur !
      </p>
      <span
        >Nous actuellement à {{ activeCompanies.length }} entreprises et
        créateurices</span
      >
    </div>

    <div class="space-y-8">
      <nav class="overflow-hidden">
        <ul
          class="flex flex-col gap-8 text-base font-medium sm:flex-row bg-gray-100 rounded-xl p-4 justify-center"
        >
          <li v-for="item in menu" :key="item.value">
            <UIButton
              :label="item.name"
              size="m"
              color="grey"
              :onClick="() => filter(item.value as CategoriesKeys)"
            />
          </li>
        </ul>
      </nav>
      <CompaniesList :companies="filteredCompanies" />
      <div v-if="filteredCompanies.length === 0" class="text-center space-y-8">
        <p>
          Nous ne connaissons pas encore d'entreprise dans ce domaine, mais si
          vous en connaissez donnez-leur de la force !
        </p>
        <UIButton
          label="Complétez l'annuaire"
          href="/ajouter-entreprise-createur"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { storeToRefs } from "pinia"
import { menu } from "@/composables/menu"
import { useCompanyStore } from "@/stores/useCompanyStore"
import CompaniesList from "../components/CompaniesList.vue"
import UIButton from "@/components/UI/UIButton.vue"
import type { CategoriesKeys } from "@/composables/categories"

const store = useCompanyStore()
const { activeCompanies } = storeToRefs(store)

const activeFilter = ref<CategoriesKeys | null>(null)

const filteredCompanies = computed(() => {
  if (!activeFilter.value) return activeCompanies.value
  return activeCompanies.value.filter((company) =>
    company.categories.includes(activeFilter.value!),
  )
})
const filter = (value: CategoriesKeys) => {
  activeFilter.value = activeFilter.value === value ? null : value
}
</script>
