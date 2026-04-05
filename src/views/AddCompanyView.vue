<template>
  <div>
    <UIForm
      name="add-company-creator"
      autoComplete="on"
      novalidate
      :onSubmit="submit"
      class="p-12 border rounded-2xl"
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
            label="Fontateurices de la marque"
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
            <span>Dans quelle catégories se trouve la marque ?</span>
            <select v-model="newCompany.categories" multiple required>
              <option
                v-for="(label, key) in CATEGORIES"
                :key="key"
                :value="key"
              >
                {{ label }}
              </option>
              {{
                CATEGORIES
              }}
            </select>
          </fieldset>
          <fieldset>
            <span>Des mentions spéciales ?</span>

            <select v-model="newCompany.mentions" multiple>
              <option v-for="(label, key) in MENTIONS" :key="key" :value="key">
                {{ label }}
              </option>
              {{
                CATEGORIES
              }}
            </select>
          </fieldset>
        </div>
      </template>
      <template #cta>
        <div class="flex flex-col sm:flex-row gap-6">
          <UIButton label="Ajouter" size="m" class="w-full" />
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
import { ref } from "vue"
import { useCompanyStore } from "@/stores/useCompanyStore"
import { CATEGORIES } from "@/composables/categories"
import { MENTIONS } from "@/composables/mentions"
import UIButton from "@/components/UI/UIButton.vue"
import UIForm from "@/components/UI/UIForm.vue"
import UIInput from "@/components/UI/UIInput.vue"

const store = useCompanyStore()

const newCompany = ref({
  name: "",
  founders: [],
  logo: "",
  description: "",
  website: "",
  socials: [],
  type: "company" as "company" | "creator",
  email: "",
  city: "",
  country: "",
  categories: [],
  mentions: [],
})

const foundersInput = ref("")
const socialsInput = ref("")
const logoInput = ref("")

const submit = async () => {
  const data = await store.createCompany({
    ...newCompany.value,
    founders: foundersInput.value.split(","),
    logo: logoInput.value || newCompany.value.logo,
    socials: socialsInput.value.split(","),
  })
  console.log("Yeah créé ! : ", data)
  return data
}

const fetchLogo = async () => {
  const data = (await fetch(logoInput.value)).body
  console.log(data)
  return data
}
const cancel = () => console.log("Retour")
</script>
