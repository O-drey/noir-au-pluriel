<template>
  <div class="space-y-12 pt-40 bg-white">
    <section id="hero" class="w-full">
      <div class="text-center max-w-2xl mx-auto">
        <h1 class="sr-only">Noir au pluriel</h1>
        <h2 class="font-rusty text-4xl lg:text-5xl pb-10 font-bold">
          L'annuaire des marques
          <span class="after:contents:'zigzag.svg'">black&nbsp;owned</span>
          francophones.
        </h2>

        <p class="text-center text-xl lg:text-2xl pb-8 font-medium">
          Mettez en avant vos entreprises, créateurs et créatrices
          afro-descendantes préférées pour les soutenir !
        </p>
        <span
          >{{ activeCompanies.length }} entreprises et créateurices sont
          présents.</span
        >
        <div class="pt-8">
          <UIButton
            href="/formulaire-suggestion"
            label="Complétez l'annuaire"
            size="l"
          />
        </div>
      </div>
    </section>
    <div class="bg-sable-100 p-4 py-8 lg:p-16 h-auto lg:pb-40">
      <nav class="hidden overflow-hidden mb-12 lg:block">
        <ul
          class="flex-col gap-4 text-base font-medium sm:flex-row bg-gray-100 rounded-xl p-4 justify-center hidden lg:flex"
        >
          <li>
            <UIButton
              label="Tout"
              size="m"
              color="ghost"
              :onClick="() => filter(activeFilter as CategoriesKeys)"
              :class="{ 'bg-[#B0630B]/20': activeFilter === null }"
            />
          </li>
          <li v-for="item in menu" :key="item.value">
            <UIButton
              :label="item.name"
              size="m"
              color="ghost"
              :onClick="() => filter(item.value as CategoriesKeys)"
              :class="{ 'bg-[#B0630B]/20': activeFilter === item.value }"
            />
          </li>
        </ul>
      </nav>
      <div class="space-y-8">
        <div class="flex flex-col lg:flex-row gap-4 items-center">
          <label id="categories" class="lg:hidden">
            <span class="font-medium">Choisissez une catégorie</span>
            <select name="categories" id="categories" v-model="activeFilter">
              <option :value="null">Choisissez une catégorie</option>
              <option
                v-for="(item, value) in menu"
                :value="item.value"
                :key="value"
              >
                {{ item.name }}
              </option>
            </select>
          </label>
          <label v-if="companies.length > 1" class="lg:hidden">
            <span class="font-medium">Trier par </span>
            <select v-model="selectedSortingType" name="tri" id="tri">
              <option value="name-ascending">Ordre alphabétique (A-Z)</option>
              <option value="name-descending">
                Ordre alphabétique inversé (Z-A)
              </option>
              <option value="newest">Du plus récent au plus ancien</option>
              <option value="oldest">Du plus ancien au plus récent</option>
            </select>
          </label>
          <span class="block font-medium">
            {{ companies.length }} entreprise{{
              companies.length > 1 ? "s" : ""
            }}
            et créateur/créatrices
          </span>

          <label v-if="companies.length > 1" class="hidden lg:inline-block">
            <span class="font-medium">Trier par </span>
            <select
              v-model="selectedSortingType"
              name="tri"
              id="tri"
              class="text-[#874316]"
            >
              <option value="name-ascending">Ordre alphabétique (A-Z)</option>
              <option value="name-descending">
                Ordre alphabétique inversé (Z-A)
              </option>
              <option value="newest">Du plus récent au plus ancien</option>
              <option value="oldest">Du plus ancien au plus récent</option>
            </select>
          </label>
        </div>
        <CompaniesList :companies="companies" />
        <div v-if="companies.length === 0" class="text-center space-y-8">
          <p class="lg:max-w-xl mx-auto">
            Nous n'avons pas encore d'entreprise ou créateur/créatrice dans ce
            domaine, mais si vous en connaissez donnez-leur de la force !
          </p>
          <UIButton
            label="Complétez l'annuaire"
            href="/formulaire-suggestion"
            size="l"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { storeToRefs } from "pinia"
import { sortCompanies } from "@/composables/companies"
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

const {
  sortCompaniesByNameAscending,
  sortCompaniesByNameDescending,
  sortCompaniesByNewest,
  sortCompaniesByOldest,
} = sortCompanies()

const selectedSortingType = ref<string>("newest")

const companies = computed(() => {
  const sorted = [...filteredCompanies.value]

  if (selectedSortingType.value === "name-ascending")
    sortCompaniesByNameAscending(sorted)
  else if (selectedSortingType.value === "name-descending")
    sortCompaniesByNameDescending(sorted)
  else if (selectedSortingType.value === "oldest") sortCompaniesByOldest(sorted)
  else sortCompaniesByNewest(sorted)
  return sorted
})
</script>
