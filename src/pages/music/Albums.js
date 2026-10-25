import NdeysanCover from "../../assets/ndeysancover.jpg";
import Motsdetetecover from "../../assets/motsdetetecover.jpg";

export const albums = [
  {
    id: 1,
    title: "NDEYSAN",
    year: "2010",
    cover: NdeysanCover,
    description: "Premier album de Barhan, Ndeysan plonge l'auditeur dans un voyage entre l'Afrique de l'Ouest et les sonorités urbaines. Un projet brut et sincère, né d'influences croisées.",
    musicians: [
      { role: "Chant & écriture", name: "Barhan" },
      { role: "Production", name: "Nom du producteur" },
      { role: "Guitare", name: "Nom du guitariste" },
    ],
    spotify: "https://open.spotify.com/",
    buy: "https://example.com/",
  },
  {
    id: 2,
    title: "MOTS DE TÊTE",
    year: "2020",
    cover: Motsdetetecover,
    description: "Mots de Tête marque une évolution dans l'univers de Barhan. Les textes s'affirment, les arrangements s'enrichissent, entre rap, soul et rythmes africains.",
    musicians: [
      { role: "Chant & écriture", name: "Barhan" },
      { role: "Production", name: "Nom du producteur" },
      { role: "Basse", name: "Nom du bassiste" },
      { role: "Percussions", name: "Nom du percussionniste" },
    ],
    spotify: "https://open.spotify.com/",
    buy: "https://example.com/",
  },
  {
    id: 3,
    title: "ALBUM 3",
    year: "2024",
    cover: Motsdetetecover,
    description: "Le troisième chapitre de Barhan. Un album plus personnel, plus direct, qui explore de nouveaux territoires sonores tout en restant ancré dans ses racines.",
    musicians: [
      { role: "Chant & écriture", name: "Barhan" },
      { role: "Production", name: "Nom du producteur" },
      { role: "Clavier", name: "Nom du claviériste" },
    ],
    spotify: "https://open.spotify.com/",
    buy: "https://example.com/",
  },
];