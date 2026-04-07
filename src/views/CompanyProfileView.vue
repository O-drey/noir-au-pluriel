<template>
  <div class="mt-40 my-26 px-4 lg:px-0 space-y-8">
    <div
      v-if="company"
      class="px-6 pt-4 pb-8 lg:p-12 rounded-4xl bg-white lg:max-w-2xl mx-auto space-y-6"
    >
      <div class="relative flex items-center gap-6 justify-end">
        <select
          v-if="adminIsConnected"
          v-model="companyStatus"
          name="company-status"
          id="company-status"
          :class="[
            'p-1 border rounded-full text-sm',
            companyStatus === 'active'
              ? 'bg-green-50 border-green-500'
              : companyStatus === 'disabled'
                ? 'bg-gray-50 border-gray-500'
                : 'bg-orange-50 border-orange-500',
          ]"
          @change="onStatusChange"
        >
          <option v-for="stat in status" :key="stat.value" :value="stat.value">
            {{ stat.name }}
          </option>
        </select>
        <UIButton
          v-if="adminIsConnected"
          color="ghost"
          size="s"
          label="Actions"
          @click="popoverIsOpen = !popoverIsOpen"
        />

        <dialog
          v-if="popoverIsOpen"
          id="mon-dialogue"
          popover
          class="absolute flex flex-col p-2 rounded-2xl shadow top-12 inset-auto right-0"
        >
          <UIButton
            :href="`/admin/entreprise/${companyId}/edit`"
            label="Modifier"
            size="s"
            color="ghost"
          />
          <UIButton
            label="Supprimer"
            size="s"
            color="ghost"
            :onClick="onDelete"
          />
        </dialog>
      </div>
      <img
        :src="company.logo"
        :alt="`logo_${company.name}`"
        class="lg:max-w-1/3 mx-auto"
      />
      <h1 class="text-center text-2xl font-bold mb-4">{{ company.name }}</h1>
      <div class="flex flex-col lg:flex-row items-center gap-4 justify-center">
        <div>
          <span>Fondée par </span>
          <span v-for="founder in company.founders">{{ founder }} </span>
        </div>
        <div class="lg:border-l lg:border-l-gray-300 pl-4">
          <span>Basé à : {{ company.city }}, {{ company.country }}</span>
        </div>
      </div>

      <div>
        <p>{{ company.description }}</p>
      </div>

      <div class="flex gap-4 items-center font-medium flex-wrap gap-y-2">
        <UIChip
          v-for="category in company.categories"
          :text="CATEGORIES[category]"
        />
        <UIChip v-for="mention in company.mentions" :text="MENTIONS[mention]" />
      </div>
    </div>
    <div
      v-if="company"
      class="px-6 py-8 lg:p-12 rounded-4xl bg-white lg:max-w-2xl mx-auto"
    >
      <h2 class="text-xl font-bold">Contact</h2>

      <div class="inline-flex flex-col lg:flex-row gap-4">
        <a
          :href="
            company.website.startsWith('http')
              ? company.website
              : `https://${company.website}`
          "
          target="_blank"
          >Site web</a
        >
        <ul class="inline-flex flex-col lg:flex-row gap-4">
          <li v-for="social in company.socials">
            <a :href="social" target="_blank">{{ socialName(social) }}</a>
          </li>
        </ul>
        <a :href="`mailto:${company.email}`" v-if="company.email">Email</a>
      </div>
    </div>
    <div v-else>
      <p>
        Aucune entreprise trouvée, cherchez une autre entreprise ou signalez une
        erreur à l'administrateur.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useFetchCompanies } from "@/api/fetchCompanies"
import { CATEGORIES } from "@/composables/categories"
import { MENTIONS } from "@/composables/mentions"
import UIChip from "@/components/UI/UIChip.vue"
import UIButton from "@/components/UI/UIButton.vue"
import type { Company } from "@/types/companies"
import { useCompanyStore } from "@/stores/useCompanyStore"
import { useAdminStore } from "@/stores/useAdminStore"
import { storeToRefs } from "pinia"

const { retrieve } = useFetchCompanies()
const { id } = useRoute().params
const companyId = Array.isArray(id)
  ? (id[0] as Company["id"])
  : (id as Company["id"])
const company = ref<Company>()

const companyStore = useCompanyStore()

onBeforeMount(async () => {
  if (!companyId) return
  company.value = await retrieve(companyId)
  companyStatus.value = company.value?.status ?? "to-check"
  console.dir("company.value : ", company.value)
})

const adminStore = useAdminStore()
const { adminIsConnected } = storeToRefs(adminStore)

const socialName = (url: string) => {
  return url.includes("instagram")
    ? "Instagram"
    : url.includes("linkedin")
      ? "LinkedIn"
      : url.includes("youtube")
        ? "Youtube"
        : url.includes("tiktok")
          ? "TikTok"
          : url.includes("facebook")
            ? "Facebook"
            : "Pinterest"
}

const onDelete = () => {
  companyStore.deleteCompany(companyId)
  const router = useRouter()
  router.go(-1)
}

const companyStatus = ref<Company["status"]>(
  company.value?.status ?? "to-check",
)
const status = [
  { value: "to-check", name: "À vérifier" },
  { value: "active", name: "Validé" },
  { value: "disabled", name: "Désactivé" },
]

const onStatusChange = async () => {
  await companyStore.updateCompany(companyId, {
    ...company.value!,
    status: companyStatus.value,
  })
}

const popoverIsOpen = ref(false)
</script>
