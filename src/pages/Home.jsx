// ============================================================
// HOME PAGE — typewriter + texte vertical
// ============================================================

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import BgHeros from "../assets/bgHeros.webp";
import Header from "../components/Header";
import Icons from "../components/Icons";
import { useState } from "react";
import { albums } from "./music/Albums";
import MusicModal from "./music/MusicModal";
import ClipSection from "../components/ClipSection";
import Footer from "../components/Footer";
import CarouselSection from "../components/CarouselSection";
import AnnouncementBoard from "../components/AnnouncementBoard";
import barhanLogo from "../assets/barhanLogoSans.webp";
// Photo de la section Présentation : remplacez par votre portrait
// (ex. import PortraitPhoto from "../assets/barhanPortrait.webp";)
import PortraitPhoto from "../assets/portraitphoto.jpg";

export default function Home() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <>
      <Helmet>
        <title>Barhan — Musicien mauritanien à Paris | Site officiel</title>
        <meta name="description" content="Site officiel de Barhan (ex-Bakhan), chanteur et compositeur mauritanien installé à Paris. Albums, concerts et clips entre traditions mauritaniennes, jazz et blues." />
        <meta property="og:title" content="Barhan — Musicien mauritanien à Paris" />
        <meta property="og:description" content="Chanteur et compositeur mauritanien installé à Paris, entre traditions africaines, jazz et blues." />
        <meta property="og:url" content="https://www.barhanmusic.com/" />
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
            <h1 className="leading-none">
              {/* Texte lu par Google et les lecteurs d'écran, le logo reste l'affichage */}
              <span className="sr-only">Barhan, musicien et compositeur mauritanien installé à Paris</span>
              <img
                src={barhanLogo}
                alt=""
                className="h-32 w-auto"
                width="400"
                height="128"
              />
            </h1>
            <Icons />
          </div>

          {/* Panneau d'annonces (textes dans src/data/Announcements.js)
              Ordinateur : le bord DROIT du panneau s'arrête là où commence le rouge de l'image
              (environ 36 % de la largeur de l'écran). 460px = largeur du panneau.
              → Pour ajuster : changez 36vw (plus grand = plus à droite).
              max(2rem, …) évite que le panneau sorte de l'écran sur les petits ordinateurs.
              Téléphone : centré en bas de l'écran. */}
          <div className="absolute z-20 inset-x-0 bottom-16 px-4 flex justify-center
            md:px-0 md:right-auto md:bottom-auto md:top-20
            md:left-[max(2rem,calc(38vw-400px))]">
            <AnnouncementBoard />
          </div>
        </section>

        {/* Présentation (texte important pour le référencement) */}
        <section className="relative w-full px-6 py-20 md:py-24 flex justify-center" aria-labelledby="presentation-title">
          <div className="w-full max-w-[960px] grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 md:gap-14 items-center">

            {/* Photo avec cadre doré décalé */}
            <div className="relative w-[240px] sm:w-[280px] md:w-[300px] mx-auto">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-2xl border border-[#e29600]/45"
              />
              <img
                src={PortraitPhoto}
                alt="Portrait de Barhan, musicien mauritanien"
                width="300"
                height="300"
                loading="lazy"
                className="relative w-full aspect-square object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Texte */}
            <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
              <p className="font-bold text-[13px] tracking-[0.35em] text-[#efdecd]/60 uppercase">
                Mauritanie · Paris
              </p>
             <h2 id="presentation-title" className="leading-snug" style={{ fontFamily: "'Cinzel', serif" }}>
                <span className="block text-[22px] md:text-[30px] font-semibold tracking-[0.06em] text-[#efdecd]">
                  Un musicien mauritanien
                </span>
                <span className="block mt-1.5 text-[14px] md:text-[18px] font-normal tracking-[0.16em] uppercase text-[#e29600]">
                  entre blues, jazz, hip hop et traditions
                </span>
              </h2>
              <p className="font-dm text-base md:text-[17px] leading-relaxed text-[#efdecd]/80 font-light">
                Chanteur et compositeur originaire de Mauritanie, Barhan — connu auparavant sous le nom de Bakhan —
                vit aujourd'hui à Paris. De la Mauritanie au Sénégal, au Tchad et au Kenya, son parcours l'a mené
                à mêler les traditions musicales mauritaniennes et ouest-africaines au jazz, au blues et à la soul.
                Finaliste du Prix Découvertes RFI, il a sorti les albums <em>N'deysan</em> et <em>Mots de tête</em>.
              </p>
              <Link
                to="/about"
                className="font-dm text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full
                border border-[#e29600]/70 text-[#e29600] hover:bg-[#e29600] hover:text-black transition-all duration-200"
              >
                Lire la biographie →
              </Link>
            </div>
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