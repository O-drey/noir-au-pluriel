<template>
  <div v-if="company">
    <img :src="company.logo" :alt="`logo_${company.name}`" />
    <h1>{{ company.name }}</h1>
    <span>par </span>
    <span v-for="founder in company.founders">{{ founder }}</span>
    <div>
      <p>{{ company.description }}</p>
    </div>
    <div>
      <a :href="company.website" target="_blank">Site web</a>
      <div>
        Suivez leurs aventures :
        <ul>
          <li v-for="social in company.socials">
            <a :href="social" target="_blank">{{ socialName(social) }}</a>
          </li>
        </ul>
      </div>
      <span v-if="company.email">Email : {{ company.email }}</span>
    </div>
    <div>
      <span>Basé à : {{ company.city }}, {{ company.country }}</span>
    </div>
    <div class="flex gap-4 items-center font-medium">
      <UIChip
        v-for="category in company.categories"
        :text="CATEGORIES[category]"
      />
      <UIChip v-for="mention in company.mentions" :text="MENTIONS[mention]" />
    </div>

    <!-- <UIButton label="Supprimer" :onClick="onDelete" /> -->
    <UIButton label="Modifier" :href="`/entreprise/${companyId}/edit`" />
  </div>
  <div v-else>
    <p>
      Aucune entreprise trouvée, cherchez une autre entreprise ou signalez une
      erreur à l'administrateur.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue"
import { useRoute } from "vue-router"
import { useFetchCompanies } from "@/api/fetchCompanies"
import { CATEGORIES } from "@/composables/categories"
import { MENTIONS } from "@/composables/mentions"
import UIChip from "@/components/UI/UIChip.vue"
import UIButton from "@/components/UI/UIButton.vue"
import type { Company } from "@/types/companies"
import { useCompanyStore } from "@/stores/useCompanyStore"

const { retrieve } = useFetchCompanies()
const { id } = useRoute().params
const companyId = Array.isArray(id)
  ? (id[0] as Company["id"])
  : (id as Company["id"])
const company = ref<Company>()

const store = useCompanyStore()
onBeforeMount(async () => {
  if (!companyId) return
  company.value = await retrieve(companyId)
})

console.dir(company.value)

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

const onDelete = () => store.deleteCompany(companyId)
</script>
