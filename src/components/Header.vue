<template>
  <header
    class="fixed z-10 w-full flex items-center justify-between gap-4 text-base font-medium py-4 px-8 bg-black"
  >
    <RouterLink to="/">
      <div class="aspect-w-10 aspect-h-1 w-40">
        <img
          :src="logo"
          alt="logo_Noir_au_pluriel"
          aria-label="Accueil"
          class="h-auto w-auto invert"
        />
        <span class="sr-only">Accueil</span>
      </div>
    </RouterLink>
    <div class="flex items-center justify-between gap-4">
      <UIButton href="/a-propos" label="À propos" size="m" />
      <UIButton
        href="/ajouter-entreprise-createur"
        label="Compléter l'annuaire"
        size="m"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import logo from "@/assets/logo-noir-au-pluriel-3.svg"
import UIButton from "./UI/UIButton.vue"
</script>
