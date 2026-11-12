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
import PortraitPhoto from "../assets/portraitphotos.jpg";
import LatestRelease from "../components/LatestRelease";
import PlayLink from "../components/PlayLink";

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

        {/* Hero
            Téléphone / tablette : tout est empilé (panneau → logo → icônes → Dernière sortie)
            et tient dans l'écran, quelle que soit sa taille.
            Grand écran (1240px et plus) : panneau en haut à gauche, logo au centre,
            Dernière sortie en bas à gauche.
            Téléphone en paysage (écran de moins de 500px de haut) : pas de panneau,
            logo + icônes à gauche, Dernière sortie à droite. */}
        <section
          id="hero"
          className="relative w-full h-svh flex flex-col [@media(orientation:landscape)_and_(max-height:500px)]:flex-row text-[#efdecd] overflow-hidden"
          aria-label="Section principale"
        >
          <div className="absolute inset-0 z-[2] pointer-events-none"
            style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-40 z-[3] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.85))" }}
          />

          {/* Texte vertical gauche */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex [@media(orientation:landscape)_and_(max-height:500px)]:hidden flex-col items-center gap-3" aria-hidden="true">
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#ddb183]" />
            <p
              className="font-dm text-[14px] tracking-[0.35em] text-[#efdecd] uppercase"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Bienvenue sur mon site
            </p>
            <div className="w-px h-16 bg-gradient-to-t from-transparent to-[#ddb183]/90" />
          </div>

          {/* ① Panneau d'annonces — téléphone / tablette : collé sous le Header */}
          <div className="min-[1240px]:hidden [@media(orientation:landscape)_and_(max-height:500px)]:hidden relative z-20 shrink-0 pt-[72px] px-4 flex justify-center">
            <AnnouncementBoard className="rounded-t-none" />
          </div>

          {/* ② Logo + icônes — centrés dans l'espace restant.
              La pointe du logo touche les icônes (pas d'espace sur téléphone). */}
          <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center [@media(orientation:landscape)_and_(max-height:500px)]:pt-[72px] [@media(orientation:landscape)_and_(max-height:500px)]:pb-[90px]">
            <h1 className="leading-none">
              {/* Texte lu par Google et les lecteurs d'écran, le logo reste l'affichage */}
              <span className="sr-only">Barhan, musicien et compositeur mauritanien installé à Paris</span>
              <img
                src={barhanLogo}
                alt=""
                className="block h-24 [@media(max-height:700px)]:h-20 [@media(max-height:620px)]:h-14
                           md:h-32 w-auto min-[1240px]:mb-16 brightness-75 saturate-75"
                width="400"
                height="128"
              />
            </h1>
            <Icons />
          </div>

          {/* ③ Dernière sortie — téléphone / tablette : en bas, centrée.
              Son bouton play est placé automatiquement à la même distance de la ligne
              du lecteur que le bouton play du lecteur (calculé par PlayLink). */}
          <div
            data-release
            className="min-[1240px]:hidden relative z-20 shrink-0 flex justify-center [@media(orientation:landscape)_and_(max-height:500px)]:self-end [@media(orientation:landscape)_and_(max-height:500px)]:pr-[6vw]"
            style={{ paddingBottom: "var(--release-bottom, 105px)" }}
          >
            {/* Sur les petits téléphones, le bloc est un peu réduit pour que tout tienne */}
            <div className="origin-bottom [@media(max-height:640px)]:scale-[0.85]">
              <LatestRelease centered />
            </div>
          </div>

          {/* Panneau d'annonces — grand écran (textes dans src/data/Announcements.js) */}
          <div className="hidden min-[1240px]:flex absolute z-20 top-[72px]
                left-[calc(50%-610px)]">
            <AnnouncementBoard className="rounded-t-none" />
          </div>

          {/* Dernière sortie — grand écran, en bas à gauche (hauteur calculée par PlayLink) */}
          <div
            data-release
            className="hidden min-[1240px]:block absolute z-20 left-[calc(50%-580px)]"
            style={{ bottom: "var(--release-bottom, 105px)" }}
          >
            <LatestRelease />
          </div>
        </section>

        {/* Fil d'or entre le play de « Dernière sortie » et le play du lecteur */}
        <PlayLink />

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