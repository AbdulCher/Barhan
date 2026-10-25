import { useState } from "react";
import Header from "../components/Header";
import Icons from "../components/Icons";
import Footer from "../components/Footer";

const GRID_VIDEOS = [
  { src: "https://www.youtube.com/embed/dcdkpD6EjWs", title: "Vidéo 1" },
  { src: "https://www.youtube.com/embed/k9ZxVGJBDPE", title: "Vidéo 2" },
  { src: "https://www.youtube.com/embed/Tmy0HGbHC58", title: "Vidéo 3" },
  { src: "https://www.youtube.com/embed/VIDEO_ID_4", title: "Vidéo 4" },
];

const videoBoxShadow =
  "0 0 0 1px rgba(140,2,2,0.3), 0 20px 60px rgba(140,2,2,0.45), 0 4px 20px rgba(0,0,0,0.8)";

// ✅ Extrait l'ID YouTube depuis l'URL embed
function getYouTubeId(src) {
  return src.split("/embed/")[1]?.split("?")[0] ?? "";
}

function VideoCard({ src, title }) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(src);

  return (
    <div
      className="w-full aspect-video overflow-hidden rounded-2xl border border-[#e00303]"
      style={{ boxShadow: videoBoxShadow }}
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
        <div
          className="relative w-full h-full cursor-pointer group"
          onClick={() => setPlaying(true)}
        >
          {/* Miniature YouTube */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
          />

          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-200" />

          {/* Bouton play custom blanc */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center
                         transition-all duration-200 shadow-lg group-hover:scale-110"
              style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
            >
              <svg viewBox="0 0 16 16" fill="#e00303" className="w-6 h-6 ml-1">
                <path d="M4 2l10 6-10 6V2z"/>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Videos() {
  return (
    <>
      <Header />

      <section className="relative w-full min-h-screen bg-black text-white pt-28 pb-24 overflow-hidden">

        {/* Halo rouge central */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(140,2,2,0.35) 0%, transparent 75%)",
          }}
        />

        {/* Halo bordeaux bas */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(180,10,10,0.2) 0%, transparent 80%)",
          }}
        />

        <div className="relative z-10 max-w-[900px] mx-auto px-6 flex flex-col items-center gap-10">

          {/* En-tête */}
          <div className="flex flex-col items-center gap-3 mt-10">
            <p className="font-bold text-[16px] tracking-[0.35em] text-white/50 uppercase">
              Chaîne YouTube
            </p>
            <h2 className="font-bebas text-[32px] mt-3 tracking-[0.20em] text-white leading-none">
              VIDEOS
            </h2>
          </div>

          {/* Grille 2 × 2 */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            {GRID_VIDEOS.map((video) => (
              <VideoCard key={video.src} {...video} />
            ))}
          </div>

          {/* Bouton */}
          <button
            onClick={() => window.open("https://www.youtube.com/@BarhanNdi", "_blank")}
            className="font-dm flex items-center gap-2 text-sm font-bold tracking-widest uppercase
                       text-black bg-[#2b3e82] hover:bg-[#e15408] hover:text-white
                       px-5 py-2 rounded-full transition-all duration-200"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-1 4.5l4.5 2.5-4.5 2.5V5.5z"/>
            </svg>
            Voir toutes les vidéos
          </button>

          <Icons />

        </div>
      </section>

      <Footer />
    </>
  );
}