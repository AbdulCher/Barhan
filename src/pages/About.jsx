import { useRef, useState, useEffect } from "react";
import Icons from "../components/Icons";
import BgAbout from "../assets/bgAboutv.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

// ── Données concerts — à mettre à jour régulièrement ──────────
const CONCERTS = [
  {
    id: 1,
    date: "15 Nov 2026",
    venue: "Le Café de la Danse",
    city: "Paris, France",
    link: null, // mettre l'URL billetterie ici
  },
  {
    id: 2,
    date: "08 Déc 2026",
    venue: "Festival Jazz à Vienne",
    city: "Vienne, France",
    link: null,
  },
  {
    id: 3,
    date: "20 Jan 2027",
    venue: "Institut du Monde Arabe",
    city: "Paris, France",
    link: null,
  },
];

// ── Citations presse ───────────────────────────────────────────
const PRESS = [
  {
    id: 1,
    quote: "Une voix qui traverse les frontières et les époques.",
    source: "RFI Musique",
    year: "2019",
  },
  {
    id: 2,
    quote: "Un artiste qui réinvente le dialogue entre l'Afrique et l'Occident.",
    source: "Jazz Magazine",
    year: "2020",
  },
  {
    id: 3,
    quote: "Barhan Ndiaye possède ce rare talent de rendre l'universel intime.",
    source: "Le Monde",
    year: "2021",
  },
];

// ── Blocs bio ──────────────────────────────────────────────────
const BLOCKS = [
  {
    id: "bio",
    label: "Bio",
  },
  {
    id: "concerts",
    label: "Concerts",
  },
  {
    id: "press",
    label: "Press",
  },
  {
    id: "contact",
    label: "Contact",
  },
];

// ── Composant ligne de concert ─────────────────────────────────
function ConcertRow({ concert, index }) {
  return (
    <div
      className="flex items-center gap-6 py-5 group"
      style={{ borderBottom: "1px solid rgba(239,222,205,0.07)" }}
    >
    <Helmet>
      <title>Barhan Ndiaye — Bio & Parcours</title>
      <meta name="description" content="Découvrez le parcours de Barhan Ndiaye, musicien mauritanien entre jazz, blues et traditions africaines. Concerts, presse et contact." />
      <meta property="og:title" content="Barhan Ndiaye — Bio & Parcours" />
      <meta property="og:url" content="https://www.barhan.fr/about" />
    </Helmet>
      {/* Numéro */}
      <span
        className="font-dm text-xs w-6 flex-shrink-0 text-right"
        style={{ color: "rgba(226,150,0,0.3)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Date */}
      <div
  className="flex-shrink-0 px-3 py-1 rounded-md"
  style={{
    background: "rgba(43,62,130,0.2)",
    border: "1px solid rgba(100,136,255,0.2)",
    minWidth: "110px",
  }}
>
  <span className="font-dm text-xs font-bold tracking-wide" style={{ color: "#a0b4ff" }}>
    {concert.date}
  </span>
</div>

      {/* Lieu + ville */}
      <div className="flex flex-col flex-1 min-w-0">
        <span
          className="font-dm text-sm font-bold truncate"
          style={{ color: "rgba(239,222,205,0.9)" }}
        >
          {concert.venue}
        </span>
        <span
          className="font-dm text-xs truncate mt-0.5"
          style={{ color: "rgba(239,222,205,0.35)" }}
        >
          {concert.city}
        </span>
      </div>

      {/* Bouton billetterie */}
      {concert.link ? (
        <a
  href={concert.link}
  target="_blank"
  rel="noopener noreferrer"
  className="flex-shrink-0 px-4 py-2 rounded-full font-dm text-xs font-bold tracking-widest uppercase
             transition-all duration-200"
  style={{
    background: "rgba(43,62,130,0.5)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(100,136,255,0.4)",
    boxShadow: "0 0 16px rgba(43,62,130,0.3)",
    color: "#a0b4ff",
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
    e.currentTarget.style.color = "#a0b4ff";
  }}
>
  Réserver →
</a>
      ) : (
        <span
  className="flex-shrink-0 px-4 py-2 rounded-full font-dm text-xs tracking-widest uppercase"
  style={{
    background: "rgba(43,62,130,0.2)",
    border: "1px solid rgba(100,136,255,0.15)",
    color: "rgba(160,180,255,0.35)",
  }}
>
  Bientôt
</span>
      )}
    </div>
  );
}

// ── Composant citation presse ──────────────────────────────────
function PressQuote({ item }) {
  return (
    <div
  className="flex flex-col gap-3 p-6 rounded-xl"
  style={{
    background: "rgba(43,62,130,0.15)",
    border: "1px solid rgba(100,136,255,0.2)",
    backdropFilter: "blur(12px)",
  }}
>
      <div
        className="font-dm text-3xl leading-none"
        style={{ color: "rgba(226,150,0,0.3)" }}
      >
        "
      </div>
      <p
        className="font-dm text-base leading-relaxed italic"
        style={{ color: "rgba(239,222,205,0.75)" }}
      >
        {item.quote}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <div className="h-px flex-1" style={{ background: "rgba(226,150,0,0.15)" }} />
        <span className="font-dm text-xs tracking-widest uppercase" style={{ color: "rgba(226,150,0,0.6)" }}>
          {item.source}
        </span>
        <span className="font-dm text-xs" style={{ color: "rgba(239,222,205,0.2)" }}>
          {item.year}
        </span>
      </div>
    </div>
  );
}

// ── Page About ─────────────────────────────────────────────────
export default function About() {
  const sectionRefs = useRef({});
  const [activeBlock, setActiveBlock] = useState("bio");
  const [showNav, setShowNav] = useState(false);
  const isScrollingTo = useRef(false);

  // IntersectionObserver : suit la section visible
  useEffect(() => {
    const observers = [];
    BLOCKS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isScrollingTo.current) {
            setActiveBlock(id);
          }
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Affiche la nav sticky après arrêt du scroll
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setShowNav(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowNav(true), 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const scrollTo = (id) => {
    setActiveBlock(id);
    isScrollingTo.current = true;
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => { isScrollingTo.current = false; }, 900);
  };

  return (
    <>
      {/* BG fixe global */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${BgAbout})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      <Header />

      <div className="relative z-10">

        {/* Hero */}
        <section className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden">
          <div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{ background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 z-[3] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <p className="font-bold text-[16px] tracking-[0.35em] text-[#efdecd]/50 uppercase">
              Artiste
            </p>
            <h2 className="font-bebas text-[32px] tracking-[0.20em] text-[#e29600] leading-none">
              BARHAN
            </h2>

            {/* Navigation hero */}
            <div className="flex justify-center gap-2 md:gap-3 flex-wrap">
              {BLOCKS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`
                    font-bold text-[13px] tracking-[0.12em] uppercase
                    px-5 py-2 rounded-full border
                    transition-all duration-300
                    ${activeBlock === id
                      ? "text-[#e29600] border-[#e29600] bg-[#e29600]/10 shadow-[0_0_12px_rgba(226,150,0,0.2)]"
                      : "text-[#efdecd]/50 border-[#efdecd]/20 hover:text-[#efdecd]/80 hover:border-[#e29600]/40 hover:bg-[#e29600]/5"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>

            <Icons />
          </div>
        </section>

        {/* Contenu */}
        <section className="relative w-full bg-transparent text-white py-8 pb-24 overflow-hidden">
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(239,222,205,0.06) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 max-w-[800px] mx-auto px-6 flex flex-col gap-0">

            {/* ── BIO ── */}
            <div
              id="bio"
              ref={(el) => (sectionRefs.current["bio"] = el)}
              className="flex flex-col gap-6 scroll-mt-28 py-16"
              style={{ borderBottom: "1px solid rgba(239,222,205,0.06)" }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#efdecd]/20" />
                <h3 className="font-bold text-[18px] tracking-[0.10em] text-[#e29600] uppercase">Bio</h3>
                <div className="flex-1 h-px bg-[#efdecd]/20" />
              </div>
              <p className="font-dm text-lg leading-loose text-[#efdecd]/85 font-light">
                Son aventure musicale commence en 1999 sous le pseudonyme d'Alias Chico. Son duo avec le rappeur
                Papis Kimmi donne naissance à <em>Nebkhi Mauritanie</em>, un album qui rencontre un immense succès
                national et fait connaître sa voix à travers toute la Mauritanie.
              </p>
              <p className="font-dm text-lg leading-loose text-[#efdecd]/85 font-light">
                Désireux d'explorer de nouveaux horizons, il s'éloigne du rap en 2003 pour embrasser un univers
                plus instrumental et vocal. Sa collaboration avec le guitariste Philippe Collucci mène à l'album
                <em> Talibé</em> (2004), ouvrant les portes à des rencontres prestigieuses, dont la diva
                mauritanienne Dimi Mint Abba. Sa quête d'excellence le conduit ensuite au Sénégal, où il intègre
                le Département des Arts Scéniques du Conservatoire National de Dakar — il y apprivoise le piano,
                perfectionne sa guitare et affine sa plume.
              </p>
              <p className="font-dm text-lg leading-loose text-[#efdecd]/85 font-light">
                Installé en France, finaliste du Prix Découvertes RFI en 2009, il sort <em>N'deysan</em> à Paris
                en 2011. Il s'imprègne ensuite du jazz et du blues des années 60, réinterprétant Nina Simone,
                Ella Fitzgerald ou Oscar Brown Jr. Ce métissage organique donne naissance en 2019 à son album
                acclamé <em>Mots de tête</em> — une œuvre qui unit le patrimoine mauritanien à la modernité du
                jazz, célébrant le dialogue des cultures et l'unité des peuples.
              </p>
            </div>

            {/* ── CONCERTS ── */}
            <div
              id="concerts"
              ref={(el) => (sectionRefs.current["concerts"] = el)}
              className="flex flex-col gap-6 scroll-mt-28 py-16"
              style={{ borderBottom: "1px solid rgba(239,222,205,0.08)" }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#efdecd]/20" />
                <h3 className="font-bold text-[18px] tracking-[0.10em] text-[#e29600] uppercase">Concerts</h3>
                <div className="flex-1 h-px bg-[#efdecd]/20" />
              </div>

              {CONCERTS.length > 0 ? (
                <div className="flex flex-col">
                  {CONCERTS.map((concert, i) => (
                    <ConcertRow key={concert.id} concert={concert} index={i} />
                  ))}
                </div>
              ) : (
                <p className="font-dm text-base text-[#efdecd]/40 text-center py-8">
                  Aucune date annoncée pour le moment.
                </p>
              )}

              <p className="font-dm text-xs text-center" style={{ color: "rgba(239,222,205,0.25)" }}>
                Pour organiser un concert privé ou une résidence artistique —{" "}
                <button
                  onClick={() => scrollTo("contact")}
                  className="underline underline-offset-2 hover:text-[#e29600]/60 transition-colors duration-200"
                >
                  nous contacter
                </button>
              </p>
            </div>

            {/* ── PRESS ── */}
            <div
              id="press"
              ref={(el) => (sectionRefs.current["press"] = el)}
              className="flex flex-col gap-6 scroll-mt-28 py-16"
              style={{ borderBottom: "1px solid rgba(239,222,205,0.06)" }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#efdecd]/20" />
                <h3 className="font-bold text-[18px] tracking-[0.10em] text-[#e29600] uppercase">Press</h3>
                <div className="flex-1 h-px bg-[#efdecd]/20" />
              </div>

              <div className="flex flex-col gap-4">
                {PRESS.map((item) => (
                  <PressQuote key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* ── CONTACT ── */}
            <div
              id="contact"
              ref={(el) => (sectionRefs.current["contact"] = el)}
              className="flex flex-col gap-6 scroll-mt-28 py-16"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#efdecd]/20" />
                <h3 className="font-bold text-[18px] tracking-[0.10em] text-[#e29600] uppercase">Contact</h3>
                <div className="flex-1 h-px bg-[#efdecd]/20" />
              </div>

              <div className="flex flex-col gap-4">
                <p className="font-dm text-base leading-relaxed" style={{ color: "rgba(239,222,205,0.6)" }}>
                  Pour toute demande de booking, interview, collaboration ou événement privé :
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
  href="mailto:contact@barhan.fr"
  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl
             font-dm text-sm font-bold tracking-widest uppercase
             transition-all duration-200"
  style={{
    background: "rgba(43,62,130,0.5)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(100,136,255,0.4)",
    boxShadow: "0 0 16px rgba(43,62,130,0.3)",
    color: "#a0b4ff",
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
    e.currentTarget.style.color = "#a0b4ff";
  }}
>
  ✉ Email
</a>
                  <a
  href="/bookme"
  className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl
             font-dm text-sm font-bold tracking-widest uppercase
             transition-all duration-200"
  style={{
    background: "rgba(43,62,130,0.5)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(100,136,255,0.4)",
    boxShadow: "0 0 16px rgba(43,62,130,0.3)",
    color: "#a0b4ff",
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
    e.currentTarget.style.color = "#a0b4ff";
  }}
>
  ✦ Formulaire de contact
</a>
                </div>
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </div>

      {/* Barre de navigation sticky */}
      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-40 flex gap-1 px-3 py-2 rounded-full
                    transition-all duration-500
                    ${showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
        style={{
          background: "rgba(8,3,1,0.82)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(226,150,0,0.15)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        }}
      >
        {BLOCKS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`
              font-bold text-[11px] tracking-[0.1em] uppercase px-4 py-1.5 rounded-full
              transition-all duration-200
              ${activeBlock === id
                ? "text-[#e29600] bg-[#e29600]/12"
                : "text-[#efdecd]/40 hover:text-[#efdecd]/70"
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Bouton retour haut */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-24 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center
          transition-all duration-500 ${showNav ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(57,2,2,0.6)",
          border: "4px solid rgba(226,150,0,0.3)",
        }}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="#e29600" strokeWidth="1.5" className="w-5 h-5">
          <path d="M3 10l5-5 5 5" />
        </svg>
      </button>
    </>
  );
}
