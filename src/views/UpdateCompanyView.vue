<template>
  <div class="mt-40 my-26 px-4 lg:px-0">
    <UIForm
      name="edit-company"
      autoComplete="on"
      novalidate
      :onSubmit="update"
      class="px-6 py-8 lg:p-12 rounded-4xl bg-white lg:max-w-2xl mx-auto"
    >
      <template #content>
        <h1 class="text-center font-bold text-4xl mb-8">
          Mettre à jour les infos de
          {{
            originalCompany?.name
              ? originalCompany.name
              : "d'une entreprise ou d'une créateurice"
          }}
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
          <div>
            <h3 class="font-medium text-xl mb-2">Logo de la marque</h3>
            <div class="flex flex-col lg:flex-row gap-x-6">
              <UIInput
                label="Déposez un fichier"
                hintBelow="Formats acceptés : .png, .svg, .jpeg"
                autocomplete="on"
                labelFor="logo-marque"
                labelSize="s"
                type="file"
                acceptedFormats="image/png, image/svg, image/jpeg"
                maxSize="500"
                class="lg:max-w-1/2"
                @change="handleFileChange"
              />
              <UIInput
                v-model.trim="logoInput"
                label="Lien du logo"
                labelSize="s"
                autocomplete="on"
                labelFor="logo-marque"
                class="w-full"
                :placeholder="originalCompany?.logo"
              />
            </div>
          </div>

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
          <label for="type-marque" id="type-marque">
            <span class="mb-2 block font-medium text-xl">Type</span>
            <select
              name="suggestion-type"
              id="suggestion-type"
              v-model="editedCompany.type"
              class="font-medium border border-gray-300 rounded-sm py-3.5 px-4"
            >
              <option
                v-for="(label, value) in COMPANIES_TYPES"
                :value="value"
                :key="value"
              >
                {{ label }}
              </option>
            </select>
          </label>
          <UITextarea
            v-model.trim="editedCompany.description"
            label="Que fait de la marque ?"
            autocomplete="on"
            labelFor="description-marque"
            :maxLength="500"
            required
          />

          <fieldset>
            <h3 class="font-medium text-xl mb-2">Où est basée la marque ?</h3>
            <div class="flex flex-col lg:flex-row gap-6">
              <UIInput
                v-model.trim="editedCompany.city"
                label="Ville"
                autocomplete="on"
                labelFor="ville-marque"
                class="w-full"
                labelSize="s"
              />
              <UIInput
                v-model.trim="editedCompany.country"
                label="Pays"
                autocomplete="on"
                labelFor="pays-marque"
                class="w-full"
                labelSize="s"
              />
            </div>
          </fieldset>
          <fieldset>
            <div class="flex flex-col gap-y-4">
              <label class="w-full font-medium text-xl">
                <span> Dans quel(s) secteur(s) se trouve la marque ? * </span>
                <span class="text-sm"> Sélection multiple </span>
                <select
                  v-model="editedCompany.categories"
                  multiple
                  required
                  class="w-full p-2 border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-black mt-2"
                >
                  <option
                    v-for="(label, key) in CATEGORIES"
                    :key="key"
                    :value="key"
                    class="p-1 text-base"
                  >
                    {{ label }}
                  </option>
                  {{
                    CATEGORIES
                  }}
                </select>
              </label>

              <label class="w-full font-medium text-xl mt-4">
                <span class="mb-2">Des mentions spéciales ?</span>
                <span class="text-sm"> Sélection multiple </span>
                <select
                  v-model="editedCompany.mentions"
                  multiple
                  class="w-full p-2 border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-black mt-2"
                >
                  <option
                    v-for="(label, key) in MENTIONS"
                    :key="key"
                    :value="key"
                    class="p-1 text-base"
                  >
                    {{ label }}
                  </option>
                  {{
                    CATEGORIES
                  }}
                </select>
              </label>
            </div>
          </fieldset>
        </div>
      </template>

      <template #cta>
        <div
          v-if="showToast"
          class="p-4 bg-green-100 border border-green-300 rounded-xl flex flex-col md:flex-row gap-3 items-center justify-between max-w-96 mx-auto"
        >
          <span class="font-medium text-green-800">
            Informations mises à jour !
          </span>
          <UIButton
            label="Voir la mise à jour"
            :onClick="goToCompany"
            size="s"
          />
        </div>

        <div class="flex flex-col sm:flex-row gap-6 pt-8">
          <UIButton
            label="Annuler"
            :onClick="cancel"
            size="m"
            color="ghost"
            class="w-full"
          />
          <UIButton label="Modifier" size="m" class="w-full" />
        </div>
      </template>
    </UIForm>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useFetchCompanies } from "@/api/fetchCompanies"
import { useCompanyStore } from "@/stores/useCompanyStore"
import { CATEGORIES } from "@/composables/categories"
import { MENTIONS } from "@/composables/mentions"
import { COMPANIES_TYPES } from "@/types/companies"
import UIButton from "@/components/UI/UIButton.vue"
import UIForm from "@/components/UI/UIForm.vue"
import UIInput from "@/components/UI/UIInput.vue"
import UITextarea from "@/components/UI/UITextarea.vue"
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
  status: "to-check",
  created_date: 0,
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
