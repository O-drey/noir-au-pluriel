<template>
  <header
    class="fixed z-10 w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-base font-medium p-4 lg:px-8 bg-white/50 backdrop-blur-sm border-b border-b-white"
  >
    <!-- Mobile -->
    <div
      :class="[
        'flex items-center justify-between lg:hidden ',
        { 'border-b border-b-gray-300': isOpen },
      ]"
    >
      <RouterLink to="/">
        <div class="aspect-w-10 aspect-h-1 w-40 lg:hidden">
          <img
            :src="logo"
            alt="logo_Noir_au_pluriel"
            aria-label="Accueil"
            class="h-auto w-auto"
          />
          <span class="sr-only">Accueil</span>
        </div>
      </RouterLink>
      <UIButton
        :label="isOpen ? 'Fermer' : 'Menu'"
        class="lg:hidden"
        color="ghost"
        @click="isOpen = !isOpen"
      />
    </div>
    <nav
      v-if="isOpen"
      class="flex flex-col justify-between lg:hidden text-center"
    >
      <UIButton
        href="/"
        label="Accueil"
        color="ghost"
        :class="{ 'bg-[#B0630B]/20': $route.path === '/' }"
      />
      <UIButton
        v-if="adminIsConnected"
        label="Se déconnecter"
        color="ghost"
        :onClick="logout"
      />
      <UIButton
        href="/a-propos"
        label="À propos"
        color="ghost"
        :class="{ 'bg-[#B0630B]/20': $route.path === '/a-propos' }"
      />
      <UIButton
        href="/ajouter-entreprise-createur"
        label="Compléter l'annuaire"
      />
    </nav>

    <!-- Desktop -->

    <RouterLink to="/" class="hidden lg:block">
      <div class="aspect-w-10 aspect-h-1 w-40">
        <img
          :src="logo"
          alt="logo_Noir_au_pluriel"
          aria-label="Accueil"
          class="h-auto w-auto"
        />
        <span class="sr-only">Accueil</span>
      </div>
    </RouterLink>

    <div
      class="hidden lg:flex lg:items-center flex-col lg:flex-row justify-between gap-4"
    >
      <UIButton
        v-if="adminIsConnected"
        label="Se déconnecter"
        size="s"
        color="ghost"
        :onClick="logout"
        class="text-center"
      />
      <UIButton
        href="/a-propos"
        label="À propos"
        size="m"
        color="ghost"
        :class="{ 'bg-[#B0630B]/20': $route.path === '/a-propos' }"
      />
      <UIButton
        href="/ajouter-entreprise-createur"
        label="Compléter l'annuaire"
        size="m"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue"
import logo from "@/assets/logo-noir-au-pluriel-3.svg"
import UIButton from "./UI/UIButton.vue"
import { storeToRefs } from "pinia"
import { useAdminStore } from "@/stores/useAdminStore"
import { useRouter } from "vue-router"

const adminStore = useAdminStore()
const { adminIsConnected } = storeToRefs(adminStore)
const logout = () => adminStore.logout()

const isOpen = ref(false)
const router = useRouter()
const path = ref("")
path.value = router.currentRoute.value.path
</script>
