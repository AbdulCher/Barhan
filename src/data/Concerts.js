// ============================================================
// CONCERTS — le seul fichier à modifier pour ajouter une date
// ============================================================
//
// Pour ajouter un concert : copiez un bloc { ... }, collez-le dans la liste
// (n'importe où, l'ordre n'a pas d'importance) et changez les infos.
//
// - date  : au format "AAAA-MM-JJ"  (ex. "2026-11-15" pour le 15 novembre 2026)
// - venue : nom de la salle ou du festival
// - city  : ville, pays
// - link  : lien billetterie (ou null s'il n'y en a pas)
// - note  : petite précision facultative (ex. "Première partie de …", "Festival")
//           supprimez la ligne si inutile
//
// Le site range tout seul chaque concert dans « À venir » ou « Passés »
// selon la date du jour. Rien d'autre à faire.
//
// ⚠ Les deux concerts passés ci-dessous sont des EXEMPLES à remplacer
//   par vos vraies dates avant la mise en ligne.

export const CONCERTS = [
  // ── À venir ────────────────────────────────────────────────
  {
    date: "2027-04-17",
    venue: "A venir",
    city: "Paris, France",
    link: null,
  },
  {
    date: "2027-06-21",
    venue: "A venir",
    city: null,
    link: null,
  },
  {
    date: "2027-07-20",
    venue: "A venir",
    city: null,
    link: null,
  },

  // ── Passés (EXEMPLES à remplacer) ─────────────────────────
  {
    date: "2025-07-25",
    venue: "Décroissance Festival",
    city: "Saint-Maixent-l'Ecole, France",
    
  },
  {
    date: "2025-06-07",
    venue: "Festival International de Musique",
    city: "Belfort, France",
  },
  {
    date: "2024-10-12",
    venue: "Mirador Festival",
    city: "Luxembourg, Luxembourg",
    note: "Fête de la Musique",
  },
  {
    date: "2023-12-08",
    venue: "La Gare_Le Gore",
    city: "Paris, France",
  },
  {
    date: "2021-09-17",
    venue: "Les TropiKantes Festival",
    city: "Paris, France",
  },
];
