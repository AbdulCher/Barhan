// ============================================================
// HOME PAGE — typewriter + texte vertical
// ============================================================

import { Helmet } from "react-helmet-async";
import BgHeros from "../assets/bgHeros.jpg";
import Header from "../components/Header";
import Icons from "../components/Icons";
import { useState } from "react";
import { albums } from "./music/Albums";
import MusicModal from "./music/MusicModal";
import ClipSection from "../components/ClipSection";
import Footer from "../components/Footer";
import CarouselSection from "../components/CarouselSection";
import TypewriterText from "../components/TypewriterText";
import barhanLogo from "../assets/barhanLogoSans.png";

export default function Home() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <>
      <Helmet>
        <title>Barhan Ndiaye — Musicien & Compositeur</title>
        <meta name="description" content="Site officiel de Barhan Ndiaye, musicien et compositeur mauritanien installé à Paris. Jazz, blues et traditions africaines." />
        <meta property="og:title" content="Barhan Ndiaye — Musicien & Compositeur" />
        <meta property="og:description" content="Site officiel de Barhan Ndiaye, musicien entre traditions africaines, jazz et blues." />
        <meta property="og:url" content="https://www.barhan.fr/" />
      </Helmet>

      {/* BG fixe global */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${BgHeros})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      <Header />

      <div className="relative z-10">

        {/* Hero */}
        <section
          className="relative w-full h-screen pt-20 text-[#efdecd] overflow-hidden"
          aria-label="Section principale"
        >
          <div className="absolute inset-0 z-[2] pointer-events-none"
            style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))" }}
          />

          {/* Texte vertical gauche */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-3" aria-hidden="true">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#ddb183]" />
            <p
              className="font-dm text-[14px] tracking-[0.35em] text-[#efdecd] uppercase"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Bienvenue sur mon site
            </p>
            <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#ddb183]/90" />
          </div>

          {/* Contenu centré */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 -mt-10">
            <p className="font-bold text-base tracking-[0.35em] text-[#efdecd]/50 uppercase h-4" aria-live="polite">
              <TypewriterText phrases={["Musicien & Compositeur", "Kennen Music", "Paris, France"]} />
            </p>
            <h1 className="leading-none">
              <img
                src={barhanLogo}
                alt="Barhan Ndiaye"
                className="h-32 w-auto"
                width="400"
                height="128"
              />
            </h1>
            <Icons />
          </div>
        </section>

        {/* Carrousel albums */}
        <CarouselSection
          albums={albums}
          onAlbumClick={(album) => setSelectedAlbum(album)}
        />

        <div className="w-full h-px bg-[#8c0202]" aria-hidden="true" />

        {/* Clip */}
        <ClipSection />

        {/* Modal */}
        <MusicModal
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />

        <Footer />
      </div>
    </>
  );
}