import { useState, useEffect, useCallback } from "react";
import Icons from "../components/Icons";
import Header from "../components/Header";
import { albums as photos } from "./PhotosData";
import Footer from "../components/Footer";
import BgColor from "../assets/bgRed.jpg";
import { Helmet } from "react-helmet-async";


// ── Données vidéos ─────────────────────────────────────────
const GRID_VIDEOS = [
  { src: "https://www.youtube.com/embed/ZfxLbYIsAak",   title: "Vidéo 1" },
  { src: "https://www.youtube.com/embed/k9ZxVGJBDPE",   title: "Vidéo 2" },
  { src: "https://www.youtube.com/embed/Tmy0HGbHC58",   title: "Vidéo 3" },
  { src: "https://www.youtube.com/embed/dcdkpD6EjWs",   title: "Vidéo 4" },
];

function getYouTubeId(src) {
  return src.split("/embed/")[1]?.split("?")[0] ?? "";
}

// ── Lightbox ───────────────────────────────────────────────
function Lightbox({ photos, index, onPrev, onNext }) {
  const photo = photos[index];

  return (
    
    <div className="flex-1 flex items-center justify-center px-4 sm:px-16 pb-4 sm:pb-8 relative">
  <div className="absolute inset-0 pointer-events-none"
    style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(226,150,0,0.08) 0%, transparent 70%)" }}
  />

  {/* Boutons prev/next cachés sur mobile */}
  <button onClick={onPrev}
    className="hidden sm:flex absolute left-6 z-20 w-11 h-11 rounded-full items-center justify-center transition-all duration-200 hover:scale-110"
    style={{
      background: "rgba(43,62,130,0.5)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(100,136,255,0.4)",
      boxShadow: "0 0 16px rgba(43,62,130,0.4)",
      color: "#a0b4ff",
    }}
  >
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M10 3L5 8l5 5"/>
    </svg>
  </button>

  <div className="relative max-w-4xl w-full flex flex-col items-center gap-4">
    <img
      key={index}
      src={photo.src}
      alt={photo.alt}
      className="w-full max-h-[70vh] object-contain rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
    />
    <p className="font-dm text-sm tracking-widest uppercase text-[#efdecd]/40">{photo.alt}</p>

    {/* Boutons prev/next visibles uniquement sur mobile, sous la photo */}
    <div className="flex sm:hidden gap-6 mt-2">
      <button onClick={onPrev}
        className="w-11 h-11 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(43,62,130,0.5)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(100,136,255,0.4)",
          color: "#a0b4ff",
        }}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <path d="M10 3L5 8l5 5"/>
        </svg>
      </button>
      <button onClick={onNext}
        className="w-11 h-11 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(43,62,130,0.5)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(100,136,255,0.4)",
          color: "#a0b4ff",
        }}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <path d="M6 3l5 5-5 5"/>
        </svg>
      </button>
    </div>
  </div>

  <button onClick={onNext}
    className="hidden sm:flex absolute right-6 z-20 w-11 h-11 rounded-full items-center justify-center transition-all duration-200 hover:scale-110"
    style={{
      background: "rgba(43,62,130,0.5)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(100,136,255,0.4)",
      boxShadow: "0 0 16px rgba(43,62,130,0.4)",
      color: "#a0b4ff",
    }}
  >
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M6 3l5 5-5 5"/>
    </svg>
  </button>
</div>
  );
}
// ── VideoCard ──────────────────────────────────────────────
function VideoCard({ src, title }) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(src);

  return (
    <div
      className="w-full aspect-video overflow-hidden rounded-2xl border border-[#390202]"
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
        <div className="relative w-full h-full cursor-pointer group" onClick={() => setPlaying(true)}>
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-200" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center
               transition-all duration-200 shadow-lg group-hover:scale-110"
              style={{
              background: "rgba(57,2,2,0.7)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(226,150,0,0.5)",
              boxShadow: "0 0 16px rgba(57,2,2,0.4)",
              }}
          >
          <svg viewBox="0 0 16 16" fill="#e29600" className="w-6 h-6 ml-1">
            <path d="M4 2l10 6-10 6V2z"/>
          </svg>
        </div>
        </div>
        </div>
      )}
    </div>
  );
}

// ── Page principale ────────────────────────────────────────
export default function Medias() {
  const [activeTab, setActiveTab] = useState('photos')
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showNav, setShowNav] = useState(true)
  const n = photos.length;

  const openPhoto  = (i) => setCurrentIndex(i);
  const closePhoto = () => setCurrentIndex(null);
  const prevPhoto  = useCallback((i) => {
    if (typeof i === "number") { setCurrentIndex(i); return; }
    setCurrentIndex((prev) => (prev - 1 + n) % n);
  }, [n]);
  const nextPhoto = useCallback(() => setCurrentIndex((prev) => (prev + 1) % n), [n]);

  useEffect(() => {
    if (currentIndex === null) return;
    const handler = (e) => {
      if (e.key === "Escape")     closePhoto();
      if (e.key === "ArrowLeft")  prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex, prevPhoto, nextPhoto]);

  useEffect(() => {
    document.body.style.overflow = currentIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [currentIndex]);

  useEffect(() => {
    let timeout
    const handleScroll = () => {
      setShowNav(false)
      clearTimeout(timeout)
      timeout = setTimeout(() => setShowNav(true), 800)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
    <div className="fixed inset-0 z-[2] bg-[#030405]/40" />
      {/* BG fixe */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${BgColor})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <Header />

      <section className="relative w-full min-h-screen bg-transparent text-white pt-28 pb-24 overflow-hidden">

        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(239,222,205,0.06) 0%, transparent 70%)" }}
        />

        <div className="relative z-[10] max-w-[1200px] mx-auto px-6 flex flex-col gap-10">

          {/* En-tête */}
          <div className="flex flex-col items-center gap-3 mt-10">
            <p className="font-bold text-[16px] tracking-[0.35em] text-[#efdecd]/40 uppercase">
              Galerie
            </p>
            <h2 className="font-bebas text-[32px] mt-3 tracking-[0.20em] text-[#e29600] leading-none">
              MÉDIAS
            </h2>
          </div>

          {/* Onglets sticky */}
          <div className={`sticky top-20 z-40 flex justify-center gap-8 md:gap-12 transition-opacity duration-500 ${
            showNav ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <button
              onClick={() => setActiveTab('photos')}
              className={`pb-4 text-sm md:text-lg font-bold uppercase transition-colors duration-200 ${
                activeTab === 'photos'
                  ? 'border-b-2 border-[#e29600] text-[#e29600] font-semibold'
                  : 'text-[#efdecd]/40 hover:text-[#efdecd]'
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`p-2 text-lg md:text-xl tracking-wide transition-colors duration-200 ${
                activeTab === 'videos'
                  ? 'border border-[#e29600] uppercase font-bold text-[#e29600]'
                  : 'text-[#efdecd]/40 hover:text-[#efdecd]'
              }`}
            >
              Vidéos
            </button>
          </div>

          <Icons />

          {/* Section Photos */}
          {activeTab === 'photos' && (
            <>
              <p className="font-dm text-center text-[#efdecd]/40 text-xs tracking-widest uppercase">
                {photos.length} photos — cliquez pour zoomer
              </p>
              <div className="columns-1 md:columns-3 gap-4 space-y-4">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => openPhoto(index)}
                    className="relative break-inside-avoid group cursor-pointer overflow-hidden rounded-xl
                               border border-[#efdecd]/20 hover:border-[#e29600] hover:border-2 transition-all duration-300"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300
                                    flex items-end p-3 opacity-0 group-hover:opacity-100">
                      <p className="font-dm text-[#efdecd] text-sm font-bold tracking-widest uppercase">
                        {photo.alt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Section Vidéos */}
          {activeTab === 'videos' && (
            <>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                {GRID_VIDEOS.map((video) => (
                  <VideoCard key={video.src} {...video} />
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => window.open("https://www.youtube.com/@BarhanNdi", "_blank")}
                  className="font-dm flex items-center gap-2 text-sm font-bold tracking-widest uppercase
                  text-[#efdecd] bg-[#390202] hover:bg-[#e29600] hover:text-[#efdecd]
                  px-5 py-2 rounded-full transition-all duration-200"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-1 4.5l4.5 2.5-4.5 2.5V5.5z"/>
                  </svg>
                  Voir toutes les vidéos
                </button>
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