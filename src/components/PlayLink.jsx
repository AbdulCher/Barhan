// ============================================================
// PLAY LINK — fil d'or (ligne droite) qui relie le bouton play de « Dernière sortie »
// au bouton play du lecteur en bas de l'écran.
//
// • Visible seulement quand la page est tout en haut (alignement exact).
// • Disparaît dès qu'on fait défiler, se redessine quand on remonte.
// • Pendant la lecture, une petite boule d'or circule le long du fil.
// • Place aussi le bloc « Dernière sortie » à la même distance de la ligne
//   du lecteur que le bouton play du lecteur (variable CSS --release-bottom).
//
// Utilisation dans Home.jsx :
//   <section id="hero" …>  … <div data-release> <LatestRelease /> </div> …
//   <PlayLink />
// ============================================================

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const GOLD = "#9a6600";
const DRAW_MS = 1100; // durée du dessin du fil
const LOOP_MS = 2600; // durée d'un tour de la boule pendant la lecture
const TOP_LIMIT = 4; // en pixels : au-delà, on considère que la page a défilé

// Trouve le bouton play du lecteur (son nom change entre « Lecture » et « Pause »)
function findPlayerButton() {
  const player = document.querySelector('[aria-label="Lecteur audio"]');
  if (!player) return null;
  const btn = player.querySelector('button[aria-label="Lecture"], button[aria-label="Pause"]');
  return btn ? { player, btn } : null;
}

// Trouve le bouton play de « Dernière sortie » qui est affiché (téléphone ou ordinateur)
function findReleaseButton() {
  const all = document.querySelectorAll("[data-release] button");
  for (const b of all) {
    // on vise le rond du bouton (premier <span>), pas le texte « Écouter maintenant »
    if (b.getClientRects().length) return b.querySelector("span") || b;
  }
  return null;
}

export default function PlayLink() {
  const [geo, setGeo] = useState(null); // { d, x1, y1, x2, y2 }
  const [shown, setShown] = useState(false);
  const [playing, setPlaying] = useState(false);
  const pathRef = useRef(null);
  const ballRef = useRef(null);
  const shownRef = useRef(false);

  // ── 1. Mesures : position du lecteur, du bloc et du fil ──────
  const measure = () => {
    if (window.scrollY > TOP_LIMIT) return false;
    const p = findPlayerButton();
    if (!p) return false;

    const borderY = p.player.getBoundingClientRect().top; // ligne du haut du lecteur
    const pr = p.btn.getBoundingClientRect();
    const gap = pr.top - borderY; // distance ligne → bouton play du lecteur

    // Place le bloc « Dernière sortie » : son bouton finit à « gap » au-dessus de la ligne
    const hero = document.getElementById("hero");
    if (hero) {
      const heroBottom = hero.getBoundingClientRect().bottom;
      const value = `${Math.round(heroBottom - borderY + gap)}px`;
      if (document.documentElement.style.getPropertyValue("--release-bottom") !== value) {
        document.documentElement.style.setProperty("--release-bottom", value);
      }
    }

    const rb = findReleaseButton();
    if (!rb) return false;
    const rr = rb.getBoundingClientRect();

    // Centres et rayons des deux boutons ronds
    const c1 = { x: rr.left + rr.width / 2, y: rr.top + rr.height / 2, r: rr.width / 2 };
    const c2 = { x: pr.left + pr.width / 2, y: pr.top + pr.height / 2, r: pr.width / 2 };
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;

    // Ligne droite : part du bord du rond « Dernière sortie », arrive au bord du rond du lecteur
    const x1 = c1.x + ux * c1.r;
    const y1 = c1.y + uy * c1.r;
    const x2 = c2.x - ux * c2.r;
    const y2 = c2.y - uy * c2.r;
    const d = `M ${x1} ${y1} L ${x2} ${y2}`;
    setGeo({ d, x1, y1, x2, y2 });
    return true;
  };

  // ── 2. Défilement : cacher / réafficher ──────────────────────
  useEffect(() => {
    const update = () => {
      // Menu téléphone ou fenêtre ouverte (la page est bloquée) → on cache le fil
      const locked = document.body.style.overflow === "hidden";
      const atTop = window.scrollY <= TOP_LIMIT && !locked;
      if (atTop && !shownRef.current) {
        // on mesure deux fois : le bloc peut bouger après avoir reçu --release-bottom
        measure();
        requestAnimationFrame(() => {
          if (measure()) {
            shownRef.current = true;
            setShown(true);
          }
        });
      } else if (!atTop && shownRef.current) {
        shownRef.current = false;
        setShown(false);
      }
    };
    const onResize = () => { if (window.scrollY <= TOP_LIMIT) { measure(); requestAnimationFrame(measure); } };

    update();
    // Les polices et images peuvent décaler la mise en page : on remesure un peu après
    const t1 = setTimeout(onResize, 400);
    const t2 = setTimeout(() => { onResize(); update(); }, 1200);

    const lockWatch = new MutationObserver(update);
    lockWatch.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      lockWatch.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, []);

  // ── 3. État du lecteur (pour la boule qui circule) ───────────
  useEffect(() => {
    const onState = (e) => setPlaying(!!e.detail?.isPlaying);
    window.addEventListener("player-state", onState);
    window.dispatchEvent(new Event("request-player-state"));
    return () => window.removeEventListener("player-state", onState);
  }, []);

  // ── 4. Animation : dessin du fil + boule ─────────────────────
  useEffect(() => {
    const path = pathRef.current;
    const ball = ballRef.current;
    if (!path || !ball || !geo || !shown) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const L = path.getTotalLength();
    const placeBall = (t) => {
      const pt = path.getPointAtLength(L * t);
      ball.setAttribute("cx", pt.x);
      ball.setAttribute("cy", pt.y);
    };

    if (reduce) {
      path.style.strokeDashoffset = "0";
      ball.style.opacity = "0";
      return;
    }

    let raf;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const frame = (now) => {
      const t = now - start;
      if (t < DRAW_MS) {
        // Le fil se dessine, la boule mène le trait
        const p = ease(t / DRAW_MS);
        path.style.strokeDashoffset = String(1 - p);
        placeBall(p);
        ball.style.opacity = "1";
      } else {
        path.style.strokeDashoffset = "0";
        if (playing) {
          // Pendant la lecture : la boule fait le trajet en boucle
          const p = ((t - DRAW_MS) % LOOP_MS) / LOOP_MS;
          placeBall(p);
          ball.style.opacity = String(Math.sin(Math.PI * p)); // apparaît puis s'éteint
        } else {
          placeBall(1);
          ball.style.opacity = "0";
        }
      }
      raf = requestAnimationFrame(frame);
    };
    path.style.strokeDashoffset = "1";
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [geo, shown, playing]);

  if (!geo) return null;

  // Rendu directement dans <body> pour passer au-dessus du lecteur
  return createPortal(
    <svg
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-[55]"
      style={{
        opacity: shown ? 1 : 0,
        transition: shown ? "opacity 200ms ease" : "opacity 250ms ease",
      }}
    >
      <defs>
        <linearGradient id="playlink-grad" gradientUnits="userSpaceOnUse"
          x1={geo.x1} y1={geo.y1} x2={geo.x2} y2={geo.y2}>
                    <stop offset="0%" stopColor={GOLD} stopOpacity="0.7" />
          <stop offset="50%" stopColor={GOLD} stopOpacity="0.35" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0.7" />
        </linearGradient>
        <filter id="playlink-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Le fil */}
      <path
        ref={pathRef}
        d={geo.d}
        fill="none"
        stroke="url(#playlink-grad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        style={{ strokeDashoffset: 1 }}
        
      />

      {/* Petits points d'accroche sous les deux boutons */}
      <circle cx={geo.x1} cy={geo.y1} r="1.8" fill={GOLD} />
      <circle cx={geo.x2} cy={geo.y2} r="1.8" fill={GOLD} />

      {/* La boule d'or */}
      <circle ref={ballRef} r="3" fill="#ffd27a" filter="url(#playlink-glow)" style={{ opacity: 0 }} />
    </svg>,
    document.body
  );
}
