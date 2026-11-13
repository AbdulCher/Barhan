// ============================================================
// PRESSKIT — page pour les programmateurs, festivals et journalistes
// Adresse : barhanmusic.com/presskit (pas dans le menu, à envoyer par email)
//
// ✏️ Tout ce qui change se trouve dans l'objet PK ci-dessous :
//    textes, chiffres, morceaux, vidéo, photos, documents, contact.
//    Les éléments marqués « À COMPLÉTER » sont à remplacer par vos vraies infos.
// ============================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BgHeros from "../assets/bgHeros.webp";
import { tracks } from "../data/Tracks";

const PK = {
  accroche: "Un artiste sans frontières, qui cherche dans les mélodies et les rythmes du monde ce qui relie les humains.",
  genres: ["Afro-jazz", "Jazz & soul", "Blues", "Chanson française", "Musiques d'Afrique de l'Ouest"],

  // La démarche (texte qui explique tout en quelques lignes)
  demarche:
    "Barhan ne choisit pas entre les cultures : il les fait dialoguer. Son chemin a commencé en Afrique — de la Mauritanie au Sénégal, du Tchad au Kenya — où il a puisé dans les traditions de chaque pays traversé. Aujourd'hui, à Paris, ce dialogue s'ouvre à la musique occidentale : jazz, blues, soul et chanson française. Qu'il compose ou qu'il reprenne un standard, sa recherche reste la même : faire entendre ce qu'il y a de commun entre les humains.",

  // Les deux facettes / formules proposées aux programmateurs
  facettes: [
    {
      titre: "Les compositions",
      sousTitre: "La fusion des mondes",
      texte:
        "Ses albums N'deysan et Mots de tête mêlent les mélodies et les rythmes d'Afrique de l'Ouest à l'harmonie du jazz et à la profondeur du blues. Des chansons nées des rencontres, qui racontent le voyage et l'unité des peuples.",
      tags: ["N'deysan", "Mots de tête", "Leyletna"],
      ideal: "Festivals, salles de concert, scènes jazz et musiques du monde",
    },
    {
      titre: "Le répertoire",
      sousTitre: "Les grands standards revisités",
      texte:
        "Barhan revisite les grandes voix du jazz, de la soul et de la chanson française avec sa couleur, sa voix et sa guitare. Un répertoire qu'il fait vivre sur scène comme dans les hôtels, les bars et les soirées privées.",
      tags: ["Ray Charles", "Nina Simone", "Bill Withers", "Oscar Brown Jr.", "Jacques Brel", "Édith Piaf"],
      ideal: "Hôtels, bars, restaurants, soirées privées et événements",
    },
  ],
  // Formules sur scène — À COMPLÉTER (ex. "Solo · Duo · Trio · Groupe complet")
  formules: "Solo · Duo · Trio · Groupe complet",

  citation: {
    texte: "Une voix qui traverse les frontières et les époques.",
    source: "RFI Musique",
    url: "https://www.rfi.fr/fr/contenu/20091118-bakhan-voix-plurielle",
  },

  // Temps forts (chiffres et faits marquants)
  tempsForts: [
    { chiffre: "Finaliste", texte: "Prix Découvertes RFI 2009" },
    { chiffre: "2 albums", texte: "N'deysan (2011) · Mots de tête (2018)" },
    { chiffre: "8 pays", texte: "Mauritanie, Sénégal, Tchad, Kenya, France…" }, // À COMPLÉTER si besoin
    { chiffre: "25 ans", texte: "de scène, depuis 1999" },
  ],

  // Références : lieux et festivals où Barhan a joué (ajoutez-en autant que vous voulez)
  references: [
    { groupe: "Festivals", lieux: [
      { nom: "FIMU", lieu: "Belfort" },
      { nom: "Festival Tropikante", lieu: "Paris 12e" },
      { nom: "Decroissance Le Festival", lieu: "Saint-Maixent-l'École" },
    ]},
    { groupe: "Salles & clubs", lieux: [
      { nom: "La Gare – Le Gore", lieu: "Paris 19e" },
      { nom: "Le Mirador", lieu: "Luxembourg" },
      { nom: "Les Disquaires", lieu: "Paris 11e" },
    ]},
    { groupe: "Hôtels", lieux: [
      { nom: "Hôtel Notre-Dame des Arts", lieu: "Paris 6e" },
      { nom: "Hôtel Boutet", lieu: "Paris 11e" },
    ]},
  ],

  // Morceaux à écouter (titres exactement comme dans src/data/Tracks.js)
  morceaux: ["Leyletna", "Klaam"], // À COMPLÉTER : 2 ou 3 titres phares

  // Vidéo (idéalement un extrait LIVE) : l'identifiant YouTube, après « watch?v= »
  videoId: "tuU_BduqJmk", // À COMPLÉTER : mettez votre meilleure vidéo live
  videoTitre: "Barhan en concert",

  bioCourte:
    "Barhan (ex-Bakhan) est un chanteur, guitariste et compositeur mauritanien installé à Paris. Artiste sans frontières, finaliste du Prix Découvertes RFI en 2009, il fait dialoguer les traditions d'Afrique de l'Ouest avec le jazz, le blues, la soul et la chanson française. Il mène deux chemins qui se répondent : ses compositions, réunies dans les albums N'deysan (2011) et Mots de tête (2018), et un répertoire de grands standards — de Ray Charles et Nina Simone à Jacques Brel et Édith Piaf — qu'il revisite sur scène, dans les hôtels, les bars et les soirées privées.",

  bioLongue: [
    "Son aventure musicale commence en 1999 sous le pseudonyme d'Alias Chico. Son duo avec le rappeur Papis Kimmi donne naissance à Nebkhi Mauritanie, un album qui rencontre un immense succès national.",
    "En 2003, il s'éloigne du rap pour un univers plus instrumental et vocal. Sa collaboration avec le guitariste Philippe Collucci mène à l'album Talibé (2004) et à des rencontres avec les divas mauritaniennes Dimi Mint Abba et Maalouma Mint El Meidah.",
    "Au Conservatoire National de Dakar, il apprivoise le piano et perfectionne sa guitare, puis traverse l'Afrique jusqu'à N'Djaména. Installé au Tchad en 2007, il crée le groupe ADA avec le guitariste camerounais Alex Wandji et participe aux Voix du Sahel.",
    "Installé en France, finaliste du Prix Découvertes RFI en 2009, il sort N'deysan à Paris en 2011, puis Mots de tête, enregistré à Nairobi en 2018 : c'est avec cet album que Bakhan devient Barhan. De retour à Paris en 2019, il forme son groupe actuel autour du pianiste Paul Sany.",
  ],

  // Formation sur scène — À COMPLÉTER
  formation: [
    { role: "Chant, guitare", nom: "Barhan" },
    { role: "Piano", nom: "Paul Sany" },
    { role: "Saxophone", nom: "Tom Naouri" },
    { role: "Basse", nom: "Denis Pitalua" },
    { role: "Batterie", nom: "Arnaud Bichon" },
  ],

  // Photos HD : mettez les fichiers dans public/assets/presskit/
  // (une version légère pour l'affichage + la version HD à télécharger)
  photos: [
    // { apercu: "/assets/presskit/barhan-1-web.jpg", hd: "/assets/presskit/barhan-1-hd.jpg", credit: "© Nom du photographe" },
  ],

  // Documents : mettez les fichiers dans public/assets/docs/
  documents: [
    { titre: "Fiche technique", fichier: "/assets/docs/fiche-technique.pdf" }, // À COMPLÉTER
    { titre: "Plan de scène", fichier: "/assets/docs/plan-de-scene.pdf" }, // À COMPLÉTER
    { titre: "Presskit (PDF)", fichier: "/assets/docs/presskit-barhan.pdf" }, // À COMPLÉTER
  ],

  liens: [
    { nom: "Spotify", url: "https://open.spotify.com/intl-fr/artist/2n39AGJsmmS7qQBIBYl0lo" },
    { nom: "Apple Music", url: "https://music.apple.com/tr/artist/barhan/1501600830?l=tr" },
    { nom: "Bandcamp", url: "https://barhan.bandcamp.com" },
    { nom: "YouTube", url: "https://www.youtube.com/@BarhanOfficiel" },
    { nom: "Instagram", url: "https://www.instagram.com/barhan.music/" },
  ],

  email: "barhan.nd@gmail.com",
};

// ── Petits éléments de style réutilisés ─────────────────────
const PANEL = "rounded-2xl bg-black/45 backdrop-blur-md border border-[#efdecd]/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]";
const BTN_GOLD =
  "inline-flex items-center justify-center gap-2 font-dm text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full border border-[#e29600]/70 text-[#e29600] hover:bg-[#e29600] hover:text-black transition-all duration-200";

function SectionTitle({ children, id }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px bg-[#efdecd]/20" />
      <h2 id={id} className="font-bold text-[18px] tracking-[0.10em] text-[#e29600] uppercase">{children}</h2>
      <div className="flex-1 h-px bg-[#efdecd]/20" />
    </div>
  );
}

// ── Morceau : le bouton lance le titre dans le lecteur du site ──
function TrackRow({ title, playerState }) {
  const index = tracks.findIndex((t) => t.title?.trim().toLowerCase() === title.trim().toLowerCase());
  if (index === -1) return null;
  const track = tracks[index];
  const playing = playerState.index === index && playerState.isPlaying;
  const toggle = () =>
    window.dispatchEvent(
      playing ? new Event("pause-track") : new CustomEvent("play-track", { detail: { index } })
    );

  return (
    <div className="flex items-center gap-4 py-3" style={{ borderBottom: "1px solid rgba(239,222,205,0.07)" }}>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Mettre ${track.title} en pause` : `Écouter ${track.title}`}
        className="w-11 h-11 flex-shrink-0 rounded-full flex items-center justify-center border border-[#e29600] text-[#e29600]
        hover:bg-[#e29600] hover:text-[#080301] transition-all duration-200"
        style={{ boxShadow: "0 0 14px rgba(226,150,0,0.2)" }}
      >
        {playing ? (
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4"><path d="M4 2h3v12H4zM9 2h3v12H9z" /></svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 ml-0.5"><path d="M4 2l10 6-10 6z" /></svg>
        )}
      </button>
      <div className="flex flex-col min-w-0">
        <span className="font-bebas text-2xl tracking-wider text-[#efdecd] leading-none truncate">{track.title}</span>
        <span className="font-dm text-xs text-[#efdecd]/60">{track.artist}</span>
      </div>
      {playing && <span className="ml-auto font-dm text-xs text-[#e29600]">En lecture</span>}
    </div>
  );
}

// ── Vidéo YouTube : image d'abord, la vidéo se charge au clic ──
function Video({ id, title }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="w-full aspect-video overflow-hidden rounded-2xl border border-[#390202]"
      style={{ boxShadow: "0 20px 60px rgba(57,2,2,0.45), 0 4px 20px rgba(0,0,0,0.8)" }}>
      {play ? (
        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${id}?autoplay=1`} title={title}
          frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
      ) : (
        <button type="button" onClick={() => setPlay(true)} aria-label={`Lire la vidéo : ${title}`}
          className="relative block w-full h-full group">
          <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="w-full h-full object-cover" />
          <span className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-all duration-200" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-full flex items-center justify-center bg-[#390202]/70 backdrop-blur-md
              border border-[#e29600]/60 text-[#e29600] group-hover:scale-110 transition-all duration-200">
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 ml-1"><path d="M4 2l10 6-10 6V2z" /></svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function Presskit() {
  const [playerState, setPlayerState] = useState({ index: -1, isPlaying: false });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onState = (e) => setPlayerState(e.detail);
    window.addEventListener("player-state", onState);
    window.dispatchEvent(new Event("request-player-state"));
    return () => window.removeEventListener("player-state", onState);
  }, []);

  const copyBio = async () => {
    try {
      await navigator.clipboard.writeText(PK.bioCourte);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* copie impossible : le texte reste sélectionnable à la main */
    }
  };

  return (
    <>
      <Helmet>
        <title>Presskit — Barhan | Musicien mauritanien à Paris</title>
        <meta name="description" content="Presskit de Barhan, artiste sans frontières : compositions entre Afrique et jazz, répertoire de standards jazz, soul et chanson française. Bio, musique, vidéo, photos HD, fiche technique et booking." />
        <meta property="og:title" content="Presskit — Barhan" />
        <meta property="og:url" content="https://www.barhanmusic.com/presskit" />
      </Helmet>

      {/* Fond fixe + voile */}
      <div className="fixed inset-0 z-0"
        style={{ backgroundImage: `url(${BgHeros})`, backgroundSize: "cover", backgroundPosition: "center top" }} />
      <div className="fixed inset-0 z-[1] bg-[#080301]/55" />

      <Header />

      <main className="relative z-10 text-[#efdecd]">
        {/* ① EN-TÊTE */}
        <section className="min-h-[70svh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-12 gap-5">
          <p className="font-bold text-[13px] md:text-[15px] tracking-[0.35em] text-[#efdecd]/70 uppercase">Presskit</p>
          <h1 className="font-bebas text-6xl md:text-8xl tracking-[0.15em] text-[#e29600] leading-none">BARHAN</h1>
          <p className="max-w-[640px] text-lg md:text-xl leading-relaxed text-[#efdecd]/85" style={{ fontFamily: "'Cinzel', serif" }}>
            {PK.accroche}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {PK.genres.map((g) => (
              <span key={g} className="font-dm text-[11px] tracking-widest uppercase px-3 py-1 rounded-full border border-[#efdecd]/20 text-[#efdecd]/75">
                {g}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <a href={`mailto:${PK.email}?subject=Booking%20Barhan`} className={BTN_GOLD}>✉ Booking</a>
            <a href="#documents" className={BTN_GOLD}>↓ Documents</a>
          </div>
        </section>

        <div className="max-w-[900px] mx-auto px-6 pb-28 flex flex-col gap-16">
          {/* ② CITATION + TEMPS FORTS */}
          <section aria-label="Temps forts" className="flex flex-col gap-8">
            <figure className="text-center">
              <blockquote className="text-2xl md:text-3xl italic leading-snug text-[#efdecd]" style={{ fontFamily: "'Cinzel', serif" }}>
                « {PK.citation.texte} »
              </blockquote>
              <figcaption className="mt-3 font-dm text-xs tracking-widest uppercase text-[#e29600]">
                <a href={PK.citation.url} target="_blank" rel="noopener noreferrer" className="hover:underline">— {PK.citation.source}</a>
              </figcaption>
            </figure>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PK.tempsForts.map((t) => (
                <div key={t.texte} className={`${PANEL} p-5 text-center flex flex-col gap-1`}>
                  <span className="font-bebas text-3xl tracking-wider text-[#e29600] leading-none">{t.chiffre}</span>
                  <span className="font-dm text-xs leading-snug text-[#efdecd]/75">{t.texte}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ②ter RÉFÉRENCES */}
          <section aria-labelledby="pk-references" className="flex flex-col gap-6">
            <SectionTitle id="pk-references">Ils ont accueilli Barhan</SectionTitle>
            <div className="grid sm:grid-cols-3 gap-4">
              {PK.references.map((g) => (
                <div key={g.groupe} className={`${PANEL} p-5 flex flex-col gap-3`}>
                  <p className="font-dm text-[11px] font-bold tracking-[0.25em] uppercase text-[#e29600]">{g.groupe}</p>
                  <ul className="flex flex-col gap-2.5">
                    {g.lieux.map((l) => (
                      <li key={l.nom} className="flex flex-col">
                        <span className="font-bebas text-2xl tracking-wider leading-none text-[#efdecd]">{l.nom}</span>
                        {l.lieu && <span className="font-dm text-xs text-[#efdecd]/65 mt-0.5">{l.lieu}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ②bis DÉMARCHE + DEUX FACETTES */}
          <section aria-labelledby="pk-demarche" className="flex flex-col gap-6">
            <SectionTitle id="pk-demarche">La démarche</SectionTitle>
            <p className="max-w-[720px] mx-auto text-center font-dm text-lg leading-relaxed text-[#efdecd]/85">
              {PK.demarche}
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {PK.facettes.map((f) => (
                <article key={f.titre} className={`${PANEL} p-6 md:p-8 flex flex-col gap-4 border-l-[3px] border-l-[#e29600]/70`}>
                  <div>
                    <h3 className="font-bebas text-3xl tracking-wider text-[#efdecd] leading-none">{f.titre}</h3>
                    <p className="mt-1 text-sm tracking-[0.12em] uppercase text-[#e29600]" style={{ fontFamily: "'Cinzel', serif" }}>
                      {f.sousTitre}
                    </p>
                  </div>
                  <p className="font-dm text-base leading-relaxed text-[#efdecd]/80">{f.texte}</p>
                  <div className="flex flex-wrap gap-2">
                    {f.tags.map((t) => (
                      <span key={t} className="font-dm text-[11px] tracking-wide px-3 py-1 rounded-full bg-[#e29600]/10 border border-[#e29600]/30 text-[#efdecd]/85">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-auto pt-3 border-t border-[#efdecd]/10 font-dm text-xs text-[#efdecd]/70">
                    <span className="font-bold tracking-widest uppercase text-[#e29600]">Idéal pour · </span>{f.ideal}
                  </p>
                </article>
              ))}
            </div>
            {PK.formules && (
              <p className="text-center font-dm text-xs tracking-[0.25em] uppercase text-[#efdecd]/70">
                Formules : <span className="text-[#e29600]">{PK.formules}</span>
              </p>
            )}
          </section>

          {/* ③ MUSIQUE + VIDÉO */}
          <section aria-labelledby="pk-ecouter" className="flex flex-col gap-6">
            <SectionTitle id="pk-ecouter">Écouter & voir</SectionTitle>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className={`${PANEL} p-5`}>
                {PK.morceaux.map((m) => <TrackRow key={m} title={m} playerState={playerState} />)}
                <div className="flex flex-wrap gap-x-4 gap-y-2 pt-4">
                  {PK.liens.slice(0, 3).map((l) => (
                    <a key={l.nom} href={l.url} target="_blank" rel="noopener noreferrer"
                      className="font-dm text-xs font-bold tracking-widest uppercase text-[#e29600]/85 hover:text-[#e29600]">
                      {l.nom} →
                    </a>
                  ))}
                </div>
              </div>
              <Video id={PK.videoId} title={PK.videoTitre} />
            </div>
          </section>

          {/* ④ BIOGRAPHIE */}
          <section aria-labelledby="pk-bio" className="flex flex-col gap-6">
            <SectionTitle id="pk-bio">Biographie</SectionTitle>
            <div className={`${PANEL} p-6 md:p-10 flex flex-col gap-5`}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="font-dm text-xs tracking-[0.2em] uppercase text-[#e29600]">Bio courte</p>
                <button type="button" onClick={copyBio}
                  className="font-dm text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full border border-[#efdecd]/25 text-[#efdecd]/80 hover:border-[#e29600] hover:text-[#e29600] transition-colors">
                  {copied ? "✓ Copiée" : "Copier la bio"}
                </button>
              </div>
              <p className="font-dm text-lg leading-relaxed text-[#efdecd]/90">{PK.bioCourte}</p>

              <details className="group border-t border-[#efdecd]/10 pt-4">
                <summary className="cursor-pointer font-dm text-xs font-bold tracking-widest uppercase text-[#e29600]/85 hover:text-[#e29600] list-none">
                  <span className="group-open:hidden">Lire la bio complète ↓</span>
                  <span className="hidden group-open:inline">Réduire ↑</span>
                </summary>
                <div className="flex flex-col gap-4 mt-4">
                  {PK.bioLongue.map((p, i) => (
                    <p key={i} className="font-dm text-base leading-loose text-[#efdecd]/80 font-light">{p}</p>
                  ))}
                </div>
              </details>
            </div>
          </section>

          {/* ⑤ FORMATION */}
          <section aria-labelledby="pk-formation" className="flex flex-col gap-6">
            <SectionTitle id="pk-formation">Sur scène</SectionTitle>
            <div className={`${PANEL} p-6 grid sm:grid-cols-2 gap-x-10 gap-y-3`}>
              {PK.formation.map((f) => (
                <div key={f.role + f.nom} className="flex justify-between gap-4 border-b border-[#efdecd]/7 pb-2">
                  <span className="font-dm text-sm text-[#efdecd]/65">{f.role}</span>
                  <span className="font-dm text-sm font-bold text-[#efdecd]/90 text-right">{f.nom}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ⑥ PHOTOS HD */}
          <section aria-labelledby="pk-photos" className="flex flex-col gap-6">
            <SectionTitle id="pk-photos">Photos HD</SectionTitle>
            {PK.photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {PK.photos.map((ph, i) => (
                  <a key={i} href={ph.hd} download
                    className="group relative block overflow-hidden rounded-xl border border-[#efdecd]/15 hover:border-[#e29600]">
                    <img src={ph.apercu} alt={`Photo presse de Barhan ${i + 1}`} loading="lazy"
                      className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                      <span className="font-dm text-[10px] text-[#efdecd]/70">{ph.credit}</span>
                      <span className="font-dm text-[11px] font-bold tracking-widest uppercase text-[#e29600]">↓ HD</span>
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className={`${PANEL} p-6 font-dm text-sm text-center text-[#efdecd]/70`}>
                Photos HD disponibles sur demande : <a className="text-[#e29600] underline" href={`mailto:${PK.email}?subject=Photos%20HD%20Barhan`}>{PK.email}</a>
              </p>
            )}
            <p className="font-dm text-xs text-center text-[#efdecd]/55">
              Photos libres de droits pour la presse et la promotion des concerts, avec mention du photographe.
            </p>
          </section>

          {/* ⑦ DOCUMENTS */}
          <section id="documents" aria-labelledby="pk-docs" className="flex flex-col gap-6 scroll-mt-28">
            <SectionTitle id="pk-docs">Documents</SectionTitle>
            <div className="grid sm:grid-cols-3 gap-3">
              {PK.documents.map((d) => (
                <a key={d.titre} href={d.fichier} download
                  className={`${PANEL} p-5 flex items-center justify-between gap-3 hover:border-[#e29600]/60 transition-colors`}>
                  <span className="font-dm text-sm font-bold tracking-wide text-[#efdecd]">{d.titre}</span>
                  <span className="font-dm text-xs font-bold text-[#e29600]">PDF ↓</span>
                </a>
              ))}
            </div>
          </section>

          {/* ⑧ CONTACT */}
          <section aria-labelledby="pk-contact" className="flex flex-col gap-6">
            <SectionTitle id="pk-contact">Booking & presse</SectionTitle>
            <div className={`${PANEL} p-6 md:p-10 flex flex-col items-center text-center gap-5`}>
              <p className="font-dm text-base text-[#efdecd]/80">
                Concerts, festivals, interviews, collaborations : une seule adresse.
              </p>
              <a href={`mailto:${PK.email}?subject=Booking%20Barhan`} className="font-bebas text-3xl md:text-4xl tracking-wider text-[#e29600] hover:underline">
                {PK.email}
              </a>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/bookme" className={BTN_GOLD}>✦ Formulaire de contact</Link>
              </div>
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-2">
                {PK.liens.map((l) => (
                  <a key={l.nom} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="font-dm text-xs tracking-widest uppercase text-[#efdecd]/65 hover:text-[#e29600]">
                    {l.nom}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
