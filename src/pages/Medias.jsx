import { useState, useEffect, useCallback } from "react";
import Icons from "../components/Icons";
import Header from "../components/Header";
import { albums as photos } from "./PhotosData";
import Footer from "../components/Footer";
import BgColor from "../assets/bgRed.webp";
import { Helmet } from "react-helmet-async";

// ── Données vidéos ─────────────────────────────────────────
const GRID_VIDEOS = [
  { src: "https://www.youtube.com/embed/tuU_BduqJmk", title: "Vidéo 3" },
  { src: "https://www.youtube.com/embed/dcdkpD6EjWs", title: "Vidéo 2" },
  { src: "https://www.youtube.com/embed/ZfxLbYIsAak", title: "Vidéo 1" },
  { src: "https://www.youtube.com/embed/k9ZxVGJBDPE", title: "Vidéo 4" },
];

function getYouTubeId(src) {
  return src.split("/embed/")[1]?.split("?")[0] ?? "";
}

// ── Bouton rond bordeaux + bord doré (même style que le play des vidéos) ──
function GoldRoundButton({ onClick, label, className = "", children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`w-11 h-11 rounded-full flex items-center justify-center
        bg-[#390202]/70 backdrop-blur-md border border-[#e29600]/50 text-[#e29600]
        hover:border-[#e29600] hover:scale-110 active:scale-95
        transition-all duration-200 ${className}`}
      style={{ boxShadow: "0 0 16px rgba(57,2,2,0.5)" }}
    >
      {children}
    </button>
  );
}

const ArrowLeft = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path d="M10 3L5 8l5 5" />
  </svg>
);
const ArrowRight = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path d="M6 3l5 5-5 5" />
  </svg>
);

// ── Lightbox (plein écran, par-dessus la page) ─────────────
function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo : ${photo.alt}`}
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-20 py-16 bg-[#0d0202]/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Léger halo doré derrière la photo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(226,150,0,0.06) 0%, transparent 70%)" }}
      />

      {/* Fermer */}
      <GoldRoundButton onClick={onClose} label="Fermer" className="absolute top-5 right-5 z-20">
        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <path d="M3 3l10 10M13 3L3 13" />
        </svg>
      </GoldRoundButton>

      {/* Précédent (ordinateur) */}
      <GoldRoundButton
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        label="Photo précédente"
        className="hidden sm:flex absolute left-6 z-20"
      >
        <ArrowLeft />
      </GoldRoundButton>

      <div className="relative max-w-4xl w-full flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <img
          key={index}
          src={photo.src}
          alt={photo.alt}
          className="w-full max-h-[70vh] object-contain rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
        />
        <p className="font-dm text-sm tracking-widest uppercase text-[#efdecd]/60">
          {photo.alt} <span className="text-[#e29600]/80">· {index + 1}/{photos.length}</span>
        </p>

        {/* Précédent / suivant (téléphone) */}
        <div className="flex sm:hidden gap-6 mt-2">
          <GoldRoundButton onClick={onPrev} label="Photo précédente"><ArrowLeft /></GoldRoundButton>
          <GoldRoundButton onClick={onNext} label="Photo suivante"><ArrowRight /></GoldRoundButton>
        </div>
      </div>

      {/* Suivant (ordinateur) */}
      <GoldRoundButton
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        label="Photo suivante"
        className="hidden sm:flex absolute right-6 z-20"
      >
        <ArrowRight />
      </GoldRoundButton>
    </div>
  );
}

// ── VideoCard ──────────────────────────────────────────────
function VideoCard({ src, title }) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(src);

  return (
    <div
      className="w-full aspect-video overflow-hidden rounded-2xl border border-[#390202]
                 hover:border-[#e29600]/50 transition-colors duration-300"
      style={{ boxShadow: "0 0 0 1px rgba(57,2,2,0.3), 0 20px 60px rgba(57,2,2,0.45), 0 4px 20px rgba(0,0,0,0.8)" }}
    >
      {playing ? (
        <iframe
          className="w-full h-full"
          src={`${src}?autoplay=1`}
          title={title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="relative w-full h-full cursor-pointer group block"
          onClick={() => setPlaying(true)}
          aria-label={`Lire la vidéo : ${title}`}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35 group-hover:bg-black/55 transition-all duration-200" />
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Bouton play bordeaux, bord doré */}
            <span
              className="w-16 h-16 rounded-full flex items-center justify-center
                         bg-[#390202]/70 backdrop-blur-md border border-[#e29600]/50 text-[#e29600]
                         group-hover:border-[#e29600] group-hover:scale-110
                         transition-all duration-200"
              style={{ boxShadow: "0 0 16px rgba(57,2,2,0.4)" }}
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 ml-1">
                <path d="M4 2l10 6-10 6V2z" />
              </svg>
            </span>
          </div>
        </button>
      )}
    </div>
  );
}

// ── Page principale ────────────────────────────────────────
export default function Medias() {
  const [activeTab, setActiveTab] = useState("videos");
  const [currentIndex, setCurrentIndex] = useState(null);
  const n = photos.length;

  const openPhoto = (i) => setCurrentIndex(i);
  const closePhoto = () => setCurrentIndex(null);
  const prevPhoto = useCallback(() => setCurrentIndex((prev) => (prev - 1 + n) % n), [n]);
  const nextPhoto = useCallback(() => setCurrentIndex((prev) => (prev + 1) % n), [n]);

  // Clavier : Échap, flèches
  useEffect(() => {
    if (currentIndex === null) return;
    const handler = (e) => {
      if (e.key === "Escape") closePhoto();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex, prevPhoto, nextPhoto]);

  // Bloque le défilement de la page quand une photo est ouverte
  useEffect(() => {
    document.body.style.overflow = currentIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [currentIndex]);

  const tabClass = (tab) =>
    `font-dm pb-2 text-sm md:text-base font-bold uppercase tracking-[0.25em] transition-colors duration-200 border-b ${
      activeTab === tab
        ? "border-[#e29600] text-[#e29600]"
        : "border-transparent text-[#efdecd]/60 hover:text-[#efdecd]"
    }`;

  return (
    <>
      <Helmet>
        <title>Médias — Barhan | Vidéos et photos</title>
        <meta name="description" content="Clips, vidéos live et photos de Barhan, musicien mauritanien installé à Paris." />
      </Helmet>

      {/* BG fixe */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${BgColor})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Voile léger sur le fond rouge (comme avant).
          → Plus sombre : augmentez /40 (ex. /55). */}
      <div className="fixed inset-0 z-[2] bg-[#030405]/40" />

      <Header />

      <section className="relative z-10 w-full min-h-screen bg-transparent text-white pt-28 pb-24 overflow-hidden">
        {/* Halo très doux en haut */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 15%, rgba(239,222,205,0.06) 0%, transparent 70%)" }}
        />

        <div className="relative z-[10] max-w-[1200px] mx-auto px-6 flex flex-col gap-10">
          {/* En-tête */}
          <div className="flex flex-col items-center gap-3 mt-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#e29600]/60" aria-hidden="true" />
              <p className="font-dm text-[12px] tracking-[0.35em] text-[#efdecd]/60 uppercase">Galerie</p>
              <span className="h-px w-8 bg-[#e29600]/60" aria-hidden="true" />
            </div>
                        <h1 className="font-bebas text-[32px] mt-3 tracking-[0.20em] text-[#e29600] leading-none">
              MÉDIAS
            </h1>
          </div>

          {/* Onglets (restent visibles en défilant) */}
          <div className="sticky top-20 z-40 flex justify-center">
            <div className="flex gap-8 md:gap-12 px-6 pt-3 rounded-full bg-[#1a0202]/60 backdrop-blur-md" role="tablist">
              <button type="button" role="tab" aria-selected={activeTab === "videos"}
                onClick={() => setActiveTab("videos")} className={tabClass("videos")}>
                Vidéos
              </button>
              <button type="button" role="tab" aria-selected={activeTab === "photos"}
                onClick={() => setActiveTab("photos")} className={tabClass("photos")}>
                Photos
              </button>
            </div>
          </div>

          <Icons />

          {/* Section Vidéos */}
          {activeTab === "videos" && (
            <>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                {GRID_VIDEOS.map((video) => (
                  <VideoCard key={video.src} {...video} />
                ))}
              </div>
              <div className="flex justify-center">
                <a
                  href="https://www.youtube.com/@BarhanNdi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm flex items-center gap-2 text-xs font-bold tracking-widest uppercase
                  px-6 py-3 rounded-full text-[#efdecd] bg-[#390202] border border-[#e29600]/30
                  hover:bg-[#e29600] hover:text-black transition-all duration-200"
                >
                  <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-1 4.5l4.5 2.5-4.5 2.5V5.5z" />
                  </svg>
                  Voir toutes les vidéos
                </a>
              </div>
            </>
          )}

          {/* Section Photos */}
          {activeTab === "photos" && (
            <>
              <p className="font-dm text-center text-[#efdecd]/60 text-xs tracking-widest uppercase">
                {photos.length} photos — cliquez pour agrandir
              </p>
              <div className="columns-1 md:columns-3 gap-4 space-y-4">
                {photos.map((photo, index) => (
                  <button
                    type="button"
                    key={photo.id}
                    onClick={() => openPhoto(index)}
                    aria-label={`Agrandir la photo : ${photo.alt}`}
                    className="relative block w-full break-inside-avoid group overflow-hidden rounded-xl
                    border border-[#efdecd]/20 hover:border-[#e29600] transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                      flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <p className="font-dm text-[#efdecd] text-sm font-bold tracking-widest uppercase">
                        {photo.alt}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />

      {currentIndex !== null && (
        <Lightbox
          photos={photos}
          index={currentIndex}
          onClose={closePhoto}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  );
}
