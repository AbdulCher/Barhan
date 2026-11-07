// ============================================================
// ANNONCES — messages qui défilent en haut de la page d'accueil
// ============================================================
//
// Ajoutez, retirez ou réordonnez les blocs { ... } librement.
//
// - type  : petite étiquette affichée en haut ("Message", "Projet",
//           "Nouveau", "Concert", "Sortie"… ce que vous voulez)
// - title : le texte principal (court : une phrase)
// - text  : une précision facultative (supprimez la ligne si inutile)
// - link  : facultatif → { label: "Texte du lien", to: "/page" }
//           (une page du site "/music", ou une adresse complète "https://…")
// - until : facultatif → date "AAAA-MM-JJ" après laquelle l'annonce
//           disparaît toute seule (pratique pour une promo ou un événement)
//
// ⚡ Le PROCHAIN CONCERT est ajouté automatiquement en premier,
//    à partir de src/data/Concerts.js : rien à écrire ici pour lui.

export const ANNOUNCEMENTS = [
  {
    type: "Bienvenue",
    title: "Musicien & compositeur",
    text: "Entre la Mauritanie et Paris, entre tradition, jazz et blues.",
  },
  {
    type: "Nouveau",
    title: "La boutique est ouverte",
    text: "CD, vinyles et t-shirts officiels, expédiés par l'artiste.",
    link: { label: "Voir la boutique", to: "/shop" },
  },
  {
    type: "Projet",
    title: "Nouvel album en préparation",
    text: "Exemple à remplacer : quelques mots sur votre projet en cours.",
  },
  {
    type: "Message",
    title: "Merci pour votre soutien !",
    text: "Exemple à remplacer : un petit mot pour votre public.",
    // until: "2026-12-31",
  },
];

// Durée d'affichage de chaque annonce (en millisecondes)
export const ANNOUNCEMENT_DELAY = 6000;
