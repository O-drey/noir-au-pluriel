<template>
  <AuthView v-if="!adminIsConnected" />
  <div v-else>
    <h1>Bonjour Sara</h1>

    <nav class="overflow-hidden">
      <span>Statut : {{ filteredCompanies.length }}</span>
      <ul
        class="flex flex-col gap-8 text-base font-medium sm:flex-row bg-gray-100 rounded-xl p-4 justify-center"
      >
        <li v-for="item in menu" :key="item.value">
          <UIButton
            :label="item.name"
            size="m"
            color="grey"
            :onClick="() => filter(item.value as Company['status'])"
          />
        </li>
      </ul>
    </nav>
    <CompaniesList :companies="filteredCompanies" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { storeToRefs } from "pinia"
import { useAdminStore } from "@/stores/useAdminStore"
import { useCompanyStore } from "@/stores/useCompanyStore"
import AuthView from "./AuthView.vue"
import CompaniesList from "@/components/CompaniesList.vue"
import UIButton from "@/components/UI/UIButton.vue"
import type { Company } from "@/types/companies"

const companyStore = useCompanyStore()
const { companies } = storeToRefs(companyStore)

const adminStore = useAdminStore()
const { adminIsConnected } = storeToRefs(adminStore)
const menu = [
  { value: "to-check", name: "À vérifier" },
  { value: "active", name: "Valider" },
  { value: "disabled", name: "Désactiver" },
]

const activeFilter = ref<Company["status"] | null>("to-check")

const filteredCompanies = computed(() => {
  if (!activeFilter.value) return companies.value
  console.log(activeFilter.value)
  return companies.value.filter(
    (company) => company.status === activeFilter.value,
  )
})

const filter = (value: Company["status"]) => {
  activeFilter.value = activeFilter.value === value ? null : value
}
</script>
