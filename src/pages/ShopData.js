// ============================================================
// SHOP DATA — produits, prix et frais de livraison
// ============================================================
//
// ⚠ Ce fichier est aussi lu par le serveur de paiement
//   (netlify/functions/create-checkout.mjs) pour vérifier les prix.
//   → N'y importez PAS d'images. Les images se règlent dans Shop.jsx
//     (objet PRODUCT_IMAGES), en face de l'id du produit.
//
// Prix en euros TTC.

export const PRODUCTS = [
  // ── CD ──────────────────────────────────────────────────
  {
    id: 1,
    category: "CD",
    title: "Ndeysan",
    subtitle: "Album 2010",
    price: 15,
    description: "Premier album de Barhan, 10 titres.",
  },
  {
    id: 2,
    category: "CD",
    title: "Mots de Tête",
    subtitle: "Album 2020",
    price: 15,
    description: "Second album, fusion soul et hip-hop.",
  },

  // ── Vinyles ─────────────────────────────────────────────
  {
    id: 3,
    category: "Vinyle",
    title: "Ndeysan",
    subtitle: "Édition vinyle limitée",
    price: 28,
    description: "Pressage limité 180g, gatefold.",
  },
  {
    id: 4,
    category: "Vinyle",
    title: "Mots de Tête",
    subtitle: "Édition vinyle collector",
    price: 32,
    description: "Vinyle coloré, édition numérotée.",
  },

  // ── T-shirts ────────────────────────────────────────────
  {
    id: 5,
    category: "T-shirt",
    title: "Barhan Logo",
    subtitle: "T-shirt noir",
    price: 25,
    description: "100% coton bio, sérigraphie dorée.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    category: "T-shirt",
    title: "Kennen Music",
    subtitle: "T-shirt blanc",
    price: 25,
    description: "100% coton, logo brodé.",
    sizes: ["S", "M", "L", "XL"],
  },
];

export const CATEGORIES = ["Tous", "CD", "Vinyle", "T-shirt"];

// ── Livraison ─────────────────────────────────────────────
// Montants TEMPORAIRES, à ajuster. "countries" = pays acceptés
// pour cette zone (codes à 2 lettres), ajoutez-en si besoin.
const EU = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "DE", "GR", "HU", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"];

export const SHIPPING_ZONES = [
  { id: "FR",    label: "France",           price: 5,  delay: "3 à 5 jours ouvrés",  countries: ["FR", "MC"] },
  { id: "EU",    label: "Union européenne", price: 10, delay: "5 à 10 jours ouvrés", countries: EU },
  { id: "WORLD", label: "Reste du monde",   price: 15, delay: "10 à 20 jours ouvrés",
    countries: ["GB", "CH", "NO", "IS", "US", "CA", "MA", "DZ", "TN", "SN", "MR", "ML", "CI",
                "TD", "CM", "BF", "NE", "GN", "GA", "CG", "CD", "BJ", "TG", "KE", "JP", "AU", "BR"] },
];
