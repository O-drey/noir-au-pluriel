<template>
  <footer
    class="bg-black py-8 px-6 text-white flex flex-col lg:flex-row justify-between items-center"
  >
    <div class="w-full lg:w-1/5">
      <div class="mb-4">
        <img :src="logo" alt="" class="invert -ml-4" />
      </div>
      <p>
        Noir au pluriel est un projet collaboratif et participatif qui souhaite
        soutenir la diaspora afro-descendante francophone.
      </p>
    </div>
    <div class="w-full lg:w-3/5">
      <ul class="grid lg:grid-cols-3 gap-6">
        <li
          v-for="el in footerMenu"
          :key="el.value"
          class="uppercase font-bold text-gray-400"
        >
          {{ el.name }}
          <ul v-if="el.submenu">
            <li
              v-for="sub in el.submenu"
              :key="el.value"
              class="normal-case font-normal text-white"
            >
              <RouterLink :to="sub.href">{{ sub.name }}</RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logo from "@/assets/logo-noir-au-pluriel-3.svg"
const footerMenu = [
  {
    value: "project",
    name: "Le projet",
    submenu: [
      { value: "home", name: "Accueil", href: "/" },
      { value: "about", name: "À propos", href: "/a-propos" },
    ],
  },
  {
    value: "add",
    name: "Compléter l'annuaire",
    submenu: [
      {
        value: "add",
        name: "Compléter l'annuaire",
        href: "/ajouter-entreprise-createur",
      },
    ],
  },
  {
    value: "admin",
    name: "",
    submenu: [
      {
        value: "admin",
        name: "Espace Administrateur",
        href: "/admin",
      },
    ],
  },
]
</script>
