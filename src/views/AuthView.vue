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
              v-model.trim="passowrd"
              required
            />
          </div>
        </template>
        <template #cta>
          <div class="flex justify-end">
            <UIButton
              label="Connexion"
              type="submit"
              class="block mt-8 text-rignt w-full lg:w-fit"
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
const passowrd = ref<string>("")
const bearerToken = ref<string>("abc")

const login = () => {
  if (
    !identifiant.value.match(import.meta.env.ADMIN_IDENTIFIANT) ||
    !passowrd.value.match(import.meta.env.ADMIN_PASSWORD)
  )
    return
  adminStore.login(bearerToken.value)
}
</script>
