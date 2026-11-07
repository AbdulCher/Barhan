import { useRef, useState, useEffect } from "react";
import Icons from "../components/Icons";
import BgAbout from "../assets/bgAboutv.webp";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import { CONCERTS } from "../data/Concerts";

// ── Concerts : les dates sont dans src/data/Concerts.js ──────
const MOIS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")} ${MOIS[m - 1]} ${y}`;
}

// Date du jour au format "AAAA-MM-JJ" (un concert reste « À venir » le jour même)
function today() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

const PAST_PREVIEW = 8; // nombre de concerts passés affichés avant « Voir tout »

// ── Citations presse ───────────────────────────────────────────

  const PRESS = [
  {
    id: 1,
    quote: "Une voix qui traverse les frontières et les époques.",
    source: "RFI Musique",
    year: "2009",
    url: "https://www.rfi.fr/fr/contenu/20091118-bakhan-voix-plurielle",
  },
    {
    id: 2,
    quote: "Fiche artiste de Barhan sur la plateforme de référence des cultures africaines.",
    source: "Africultures",
    year: "2024",
    url: "https://africultures.com/personnes/?no=26627",
  },
  {
    id: 3,
    quote: "Parcours et biographie de Barhan, artiste entre jazz, blues et traditions africaines.",
    source: "InfoConcert",
    year: "2024",
    url: "https://www.infoconcert.com/artiste/barhan-181922/concerts/presentation",
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
    label: "Presse",
  },
  {
    id: "contact",
    label: "Contact",
  },
];

// ── Composant ligne de concert ─────────────────────────────────
function ConcertRow({ concert, index, past = false }) {
  return (
    <div
      className="flex items-center gap-6 py-5 group"
      style={{ borderBottom: "1px solid rgba(239,222,205,0.07)", opacity: past ? 0.75 : 1 }}
    >
      {/* Numéro */}
      <span
        className="font-dm text-xs w-6 flex-shrink-0 text-right"
        style={{ color: "rgba(226,150,0,0.8)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Date */}
      <div
        className="flex-shrink-0 px-3 py-1 rounded-md"
        style={{
        background: past ? "rgba(239,222,205,0.05)" : "rgba(43,62,130,0.2)",
        border: past ? "1px solid rgba(239,222,205,0.12)" : "1px solid rgba(100,136,255,0.2)",
        minWidth: "110px",
        }}
      >
        <span className="font-dm text-xs font-bold tracking-wide" style={{ color: past ? "rgba(239,222,205,0.55)" : "#a0b4ff" }}>
          {formatDate(concert.date)}
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
          style={{ color: "rgba(239,222,205,0.65)" }}
        >
          {concert.city}
          {concert.note && (
            <span style={{ color: "rgba(226,150,0,0.85)" }}> · {concert.note}</span>
          )}
        </span>
      </div>

      {/* Bouton billetterie (rien pour un concert passé) */}
      {past ? null : concert.link ? (
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
          color: "rgba(160,180,255,0.75)",
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
  const Wrapper = item.url ? "a" : "div";
  return (
    <Wrapper
      {...(item.url ? { href: item.url, target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex flex-col gap-3 p-6 rounded-xl transition-all duration-200"
      style={{
        background: "rgba(43,62,130,0.15)",
        border: "1px solid rgba(100,136,255,0.2)",
        backdropFilter: "blur(12px)",
        ...(item.url ? { cursor: "pointer" } : {}),
      }}
      onMouseEnter={item.url ? e => {
        e.currentTarget.style.border = "1px solid rgba(100,136,255,0.5)";
        e.currentTarget.style.background = "rgba(43,62,130,0.25)";
      } : undefined}
      onMouseLeave={item.url ? e => {
        e.currentTarget.style.border = "1px solid rgba(100,136,255,0.2)";
        e.currentTarget.style.background = "rgba(43,62,130,0.15)";
      } : undefined}
    >
      <div aria-hidden="true" className="font-dm text-3xl leading-none" style={{ color: "rgba(160,180,255,0.3)" }}>
        "
      </div>
      <p className="font-dm text-base leading-relaxed italic" style={{ color: "rgba(239,222,205,0.75)" }}>
        {item.quote}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <div className="h-px flex-1" style={{ background: "rgba(100,136,255,0.15)" }} />
        <span className="font-dm text-xs tracking-widest uppercase" style={{ color: "rgba(160,180,255,0.8)" }}>
          {item.source}
        </span>
        <span className="font-dm text-xs" style={{ color: "rgba(239,222,205,0.6)" }}>
          {item.year}
        </span>
        {item.url && (
          <span aria-hidden="true" className="font-dm text-xs" style={{ color: "rgba(160,180,255,0.7)" }}>→</span>
        )}
      </div>
    </Wrapper>
  );
}
      

// ── Page About ─────────────────────────────────────────────────
export default function About() {
  const sectionRefs = useRef({});
  const [activeBlock, setActiveBlock] = useState("bio");
  const [showNav, setShowNav] = useState(false);
  const isScrollingTo = useRef(false);

  // Tri automatique des concerts selon la date du jour
  const now = today();
  const upcoming = CONCERTS.filter((c) => c.date >= now).sort((a, b) => a.date.localeCompare(b.date));
  const past = CONCERTS.filter((c) => c.date < now).sort((a, b) => b.date.localeCompare(a.date));
  const [concertTab, setConcertTab] = useState(upcoming.length > 0 ? "upcoming" : "past");
  const [showAllPast, setShowAllPast] = useState(false);
  const pastShown = showAllPast ? past : past.slice(0, PAST_PREVIEW);

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
      <Helmet>
        <title>Barhan — Biographie du musicien mauritanien | Concerts & presse</title>
        <meta name="description" content="Biographie de Barhan (ex-Bakhan), chanteur et compositeur mauritanien installé à Paris : de Nouakchott à Dakar, N'Djaména et Nairobi, entre traditions, jazz et blues. Concerts, presse et contact." />
        <meta property="og:title" content="Barhan — Biographie du musicien mauritanien" />
        <meta property="og:url" content="https://www.barhanmusic.com/about" />
      </Helmet>

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
            <p className="font-bold text-[16px] tracking-[0.35em] text-[#efdecd]/70 uppercase text-center">
              Musicien mauritanien · Paris
            </p>
            <h1 className="font-bebas text-[32px] tracking-[0.20em] text-[#e29600] leading-none">
              BARHAN
            </h1>

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
                      : "text-[#efdecd]/60 border-[#efdecd]/20 hover:text-[#efdecd]/80 hover:border-[#e29600]/40 hover:bg-[#e29600]/5"
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
                <strong className="font-bold text-[#efdecd]">Barhan</strong> (Barhan Ndiaye, connu auparavant sous le nom
                de Bakhan) est un chanteur et compositeur mauritanien installé à Paris.
              </p>
              <p className="font-dm text-lg leading-loose text-[#efdecd]/85 font-light">
                Son aventure musicale commence en 1999 sous le pseudonyme d'Alias Chico. Son duo avec le rappeur
                Papis Kimmi donne naissance à <em>Nebkhi Mauritanie</em>, un album qui rencontre un immense succès
                national et fait connaître sa voix à travers toute la Mauritanie.
              </p>
              <p className="font-dm text-lg leading-loose text-[#efdecd]/85 font-light">
                Désireux d'explorer de nouveaux horizons, il s'éloigne du rap en 2003 pour embrasser un univers
                plus instrumental et vocal. Sa collaboration avec le guitariste Philippe Collucci mène à l'album
                <em> Talibé</em> (2004), ouvrant les portes à des rencontres prestigieuses, dont les divas
                mauritaniennes Dimi Mint Abba et Maalouma Mint El Meidah. 
              </p>
              <p className="font-dm text-lg leading-loose text-[#efdecd]/85 font-light">
                Sa quête d'excellence le conduit ensuite au Sénégal, où il intègre
                le Département des Arts Scéniques du Conservatoire National de Dakar — il y apprivoise le piano,
                perfectionne sa guitare et affine sa plume. Inscrit à l'ENA, Barhan traversera plusieurs fois l'Afrique, 
                de la Mauritanie au Tchad, en passant par le Mali, le Burkina Faso, le Niger, le Nigeria et le Cameroun pour se rendre à N'Djaména, 
                guitare en main, à la rencontre des peuples. 
              </p>
              <p className="font-dm text-lg leading-loose text-[#efdecd]/85 font-light">
                Il s'installe de manière constante au Tchad en 2007 et crée
                le groupe <em>ADA</em> avec le guitariste camerounais Alex Wandji. Il collabore régulièrement avec
                le Centre Culturel Français, travaille aux côtés de la chanteuse tchadienne Mounira Mitchala et
                participe aux <em>Voix du Sahel</em>, animées par le flûtiste nigérien Yancouba Moumini et le
                guitariste franco-algérien Kamal Zekri.
              </p>
              
              <p className="font-dm text-lg leading-loose text-[#efdecd]/85 font-light">
                Installé en France, finaliste du Prix Découvertes RFI en 2009 sous le nom de Bakhan, il sort <em>N'deysan</em> à Paris
                en 2011. Il s'imprègne ensuite du jazz et du blues des années 60, réinterprétant Nina Simone, Ray Charles,
                Ella Fitzgerald, Oscar Brown Jr. ou Jacques Brel et Edith Piaf. Ce métissage organique donne naissance à son album
                acclamé <em>Mots de tête</em>, enregistré à Nairobi au Kenya en 2018 —
                une œuvre qui unit le patrimoine mauritanien à la modernité du jazz, célébrant le dialogue des cultures
                et l'unité des peuples. C'est avec la sortie de cet album que Bakhan devient Barhan.
                De retour à Paris en 2019, Barhan fait la rencontre de Paul Sany,
                pianiste issu de l'école de musique Didier Lockwood à Melun, qui lui présentera tous les membres
                de son groupe actuel.
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

              {/* Onglets À venir / Passés */}
              <div className="flex justify-center gap-2">
                {[
                  { id: "upcoming", label: "À venir", count: upcoming.length },
                  { id: "past", label: "Passés", count: past.length },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setConcertTab(t.id)}
                    className={`font-bold text-[12px] tracking-[0.12em] uppercase px-4 py-1.5 rounded-full border-b
                      transition-all duration-300 ${
                      concertTab === t.id
                        ? "text-[#e29600] border-b-[#e29600] bg-[#e29600]/10"
                        : "text-[#efdecd]/70 border-b-[#efdecd]/20 hover:text-[#efdecd] hover:border-b-[#e29600]/40"
                    }`}
                  >
                    {t.label} ({t.count})
                  </button>
                ))}
              </div>

              {concertTab === "upcoming" && (
                upcoming.length > 0 ? (
                  <div className="flex flex-col">
                    {upcoming.map((concert, i) => (
                      <ConcertRow key={concert.date + concert.venue} concert={concert} index={i} />
                    ))}
                  </div>
                ) : (
                  <p className="font-dm text-base text-[#efdecd]/60 text-center py-8">
                    Aucune date annoncée pour le moment.
                  </p>
                )
              )}

              {concertTab === "past" && (
                past.length > 0 ? (
                  <>
                    <div className="flex flex-col">
                      {pastShown.map((concert, i) => (
                        <ConcertRow key={concert.date + concert.venue} concert={concert} index={i} past />
                      ))}
                    </div>
                    {past.length > PAST_PREVIEW && (
                      <button
                        onClick={() => setShowAllPast((v) => !v)}
                        className="self-center font-dm text-xs font-bold tracking-widest uppercase
                                   text-[#e29600]/80 hover:text-[#e29600] transition-colors duration-200"
                      >
                        {showAllPast ? "Réduire" : `Voir tout (${past.length})`}
                      </button>
                    )}
                  </>
                ) : (
                  <p className="font-dm text-base text-[#efdecd]/60 text-center py-8">
                    Les concerts passés apparaîtront ici.
                  </p>
                )
              )}

              <p className="font-dm text-xs text-center" style={{ color: "rgba(239,222,205,0.65)" }}>
                Pour organiser un concert privé ou une résidence artistique —{" "}
                <button
                  onClick={() => scrollTo("contact")}
                  className="underline underline-offset-2 hover:text-[#e29600] transition-colors duration-200"
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
                <h3 className="font-bold text-[18px] tracking-[0.10em] text-[#e29600] uppercase">Presse</h3>
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
                <p className="font-dm text-base leading-relaxed" style={{ color: "rgba(239,222,205,0.75)" }}>
                  Pour toute demande de booking, interview, collaboration ou événement privé :
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:barhan.nd@gmail.com"
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
                    e.currentTarget.style.border = "2px solid #e29600";
                    e.currentTarget.style.boxShadow = "0 0 16px rgba(226,150,0,0.4)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = "1px solid rgba(100,136,255,0.4)";
                    e.currentTarget.style.boxShadow = "0 0 16px rgba(43,62,130,0.3)";
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
                    e.currentTarget.style.border = "2px solid #e29600";
                    e.currentTarget.style.boxShadow = "0 0 16px rgba(226,150,0,0.4)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.border = "1px solid rgba(100,136,255,0.4)";
                    e.currentTarget.style.boxShadow = "0 0 16px rgba(43,62,130,0.3)";
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
                : "text-[#efdecd]/70 hover:text-[#efdecd]"
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
        aria-label="Revenir en haut de la page"
        className={`fixed bottom-24 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center
          transition-all duration-500 ${showNav ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(57,2,2,0.6)",
          border: "4px solid rgba(226,150,0,0.3)",
        }}
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="#e29600" strokeWidth="1.5" className="w-5 h-5">
          <path d="M3 10l5-5 5 5" />
        </svg>
      </button>
    </>
  );
}
