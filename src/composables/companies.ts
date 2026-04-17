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
      const result = b.created_date - a.created_date
      return result
    })

  const sortCompaniesByOldest = (companies: Company[]) =>
    companies.sort((a, b) => {
      const result = a.created_date - b.created_date
      return result
    })

  return {
    sortCompaniesByNameAscending,
    sortCompaniesByNameDescending,
    sortCompaniesByNewest,
    sortCompaniesByOldest,
  }
}
