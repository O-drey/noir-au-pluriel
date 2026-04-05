export type MentionsKeys =
  | "woman_owned"
  | "handcraft"
  | "sustainale"
  | "family"
  | "plus_size"
  | "luxe"
  | "cruelty_free"
  | "queer"

export const MENTIONS: Record<MentionsKeys, string> = {
  woman_owned: "Woman owned",
  handcraft: "Fait main",
  sustainale: "Éco-responsable",
  family: "Entreprise familiale",
  plus_size: "Grantes tailles",
  luxe: "Luxe",
  cruelty_free: "Cruelty free",
  queer: "LGBTQIA+",
}
