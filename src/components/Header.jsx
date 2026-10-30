import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import barhanLogo from "../assets/barhanLogoSans.png";

const NAV_LINKS = [
  { label: "HOME",    to: "/",       color: "rgba(43,62,130,0.5)", text: "#a04ff" },
  { label: "ABOUT",  to: "/about",  color: "rgba(43,62,130,0.5)", text: "#a0b4ff" },
  { label: "MUSIC",  to: "/music",  color: "rgba(43,62,130,0.5)", text: "#a0b4ff" },
  { label: "MEDIAS", to: "/medias", color: "rgba(43,62,130,0.5)", text: "#a0b4ff" },
  { label: "BOOK ME",to: "/bookme", color: "rgba(43,62,130,0.5)", text: "#a0b4ff" },
];

    

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  // ✅ Ref sur le header pour mesurer sa hauteur réelle
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(64);

  const isActive = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ✅ Mesure la hauteur réelle du header au montage et au resize
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <header ref={headerRef} className="w-full fixed top-0 left-0 z-50">

      {/* Fond flouté */}
      <div className="absolute inset-0 bg-black backdrop-blur-md" />

      {/* Border bottom dégradé */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, #e29600 50%, #e29600 50%, transparent)",
        }}
      />

      <nav className="relative max-w-6xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6">

        <Link to="/" aria-label="Barhan Music — Accueil">
          <img src={barhanLogo} alt="Barhan Music" className="h-12 w-auto" />
        </Link>

        <ul className="hidden md:flex items-center gap-0.5 lg:gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.to);
            return (
              <li key={link.to} className="relative">
                <Link
                  to={link.to}
                  className="font-dm rounded-xl relative flex flex-col items-center
                    px-2 lg:px-3 py-1.5 text-[0.85rem] lg:text-[1rem]
                    font-bold tracking-[0.1em] lg:tracking-[0.15em] uppercase
                    transition-all duration-200 select-none whitespace-nowrap"
                  style={{
                    color: active ? "#e29600" : "#efdecd",
                    backgroundColor: "transparent",
                    borderBottom: active ? "1px solid #e29600" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#e29600";
                      e.currentTarget.style.backgroundColor = "rgba(226, 150, 0, 0.1)";
                      e.currentTarget.style.borderBottom = "1px solid rgba(226, 150, 0, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#efdecd";
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderBottom = "1px solid transparent";
                    }
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2
                                w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: "#e29600" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 z-10"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span className={`block h-px w-6 bg-white transition-all duration-300 origin-center
            ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`block h-px w-6 bg-white transition-all duration-300
            ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block h-px w-6 bg-white transition-all duration-300 origin-center
            ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </button>

      </nav>

      {/* ✅ Menu mobile — top calculé dynamiquement via headerHeight */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 bg-black/97 backdrop-blur-md
                    transition-all duration-300 ease-in-out flex flex-col
                    ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ top: `${headerHeight}px` }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(221,177,131,0.06) 0%, transparent 70%)",
          }}
        />

        <ul className="relative z-10 flex flex-col items-stretch px-6 pt-8 gap-2">
          {NAV_LINKS.map((link, i) => {
            const active = isActive(link.to);
            return (
              <li
                key={link.to}
                className="transition-all duration-300"
                style={{
                  transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                  transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                  opacity: menuOpen ? 1 : 0,
                }}
              >
                <Link
                  to={link.to}
                  className="font-dm flex items-center justify-between px-5 py-4 rounded-xl
                             text-sm font-bold tracking-widest uppercase
                             transition-all duration-200"
                  style={{
                    backgroundColor: active ? link.color : "rgba(255,255,255,0.04)",
                    color: active ? link.text : "rgba(255,255,255,0.6)",
                    borderLeft: active ? `3px solid ${link.color}` : "3px solid transparent",
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: link.text }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="relative z-10 mt-auto px-6 pb-10 flex flex-col items-center gap-3">
          <div className="w-full h-px bg-white/10 mb-4" />
          <p className="font-dm text-xs tracking-widest uppercase text-white/20">
            © {new Date().getFullYear()} Barhan
          </p>
        </div>
      </div>

    </header>
  );
}