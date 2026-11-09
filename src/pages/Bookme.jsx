import { useState } from "react";
import Header from "../components/Header";
import Icons from "../components/Icons";
import Footer from "../components/Footer";
import BgColor from "../assets/bgColor.webp";
import PortraitHero from "../assets/portraitHero.webp";
import { Helmet } from "react-helmet-async";

const CONTACT = {
  ville: "Paris, France",
  tel: "+33 6 12 34 56 78",
  email: "barhan.nd@gmail.com",
};

const ASSOCIATION = {
  nom: "Association Ndaysan",
  adresse: "77 rue des Cités, 93300 Aubervilliers",
  siret: "751 210 121 00016",
  email: "ndaysanasso@gmail.com",
};

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

const DOWNLOADS = [
  {
    id: "presentation",
    label: "Présentation artiste",
    description: "Biographie, univers, presse et contacts",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/>
        <path d="M12 12v4M10 14h4"/>
      </svg>
    ),
    file: "/assets/docs/presentation-barhan.pdf",
  },
  {
    id: "fiche",
    label: "Fiche technique",
    description: "Besoins techniques, son, lumière, scène",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    file: "/assets/docs/fiche-technique-barhan.pdf",
  },
  {
    id: "plan",
    label: "Plan de scène",
    description: "Disposition des musiciens et équipements",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
        <circle cx="15" cy="15" r="2"/>
      </svg>
    ),
    file: "/assets/docs/plan-de-scene-barhan.pdf",
  },
];

const EVENT_TYPES = ["Concert", "Festival", "Événement privé", "Résidence artistique", "Autre"];

// Carte commune (Artiste, Association)
const cardBase = `relative overflow-hidden rounded-2xl flex flex-col
  bg-gradient-to-br from-[#2a0f0a]/90 via-[#160807]/90 to-[#0c0504]/95
  border border-[#efdecd]/10 border-l-[3px] border-l-[#8c0202]
  shadow-[0_20px_50px_rgba(0,0,0,0.5)]`;
const cardClass = `${cardBase} p-8 gap-6`;

function InfoRow({ icon, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 w-8 h-8 shrink-0 rounded-full flex items-center justify-center
        bg-[#390202] border border-[#8c0202]/80 text-[#efdecd]">
        {icon}
      </span>
      <span className="font-dm text-base text-[#efdecd] leading-relaxed pt-1 break-all sm:break-normal">{children}</span>
    </div>
  );
}

function DownloadCard({ item }) {
  return (
    <a
      href={item.file}
      download
      aria-label={`Télécharger « ${item.label} » (PDF)`}
      className="group flex flex-col gap-5 rounded-2xl p-6
        bg-gradient-to-br from-[#2a0f0a]/90 to-[#0c0504]/95
        border border-[#efdecd]/10 border-t-[3px] border-t-[#8c0202]
        shadow-[0_16px_40px_rgba(0,0,0,0.45)]
        hover:-translate-y-1 hover:border-[#8c0202]/70 hover:border-t-[#b3241a]
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_28px_rgba(140,2,2,0.3)]
        transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center
          bg-[#390202] border border-[#8c0202]/80 text-[#efdecd]
          group-hover:bg-[#8c0202] transition-all duration-300">
          {item.icon}
        </div>
        <div>
          <p className="font-bebas text-lg tracking-[0.14em] text-[#efdecd] leading-tight">{item.label}</p>
          <p className="font-dm text-sm text-[#efdecd]/75 mt-1 leading-snug">{item.description}</p>
        </div>
      </div>
      <span className="self-start font-dm flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase
        px-4 py-2 rounded-full border border-[#8c0202] bg-[#390202]/60 text-[#efdecd]
        group-hover:bg-[#8c0202] transition-all duration-300">
        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
          <path d="M8 2v9M4 7l4 4 4-4M2 14h12"/>
        </svg>
        Télécharger le PDF
      </span>
    </a>
  );
}

function Field({ label, htmlFor, required, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-dm text-xs font-bold tracking-[0.18em] text-[#efdecd]/80 uppercase">
        {label}{required && <span className="text-[#d9604f]" aria-hidden="true"> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = `
  font-dm w-full bg-black/50 border border-[#efdecd]/15 rounded-xl px-4 py-3
  text-[#efdecd] text-sm placeholder:text-[#efdecd]/45
  focus:outline-none focus:border-[#b3241a] focus:ring-2 focus:ring-[#8c0202]/40 focus:bg-black/70
  transition-all duration-200
`;

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col gap-1 shrink-0">
        <p className="font-dm text-xs font-bold tracking-[0.25em] text-[#d9604f] uppercase">{eyebrow}</p>
        <h2 className="font-bebas text-2xl tracking-[0.16em] text-[#efdecd] leading-none mt-1">{title}</h2>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-[#8c0202] to-transparent mt-6" aria-hidden="true" />
    </div>
  );
}

// Envoi vers Netlify Forms (voir le formulaire caché "reservation" dans index.html)
const encode = (data) =>
  Object.keys(data).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])).join("&");

export default function Bookme() {
  const [form, setForm] = useState({
    nom: "", email: "", tel: "", type: "", date: "", message: "",
  });
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
      setForm({ nom: "", email: "", tel: "", type: "", date: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Helmet>
        <title>Barhan — Réservation & contact | Concerts, festivals, événements</title>
        <meta name="description" content="Réservez Barhan, musicien mauritanien installé à Paris, pour votre concert, festival ou événement privé. Fiche technique, plan de scène et formulaire de demande." />
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
      {/* Voile : sombre sur les bords, plus clair au centre */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 25%, rgba(8,3,1,0.25), rgba(8,3,1,0.75))" }}
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
            <a
              href="#demande"
              className="mt-4 font-dm text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full
              bg-gradient-to-b from-[#6b0b0b] to-[#2e0202] text-[#efdecd] border border-[#8c0202]
              hover:from-[#821010] hover:to-[#3d0404] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-200"
            >
              Contact ↓
            </a>
          </div>

          {/* Contact + Association */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Artiste */}
            <div className={cardClass}>
              <div aria-hidden="true" className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#8c0202]/30 blur-3xl pointer-events-none" />
              <div className="relative flex flex-col gap-4">
                <p className="font-dm text-xs font-bold tracking-[0.25em] text-[#d9604f] uppercase">Artiste</p>
                <h2 className="font-bebas text-3xl tracking-[0.18em] text-[#efdecd] leading-none mb-2">BARHAN</h2>
                <div className="flex flex-col gap-4">
                  <InfoRow icon={<IconPin />}>{CONTACT.ville}</InfoRow>
                  <InfoRow icon={<IconMail />}>
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-[#d9604f] underline-offset-4 hover:underline transition-colors">
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
              <div aria-hidden="true" className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#6488ff]/10 blur-3xl pointer-events-none" />
              <div className="relative flex flex-col gap-4">
                <p className="font-dm text-xs font-bold tracking-[0.25em] text-[#d9604f] uppercase">Association</p>
                <h2 className="font-bebas text-3xl tracking-[0.18em] text-[#efdecd] leading-none mb-2">
                  {ASSOCIATION.nom.toUpperCase()}
                </h2>
                <div className="flex flex-col gap-4">
                  <InfoRow icon={<IconPin />}>{ASSOCIATION.adresse}</InfoRow>
                  <InfoRow icon={<IconMail />}>
                    <a href={`mailto:${ASSOCIATION.email}`} className="hover:text-[#d9604f] underline-offset-4 hover:underline transition-colors">
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

          {/* Téléchargements */}
          <div className="flex flex-col gap-6">
            <SectionTitle eyebrow="Documents" title="Fiches techniques" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {DOWNLOADS.map((item) => (
                <DownloadCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <div id="demande" className="flex flex-col gap-6 scroll-mt-28">
            <SectionTitle eyebrow="Formulaire" title="Me contacter" />

            {status === "sent" ? (
              <div role="status" className={`${cardBase} p-10 gap-4 items-center text-center`}>
                <div className="w-16 h-16 rounded-full bg-[#8c0202] text-[#efdecd] flex items-center justify-center
                  shadow-[0_0_30px_rgba(140,2,2,0.5)]">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="font-bebas text-3xl tracking-widest text-[#efdecd]">Demande envoyée !</p>
                <p className="font-dm text-base text-[#efdecd]/85">Merci. Nous reviendrons vers vous dans les plus brefs délais.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="font-dm mt-2 text-xs font-bold tracking-widest uppercase text-[#d9604f] hover:text-[#efdecd] transition-colors py-2"
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
                    <div className="relative">
                      <select id="f-type" name="type" required value={form.type} onChange={handleChange}
                        className={`${inputClass} appearance-none cursor-pointer pr-10`}>
                        <option value="" disabled>Sélectionner…</option>
                        {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
                        className="w-4 h-4 text-[#d9604f] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <path d="M4 6l4 4 4-4"/>
                      </svg>
                    </div>
                  </Field>
                </div>
                <Field label="Date souhaitée" htmlFor="f-date">
                  <input id="f-date" name="date" type="date" value={form.date} onChange={handleChange}
                    className={inputClass} style={{ colorScheme: "dark" }} />
                </Field>
                <Field label="Message" htmlFor="f-message" required>
                  <textarea id="f-message" name="message" required rows={5}
                    placeholder="Décrivez votre événement, le lieu, le contexte…"
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
                    <span className="text-[#d9604f]">*</span> Champs obligatoires
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="font-dm flex items-center gap-2 text-sm font-bold tracking-widest uppercase
                    px-8 py-3.5 rounded-full text-[#efdecd]
                    bg-gradient-to-b from-[#6b0b0b] to-[#2e0202] border border-[#8c0202]
                    hover:from-[#821010] hover:to-[#3d0404]
                    disabled:opacity-60 disabled:cursor-wait
                    shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-200"
                  >
                    {status === "sending" ? "Envoi…" : "Envoyer la demande"}
                    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <path d="M2 8h12M9 3l5 5-5 5"/>
                    </svg>
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
