import companiesJSON from "@/data/companies.json"
import type { Company } from "@/types/companies"

export const useFetchCompanies = () => {
  const STORAGE_COMPANIES_KEY = "companies"
  const getStoredCompanies = () => {
    const stored = localStorage.getItem(STORAGE_COMPANIES_KEY)
    if (stored) return JSON.parse(stored)
    const initial = companiesJSON.data as Company[]
    localStorage.setItem(STORAGE_COMPANIES_KEY, JSON.stringify(initial))
    return initial
  }

  const saveCompanies = (data: Company[]) => {
    localStorage.setItem(STORAGE_COMPANIES_KEY, JSON.stringify(data))
  }

  const list = async () => {
    try {
      return getStoredCompanies()
    } catch (err) {
      const error = new Error("Propblème pour lister les entreprises", {
        cause: err,
      })
      console.error(error)
    }
  }

  const retrieve = async (id: string) => {
    try {
      const data = getStoredCompanies().find((el: Company) => el.id === id)
      return data
    } catch (err) {
      const error = new Error(`Problème pour récupérer l'entreprise ${id}`, {
        cause: err,
      })
      console.error(error.message)
    }
  }

  const create = async (body: Omit<Company, "id">) => {
    try {
      const data = getStoredCompanies()
      const newCompany: Company = {
        ...body,
        id: Math.random().toString(36).slice(2),
      }
      data.push(newCompany)
      saveCompanies(data)
      return newCompany
    } catch (err) {
      const error = new Error("Propblème pour ajouter l'entreprise", {
        cause: err,
      })
      console.error(error.message)
    }
  }

  const update = async (id: Company["id"], body: Omit<Company, "id">) => {
    try {
      const data = getStoredCompanies()
      const index = data.findIndex((el: Company) => el.id === id)
      if (index === -1) return
      data[index] = { ...data[index], ...body }
      saveCompanies(data)
      return data[index]
    } catch (err) {
      const error = new Error(
        `Propblème pour mettre à jour l'entreprise ${id}`,
        {
          cause: err,
        },
      )
      console.error(error.message)
    }
  }

  const del = async (id: string) => {
    try {
      const data = getStoredCompanies().filter((el: Company) => el.id !== id)
      saveCompanies(data)
      return data
    } catch (err) {
      const error = new Error(`Propblème pour supprimer l'entreprise ${id}`, {
        cause: err,
      })
      console.error(error.message)
    }
  }

  return { list, retrieve, create, update, del }
}
