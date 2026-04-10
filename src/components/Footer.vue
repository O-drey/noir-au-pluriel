<template>
  <footer
    class="bg-black py-8 px-6 text-white flex flex-col gap-y-4 lg:flex-row justify-between items-center"
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
              <RouterLink :to="sub.href" class="hover:underline">{{
                sub.name
              }}</RouterLink>
            </li>
            <li v-if="el.value === 'contact'">
              <a
                href="mailto:noiraupluriel@protonmail.com"
                class="normal-case font-normal text-white hover:underline"
                >noiraupluriel@protonmail.com</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logo from "@/assets/logo-noir-au-pluriel-2.svg"
const footerMenu = [
  {
    value: "navigation",
    name: "Navigation",
    submenu: [
      { value: "home", name: "Accueil", href: "/" },
      { value: "about", name: "À propos", href: "/a-propos" },
      {
        value: "add",
        name: "Compléter l'annuaire",
        href: "/formulaire-suggestion",
      },
    ],
  },

  {
    value: "admin",
    name: "Équipe",
    submenu: [
      {
        value: "admin",
        name: "Espace Administrateur",
        href: "/admin",
      },
    ],
  },
  {
    value: "contact",
    name: "Contact",
    submenu: [
      {
        value: "linkedin",
        name: "LinkedIn",
        href: "/#",
      },
      {
        value: "instagram",
        name: "Instagram",
        href: "/#",
      },
      {
        value: "youtube",
        name: "Youtube",
        href: "/#",
      },
    ],
  },
]
</script>
