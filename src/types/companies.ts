import type { CategoriesKeys } from "../composables/categories"
import type { MentionsKeys } from "../composables/mentions"

export interface Company {
  id: string
  name: string
  founders: string[]
  logo: string
  description: string
  website: string
  socials: string[]
  type: "company" | "creator"
  email?: string
  city: string
  country: string
  categories: CategoriesKeys[]
  mentions: MentionsKeys[]
  status: "active" | "to-check" | "disabled"
  created_date: number
}

export type CompaniesTypesKeys = "company" | "creator"

export const COMPANIES_TYPES: Record<CompaniesTypesKeys, string> = {
  company: "une entreprise",
  creator: "un·e créateur·rice",
}
