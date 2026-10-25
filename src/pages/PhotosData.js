// ============================================================
// PHOTOS DATA — chargement automatique depuis src/assets/galerie/
// ============================================================
// Déposez simplement vos images dans src/assets/galerie/
// et elles apparaissent automatiquement dans la galerie.
// Formats supportés : jpg, jpeg, png, webp
// ============================================================

const images = import.meta.glob(
  "../assets/galerie/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

export const albums = Object.entries(images).map(([path, module], index) => ({
  id: index + 1,
  src: module.default,
  alt: path.split("/").pop().replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
}));