export default function MusicModal({ album, onClose }) {
  if (!album) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
className="relative w-full mx-4 rounded-2xl overflow-hidden flex flex-col sm:flex-row"        style={{
          maxWidth: "920px",
          marginBottom: "96px",
          background: "rgba(12,6,3,0.88)",
          border: "1px solid rgba(226,150,0,0.15)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(226,150,0,0.08)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Ligne dorée en haut */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-10"
          style={{
            background: "linear-gradient(to right, transparent, #e29600 30%, #e29600 70%, transparent)",
          }}
        />

        {/* Bouton fermer */}
     <button
  onClick={onClose}
  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center
             transition-all duration-200 hover:scale-110"
  style={{
    background: "rgba(43,62,130,0.5)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(100,136,255,0.4)",
    boxShadow: "0 0 16px rgba(43,62,130,0.3)",
    color: "#a0b4ff",
    fontSize: "16px",
  }}
  onMouseEnter={e => {
    e.currentTarget.style.background = "#e29600";
    e.currentTarget.style.border = "1px solid #e29600";
    e.currentTarget.style.boxShadow = "0 0 16px rgba(226,150,0,0.4)";
    e.currentTarget.style.color = "#000000";
  }}
  onMouseLeave={e => {
    e.currentTarget.style.background = "rgba(43,62,130,0.5)";
    e.currentTarget.style.border = "1px solid rgba(100,136,255,0.4)";
    e.currentTarget.style.boxShadow = "0 0 16px rgba(43,62,130,0.3)";
    e.currentTarget.style.color = "#a0b4ff";
  }}
  aria-label="Fermer"
>
  ✕
</button>
        {/* Colonne gauche — Pochette carrée */}
        <div className="flex-shrink-0 relative self-stretch flex items-center"
             style={{ width: "380px" }}>
          <div className="relative w-full" style={{ paddingBottom: "100%" }}>
            <img
              src={album.cover}
              alt={album.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ display: "block" }}
            />
            {/* Dégradé droit */}
            <div
              className="absolute inset-y-0 right-0 w-16 pointer-events-none"
              style={{
                background: "linear-gradient(to right, transparent, rgba(12,6,3,0.88))",
              }}
            />
          </div>
        </div>

        {/* Colonne droite — Contenu */}
        <div className="flex-1 flex flex-col justify-between px-7 py-8 min-w-0">

          {/* En-tête */}
          <div className="flex flex-col gap-1 mb-5">
            <p className="font-dm text-xs tracking-[0.22em] uppercase"
               style={{ color: "rgba(226,150,0,0.65)" }}>
              {album.year}
            </p>
            <h2 className="font-bebas text-4xl tracking-[0.15em] text-[#efdecd] leading-none">
              {album.title}
            </h2>
          </div>

          {/* Description */}
          <p className="font-dm text-sm leading-relaxed flex-1"
             style={{ color: "rgba(239,222,205,0.6)" }}>
            {album.description}
          </p>

          {/* Musiciens */}
          {album.musicians?.length > 0 && (
            <div className="flex flex-col gap-2 mt-5 pt-4"
                 style={{ borderTop: "1px solid rgba(239,222,205,0.07)" }}>
              <p className="font-dm text-xs tracking-[0.2em] uppercase mb-1"
                 style={{ color: "rgba(226,150,0,0.55)" }}>
                Musiciens
              </p>
              {album.musicians.map((m, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="font-dm text-xs" style={{ color: "rgba(239,222,205,0.35)" }}>{m.role}</span>
                  <span className="font-dm text-xs font-bold" style={{ color: "rgba(239,222,205,0.75)" }}>{m.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Boutons */}
          <div className="flex gap-3 mt-6">
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
                  border: "1px solid rgba(29,185,84,0.28)",
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
                  border: "1px solid rgba(226,150,0,0.28)",
                  color: "#e29600",
                }}
              >
                ✦ Acheter
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
