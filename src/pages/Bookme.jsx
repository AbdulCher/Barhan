import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Icons from "../components/Icons";
import Footer from "../components/Footer";
import BgColor from "../assets/bgColor.webp";
import PortraitHero from "../assets/portraitHero.webp";
import { Helmet } from "react-helmet-async";

const CONTACT = {
  ville: "Paris, France",
  email: "barhan.nd@gmail.com",
};

const ASSOCIATION = {
  nom: "Association Ndaysan",
  adresse: "77 rue des Cités, 93300 Aubervilliers",
  siret: "751 210 121 00016",
  email: "ndaysanasso@gmail.com",
};

// Fiche technique : même fichier que sur la page Presskit (dans public/assets/docs/)
const FICHE_TECHNIQUE = "/assets/docs/fiche-technique.pdf";

const EVENT_TYPES = [
  "Concert",
  "Festival",
  "Hôtel, bar ou restaurant",
  "Événement privé",
  "Résidence artistique",
  "Autre",
];

// Formules (les deux facettes de Barhan, comme dans le Presskit)
const FORMULES = [
  "Concert de compositions",
  "Répertoire de standards (jazz, soul, chanson française)",
  "Les deux / je ne sais pas encore",
];

// ── Icônes ─────────────────────────────────────────────────────
const IconPin = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path d="M8 1C5.8 1 4 2.8 4 5c0 3 4 9 4 9s4-6 4-9c0-2.2-1.8-4-4-4z"/><circle cx="8" cy="5" r="1.5"/>
  </svg>
);
const IconMail = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 4l7 5 7-5"/>
  </svg>
);
const IconId = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <rect x="1" y="1" width="14" height="14" rx="1.5"/><path d="M4 6h8M4 9h5"/>
  </svg>
);
const IconArrow = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <path d="M2 8h12M9 3l5 5-5 5"/>
  </svg>
);

// ── Styles communs : cartes en verre sombre + liseré doré ─────
// → Fond plus sombre : bg-black/55. Plus léger : bg-black/35.
const cardBase = `relative overflow-hidden rounded-2xl flex flex-col
  bg-black/45 backdrop-blur-md
  border border-[#efdecd]/10
  shadow-[0_20px_50px_rgba(0,0,0,0.5)]`;
const cardClass = `${cardBase} p-8 gap-6`;

// Fin liseré doré en haut des cartes
function GoldEdge() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-0 left-0 right-0 h-px pointer-events-none"
      style={{ background: "linear-gradient(to right, transparent, rgba(226,150,0,0.7) 30%, #e29600 50%, rgba(226,150,0,0.7) 70%, transparent)" }}
    />
  );
}

// Bouton doré avec reflet de lumière qui traverse au survol
const shineBtn = `group/btn relative overflow-hidden inline-flex items-center justify-center gap-2
  font-dm text-xs sm:text-sm font-bold tracking-widest uppercase px-7 py-3.5 rounded-full
  border border-[#e29600]/80 text-[#e29600] bg-[#e29600]/5
  hover:bg-[#e29600] hover:text-[#080301] hover:shadow-[0_0_24px_rgba(226,150,0,0.35)]
  transition-all duration-300`;
function Shine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12
                 bg-gradient-to-r from-transparent via-white/40 to-transparent
                 translate-x-0 group-hover/btn:translate-x-[450%] transition-transform duration-700 ease-out"
    />
  );
}

function InfoRow({ icon, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 w-8 h-8 shrink-0 rounded-full flex items-center justify-center
        bg-[#e29600]/10 border border-[#e29600]/50 text-[#e29600]">
        {icon}
      </span>
      <span className="font-dm text-base text-[#efdecd] leading-relaxed pt-1 break-all sm:break-normal">{children}</span>
    </div>
  );
}

function Field({ label, htmlFor, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-dm text-xs font-bold tracking-[0.18em] text-[#efdecd]/80 uppercase">
        {label}{required && <span className="text-[#e29600]" aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = `
  font-dm w-full bg-black/50 border border-[#efdecd]/15 rounded-xl px-4 py-3
  text-[#efdecd] text-sm placeholder:text-[#efdecd]/45
  focus:outline-none focus:border-[#e29600]/80 focus:ring-2 focus:ring-[#e29600]/25 focus:bg-black/70
  transition-all duration-200
`;

function Select({ id, name, value, onChange, required, options }) {
  return (
    <div className="relative">
      <select id={id} name={name} required={required} value={value} onChange={onChange}
        className={`${inputClass} appearance-none cursor-pointer pr-10`}>
        <option value="" disabled>Sélectionner…</option>
        {options.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>
      <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
        className="w-4 h-4 text-[#e29600] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <path d="M4 6l4 4 4-4"/>
      </svg>
    </div>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col gap-1 shrink-0">
        <p className="font-dm text-xs font-bold tracking-[0.25em] text-[#e29600] uppercase">{eyebrow}</p>
        <h2 className="font-bebas text-2xl tracking-[0.16em] text-[#efdecd] leading-none mt-1">{title}</h2>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-[#e29600]/60 to-transparent mt-6" aria-hidden="true" />
    </div>
  );
}

// Envoi vers Netlify Forms (voir le formulaire caché "reservation" dans index.html)
const encode = (data) =>
  Object.keys(data).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])).join("&");

const EMPTY = { nom: "", email: "", tel: "", type: "", formule: "", date: "", message: "" };

export default function Bookme() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "reservation", ...form }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Barhan — Réservation & contact | Concerts, festivals, hôtels, événements</title>
        <meta name="description" content="Réservez Barhan, chanteur et guitariste mauritanien installé à Paris, pour un concert, un festival, un hôtel, un bar ou un événement privé : compositions ou répertoire de standards jazz, soul et chanson française." />
        <meta property="og:title" content="Barhan — Réservation & contact" />
        <meta property="og:url" content="https://www.barhanmusic.com/bookme" />
      </Helmet>

      {/* BG portrait */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${PortraitHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* BG couleur par-dessus */}
      <div
        className="fixed inset-0 z-[1]"
        style={{
          backgroundImage: `url(${BgColor})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          opacity: 0.84,
        }}
      />
      {/* Voile : plus noir pour s'accorder avec le reste du site, un peu de rouge garde l'ambiance
          → Plus noir : augmentez 0.45 et 0.85. */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 25%, rgba(8,3,1,0.45), rgba(8,3,1,0.85))" }}
      />

      <Header />

      <section className="relative z-[3] w-full min-h-screen bg-transparent text-white pt-28 pb-24 overflow-hidden">
        <div className="relative z-[10] max-w-[1100px] mx-auto px-6 flex flex-col gap-16">

          {/* En-tête */}
          <div className="flex flex-col items-center gap-3 mt-10 text-center">
            <p className="font-bold text-[16px] tracking-[0.35em] text-[#efdecd]/75 uppercase">
              Concerts · Festivals · Événements
            </p>
            <h1 className="font-bebas text-[32px] mt-3 tracking-[0.20em] text-[#e29600] leading-none">
              Programmation
            </h1>
            <p className="font-dm text-base text-[#efdecd]/85 max-w-[560px] mt-3 leading-relaxed">
              Pour programmer Barhan sur votre scène ou à votre événement, contactez-nous directement
              ou remplissez le formulaire ci-dessous. Réponse rapide.
            </p>
            <a href="#demande" className={`${shineBtn} mt-4`}>
              <Shine />
              <span className="relative">Contact ↓</span>
            </a>
          </div>

          {/* Contact + Association */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Artiste */}
            <div className={cardClass}>
              <GoldEdge />
              <div aria-hidden="true" className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-[#e29600]/15 blur-3xl pointer-events-none" />
              <div className="relative flex flex-col gap-4">
                <p className="font-dm text-xs font-bold tracking-[0.25em] text-[#e29600] uppercase">Artiste</p>
                <h2 className="font-bebas text-3xl tracking-[0.18em] text-[#efdecd] leading-none mb-2">BARHAN</h2>
                <div className="flex flex-col gap-4">
                  <InfoRow icon={<IconPin />}>{CONTACT.ville}</InfoRow>
                  <InfoRow icon={<IconMail />}>
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-[#e29600] underline-offset-4 hover:underline transition-colors">
                      {CONTACT.email}
                    </a>
                  </InfoRow>
                </div>
              </div>
              <div className="relative border-t border-[#efdecd]/10 pt-6">
                <Icons />
              </div>
            </div>

            {/* Association */}
            <div className={cardClass}>
              <GoldEdge />
              <div aria-hidden="true" className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-[#8c0202]/25 blur-3xl pointer-events-none" />
              <div className="relative flex flex-col gap-4">
                <p className="font-dm text-xs font-bold tracking-[0.25em] text-[#e29600] uppercase">Association</p>
                <h2 className="font-bebas text-3xl tracking-[0.18em] text-[#efdecd] leading-none mb-2">
                  {ASSOCIATION.nom.toUpperCase()}
                </h2>
                <div className="flex flex-col gap-4">
                  <InfoRow icon={<IconPin />}>{ASSOCIATION.adresse}</InfoRow>
                  <InfoRow icon={<IconMail />}>
                    <a href={`mailto:${ASSOCIATION.email}`} className="hover:text-[#e29600] underline-offset-4 hover:underline transition-colors">
                      {ASSOCIATION.email}
                    </a>
                  </InfoRow>
                  <InfoRow icon={<IconId />}>
                    <span className="text-[#efdecd]/70">SIRET</span>{" "}{ASSOCIATION.siret}
                  </InfoRow>
                </div>
              </div>
            </div>
          </div>

          {/* Encadré Presskit (remplace l'ancienne section « Fiches techniques ») */}
          <div className={`${cardBase} p-8 md:p-10 gap-6 md:flex-row md:items-center md:justify-between`}>
            <GoldEdge />
            <div aria-hidden="true" className="absolute -bottom-28 -left-20 w-72 h-72 rounded-full bg-[#e29600]/10 blur-3xl pointer-events-none" />
            <div className="relative flex flex-col gap-2 max-w-[560px]">
              <p className="font-dm text-xs font-bold tracking-[0.25em] text-[#e29600] uppercase">Professionnels</p>
              <h2 className="font-bebas text-3xl tracking-[0.14em] text-[#efdecd] leading-none">
                Vous êtes programmateur ou journaliste ?
              </h2>
              <p className="font-dm text-sm md:text-base text-[#efdecd]/80 leading-relaxed mt-1">
                Biographie, musique, vidéo, références, photos HD, fiche technique et plan de scène :
                tout est réuni dans le presskit.
              </p>
            </div>
            <div className="relative flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Link to="/presskit" className={shineBtn}>
                <Shine />
                <span className="relative flex items-center gap-2">Voir le presskit <IconArrow /></span>
              </Link>
              <a
                href={FICHE_TECHNIQUE}
                download
                className="inline-flex items-center justify-center gap-2 font-dm text-[11px] font-bold tracking-widest uppercase
                  px-5 py-2.5 rounded-full border border-[#efdecd]/25 text-[#efdecd]/85
                  hover:border-[#e29600] hover:text-[#e29600] transition-colors"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                  <path d="M8 2v9M4 7l4 4 4-4M2 14h12"/>
                </svg>
                Fiche technique (PDF)
              </a>
            </div>
          </div>

          {/* Formulaire */}
          <div id="demande" className="flex flex-col gap-6 scroll-mt-28">
            <SectionTitle eyebrow="Formulaire" title="Me contacter" />

            {status === "sent" ? (
              <div role="status" className={`${cardBase} p-10 gap-4 items-center text-center`}>
                <GoldEdge />
                <div className="w-16 h-16 rounded-full border border-[#e29600] bg-[#e29600]/10 text-[#e29600] flex items-center justify-center
                  shadow-[0_0_30px_rgba(226,150,0,0.3)]">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="font-bebas text-3xl tracking-widest text-[#efdecd]">Demande envoyée !</p>
                <p className="font-dm text-base text-[#efdecd]/85">Merci. Nous reviendrons vers vous dans les plus brefs délais.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="font-dm mt-2 text-xs font-bold tracking-widest uppercase text-[#e29600] hover:text-[#efdecd] transition-colors py-2"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form
                name="reservation"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className={cardClass}
              >
                <GoldEdge />
                <input type="hidden" name="form-name" value="reservation" />
                {/* Piège anti-spam (invisible pour les humains) */}
                <p className="hidden"><label>Ne pas remplir : <input name="bot-field" /></label></p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Nom complet" htmlFor="f-nom" required>
                    <input id="f-nom" name="nom" type="text" required autoComplete="name" placeholder="Votre nom"
                      value={form.nom} onChange={handleChange} className={inputClass} />
                  </Field>
                  <Field label="Email" htmlFor="f-email" required>
                    <input id="f-email" name="email" type="email" required autoComplete="email" placeholder="votre@email.com"
                      value={form.email} onChange={handleChange} className={inputClass} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Téléphone" htmlFor="f-tel">
                    <input id="f-tel" name="tel" type="tel" autoComplete="tel" placeholder="+33 6 00 00 00 00"
                      value={form.tel} onChange={handleChange} className={inputClass} />
                  </Field>
                  <Field label="Type d'événement" htmlFor="f-type" required>
                    <Select id="f-type" name="type" required value={form.type} onChange={handleChange} options={EVENT_TYPES} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Formule souhaitée" htmlFor="f-formule">
                    <Select id="f-formule" name="formule" value={form.formule} onChange={handleChange} options={FORMULES} />
                  </Field>
                  <Field label="Date souhaitée" htmlFor="f-date">
                    <input id="f-date" name="date" type="date" value={form.date} onChange={handleChange}
                      className={inputClass} style={{ colorScheme: "dark" }} />
                  </Field>
                </div>
                <Field label="Message" htmlFor="f-message" required>
                  <textarea id="f-message" name="message" required rows={5}
                    placeholder="Décrivez votre événement, le lieu, le nombre d'invités, la durée souhaitée…"
                    value={form.message} onChange={handleChange}
                    className={`${inputClass} resize-none`} />
                </Field>

                {status === "error" && (
                  <p role="alert" className="font-dm text-sm text-red-200 bg-red-900/40 border border-red-500/40 rounded-lg px-4 py-3">
                    L'envoi n'a pas fonctionné. Réessayez, ou écrivez-nous directement à{" "}
                    <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a>.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="font-dm text-xs text-[#efdecd]/70">
                    <span className="text-[#e29600]">*</span> Champs obligatoires
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={`${shineBtn} disabled:opacity-60 disabled:cursor-wait`}
                  >
                    <Shine />
                    <span className="relative flex items-center gap-2">
                      {status === "sending" ? "Envoi…" : "Envoyer la demande"}
                      <IconArrow />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
