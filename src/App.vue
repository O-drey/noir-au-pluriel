<script setup lang="ts">
import Header from "./components/Header.vue"
import { RouterView } from "vue-router"
import { useCompanyStore } from "./stores/useCompanyStore"
import Footer from "./components/Footer.vue"

const store = useCompanyStore()
store.fetchCompanies()
</script>

<template>
  <Suspense>
    <div class="wrapper flex flex-col min-h-screen">
      <Header />
      <main class="flex-1 p-4 md:p-16 py-120">
        <RouterView />
      </main>
      <Footer />
    </div>
  </Suspense>
</template>
