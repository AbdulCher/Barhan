// ============================================================
// PANNEAU D'ANNONCES — défilement automatique (page d'accueil)
// ============================================================
//
// Les textes se modifient dans src/data/Announcements.js.
// Le prochain concert (src/data/Concerts.js) est ajouté tout seul.

import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ANNOUNCEMENTS, ANNOUNCEMENT_DELAY } from "../data/Announcements";
import { CONCERTS } from "../data/Concerts";

const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

function todayISO() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MOIS[m - 1]} ${y}`;
}

// Liste finale : prochain concert (auto) + annonces encore valables
function buildItems() {
  const now = todayISO();
  const next = CONCERTS.filter((c) => c.date >= now).sort((a, b) => a.date.localeCompare(b.date))[0];
  const items = ANNOUNCEMENTS.filter((a) => !a.until || a.until >= now);
  if (next) {
    items.unshift({
      type: "Prochain concert",
      title: `${formatDate(next.date)} · ${next.venue}`,
      text: next.city + (next.note ? ` · ${next.note}` : ""),
      link: next.link
        ? { label: "Réserver", to: next.link }
        : { label: "Toutes les dates", to: "/about#concerts" },
      highlight: true,
    });
  }
  return items;
}

function ItemLink({ link, color }) {
  const cls =
    "inline-flex items-center gap-1.5 font-dm text-[11px] font-bold tracking-widest uppercase hover:!text-[#efdecd] transition-colors duration-200";
  if (/^https?:\/\//.test(link.to)) {
    return (
      <a href={link.to} target="_blank" rel="noopener noreferrer" className={cls} style={{ color }}>
        {link.label} <span aria-hidden="true">→</span>
      </a>
    );
  }
  return (
    <Link to={link.to} className={cls} style={{ color }}>
      {link.label} <span aria-hidden="true">→</span>
    </Link>
  );
}

// ── Ambiances de couleur : changez THEME pour essayer ──────────
//   "velours" (bordeaux), "nuit" (bleu nuit), "ambre" (or fumé)
const THEME = "or";

const THEMES = {
  velours: {
    bg: "linear-gradient(135deg, rgba(92,10,10,0.62) 0%, rgba(30,6,4,0.45) 100%)",
    glow: "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,220,190,0.06)",
    label: "#f0b25a",
    accent: "#e29600",
    bar: "linear-gradient(90deg, rgba(226,150,0,0.25), #e29600)",
    dot: "#f0b25a",
  },
  nuit: {
    bg: "linear-gradient(135deg, rgba(34,44,100,0.6) 0%, rgba(10,12,30,0.4) 100%)",
    glow: "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(200,215,255,0.08)",
    label: "#a0b4ff",
    accent: "#a0b4ff",
    bar: "linear-gradient(90deg, rgba(226,150,0,0.25), #e29600)",
    dot: "#a0b4ff",
  },
  ambre: {
    bg: "linear-gradient(135deg, rgba(226,150,0,0.2) 0%, rgba(20,8,4,0.45) 100%)",
    glow: "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,230,180,0.1)",
    label: "#efdecd",
    accent: "#f0b25a",
    bar: "linear-gradient(90deg, rgba(226,150,0,0.25), #e29600)",
    dot: "#efdecd",
  },
    or: {
    bg: "linear-gradient(135deg, rgba(20,12,6,0.72) 0%, rgba(8,3,1,0.55) 100%)",
    glow: "0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(226,150,0,0.08)",
    label: "#e29600",
    accent: "#e29600",
    bar: "linear-gradient(90deg, rgba(226,150,0,0.25), #e29600)",
    dot: "#e29600",
  },
};

export default function AnnouncementBoard({ className = "", theme = THEME }) {
  const t = THEMES[theme] || THEMES.velours;
  const items = useMemo(buildItems, []);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);     // pause demandée (bouton)
  const [hovered, setHovered] = useState(false);   // pause au survol / focus
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const running = !paused && !hovered && !reduceMotion && items.length > 1;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % items.length), ANNOUNCEMENT_DELAY);
    return () => clearTimeout(id);
  }, [running, index, items.length]);

  if (items.length === 0) return null;
  const item = items[index];
  const go = (i) => setIndex((i + items.length) % items.length);

  return (
    <aside
      aria-label="Annonces"
      aria-roledescription="carrousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`w-full max-w-[460px] sm:w-[460px] h-[150px] flex flex-col rounded-2xl overflow-hidden
        backdrop-blur-md ${className}`}
      style={{ background: t.bg, boxShadow: t.glow }}
    >
      {/* Barre de progression (temps avant l'annonce suivante) */}
            {/* Barre de progression (temps avant l'annonce suivante) */}
      <div className="h-[2px] w-full bg-white/5 shrink-0" aria-hidden="true">
        <div
          key={`${index}-${running}`}
          className="h-full"
          style={{
            background: t.bar,
            width: 0,
            animation: running ? `annGrow ${ANNOUNCEMENT_DELAY}ms linear forwards` : "none",
          }}
        />
      </div>
      <style>{`
        @keyframes annGrow { from { width: 0% } to { width: 100% } }
        @keyframes annIn { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
      `}</style>

      <div className="flex-1 flex flex-col px-6 pt-3.5 pb-1.5 min-h-0">
        {/* Contenu de l'annonce */}
        <div
          key={index}
          className="flex-1 flex flex-col gap-1 min-h-0 overflow-hidden"
          style={{ animation: reduceMotion ? "none" : "annIn 0.45s ease-out" }}
          aria-live={running ? "off" : "polite"}
        >
          <span
            className="self-start flex items-center gap-2 font-dm text-[10px] font-bold tracking-[0.25em] uppercase"
            style={{ color: t.label }}
          >
            <span
              aria-hidden="true"
              className={`w-1.5 h-1.5 rounded-full ${item.highlight ? "animate-pulse" : ""}`}
              style={{ background: t.dot, boxShadow: item.highlight ? `0 0 8px ${t.dot}` : "none" }}
            />
            {item.type}
          </span>
          <p className="font-bebas text-[21px] tracking-[0.08em] text-[#efdecd] leading-tight mt-0.5 truncate">
            {item.title}
          </p>
          {item.text && (
            <p className="font-dm text-[13px] text-[#efdecd]/75 leading-snug truncate">{item.text}</p>
          )}
        </div>

        {/* Commandes : points, précédent / suivant, pause */}
        <div className="flex items-center justify-between shrink-0 gap-3">
          {/* Lien de l'annonce (ou rien) */}
          <div className="min-w-0 truncate">
            {item.link && <ItemLink link={item.link} color={t.accent} />}
          </div>

        {items.length > 1 && (
          <div className="flex items-center shrink-0 -mr-2">
            {/* Points masqués sur petit écran pour laisser la place au lien */}
            <div className="hidden sm:flex items-center">
              {items.map((it, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Annonce ${i + 1} : ${it.type}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group p-[7px]"
                >
                  <span className={`block h-[5px] rounded-full transition-all duration-300
                    ${i === index ? "w-5" : "w-[5px] bg-[#efdecd]/30 group-hover:bg-[#efdecd]/60"}`}
                    style={i === index ? { background: t.dot } : undefined} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 text-[#efdecd]/70">
              <button onClick={() => go(index - 1)} aria-label="Annonce précédente"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:text-[#efdecd] hover:bg-white/5">
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5"><path d="M10 3L5 8l5 5"/></svg>
              </button>
              <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Reprendre le défilement" : "Mettre le défilement en pause"}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:text-[#efdecd] hover:bg-white/5">
                {paused ? (
                  <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><path d="M4 2l10 6-10 6z"/></svg>
                ) : (
                  <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><path d="M4 2h3v12H4zM9 2h3v12H9z"/></svg>
                )}
              </button>
              <button onClick={() => go(index + 1)} aria-label="Annonce suivante"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:text-[#efdecd] hover:bg-white/5">
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5"><path d="M6 3l5 5-5 5"/></svg>
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </aside>
  );
}
