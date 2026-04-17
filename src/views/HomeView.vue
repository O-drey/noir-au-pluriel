<template>
  <div class="space-y-12 pt-40 bg-white">
    <section id="hero" class="w-full">
      <div class="text-center max-w-3xl mx-auto">
        <h1 class="sr-only">Noir au pluriel</h1>
        <h2 class="font-rusty text-4xl lg:text-5xl pb-10 font-bold">
          L'annuaire des marques
          <span class="inline-block relative"
            >black&nbsp;owned francophones.
            <img
              aria-hidden="true"
              class="absolute left-0 h-6 text-left"
              src="@/assets/zigzag.svg"
              alt=""
            />
          </span>
        </h2>

        <p class="text-center text-xl lg:text-2xl pb-8 font-medium">
          Mettez en avant vos entreprises, créateurs et créatrices
          afro-descendantes préférées pour les soutenir !
        </p>
        <span
          >{{ activeCompanies.length }} entreprises et créateurs et créatrices
          sont présents.</span
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
      <!-- <UIFilterBar :companies="activeCompanies" /> -->
      <div class="flex flex-col gap-y-4 lg:flex-row items-center">
        <div class="flex flex-col lg:flex-row lg:items-center gap-x-4">
          <span class="font-medium">Filtrer par</span>
          <UICombobox
            v-model="selectedCategories"
            :data="CATEGORIES"
            label="Catégories"
            multiple
            inputStyle="rounded-full lg:rounded-r-none pl-4 border border-gray-200 border-r-0"
            placeholder="Catégories"
          />
        </div>

        <UICombobox
          v-model="selectedMentions"
          :data="MENTIONS"
          label="Mentions"
          multiple
          inputStyle="rounded-full lg:rounded-l-none pl-4 border border-gray-200 border-r-0"
          placeholder="Mentions"
        />
      </div>

      <div class="space-y-8">
        <div class="flex flex-col lg:flex-row gap-4 items-center pt-8">
          <label v-if="companies.length > 1" class="lg:hidden">
            <span class="font-medium">Trier par </span>
            <select v-model="selectedSortingType" name="tri" id="tri">
              <option value="name-ascending">Ordre alphabétique (A-Z)</option>
              <option value="name-descending">
                Ordre alphabétique inversé (Z-A)
              </option>
              <option value="newest">Date d'ajout la plus ancienne</option>
              <option value="oldest">Date d'ajout la plus récente</option>
            </select>
          </label>
          <span class="block font-medium">
            {{ companies.length }} entreprise{{
              companies.length > 1 ? "s" : ""
            }}
            et créateurs/créatrices
          </span>

          <label v-if="companies.length > 1" class="hidden lg:inline-block">
            <span class="font-medium">Trier par </span>
            <select
              v-model="selectedSortingType"
              name="tri"
              id="tri"
              class="text-sable-700"
            >
              <option value="name-ascending">Ordre alphabétique (A-Z)</option>
              <option value="name-descending">
                Ordre alphabétique inversé (Z-A)
              </option>
              <option value="newest">Date d'ajout la plus récente</option>
              <option value="oldest">Date d'ajout la plus ancienne</option>
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
import { useCompanyStore } from "@/stores/useCompanyStore"
import { sortCompanies } from "@/composables/companies"
import { CATEGORIES, type CategoriesKeys } from "@/composables/categories"
import { MENTIONS, type MentionsKeys } from "@/composables/mentions"
import CompaniesList from "../components/CompaniesList.vue"
import UIButton from "@/components/UI/UIButton.vue"
import UICombobox from "@/components/UI/UICombobox.vue"
import type { Option } from "@/components/UI/UICombobox.vue"
// import UIFilterBar from "@/components/UI/UIFilterBar.vue"

const store = useCompanyStore()
const { activeCompanies } = storeToRefs(store)

const activeFilter = ref<CategoriesKeys | null>(null)

const filteredCompanies = computed(() => {
  return activeCompanies.value.filter((company) => {
    // Filtre boutons mobile (activeFilter)
    const matchActiveFilter =
      !activeFilter.value || company.categories.includes(activeFilter.value)

    // Filtre combobox catégories
    const matchCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.some((cat) =>
        company.categories.includes(cat.value as CategoriesKeys),
      )

    // Filtre combobox mentions
    const matchMention =
      selectedMentions.value.length === 0 ||
      selectedMentions.value.some((mention) =>
        company.mentions?.includes(mention.value as MentionsKeys),
      )

    return matchActiveFilter && matchCategory && matchMention
  })
})

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
const selectedCategories = ref<Option[]>([])
const selectedMentions = ref<Option[]>([])
</script>
