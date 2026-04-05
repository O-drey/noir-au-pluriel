import { defineStore } from "pinia"
import { ref } from "vue"
import { useFetchCompanies } from "@/api/fetchCompanies"
import type { Company } from "@/types/companies"

export const useCompanyStore = defineStore("company-store", () => {
  const { list, create } = useFetchCompanies()
  const companies = ref<Company[]>([])

  const fetchCompanies = async () => (companies.value = (await list()) ?? [])

  const createCompany = async (body: Omit<Company, "id">) => {
    const newCompany = await create(body)
    if (newCompany) companies.value.push(newCompany)
    return newCompany
  }

  return { companies, fetchCompanies, createCompany }
})
