// ============================================================
// MUSIC MODAL — fenêtre d'un album (page Musique)
//
// Ordinateur : grande pochette à gauche, texte à droite.
// Téléphone  : petite pochette à côté du titre, le texte défile,
//              les boutons « Écouter » et « Acheter » restent toujours visibles en bas.
// Fermer : bouton en haut à droite, clic à côté, ou touche Échap.
// ============================================================

import { useEffect } from "react";

export default function MusicModal({ album, onClose }) {
  // Échap pour fermer + la page derrière ne défile plus
  useEffect(() => {
    if (!album) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [album, onClose]);

  if (!album) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="music-modal-title"
        className="relative w-full max-w-[920px] max-h-[88svh] rounded-2xl overflow-hidden flex flex-col sm:flex-row"
        style={{
          background: "rgba(12,6,3,0.94)",
          border: "1px solid rgba(226,150,0,0.15)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(226,150,0,0.08)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ligne dorée en haut */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, transparent, #e29600 30%, #e29600 70%, transparent)" }}
        />

        {/* Bouton fermer — bien visible, toujours en haut à droite */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full flex items-center justify-center
                     bg-black/70 backdrop-blur-md border border-[#e29600]/60 text-[#efdecd]
                     hover:bg-[#e29600] hover:border-[#e29600] hover:text-black hover:scale-105
                     transition-all duration-200"
          style={{ boxShadow: "0 0 14px rgba(0,0,0,0.5)" }}
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4">
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
          </svg>
        </button>

        {/* Pochette — ordinateur uniquement (grande, à gauche) */}
        <div className="hidden sm:flex flex-shrink-0 relative self-stretch items-center w-[340px] md:w-[380px] p-4">
          <div className="relative w-full aspect-square">
            <img
              src={album.cover}
              alt={`Pochette de l'album ${album.title}`}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            <div
              className="absolute inset-y-0 right-0 w-16 pointer-events-none"
              style={{ background: "linear-gradient(to right, transparent, rgba(12,6,3,0.9))" }}
            />
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 min-w-0 min-h-0 flex flex-col">
          {/* En-tête : sur téléphone, petite pochette à côté du titre */}
          <div className="flex items-center gap-4 px-5 sm:px-7 pt-5 sm:pt-8 pb-4 pr-16">
            <img
              src={album.cover}
              alt=""
              className="sm:hidden w-20 h-20 flex-shrink-0 rounded-lg object-cover"
              style={{ boxShadow: "0 8px 20px rgba(0,0,0,0.5)" }}
            />
            <div className="flex flex-col gap-1 min-w-0">
              <p className="font-dm text-xs tracking-[0.22em] uppercase" style={{ color: "rgba(226,150,0,0.8)" }}>
                {album.year}
              </p>
              <h2 id="music-modal-title" className="font-bebas text-3xl sm:text-4xl tracking-[0.12em] text-[#efdecd] leading-none">
                {album.title}
              </h2>
            </div>
          </div>

          {/* Partie qui défile : description + musiciens */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-7">
            <p className="font-dm text-sm leading-relaxed" style={{ color: "rgba(239,222,205,0.75)" }}>
              {album.description}
            </p>

            {album.musicians?.length > 0 && (
              <div className="flex flex-col gap-2 mt-5 pt-4 pb-2" style={{ borderTop: "1px solid rgba(239,222,205,0.1)" }}>
                <p className="font-dm text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "rgba(226,150,0,0.8)" }}>
                  Musiciens
                </p>
                {album.musicians.map((m, i) => (
                  <div key={i} className="flex justify-between items-baseline gap-4">
                    <span className="font-dm text-xs" style={{ color: "rgba(239,222,205,0.6)" }}>{m.role}</span>
                    <span className="font-dm text-xs font-bold text-right" style={{ color: "rgba(239,222,205,0.85)" }}>{m.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Boutons — toujours visibles en bas */}
          {(album.spotify || album.buy) && (
            <div
              className="flex gap-3 px-5 sm:px-7 pt-4 pb-5 sm:pb-7"
              style={{ borderTop: "1px solid rgba(239,222,205,0.06)" }}
            >
              {album.spotify && (
                <a
                  href={album.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                  font-dm text-xs font-bold tracking-widest uppercase
                  transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    background: "rgba(29,185,84,0.12)",
                    border: "1px solid rgba(29,185,84,0.35)",
                    color: "#1DB954",
                  }}
                >
                  ▶ Écouter
                </a>
              )}
              {album.buy && (
                <a
                  href={album.buy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                  font-dm text-xs font-bold tracking-widest uppercase
                  transition-all duration-200 hover:scale-[1.03]"
                  style={{
                    background: "rgba(226,150,0,0.1)",
                    border: "1px solid rgba(226,150,0,0.35)",
                    color: "#e29600",
                  }}
                >
                  ✦ Acheter
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
