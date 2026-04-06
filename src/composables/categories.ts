export type CategoriesKeys =
  | "jewels"
  | "fashion"
  | "hair"
  | "food"
  | "cosmetics"
  | "beauty"
  | "decoration"
  | "wellbeing"
  | "makeup"
  | "art"
  | "workshop"
  | "design"
  | "legal"
  | "property"
  | "bar_restaurant"
  | "perfume"
  | "books"
  | "bags"
  | "tattoos"

export const CATEGORIES: Record<CategoriesKeys, string> = {
  fashion: "Mode",
  jewels: "Bijoux",
  bags: "Maroquinnerie",
  hair: "Cheveux",
  cosmetics: "Cosmétiques",
  perfume: "Parfum",
  makeup: "Maquillage",
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
