import { Link } from "react-router-dom";
import Icons from "./Icons";
import PartnerLogo from "../assets/chachalogo.png";

const NAV_LINKS = [
  { label: "HOME",    to: "/" },
  { label: "ABOUT",   to: "/about" },
  { label: "MUSIC",   to: "/music" },
  { label: "MEDIAS",  to: "/medias" },
  { label: "BOOK ME", to: "/bookme" },
  { label: "SHOP",    to: "/shop" },
];

const LEGAL_LINKS = [
  { label: "Mentions légales",             to: "/mentions-legales" },
  { label: "Politique de confidentialité", to: "/confidentialite" },
];

const PARTNER = {
  url: "https://www.chachadev.com",
  logo: PartnerLogo,
  name: "ChachaDev",
  tagline: "Développement web",
};

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative w-full bg-transparent pb-20 text-[#efdecd] overflow-hidden">

      {/* Ligne dorée */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, #e29600 20%, #e29600 80%, transparent)",
        }}
      />

      {/* Halo bordeaux */}
      <div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(57,2,2,0.18) 0%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-8 pt-16 pb-10 flex flex-col gap-12">

        {/* Grille 3 colonnes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center sm:text-left">

          {/* Colonne 1 — Identité */}
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <div>
              <h2 className="font-bebas text-[48px] tracking-[0.2em] text-[#efdecd] leading-none">
                BARHAN
              </h2>
              <p className="font-bold text-sm text-[#e29600] uppercase mt-1 tracking-widest">
                Kennen Music
              </p>
            </div>
            <p className="font-dm text-sm text-[#efdecd]/70 leading-relaxed max-w-[220px]">
              Artiste aux sonorités métissées, entre Afrique de l'Ouest, soul et hip-hop. Basé à Paris.
            </p>
            <Icons />
          </div>

          {/* Colonne 2 — Navigation */}
          <div className="flex flex-col gap-4 items-center">
            <p className="font-bold text-xs tracking-[0.2em] text-[#e29600] uppercase">
              Navigation
            </p>
            <nav className="flex flex-col gap-2 items-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-dm text-sm text-[#efdecd]/80 hover:text-[#e29600]
                             transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Colonne 3 — Contact */}
          <div className="flex flex-col gap-4 items-center sm:items-end sm:text-right">
            <p className="font-bold text-xs tracking-[0.2em] text-[#e29600] uppercase">
              Contact
            </p>
            <div className="flex flex-col gap-2 items-center sm:items-end">
              <a href="mailto:contact@barhan.com"
                 className="font-dm text-sm text-[#efdecd]/80 hover:text-[#e29600] transition-colors duration-200">
                contact@barhan.com
              </a>
              <a href="tel:+33612345678"
                 className="font-dm text-sm text-[#efdecd]/80 hover:text-[#e29600] transition-colors duration-200">
                +33 6 12 34 56 78
              </a>
              <p className="font-dm text-sm text-[#efdecd]/80">Paris, France</p>
            </div>
            <Link
              to="/bookme"
              className="mt-2 flex items-center gap-2
           font-dm text-xs tracking-widest uppercase font-bold
           text-[#efdecd] px-5 py-2.5 rounded-full transition-all duration-200"
style={{
  background: "rgba(43,62,130,0.5)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(100,136,255,0.4)",
  boxShadow: "0 0 16px rgba(43,62,130,0.3)",
}}
onMouseEnter={e => {
  e.currentTarget.style.background = "#e29600";
  e.currentTarget.style.border = "1px solid #e29600";
  e.currentTarget.style.boxShadow = "0 0 16px rgba(226,150,0,0.4)";
  e.currentTarget.style.color = "#000000";
}}
onMouseLeave={e => {
  e.currentTarget.style.background = "rgba(43,62,130,0.5)";
  e.currentTarget.style.border = "1px solid rgba(100,136,255,0.4)";
  e.currentTarget.style.boxShadow = "0 0 16px rgba(43,62,130,0.3)";
  e.currentTarget.style.color = "#efdecd";

}}
            >
              Réserver
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                <path d="M2 8h12M9 3l5 5-5 5"/>
              </svg>
            </Link>
          </div>

        </div>

        {/* Séparateur */}
        <div className="w-full h-px bg-[#efdecd]/10" />

        {/* Barre du bas */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

  {/* Copyright */}
  <div className="w-full sm:w-[280px] flex justify-center sm:justify-start">
    <p className="font-dm text-xs text-[#e29600]/70 tracking-wide">
      © {YEAR} Barhan — Tous droits réservés
    </p>
  </div>

  {/* Logo partenaire */}
  <a
  href={PARTNER.url}
  target="_blank"
  rel="noopener noreferrer"
  className="group flex flex-col items-center gap-2 cursor-pointer shrink-0"
  aria-label={`Visiter le site ${PARTNER.name}`}
>
  <span className="font-dm text-[11px] tracking-[0.2em] uppercase text-[#e29600]/60 group-hover:text-[#6488ff] transition-colors duration-300">
    Réalisé par ChachaDev
  </span>
  <div
    className="flex items-center justify-center px-4 py-2 rounded-lg bg-black
      border-2 border-white/20 group-hover:border-[#6488ff] transition-all duration-300"
  >
    <img
      src={PARTNER.logo}
      alt={PARTNER.name}
      className="h-8 w-auto object-contain opacity-70 group-hover:opacity-100
                 filter grayscale group-hover:grayscale-0 transition-all duration-300"
    />
  </div>
</a>

  {/* Liens légaux */}
  <div className="w-full sm:w-[280px] flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 sm:gap-6">
    {LEGAL_LINKS.map((link) => (
      <Link
        key={link.to}
        to={link.to}
        className="font-dm text-xs text-[#e29600]/60 hover:text-[#e29600] transition-colors duration-200"
      >
        {link.label}
      </Link>
    ))}
  </div>

</div>

        </div>

      
    </footer>
  );
}