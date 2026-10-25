import { useState } from "react";
import Header from "../../components/Header";
import MusicModal from "./MusicModal";
import { albums } from "./Albums";
import { tracks } from "../../data/Tracks";
import Icons from "../../components/Icons";
import Footer from "../../components/Footer";
import BgColor from "../../assets/bgColor.jpg";
import Coussinfin from "../../assets/coussinfin.jpg";
import { Helmet } from "react-helmet-async";

function AlbumCard({ album, onListen }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`
        relative flex flex-col
        bg-transparent hover:bg-transparent
        backdrop-blur-sm
        border-2 border-l-[4px] rounded-2xl overflow-hidden
        transition-all duration-500
        ${open
          ? "border-[#390202] shadow-[0_0_30px_rgba(57,2,2,0.12)]"
          : "border-[#efdecd]/20 border-l-[#efdecd] hover:border-[#e29600]/50 hover:shadow-[0_0_20px_rgba(226,150,0,0.08)]"}
      `}
    >
      <Helmet>
  <title>Barhan Ndiaye — Musique & Discographie</title>
  <meta name="description" content="Découvrez la discographie de Barhan Ndiaye : albums, extraits audio et univers musical entre jazz, blues et traditions africaines." />
  <meta property="og:title" content="Barhan Ndiaye — Musique & Discographie" />
  <meta property="og:url" content="https://www.barhan.fr/music" />
</Helmet>
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-10 pointer-events-none"
        style={{
          background: open
            ? "linear-gradient(to right, transparent, #e29600, transparent)"
            : "linear-gradient(to right, transparent, rgba(226,150,0,0.3), transparent)",
        }}
      />

      {open && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(57,2,2,0.08) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative w-full overflow-hidden">
        <img
          src={album.cover}
          alt={album.title}
          className={`w-full h-auto object-contain transition-all duration-700 ${
            open ? "scale-105 brightness-75" : "hover:scale-102"
          }`}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))" }}
        />
        <span className="absolute bottom-3 left-4 font-dm text-xs tracking-[0.18em] text-[#efdecd]/50 uppercase">
          {album.year}
        </span>
      </div>

      <div className="relative z-10 flex flex-col p-8 gap-4 bg-[#efdecd]/20">
        <h3 className="font-bold text-xl text-[#efdecd] uppercase">
          {album.title}
        </h3>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            open ? "max-h-[400px]" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-5 pt-1">
            <p className="font-dm text-sm leading-loose text-[#efdecd]/70">
              {album.description}
            </p>
            {album.musicians?.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-[#efdecd]/10 pt-4">
                <p className="font-dm text-xs tracking-[0.18em] text-[#e29600]/70 uppercase mb-1">
                  Musiciens
                </p>
                {album.musicians.map((m, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="font-dm text-sm text-[#efdecd]/40">{m.role}</span>
                    <span className="font-dm text-sm font-bold text-[#efdecd]/80">{m.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <button
            onClick={() => setOpen((v) => !v)}
            className={`
              font-dm flex items-center gap-2 text-xs font-bold tracking-widest uppercase
              transition-all duration-200
              ${open ? "text-[#e29600]" : "text-[#e29600]/90 hover:text-[#efdecd]/70"}
            `}
          >
            <span
              className={`
                inline-flex items-center justify-center
                w-4 h-4 rounded-full border text-sm
                transition-all duration-300
                ${open ? "border-[#e29600] rotate-45" : "border-[#e29600]/50"}
              `}
            >
              +
            </span>
            {open ? "Réduire" : "Voir plus"}
          </button>

          <button
            onClick={() => onListen(album)}
            className="font-dm flex items-center gap-2 text-xs font-bold tracking-widest uppercase
              text-[#efdecd] hover:text-[#efdecd] bg-black/30 hover:bg-[#390202] border-2 border-[#efdecd]/20 hover:border-[#e29600]
              px-4 py-2 rounded-full transition-all duration-200
              shadow-[0_4px_16px_rgba(57,2,2,0.3)]"
          >
            ▶ Écouter
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Carte d'extrait audio ──────────────────────────────────
// Remplace le composant TrackCard dans Music.jsx

function TrackCard({ track, index, isPlaying, onPlay }) {
  return (
    <div
      className="relative flex items-center gap-5 px-5 py-4 rounded-xl cursor-pointer group
                 transition-all duration-300"
      style={{
        background: isPlaying
          ? "rgba(43,62,130,0.35)"
          : "rgba(43,62,130,0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: isPlaying
          ? "1px solid rgba(43,62,130,0.8)"
          : "1px solid rgba(43,62,130,0.35)",
        boxShadow: isPlaying
          ? "0 0 24px rgba(43,62,130,0.3), inset 0 1px 0 rgba(100,130,255,0.1)"
          : "0 2px 12px rgba(0,0,0,0.25)",
      }}
      onClick={() => onPlay(index)}
      onMouseEnter={e => {
        if (!isPlaying) {
          e.currentTarget.style.background = "rgba(43,62,130,0.25)";
          e.currentTarget.style.border = "1px solid rgba(43,62,130,0.6)";
        }
      }}
      onMouseLeave={e => {
        if (!isPlaying) {
          e.currentTarget.style.background = "rgba(43,62,130,0.15)";
          e.currentTarget.style.border = "1px solid rgba(43,62,130,0.35)";
        }
      }}
    >
      {/* Ligne bleue en haut quand actif */}
      {isPlaying && (
        <div
          className="absolute top-0 left-0 right-0 h-[1px] rounded-t-xl pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent, #6488ff 30%, #4a6fe8 70%, transparent)",
          }}
        />
      )}

      {/* Bouton play / égaliseur animé */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: isPlaying ? "#2b3e82" : "rgba(43,62,130,0.3)",
          border: isPlaying ? "1px solid rgba(100,136,255,0.4)" : "1px solid rgba(43,62,130,0.5)",
          boxShadow: isPlaying ? "0 0 16px rgba(43,62,130,0.6)" : "none",
        }}
      >
        {isPlaying ? (
          /* Égaliseur animé */
          <div className="flex items-end gap-[2px] h-4">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-[3px] rounded-sm"
                style={{
                  background: "#a0b4ff",
                  animation: `eq${i+1} ${[0.6,0.5,0.7][i]}s ease-in-out infinite alternate ${[0,0.1,0.05][i]}s`,
                }}
              />
            ))}
          </div>
        ) : (
          <span className="font-dm font-bold" style={{ fontSize: "11px", color: "rgba(150,175,255,0.6)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Infos */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <span
          className="font-dm font-bold tracking-wide truncate transition-colors duration-200"
          style={{ fontSize: "14px", color: isPlaying ? "#a0b4ff" : "rgba(239,222,205,0.85)" }}
        >
          {track.title}
        </span>
        <span className="font-dm truncate mt-0.5" style={{ fontSize: "11px", color: "rgba(150,175,255,0.45)" }}>
          {track.artist}
        </span>
      </div>

      {/* Droite : indication "lecture en cours" ou icône play */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {isPlaying ? (
          <span
            className="font-dm text-[10px] tracking-widest uppercase flex items-center gap-1.5"
            style={{ color: "rgba(150,175,255,0.6)" }}
          >
            En cours
            <svg viewBox="0 0 16 8" fill="none" style={{ width: "14px", height: "8px" }}>
              <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
        ) : (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300
                       opacity-0 group-hover:opacity-100"
            style={{
              background: "rgba(43,62,130,0.4)",
              border: "1px solid rgba(43,62,130,0.5)",
            }}
          >
            <span style={{ fontSize: "9px", color: "rgba(150,175,255,0.6)", marginLeft: "1px" }}>▶</span>
          </div>
        )}
      </div>

      {/* Keyframes égaliseur injectés */}
      <style>{`
        @keyframes eq1 { from { height: 4px; } to { height: 14px; } }
        @keyframes eq2 { from { height: 10px; } to { height: 4px; } }
        @keyframes eq3 { from { height: 14px; } to { height: 5px; } }
      `}</style>
    </div>
  );
}


export default function Music() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);

  const handlePlayTrack = (index) => {
  if (playingIndex === index) {
    // Même track → on arrête
    setPlayingIndex(null);
    window.dispatchEvent(new CustomEvent("pause-track"));
  } else {
    // Nouveau track → on lance
    setPlayingIndex(index);
    window.dispatchEvent(new CustomEvent("play-track", { detail: { index } }));
  }
};

  return (
    <>
      {/* BG tissu */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${Coussinfin})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* BG Color */}
      <div
        className="fixed inset-0 z-[1]"
        style={{
          backgroundImage: `url(${BgColor})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          opacity: 0.05,
        }}
      />

      <Header />

      <section className="relative w-full min-h-screen bg-transparent text-white pt-28 pb-40 overflow-hidden">

        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 15%, rgba(239,222,205,0.06) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-64 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(57,2,2,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-[10] max-w-[1100px] mx-auto px-6">

          {/* ── En-tête ── */}
          <div className="flex flex-col items-center gap-3 mb-16 mt-10">
            <p className="font-bold text-[16px] tracking-[0.35em] text-[#efdecd]/50 uppercase">
              Discographie
            </p>
            <h2 className="font-bebas mt-3 text-[32px] tracking-[0.20em] text-[#e29600] leading-none">
              MUSIC
            </h2>
          </div>

          {/* ── Grille albums ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-14">
            {albums.map((album, i) => {
              const rotations = ["-rotate-3", "-rotate-3", "-rotate-3"];
              return (
                <div
                  key={album.id}
                  className={`${rotations[i % 3]} hover:rotate-0 transition-transform duration-500 ease-in-out`}
                >
                  <AlbumCard album={album} onListen={setSelectedAlbum} />
                </div>
              );
            })}
          </div>

          {/* ── Section Extraits ── */}
          <div className="mt-24">
            <div className="flex flex-col items-center gap-3 mb-10">
              <p className="font-bold text-[16px] tracking-[0.35em] text-[#efdecd]/50 uppercase">
                Écouter
              </p>
              <h2 className="font-bebas mt-3 text-[32px] tracking-[0.20em] text-[#e29600] leading-none">
                EXTRAITS
              </h2>
            </div>

            <div className="max-w-[600px] mx-auto flex flex-col gap-2">
              {tracks.map((track, index) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  index={index}
                  isPlaying={playingIndex === index}
                  onPlay={handlePlayTrack}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <Icons />
          </div>

        </div>
      </section>

      <Footer />

      {selectedAlbum && (
        <MusicModal
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}
    </>
  );
}
