// Convertit toutes les images JPG / PNG du projet en WebP.
// Usage (à la racine du projet) :
//   npm install -D sharp
//   node convert-webp.mjs
//
// - Crée un fichier .webp à côté de chaque image (les originaux ne sont PAS supprimés).
// - Réduit les images trop larges à 1920 px maximum (largeur d'un écran Full HD).
// - Affiche le poids avant / après pour chaque image.

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DOSSIERS = ["src", "public"];      // dossiers à parcourir
const LARGEUR_MAX = 1920;                // px
const QUALITE = 78;                      // 75-80 = bon compromis qualité / poids

const ko = (o) => (o / 1024).toFixed(0).padStart(6) + " Ko";
let avantTotal = 0, apresTotal = 0;

function lister(dossier) {
  if (!fs.existsSync(dossier)) return [];
  return fs.readdirSync(dossier, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dossier, e.name);
    if (e.isDirectory()) return e.name === "node_modules" ? [] : lister(p);
    return /\.(jpe?g|png)$/i.test(e.name) ? [p] : [];
  });
}

for (const fichier of DOSSIERS.flatMap(lister)) {
  const sortie = fichier.replace(/\.(jpe?g|png)$/i, ".webp");
  const avant = fs.statSync(fichier).size;
  await sharp(fichier)
    .rotate() // respecte l'orientation des photos de téléphone
    .resize({ width: LARGEUR_MAX, withoutEnlargement: true })
    .webp({ quality: QUALITE })
    .toFile(sortie);
  const apres = fs.statSync(sortie).size;
  avantTotal += avant; apresTotal += apres;
  console.log(`${ko(avant)} -> ${ko(apres)}   ${sortie}`);
}

console.log(`\nTOTAL : ${ko(avantTotal)} -> ${ko(apresTotal)}`);
