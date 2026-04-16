<script setup lang="ts">
import { RouterView } from "vue-router"
import { useCompanyStore } from "./stores/useCompanyStore"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import UISvgSprites from "./components/UI/UISvgSprites.vue"

const store = useCompanyStore()
store.fetchCompanies()
</script>

<template>
  <Suspense>
    <div class="wrapper flex flex-col min-h-screen bg-sable-100">
      <UISvgSprites />
      <Header />
      <main class="flex-1">
        <RouterView />
      </main>
      <Footer />
    </div>
  </Suspense>
</template>
