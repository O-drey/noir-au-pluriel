<template>
  <div class="space-y-12 pt-40 bg-white">
    <section id="hero" class="w-full">
      <div class="text-center max-w-2xl mx-auto">
        <h1 class="sr-only">Noir au pluriel</h1>
        <h2 class="font-rusty text-5xl pb-10 font-bold">
          L'annuaire des marques
          <span class="after:contents:'zigzag'">black&nbsp;owned</span>
          francophones.
        </h2>

        <p class="text-center text-2xl pb-8 font-medium">
          Mettez en avant vos entreprises et créateurices afro-descendantes
          préférées pour les soutenir !
        </p>
        <span
          >{{ activeCompanies.length }} entreprises et créateurices dont
          présents.</span
        >
        <div class="pt-8">
          <UIButton
            href="/ajouter-entreprise-createur"
            label="Complétez l'annuaire"
            size="l"
          />
        </div>
      </div>
    </section>
    <div class="bg-sable-100 p-4 py-8 lg:p-16 space-y-14 h-auto lg:pb-40">
      <!-- <select name="categories-filter" id="categories-filter">
          <option
            v-for="item in menu"
            :key="item.value"
            :value="item.value"
            @change="() => filter(item.value as CategoriesKeys)"
          >
            {{ item.name }}
          </option>
        </select> -->
      <nav class="overflow-hidden">
        <ul
          class="flex flex-col gap-8 text-base font-medium sm:flex-row bg-gray-100 rounded-xl p-4 justify-center"
        >
          <li v-for="item in menu" :key="item.value">
            <UIButton
              :label="item.name"
              size="m"
              color="ghost"
              :onClick="() => filter(item.value as CategoriesKeys)"
            />
          </li>
        </ul>
      </nav>
      <CompaniesList :companies="filteredCompanies" />
      <div v-if="filteredCompanies.length === 0" class="text-center space-y-8">
        <p class="lg:max-w-xl mx-auto">
          Nous n'avons pas encore d'entreprise ou créateur/créatrice dans ce
          domaine, mais si vous en connaissez donnez-leur de la force !
        </p>
        <UIButton
          label="Complétez l'annuaire"
          href="/ajouter-entreprise-createur"
          size="l"
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
