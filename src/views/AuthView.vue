<template>
  <div class="my-32 lg:my-20 px-4 lg:p-16">
    <div
      class="max-w-xl flex flex-col gap-4 rounded-2xl mx-auto px-8 py-10 bg-white"
    >
      <UIForm name="formulaire-authentification" :onSubmit="login">
        <template #content>
          <h1 class="text-center font-bold text-2xl mb-8">
            Connexion espace Administrateur
          </h1>
          <div class="flex flex-col gap-6">
            <UIInput
              label="Identifiant"
              label-for="identifiant"
              v-model.trim="identifiant"
              required
            />
            <UIInput
              label="Mot de passe"
              type="password"
              label-for="password"
              v-model.trim="password"
              required
            />
          </div>
        </template>
        <template #cta>
          <div class="flex flex-col pt-4 gap-4">
            <span v-if="errorMsg">{{ errorMsg }}</span>
            <UIButton
              label="Connexion"
              type="submit"
              class="block text-rignt w-full lg:w-fit"
              size="l"
            />
          </div>
        </template>
      </UIForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAdminStore } from "@/stores/useAdminStore"
import UIForm from "@/components/UI/UIForm.vue"
import UIInput from "@/components/UI/UIInput.vue"
import UIButton from "@/components/UI/UIButton.vue"

const adminStore = useAdminStore()
const identifiant = ref<string>("")
const password = ref<string>("")
const bearerToken = ref<string>("")
const errorMsg = ref<string>("")
const login = () => {
  if (
    identifiant.value !== import.meta.env.VITE_ADMIN_IDENTIFIANT ||
    password.value !== import.meta.env.VITE_ADMIN_PASSWORD
  )
    return (errorMsg.value = "Les identifiants ne sont pas correctes")

  bearerToken.value = import.meta.env.VITE_BEARER_TOKEN
  adminStore.login(bearerToken.value)
}
</script>
