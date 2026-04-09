import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/a-propos",
      name: "a-propos",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/formulaire-suggestion",
      name: "formulaire-suggestion",
      component: () => import("@/views/AddCompanyView.vue"),
    },
    {
      path: "/entreprise/:id",
      name: "company-profile",
      component: () => import("@/views/CompanyProfileView.vue"),
    },
    {
      path: "/admin",
      name: "admin-space",
      component: () => import("@/views/AdminView.vue"),
    },
    {
      path: "/admin/entreprise/:id/edit",
      name: "edit-company",
      component: () => import("@/views/UpdateCompanyView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
})

export default router
