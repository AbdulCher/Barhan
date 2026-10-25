// ============================================================
// SHOP DATA — produits de la boutique
// Remplacez les image: par vos vrais chemins d'images
// ============================================================

export const PRODUCTS = [
  // ── CD ──────────────────────────────────────────────────
  {
    id: 1,
    category: "CD",
    title: "Ndeysan",
    subtitle: "Album 2010",
    price: 15,
    image: null, // "/assets/shop/cd-ndeysan.jpg"
    description: "Premier album de Barhan, 10 titres.",
    bandcampUrl: "https://bandcamp.com",
  },
  {
    id: 2,
    category: "CD",
    title: "Mots de Tête",
    subtitle: "Album 2020",
    price: 15,
    image: null,
    description: "Second album, fusion soul et hip-hop.",
    bandcampUrl: "https://bandcamp.com",
  },

  // ── Vinyles ─────────────────────────────────────────────
  {
    id: 3,
    category: "Vinyle",
    title: "Ndeysan",
    subtitle: "Édition vinyle limitée",
    price: 28,
    image: null,
    description: "Pressage limité 180g, gatefold.",
    bandcampUrl: "https://bandcamp.com",
  },
  {
    id: 4,
    category: "Vinyle",
    title: "Mots de Tête",
    subtitle: "Édition vinyle collector",
    price: 32,
    image: null,
    description: "Vinyle coloré, édition numérotée.",
    bandcampUrl: "https://bandcamp.com",
  },

  // ── T-shirts ────────────────────────────────────────────
  {
    id: 5,
    category: "T-shirt",
    title: "Barhan Logo",
    subtitle: "T-shirt noir",
    price: 25,
    image: null,
    description: "100% coton bio, sérigraphie dorée.",
    sizes: ["S", "M", "L", "XL"],
    bandcampUrl: "https://bandcamp.com",
  },
  {
    id: 6,
    category: "T-shirt",
    title: "Kennen Music",
    subtitle: "T-shirt blanc",
    price: 25,
    image: null,
    description: "100% coton, logo brodé.",
    sizes: ["S", "M", "L", "XL"],
    bandcampUrl: "https://bandcamp.com",
  },
];

export const CATEGORIES = ["Tous", "CD", "Vinyle", "T-shirt"];