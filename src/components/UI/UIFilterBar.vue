<template>
  <nav class="overflow-hidden">
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
        {{ companies.length }} entreprise{{ companies.length > 1 ? "s" : "" }}
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
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import UICombobox from "./UICombobox.vue"
import { CATEGORIES, type CategoriesKeys } from "@/composables/categories"
import { MENTIONS, type MentionsKeys } from "@/composables/mentions"
import type { Company } from "@/types/companies"
import { sortCompanies } from "@/composables/companies"
import type { Option } from "@/components/UI/UICombobox.vue"
import { useCompanyStore } from "@/stores/useCompanyStore"
import { storeToRefs } from "pinia"

defineProps<{ companies: Company[] }>()
defineEmits<{ "update:menu": [value: string] }>()

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
