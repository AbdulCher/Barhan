// ============================================================
// DERNIÈRE SORTIE — bloc « affiche » sur la page d'accueil
// Le bouton lance le morceau dans le lecteur en bas (AudioPlayer).
// → Pour changer de morceau : modifiez TITRE ci-dessous
//   (il doit être écrit comme dans src/data/Tracks.js, majuscules sans importance).
// ============================================================

import { useEffect, useState } from "react";
import { tracks } from "../data/Tracks";

const TITRE = "Leyletna";

export default function LatestRelease({ centered = false }) {
  const index = tracks.findIndex(
    (t) => t.title?.trim().toLowerCase() === TITRE.trim().toLowerCase()
  );
  const [player, setPlayer] = useState({ index: -1, isPlaying: false });

  // On écoute le lecteur pour savoir si CE morceau est en train de jouer
  useEffect(() => {
    const onState = (e) => setPlayer(e.detail);
    window.addEventListener("player-state", onState);
    window.dispatchEvent(new Event("request-player-state"));
    return () => window.removeEventListener("player-state", onState);
  }, []);

  if (index === -1) return null; // titre introuvable → on n'affiche rien

  const track = tracks[index];
  const isThisPlaying = player.index === index && player.isPlaying;

  const handleClick = () => {
    if (isThisPlaying) {
      window.dispatchEvent(new Event("pause-track"));
    } else {
      window.dispatchEvent(new CustomEvent("play-track", { detail: { index } }));
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${centered ? "items-center text-center" : "items-start"}`}>
      {/* Petit titre doré + fine ligne */}
      <div className="flex items-center gap-3">
        {centered && <span className="h-px w-8 bg-[#e29600]/60" aria-hidden="true" />}
        <span className="font-dm text-[11px] tracking-[0.35em] uppercase text-[#e29600]">
          Dernière sortie
        </span>
        <span className="h-px w-8 md:w-12 bg-[#e29600]/60" aria-hidden="true" />
      </div>

      {/* Nom du morceau */}
      <p className="font-bebas text-4xl md:text-5xl tracking-wider leading-none text-[#efdecd]">
        {track.title}
      </p>

      {/* Bouton rond doré + texte */}
      <button
        type="button"
        onClick={handleClick}
        className="group flex items-center gap-3 mt-1"
        aria-label={isThisPlaying ? `Mettre ${track.title} en pause` : `Écouter ${track.title}`}
      >
        <span
          className="w-11 h-11 rounded-full flex items-center justify-center
                     border border-[#e29600] text-[#e29600]
                     transition-all duration-200
                     group-hover:bg-[#e29600] group-hover:text-[#080301] group-hover:scale-105
                     group-active:scale-95"
          style={{ boxShadow: "0 0 14px rgba(226,150,0,0.25)" }}
        >
          {isThisPlaying ? (
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
              <path d="M4 2h3v12H4zM9 2h3v12H9z" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 ml-0.5">
              <path d="M4 2l10 6-10 6z" />
            </svg>
          )}
        </span>
        <span className="font-dm text-sm tracking-wide text-[#efdecd]/80 group-hover:text-[#efdecd] transition-colors">
          {isThisPlaying ? "En lecture" : "Écouter maintenant"}
        </span>
      </button>
    </div>
  );
}
