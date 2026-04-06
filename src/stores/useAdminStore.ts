import { defineStore } from "pinia"
import { ref } from "vue"

export const useAdminStore = defineStore("admin-store", () => {
  const adminIsConnected = ref<boolean>(!!localStorage.getItem("Bearer_token"))

  const login = (token: string) => {
    localStorage.setItem("Bearer_token", token)
    adminIsConnected.value = true
  }

  const logout = () => {
    localStorage.removeItem("Bearer_token")
    adminIsConnected.value = false
  }

  return {
    adminIsConnected,
    login,
    logout,
  }
})
