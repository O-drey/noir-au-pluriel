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
  | "bar_restaurant_salon"
  | "perfume"
  | "books"
  | "bags"
  | "tattoos"

export const CATEGORIES: Record<CategoriesKeys, string> = {
  jewels: "Bijoux",
  fashion: "Mode",
  hair: "Cheveux",
  food: "Nourriture",
  cosmetics: "Cosmétique",
  beauty: "Beauté",
  decoration: "Déco",
  wellbeing: "Bien-être",
  makeup: "Maquillage",
  art: "Art",
  workshop: "Ateliers",
  design: "Design",
  legal: "Legal",
  property: "Immobilier",
  bar_restaurant_salon: "Bars/Restaurants/Salon de thé ou coffee shop",
  perfume: "Parfum",
  books: "Livres/ Médias",
  bags: "Maroquinnerie",
  tattoos: "Tatouage",
}
