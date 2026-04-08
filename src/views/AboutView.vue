<template>
  <div class="my-32 lg:my-20 px-4 lg:p-16">
    <h1 class="sr-only">À propos</h1>
    <p class="lg:max-w-md font-medium text-2xl">
      Noir au pluriel est un annuaire collaboratif et participatif dédié aux
      entreprises
      <span class="whitespace-nowrap italic">black-owned</span> francophones.
    </p>

    <section
      id="mission"
      class="flex flex-col gap-8 lg:flex-row lg:gap-24 items-center justify-end lg:pr-48 mt-8 lg:mt-0 mb-16 lg:mb-24"
    >
      <div class="lg:max-w-md font-medium">
        <h2 class="text-2xl font-semibold mb-2">Notre mission</h2>
        <p>
          Donner de la visibilité, soutenir et connecter les entrepreneurs,
          créateurs et professionnels issus de la diaspora africaine et
          afro-descendante, tout en vous offrant une ressource fiable pour
          soutenir ces initiatives.
        </p>
      </div>
      <div class="aspect-w-4 aspect-w-3 lg:max-w-3/7">
        <img :src="imgMission" alt="" class="h-full w-full" />
      </div>
    </section>
    <section
      id="pourquoi-site"
      class="flex flex-col gap-8 lg:flex-row lg:gap-24 items-center justify-center mb-16 lg:mb-32"
    >
      <div
        class="aspect-w-4 aspect-w-3 lg:max-w-3/7 rounded-4xl overflow-hidden -rotate-2 hidden lg:block"
      >
        <img :src="imgWhy" alt="" />
      </div>
      <div class="lg:max-w-md">
        <h2 class="text-2xl font-semibold mb-2">
          Pourquoi j’ai créé ce site ?
        </h2>
        <p>
          Mes proches et moi-même cherchions à consommer plus black-owned pour
          nos produits capillaires et cosmétiques, mais nous avons déjà été
          victimes du marketing en pensant soutenir une personne
          afro-descendante. Face à la multiplication des labels “inspirés” ou ,
          il est parfois compliqué de distinguer les entreprises réellement
          black-owned. À cela s’ajoute, la difficulté des entreprises
          black-owned à se faire connaître, notamment dans les médias et
          plateformes mainstream. Certains secteurs (mode, beauté, gastronomie,
          etc.) voient leurs créations ou savoir-faire repris sans
          reconnaissance ni rétribution équitable. C’est pour cela que Noir au
          pluriel existe. Pour faciliter l’accès et le soutien aux entreprises
          alignées avec nos valeurs personelles.
        </p>
      </div>
      <div
        class="aspect-w-4 aspect-w-3 lg:max-w-3/7 rounded-4xl overflow-hidden rotate-2 lg:hidden"
      >
        <img :src="imgWhy" alt="" />
      </div>
    </section>
    <section id="fonctionnement" class="mb-16 lg:mb-32">
      <h2 class="text-2xl font-semibold mb-2">Comment ça marche ?</h2>
      <p>
        Cette plateforme étant collaborative, vous pouvez suggérer des
        entreprises sans avoir à vous connecter :
      </p>
      <ul>
        <li v-for="step in how_it_works" class="list-decimal list-inside">
          {{ step }}
        </li>
      </ul>
      <div class="pt-8">
        <UIButton
          href="/ajouter-entreprise-createur"
          label="Proposez une entreprise"
          size="l"
          class="text-center"
        />
      </div>
    </section>
    <section
      id="engagements"
      class="flex flex-col gap-8 lg:flex-row lg:gap-24 items-center mb-16 lg:mb-32"
    >
      <div
        class="hidden aspect-w-4 aspect-w-3 lg:max-w-2/7 rounded-4xl overflow-hidden lg:block"
      >
        <img :src="imgEngagements" alt="" class="h-full w-full" />
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2">Nos engagements</h2>
        <ul class="flex flex-col lg:flex-row gap-4">
          <li
            v-for="engagement in engagements"
            class="p-4 bg-[#B0630B]/20 rounded-2xl h-fit lg:w-1/3"
          >
            <span class="font-semibold mb-2">{{ engagement.title }}</span>
            <p>{{ engagement.text }}</p>
          </li>
        </ul>
      </div>
      <div
        class="aspect-w-4 aspect-w-3 lg:max-w-3/7 rounded-4xl overflow-hidden lg:hidden"
      >
        <img :src="imgEngagements" alt="" class="h-full w-full" />
      </div>
    </section>
    <section
      id="rejoindre"
      class="flex flex-col gap-8 lg:flex-row lg:gap-24 items-center justify-center"
    >
      <div class="font-medium">
        <h2 class="text-2xl font-semibold mb-2">Rejoignez le mouvement</h2>
        <p>En soutenant les entreprises black-owned, vous contribuez à :</p>
        <ul class="flex flex-col lg:flex-row gap-4 pt-4">
          <div v-for="step in gains" class="p-4 bg-[#B0630B]/20 rounded-2xl">
            <li>{{ step }}</li>
          </div>
        </ul>
        <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 pt-8">
          <UIButton
            href="/"
            label="Découvrez les entreprises"
            size="l"
            class="text-center"
          />
        </div>
      </div>
      <div
        class="aspect-w-4 aspect-w-3 lg:max-w-2/5 rounded-4xl overflow-hidden"
      >
        <img :src="imgJoin" alt="" class="h-full w-full" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import UIButton from "@/components/UI/UIButton.vue"

import imgMission from "@/assets/mission_1.webp"
import imgWhy from "@/assets/why.webp"
import imgEngagements from "@/assets/engagements.webp"
import imgJoin from "@/assets/join-movement.webp"

const how_it_works = [
  "Suggérez une entreprise via notre formulaire (sans inscription).",
  "Notre équipe vérifie que l’entreprise est bien black-owned et qu’elle respecte nos critères (éthique, transparence, etc.).",
  "Validation et publication : Une fois approuvée, l’entreprise est ajoutée à l’annuaire et devient visible pour tous.",
]

const engagements = [
  {
    title: "Transparence",
    value: "transparency",
    text: "Chaque entreprise listée est vérifiée par notre équipe.",
  },
  {
    title: "Inclusivité",
    value: "inclusivity",
    text: "Nous accueillons toutes les entreprises issues de la diaspora africaine et afro-descendante, quel que soit leur secteur ou leur taille.",
  },
  {
    title: "Collaboration",
    value: "collaboration",
    text: "Noir au pluriel est un projet collaboratif. Votre participation (suggestions, signalements, partages) est essentielle pour enrichir la plateforme.",
  },
]

const gains = [
  "Réduire les inégalités économiques",
  "Valoriser le savoir-faire des entrepreneurs afro-descendants",
  "Construire une économie plus juste et inclusive",
]
</script>
