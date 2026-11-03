// ============================================================
// AUDIO PLAYER — lecteur persistant en bas de page
// À intégrer dans App.jsx en dehors des routes
// ============================================================
//
// Communication avec le reste du site (événements window) :
//  - "play-track"  { index }        → lance le morceau n° index
//  - "pause-track"                  → met en pause
//  - "player-state" { index, isPlaying } ← envoyé par le lecteur à chaque
//                                       changement (utilisé par Music.jsx)
//  - "request-player-state"         → demande au lecteur de renvoyer son état

import { useState, useRef, useEffect } from "react";
import { tracks } from "../data/Tracks";

export default function AudioPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef(null);
  const stateRef = useRef({ index: 0, isPlaying: false });

  const track = tracks[currentIndex];

  // ── Actions ────────────────────────────────────────────────
  const togglePlay = () => setIsPlaying((p) => !p);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const audio = audioRef.current;
    // Après 3 s de lecture, « précédent » revient au début du morceau
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  // ── Lecture / pause : l'état isPlaying pilote toujours le son ──
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false)); // ex. lecture bloquée par le navigateur
    } else {
      audio.pause();
    }
  }, [isPlaying, currentIndex]);

  // Nouveau morceau → on repart de zéro
  useEffect(() => {
    setProgress(0);
    setDuration(0);
  }, [currentIndex]);

  // ── Progression + enchaînement automatique ────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    const onEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % tracks.length);
      setIsPlaying(true);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // ── Volume ────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // ── Prévient le reste du site de l'état du lecteur ─────────
  useEffect(() => {
    stateRef.current = { index: currentIndex, isPlaying };
    window.dispatchEvent(new CustomEvent("player-state", { detail: stateRef.current }));
  }, [currentIndex, isPlaying]);

  // ── Écoute les ordres venant des TrackCards (page Music) ────
  useEffect(() => {
    const playHandler = (e) => {
      setCurrentIndex(e.detail.index);
      setIsPlaying(true);
    };
    const pauseHandler = () => setIsPlaying(false);
    const stateRequest = () =>
      window.dispatchEvent(new CustomEvent("player-state", { detail: stateRef.current }));

    window.addEventListener("play-track", playHandler);
    window.addEventListener("pause-track", pauseHandler);
    window.addEventListener("request-player-state", stateRequest);
    return () => {
      window.removeEventListener("play-track", playHandler);
      window.removeEventListener("pause-track", pauseHandler);
      window.removeEventListener("request-player-state", stateRequest);
    };
  }, []);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const val = parseFloat(e.target.value);
    audio.currentTime = val;
    setProgress(val);
  };

  const formatTime = (t) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Pourcentage de progression pour la barre custom
  const progressPct = duration ? (progress / duration) * 100 : 0;

  return (
    <div
      role="region"
      aria-label="Lecteur audio"
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "linear-gradient(135deg, #1a0000 0%, #2d0505 40%, #0d0d0d 100%)",
        borderTop: "1px solid rgba(140,0,0,0.4)",
        boxShadow: "0 -4px 24px rgba(140,0,0,0.3)",
      }}
    >
      {/* Ligne néon rouge en haut */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(204,34,0,0.8) 30%, #ff3300 50%, rgba(204,34,0,0.8) 70%, transparent)",
          boxShadow: "0 0 8px rgba(255,51,0,0.5)",
        }}
      />

      {/* Barre de progression en haut du lecteur */}
      <div className="relative w-full h-[3px] bg-white/5 cursor-pointer group">
        <div
          className="absolute left-0 top-0 h-full transition-all duration-100"
          style={{
            width: `${progressPct}%`,
            background: "linear-gradient(to right, #8c0000, #ff3300)",
            boxShadow: "0 0 6px rgba(255,51,0,0.6)",
          }}
        />
        <input
          type="range"
          min={0}
          max={duration || 100}
          step="any"
          value={progress}
          onChange={handleSeek}
          aria-label="Position dans le morceau"
          aria-valuetext={`${formatTime(progress)} sur ${formatTime(duration)}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-4 px-4 py-3">
        {/* preload="none" : le MP3 n'est téléchargé qu'au clic sur lecture */}
        <audio ref={audioRef} src={track.src} preload="none" />

        {/* Pochette + infos */}
        <div className="flex items-center gap-3 w-[140px] sm:w-[200px] min-w-0">
          {track.cover ? (
            <img
              src={track.cover}
              alt=""
              width="40"
              height="40"
              className="w-10 h-10 rounded-md object-cover"
              style={{ boxShadow: "0 0 8px rgba(255,51,0,0.3)" }}
            />
          ) : (
            /* Placeholder pochette avec néon */
            <div
              aria-hidden="true"
              className="w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(140,0,0,0.3)",
                border: "1px solid rgba(255,51,0,0.3)",
                boxShadow: "0 0 8px rgba(255,51,0,0.2)",
              }}
            >
              <span className="text-[#ff4444] text-xs">♪</span>
            </div>
          )}
          <div className="flex flex-col overflow-hidden" aria-live="polite">
            <span className="font-bebas text-[#e29600]/85 text-sm tracking-widest truncate"
              style={{ textShadow: "0 0 8px rgba(226,150,0,0.3)" }}>
              {track.title}
            </span>
            <span className="font-dm text-[#efdecd]/60 text-xs truncate">
              {track.artist}
            </span>
          </div>
        </div>

        {/* Contrôles centraux */}
        <div className="flex-1 flex flex-col items-center gap-1">
            {/* Boutons */}
          <div className="flex items-center gap-5">
            <button
              onClick={handlePrev}
              className="text-[#efdecd]/60 hover:text-[#ff4444] transition-all duration-200 text-lg hover:scale-110"
              aria-label="Morceau précédent"
            >
              <span aria-hidden="true">⏮</span>
            </button>

            {/* Bouton play — cercle néon rouge */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full flex items-center justify-center
                         transition-all duration-200 hover:scale-110"
              style={{
                background: isPlaying
                  ? "rgba(180,0,0,0.9)"
                  : "rgba(140,0,0,0.3)",
                border: "1px solid rgba(255,26,26,0.6)",
                boxShadow: isPlaying
                  ? "0 0 12px rgba(255,26,26,0.6), inset 0 0 8px rgba(255,0,0,0.2)"
                  : "0 0 6px rgba(255,26,26,0.2)",
                color: "#ff6666",
              }}
              aria-label={isPlaying ? "Pause" : "Lecture"}
            >
              <span aria-hidden="true">{isPlaying ? "⏸" : "▶"}</span>
            </button>

            <button
              onClick={handleNext}
              className="text-[#efdecd]/60 hover:text-[#ff4444] transition-all duration-200 text-lg hover:scale-110"
              aria-label="Morceau suivant"
            >
              <span aria-hidden="true">⏭</span>
            </button>
          </div>

          {/* Temps */}
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="font-dm text-[10px] text-[#efdecd]/60 w-8 text-right">
              {formatTime(progress)}
            </span>
            <span className="font-dm text-[10px] text-[#efdecd]/40">·</span>
            <span className="font-dm text-[10px] text-[#efdecd]/60 w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2 w-[120px]">
          <span className="text-[#e29600]/50 text-sm" aria-hidden="true">🔈</span>
          <div className="relative flex-1 h-1 bg-white/10 rounded-full">
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${volume * 100}%`,
                background: "linear-gradient(to right, rgba(226,150,0,0.45), rgba(226,150,0,0.85))",
                boxShadow: "0 0 4px rgba(226,150,0,0.3)",
              }}
            />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Volume"
              aria-valuetext={`${Math.round(volume * 100)} %`}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
