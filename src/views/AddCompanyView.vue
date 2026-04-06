<template>
  <div>
    <UIForm
      name="add-company-creator"
      autoComplete="on"
      novalidate
      :onSubmit="submit"
      class="px-6 py-8 lg:p-12 border rounded-2xl"
    >
      <template #content>
        <h1 class="center font-bold text-4xl mb-8">
          Ajouter une entreprise ou une créateurice
        </h1>

        <div class="flex flex-col gap-8 mt-8">
          <UIInput
            v-model.trim="newCompany.name"
            label="Nom de la marque"
            autocomplete="on"
            labelFor="nom-marque"
            required
          />
          <UIInput
            v-model.trim="foundersInput"
            label="Fontateurs/Fondatrices de la marque"
            hint="S'il y a plusieurs fontateurices, séparez-les par une virgule (,)."
            autocomplete="on"
            labelFor="fondateurs-marque"
            required
          />
          <UIInput
            v-model.trim="newCompany.logo"
            label="Logo de la marque"
            hint="Le logo carré de la marque."
            autocomplete="on"
            labelFor="logo-marque"
            type="file"
          />
          <UIInput
            v-model.trim="logoInput"
            label="Lien du logo"
            autocomplete="on"
            labelFor="logo-marque"
            @change="fetchLogo"
          />
          <UIInput
            v-model.trim="newCompany.description"
            label="Que fait de la marque ?"
            autocomplete="on"
            labelFor="description-marque"
            max-length="500"
            required
          />
          <UIInput
            v-model.trim="newCompany.website"
            label="Site web"
            autocomplete="on"
            labelFor="site-marque"
            required
          />
          <UIInput
            v-if="newCompany.type === 'creator'"
            v-model.trim="newCompany.email"
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
            v-model.trim="newCompany.type"
            label="Type"
            autocomplete="on"
            labelFor="type-entreprise-marque"
            required
          />
          <fieldset>
            <h3>Où est basée la marque ?</h3>
            <UIInput
              v-model.trim="newCompany.city"
              label="Ville"
              autocomplete="on"
              labelFor="ville-marque"
              required
            />
            <UIInput
              v-model.trim="newCompany.country"
              label="Pays"
              autocomplete="on"
              labelFor="pays-marque"
              required
            />
          </fieldset>
          <fieldset>
            <label class="w-full font-medium text-xl mb-2">
              <div class="mb-2">
                Dans quelle catégories se trouve la marque ?
              </div>
              <select
                v-model="newCompany.categories"
                multiple
                required
                class="lg:w-1/2 w-full p-2 border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-black"
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

            <label class="w-full font-medium text-xl">
              <div class="mb-2">Des mentions spéciales ?</div>
              <select
                v-model="newCompany.mentions"
                multiple
                class="lg:w-1/2 w-full p-2 border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-black"
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
          </fieldset>
        </div>
      </template>
      <template #cta>
        <div class="flex flex-col sm:flex-row gap-6">
          <UIButton
            label="Retour"
            :onClick="cancel"
            size="m"
            color="grey"
            class="sm:w-full"
          />
          <UIButton label="Ajouter" size="m" class="w-full" color="primary" />
        </div>
      </template>
    </UIForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useCompanyStore } from "@/stores/useCompanyStore"
import { CATEGORIES } from "@/composables/categories"
import { MENTIONS } from "@/composables/mentions"
import UIButton from "@/components/UI/UIButton.vue"
import UIForm from "@/components/UI/UIForm.vue"
import UIInput from "@/components/UI/UIInput.vue"
import type { Company } from "@/types/companies"
import { useAdminStore } from "@/stores/useAdminStore"
import { storeToRefs } from "pinia"

const companyStore = useCompanyStore()
const adminStore = useAdminStore()
const { adminIsConnected } = storeToRefs(adminStore)

const newCompany = ref({
  name: "",
  founders: [],
  logo: "",
  description: "",
  website: "",
  socials: [],
  type: "company" as Company["type"],
  email: "",
  city: "",
  country: "",
  categories: [],
  mentions: [],
  status: adminIsConnected.value ? "active" : ("to-check" as Company["status"]),
})

const router = useRouter()

const foundersInput = ref("")
const socialsInput = ref("")
const logoInput = ref("")

const submit = async () => {
  const data = await companyStore.createCompany({
    ...newCompany.value,
    founders: foundersInput.value.split(","),
    logo: logoInput.value || newCompany.value.logo,
    socials: socialsInput.value.split(","),
  })
  console.log("Yeah créé ! : ", data)
  router.replace({ path: "/" })

  return data
}

const fetchLogo = async () => {
  const data = (await fetch(logoInput.value)).body
  console.log(data)
  return data
}

const cancel = () => router.back()
</script>
