<template>
  <div class="my-32 lg:my-20 px-4 lg:p-16">
    <h1>Nous ne trouvons pas cette page</h1>
    <p>
      Faites
      <RouterLink to="/" class="underline">une autre recherche</RouterLink> ou
      <RouterLink to="/formulaire-suggestion" class="underline"
        >complétez l'annuaire</RouterLink
      >
    </p>
  </div>
</template>
<script lang="ts" setup>
import { RouterLink } from "vue-router"
</script>
