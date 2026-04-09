<template>
  <div class="mt-40 my-26 px-4 lg:px-0">
    <UIForm
      name="add-company-creator"
      autoComplete="on"
      novalidate
      :onSubmit="submit"
      class="px-6 py-8 lg:p-12 rounded-4xl bg-white lg:max-w-2xl mx-auto"
    >
      <template #content>
        <div v-if="!suggested">
          <h1 class="text-center font-bold text-3xl lg:text-4xl mb-8">
            <label for="type-marque" id="type-marque">
              Ajouter
              <select
                name="suggestion-type"
                id="suggestion-type"
                v-model="newCompany.type"
                class="text-[#B0630B] marker:stroke-1"
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
              hint="S'il y a plusieurs personnes, séparez-les par une virgule (,)."
              autocomplete="on"
              labelFor="fondateurs-marque"
              required
            />
            <div>
              <h3 class="font-medium text-xl mb-2">Logo de la marque</h3>
              <div class="flex flex-col lg:flex-row gap-x-6">
                <UIInput
                  v-model.trim="newCompany.logo"
                  label="Déposez un fichier"
                  hintBelow="Formats acceptés : .png, .svg, .jpeg"
                  autocomplete="on"
                  labelFor="logo-marque"
                  labelSize="s"
                  type="file"
                  acceptedFormats="image/png, image/svg, image/jpeg"
                  maxSize="500"
                  class="lg:max-w-1/2"
                />
                <UIInput
                  v-model.trim="logoInput"
                  label="Lien du logo"
                  labelSize="s"
                  autocomplete="on"
                  labelFor="logo-marque"
                  class="w-full"
                  @change="fetchLogo"
                />
              </div>
            </div>

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
              label="E-mail du créateur ou de la créatrice"
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
            <UITextarea
              v-model.trim="newCompany.description"
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
                  v-model.trim="newCompany.city"
                  label="Ville"
                  autocomplete="on"
                  labelFor="ville-marque"
                  class="w-full"
                  labelSize="s"
                />
                <UIInput
                  v-model.trim="newCompany.country"
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
                    v-model="newCompany.categories"
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
                    v-model="newCompany.mentions"
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
        </div>
        <div v-else="suggested">
          <h2 class="text-center font-bold text-4xl mb-8">
            Merci pour votre contribution
          </h2>
          <p class="text-center">
            Votre suggestion a été envoyée à l’équipe administratrice pour
            vérification. Une fois validée, elle sera affichée sur le site.
          </p>
        </div>
      </template>
      <template #cta>
        <div class="flex flex-col sm:flex-row gap-6 pt-8">
          <UIButton
            v-if="!suggested"
            label="Annuler"
            :onClick="cancel"
            size="m"
            color="grey"
            class="sm:w-full"
          />
          <UIButton
            v-if="!suggested"
            label="Ajouter"
            size="m"
            class="w-full"
            color="primary"
          />
          <UIButton
            v-if="suggested"
            label="Retour à l'accueil"
            :onClick="cancel"
            size="m"
            color="grey"
            class="sm:w-full"
          />
          <UIButton
            v-if="suggested"
            label="Faire une autre suggestion"
            size="m"
            class="w-full"
            color="primary"
            :onClick="() => ((suggested = false), $router.go(0))"
          />
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
import { COMPANIES_TYPES } from "@/composables/companies.types"
import UIButton from "@/components/UI/UIButton.vue"
import UIForm from "@/components/UI/UIForm.vue"
import UIInput from "@/components/UI/UIInput.vue"
import type { Company } from "@/types/companies"
import { useAdminStore } from "@/stores/useAdminStore"
import { storeToRefs } from "pinia"
import UITextarea from "@/components/UI/UITextarea.vue"

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

const suggested = ref(false)

const submit = async () => {
  if (
    !newCompany.value.categories ||
    !newCompany.value.founders ||
    !newCompany.value.name
  )
    return
  const data = await companyStore.createCompany({
    ...newCompany.value,
    founders: foundersInput.value.split(","),
    logo:
      (logoInput.value || newCompany.value.logo) ?? "https://placehold.co/400",
    socials: socialsInput.value.split(","),
    created_date: Date.now(),
  })
  suggested.value = true

  return data
}

const fetchLogo = async () => {
  const data = (await fetch(logoInput.value)).body
  return data
}

const cancel = () => router.back()
</script>
