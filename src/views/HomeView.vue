<template>
  <div class="space-y-12 mb-12">
    <div class="rounded-2xl bg-linear-500 from-amber-600 to-amber-800 p-12">
      <h1>Noir au pluriel</h1>
      <span>L'annnuaire des marques black-owned francophones.</span>
      <p>
        Vous souhaitez soutenir des entreprises et créateurices
        afro-descendantes ? Consultez l'annuaire, vous trouverez probablement ce
        quelque chose qui fera battre votre cœur !
      </p>
    </div>

    <div class="space-y-8">
      <nav>
        <ul
          class="flex flex-col gap-8 text-base font-medium sm:flex-row bg-gray-100 rounded-xl p-4 justify-center"
        >
          <li v-for="item in menu" :key="item.value">
            <RouterLink :to="`/${item.value}`">{{ item.name }}</RouterLink>
          </li>
        </ul>
      </nav>
      <CompaniesList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { menu } from "@/composables/menu"
import CompaniesList from "../components/CompaniesList.vue"
</script>

<style scoped></style>
