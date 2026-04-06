<template>
  <div>
    <UIForm
      name="edit-company"
      autoComplete="on"
      novalidate
      :onSubmit="update"
      class="p-12 border rounded-2xl"
    >
      <template #content>
        <h1 class="font-bold text-4xl mb-8">
          Mettre à jour les infos d'une entreprise ou d'une créateurice
        </h1>

        <div class="flex flex-col gap-8 mt-8">
          <UIInput
            v-model.trim="editedCompany.name"
            label="Nom de la marque"
            autocomplete="on"
            labelFor="nom-marque"
            required
          />
          <UIInput
            v-model.trim="foundersInput"
            label="Fondateurices de la marque"
            hint="S'il y a plusieurs fondateurices, séparez-les par une virgule (,)."
            autocomplete="on"
            labelFor="fondateurs-marque"
            required
          />
          <UIInput
            type="file"
            label="Fichier du logo"
            labelFor="logo-marque"
            @change="handleFileChange"
          />
          <UIInput
            v-model.trim="logoInput"
            label="Lien du logo"
            autocomplete="on"
            labelFor="logo-marque"
            :placeholder="originalCompany?.logo"
          />
          <UIInput
            v-model.trim="editedCompany.description"
            label="Que fait la marque ?"
            autocomplete="on"
            labelFor="description-marque"
            max-length="500"
            required
          />
          <UIInput
            v-model.trim="editedCompany.website"
            label="Site web"
            autocomplete="on"
            labelFor="site-marque"
            required
          />
          <UIInput
            v-if="editedCompany.type === 'creator'"
            v-model.trim="editedCompany.email"
            label="E-mail de la marque"
            autocomplete="on"
            labelFor="email-marque"
            type="email"
          />
          <UIInput
            v-model.trim="socialsInput"
            label="Réseaux sociaux de la marque"
            hint="Séparez les liens des réseaux par une virgule (,)."
            autocomplete="on"
            labelFor="réseaux-sociaux-marque"
          />
          <UIInput
            v-model.trim="editedCompany.type"
            label="Type"
            autocomplete="on"
            labelFor="type-entreprise-marque"
            required
          />
          <fieldset class="flex flex-col gap-2">
            <h3>Où est basée la marque ?</h3>
            <UIInput
              v-model.trim="editedCompany.city"
              label="Ville"
              autocomplete="on"
              labelFor="ville-marque"
              required
            />
            <UIInput
              v-model.trim="editedCompany.country"
              label="Pays"
              autocomplete="on"
              labelFor="pays-marque"
              required
            />
          </fieldset>
          <fieldset class="flex flex-col gap-2">
            <span>Dans quelles catégories se trouve la marque ?</span>
            <select v-model="editedCompany.categories" multiple required>
              <option
                v-for="(label, key) in CATEGORIES"
                :key="key"
                :value="key"
              >
                {{ label }}
              </option>
            </select>
          </fieldset>
          <fieldset class="flex flex-col gap-2">
            <span>Des mentions spéciales ?</span>
            <select v-model="editedCompany.mentions" multiple>
              <option v-for="(label, key) in MENTIONS" :key="key" :value="key">
                {{ label }}
              </option>
            </select>
          </fieldset>
        </div>
      </template>

      <template #cta>
        <div
          v-if="showToast"
          class="p-4 bg-green-100 border border-green-300 rounded-xl flex flex-col md:flex-row gap-3 items-center justify-between max-w-96 mx-auto"
        >
          <span class="font-medium text-green-800">
            Entreprise mise à jour !
          </span>
          <UIButton
            label="Voir la mise à jour"
            :onClick="goToCompany"
            size="s"
          />
        </div>

        <div class="flex flex-col sm:flex-row gap-6">
          <UIButton label="Modifier" size="m" class="w-full" />
          <UIButton
            label="Retour"
            :onClick="cancel"
            size="m"
            color="grey"
            class="w-full"
          />
        </div>
      </template>
    </UIForm>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { useCompanyStore } from "@/stores/useCompanyStore"
import { CATEGORIES } from "@/composables/categories"
import { MENTIONS } from "@/composables/mentions"
import UIButton from "@/components/UI/UIButton.vue"
import UIForm from "@/components/UI/UIForm.vue"
import UIInput from "@/components/UI/UIInput.vue"
import { useFetchCompanies } from "@/api/fetchCompanies"
import { useRoute, useRouter } from "vue-router"
import type { Company } from "@/types/companies"

const store = useCompanyStore()
const router = useRouter()
const { id } = useRoute().params
const companyId = Array.isArray(id)
  ? (id[0] as Company["id"])
  : (id as Company["id"])

const { retrieve } = useFetchCompanies()
const originalCompany = ref<Company>()
const showToast = ref(false)

const editedCompany = ref<Omit<Company, "id">>({
  name: "",
  founders: [],
  logo: "",
  description: "",
  website: "",
  socials: [],
  type: "company",
  email: "",
  city: "",
  country: "",
  categories: [],
  mentions: [],
})

const foundersInput = ref("")
const socialsInput = ref("")
const logoInput = ref("")

onBeforeMount(async () => {
  const data = await retrieve(companyId)
  if (!data) return
  originalCompany.value = data

  editedCompany.value = { ...data }
  foundersInput.value = data.founders.join(", ")
  socialsInput.value = data.socials.join(", ")
  logoInput.value = data.logo
})

const update = async () => {
  const data = await store.updateCompany(companyId, {
    ...editedCompany.value,
    founders: foundersInput.value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    logo: logoInput.value || editedCompany.value.logo,
    socials: socialsInput.value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  })
  if (data) showToast.value = true
}

const handleFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) editedCompany.value.logo = URL.createObjectURL(file)
}

const goToCompany = () => router.push(`/entreprise/${companyId}`)
const cancel = () => router.back()
</script>
