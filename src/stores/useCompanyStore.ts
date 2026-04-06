import { defineStore } from "pinia"
import { ref } from "vue"
import { useFetchCompanies } from "@/api/fetchCompanies"
import type { Company } from "@/types/companies"

export const useCompanyStore = defineStore("company-store", () => {
  const { list, create, update, del } = useFetchCompanies()
  const companies = ref<Company[]>([])

  const fetchCompanies = async () => (companies.value = (await list()) ?? [])

  const createCompany = async (body: Omit<Company, "id">) => {
    const newCompany = await create(body)
    if (newCompany) companies.value.push(newCompany)
    return newCompany
  }

  const updateCompany = async (
    id: Company["id"],
    body: Omit<Company, "id">,
  ) => {
    const data = await update(id, body)
    if (!data) return
    const index = companies.value.findIndex((c) => c.id === id)
    if (index !== -1) companies.value[index] = data
    return data
  }

  const deleteCompany = async (id: Company["id"]) => {
    const data = await del(id)
    if (!data) return
    companies.value = data
    return data
  }

  return {
    companies,
    fetchCompanies,
    createCompany,
    updateCompany,
    deleteCompany,
  }
})
