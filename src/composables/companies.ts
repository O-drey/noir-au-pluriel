import type { Company } from "@/types/companies"

export const sortCompanies = () => {
  let aDate
  let bDate
  const sortCompaniesByNameAscending = (companies: Company[]) =>
    companies.sort((a, b) => a.name.toUpperCase().localeCompare(b.name))

  const sortCompaniesByNameDescending = (companies: Company[]) =>
    companies.sort((a, b) => b.name.toUpperCase().localeCompare(a.name))

  const sortCompaniesByNewest = (companies: Company[]) =>
    companies.sort((a, b) => {
      aDate = new Date(a.created_date).toString()
      bDate = new Date(b.created_date).toString()

      return bDate.localeCompare(aDate)
    })

  const sortCompaniesByOldest = (companies: Company[]) =>
    companies.sort((a, b) => {
      aDate = new Date(a.created_date).toString()
      bDate = new Date(b.created_date).toString()

      return aDate.localeCompare(bDate)
    })

  return {
    sortCompaniesByNameAscending,
    sortCompaniesByNameDescending,
    sortCompaniesByNewest,
    sortCompaniesByOldest,
  }
}
