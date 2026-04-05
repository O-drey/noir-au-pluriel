import companiesJSON from "@/data/companies.json"
import type { Company } from "@/types/companies"
export const useFetchCompanies = () => {
  const baseURL = `${import.meta.env.BASE_URL_DEV}/companies`

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
      // const data = await fetch(baseURL, { headers: {} })
      // if (!data.ok) {
      //   throw new Error(`Statut de réponse : ${data.status}`)
      // }
      // const result = data.json()
      // console.dir("list result : ", result)
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
      // const data = await fetch(`${baseURL}/${id}`)
      // if (!data.ok) {
      //   throw new Error(`Statut de réponse : ${data.status}`)
      // }
      // const result = data?.json()
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
      // const data = await fetch(`${baseURL}`, { body, method: "POST" })
      // if (!data.ok) {
      //   throw new Error(`Statut de réponse : ${data.status}`)
      // }
      // const result = data.json()
      // console.dir("create result : ", result)
      // return result

      const data = getStoredCompanies()
      const newCompany: Company = {
        ...body,
        id: Math.random().toString(36).slice(2),
      }
      data.push(newCompany)
      console.dir("create company data : ", data)
      saveCompanies(data)
      return newCompany
    } catch (err) {
      const error = new Error("Propblème pour ajouter l'entreprise", {
        cause: err,
      })
      console.error(error.message)
    }
  }

  //ADAPTER
  const update = async (id: string, body: FormData) => {
    try {
      const data = await fetch(`${baseURL}/${id}`, { body, method: "PATCH" })
      if (!data.ok) {
        throw new Error(`Statut de réponse : ${data.status}`)
      }
      const result = await data.json()
      console.dir("update result : ", result)
      return result as Company
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
      // const data = await fetch(`${baseURL}/${id}`, { method: "DELETE" })
      // if (!data.ok) {
      //   throw new Error(`Statut de réponse : ${data.status}`)
      // }
      // const result = data.json()
      // console.dir("del result : ", result)
      // return result

      const data = getStoredCompanies() as Company[]
      const index = data.findIndex((el) => el.id === id)
      data?.splice(index, 1)
      console.dir("create company data : ", data)
      return data as Company[]
    } catch (err) {
      const error = new Error(`Propblème pour supprimer l'entreprise ${id}`, {
        cause: err,
      })
      console.error(error.message)
    }
  }

  return { list, retrieve, create, update, del }
}
