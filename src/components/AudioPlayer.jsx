// ============================================================
// AUDIO PLAYER — lecteur persistant en bas de page
// À intégrer dans App.jsx en dehors des routes
// ============================================================

import { useState, useRef, useEffect } from "react";
import { tracks } from "../data/Tracks";

export default function AudioPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef(null);

  const track = tracks[currentIndex];

  // Met à jour la progression
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("ended", handleNext);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      audio.removeEventListener("ended", handleNext);
    };
  }, [currentIndex]);

  // Change le volume
  // Écoute l'événement play-track depuis les TrackCards
useEffect(() => {
  const playHandler = (e) => {
    setCurrentIndex(e.detail.index);
    setIsPlaying(true);
  };
  const pauseHandler = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
  };
  window.addEventListener("play-track", playHandler);
  window.addEventListener("pause-track", pauseHandler);
  return () => {
    window.removeEventListener("play-track", playHandler);
    window.removeEventListener("pause-track", pauseHandler);
  };
}, []);
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  // Quand l'index change, relance la lecture
  // Quand l'index change, attend canplay avant de lancer
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;
  audio.load();
  const onCanPlay = () => {
    if (isPlaying) audio.play().catch(() => {});
  };
  audio.addEventListener("canplay", onCanPlay, { once: true });
  return () => audio.removeEventListener("canplay", onCanPlay);
}, [currentIndex]);

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
          value={progress}
          onChange={handleSeek}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-4 px-4 py-3">
        <audio ref={audioRef} src={track.src} />

        {/* Pochette + infos */}
        <div className="flex items-center gap-3 w-[140px] sm:w-[200px] min-w-0">
          {track.cover ? (
            <img
              src={track.cover}
              alt={track.title}
              className="w-10 h-10 rounded-md object-cover"
              style={{ boxShadow: "0 0 8px rgba(255,51,0,0.3)" }}
            />
          ) : (
            /* Placeholder pochette avec néon */
            <div
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
          <div className="flex flex-col overflow-hidden">
            <span className="font-bebas text-[#ff4444] text-sm tracking-widest truncate"
              style={{ textShadow: "0 0 8px rgba(255,68,68,0.5)" }}>
              {track.title}
            </span>
            <span className="font-dm text-[#efdecd]/40 text-xs truncate">
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
              className="text-[#efdecd]/40 hover:text-[#ff4444] transition-all duration-200 text-lg hover:scale-110"
              aria-label="Précédent"
            >
              ⏮
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
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              onClick={handleNext}
              className="text-[#efdecd]/40 hover:text-[#ff4444] transition-all duration-200 text-lg hover:scale-110"
              aria-label="Suivant"
            >
              ⏭
            </button>
          </div>

          {/* Temps */}
          <div className="flex items-center gap-2">
            <span className="font-dm text-[10px] text-[#efdecd]/30 w-8 text-right">
              {formatTime(progress)}
            </span>
            <span className="font-dm text-[10px] text-[#efdecd]/20">·</span>
            <span className="font-dm text-[10px] text-[#efdecd]/30 w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2 w-[120px]">
          <span className="text-[#ff4444]/50 text-sm">🔈</span>
          <div className="relative flex-1 h-1 bg-white/10 rounded-full">
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${volume * 100}%`,
                background: "linear-gradient(to right, #8c0000, #ff1a1a)",
                boxShadow: "0 0 4px rgba(255,26,26,0.5)",
              }}
            />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
