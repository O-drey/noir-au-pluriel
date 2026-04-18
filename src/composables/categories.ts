export type CategoriesKeys =
  | "fashion"
  | "hair"
  | "food"
  | "cosmetics"
  | "beauty"
  | "decoration"
  | "wellbeing"
  | "art"
  | "workshop"
  | "design"
  | "legal"
  | "property"
  | "bar_restaurant"
  | "perfume"
  | "books"
  | "tattoos"

export const CATEGORIES: Record<CategoriesKeys, string> = {
  fashion: "Mode",
  hair: "Cheveux",
  cosmetics: "Cosmétiques",
  perfume: "Parfum",
  beauty: "Beauté",
  wellbeing: "Bien-être",
  food: "Nourriture",
  decoration: "Déco",
  art: "Art",
  design: "Design",
  workshop: "Ateliers",
  legal: "Legal",
  property: "Immobilier",
  bar_restaurant: "Bar/Restaurant",
  books: "Livres/ Médias",
  tattoos: "Tatouage",
}
