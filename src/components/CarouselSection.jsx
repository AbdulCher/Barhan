// ============================================================
// CARROUSEL — typographie unifiée Bebas Neue + DM Sans
// ============================================================

import { useState } from "react";

function getPosition(index, activeIndex, total) {
  const diff = ((index - activeIndex) % total + total) % total;
  const sym = diff > total / 2 ? diff - total : diff;
  if (sym === 0) return "center";
  if (sym === -1) return "left";
  if (sym === 1) return "right";
  return sym < 0 ? "far-left" : "far-right";
}

// ✅ Fix 1 : on supprime les translations en px fixes
// et on utilise des % ou des valeurs CSS variables via style
function getPositionStyle(pos) {
  switch (pos) {
    case "center":    return { transform: "translateX(0) scale(1)",        zIndex: 20, opacity: 1 };
    case "left":      return { transform: "translateX(-95%) scale(0.78)",  zIndex: 10, opacity: 0.55 };
    case "right":     return { transform: "translateX(95%) scale(0.78)",   zIndex: 10, opacity: 0.55 };
    case "far-left":  return { transform: "translateX(-120%) scale(0.60)", zIndex: 0,  opacity: 0.15 };
    case "far-right": return { transform: "translateX(120%) scale(0.60)",  zIndex: 0,  opacity: 0.15 };
    default:          return { opacity: 0, pointerEvents: "none" };
  }
}

export default function CarouselSection({ albums, onAlbumClick }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const n = albums.length;

  const prev = () => setActiveIndex((i) => (i - 1 + n) % n);
  const next = () => setActiveIndex((i) => (i + 1) % n);

  return (
    <section className="relative w-full min-h-screen text-white py-24 overflow-hidden"
      style={{ background: 'transparent' }}
    >
    {/* ✅ Fix 2 : overflow-hidden sur la section pour éviter tout débordement */}

      {/* Halo ambiance */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        w-[1000px] h-[1000px] rounded-full blur-[120px] opacity-20 transition-all duration-700"
        style={{ background: "#000000" }}
      />

      {/* En-tête */}
      <div className="relative z-10 flex flex-col items-center gap-3 mb-12">
        <p className="font-bold text-[16px] tracking-[0.35em] text-[#efdecd]/40 uppercase">
          Discographie
        </p>
        <h2 className="font-bebas text-[32px] mt-3 tracking-[0.20em] text-[#e29600] leading-none">
          ALBUMS
        </h2>
        
      </div>

      {/* Track */}
      <div className="relative max-w-[1300px] mx-auto flex items-center justify-center min-h-[460px]">

        {/* Bouton gauche */}
        <button
  onClick={prev}
  aria-label="Précédent"
  className="absolute left-2 md:left-4 z-30 w-10 h-10 rounded-full
  flex items-center justify-center transition-all duration-200 hover:scale-110"
  style={{
    background: "rgba(43,62,130,0.5)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(100,136,255,0.4)",
    boxShadow: "0 0 16px rgba(43,62,130,0.4)",
    color: "#a0b4ff",
  }}
>
  <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 3L5 8l5 5" />
  </svg>
</button>

        {/* Cartes */}
        {/* ✅ Fix 3 : hauteur adaptative selon l'écran */}
        <div className="relative flex items-center justify-center w-full h-[380px] sm:h-[420px] md:h-[440px]">
          {albums.map((album, index) => {
            const pos = getPosition(index, activeIndex, n);
            const isFar = pos === "far-left" || pos === "far-right";
            const posStyle = getPositionStyle(pos);

            return (
              <div
                key={album.id}
                onClick={() => pos === "center" ? onAlbumClick?.(album) : setActiveIndex(index)}
                // ✅ Fix 4 : far-left/far-right masqués sur mobile via classe conditionnelle
                className={`
                  absolute flex flex-col items-center
                  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  cursor-pointer
                  ${isFar ? "hidden md:flex" : ""}
                `}
                style={posStyle}
              >
                {/* Pochette */}
                {/* ✅ Fix 5 : taille de carte responsive */}
                <div className="relative w-[220px] sm:w-[260px] md:w-[310px]">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-[220px] sm:h-[260px] md:h-[310px] object-cover rounded-2xl
                               shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                    draggable={false}
                  />
                </div>

                {/* Infos */}
                <div className="mt-4 text-center">
                  <h3 className={`font-bebas tracking-widest transition-all duration-300 ${
                    pos === "center" ? "text-[#efdecd] text-2xl" : "text-[#efdecd]/80 text-xl"
                  }`}>
                    {album.title}
                  </h3>
                  {album.year && pos === "center" && (
                    <p className="font-dm text-xs text-[#e29600] mt-1 tracking-widest uppercase">
                      {album.year}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bouton droite */}
        <button
  onClick={next}
  aria-label="Suivant"
  className="absolute right-2 md:right-4 z-30 w-10 h-10 rounded-full
  flex items-center justify-center transition-all duration-200 hover:scale-110"
  style={{
    background: "rgba(43,62,130,0.5)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(100,136,255,0.4)",
    boxShadow: "0 0 16px rgba(43,62,130,0.4)",
    color: "#a0b4ff",
  }}
>
  <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 3l5 5-5 5" />
  </svg>
</button>

      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-10">
        {albums.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`Album ${i + 1}`}
            className={`h-[5px] rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-[#e15408]" : "w-[5px] bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

    </section>
  );
} 