import { useState } from "react";
import Header from "../components/Header";
import Icons from "../components/Icons";
import Footer from "../components/Footer";
import BgColor from "../assets/bgColor.jpg";
import PortraitHero from "../assets/portraitHero.jpg";
import { Helmet } from "react-helmet-async";

const CONTACT = {
  ville: "Paris, France",
  tel: "+33 6 12 34 56 78",
  email: "contact@barhan.com",
};

const ASSOCIATION = {
  nom: "Association Ndeysan",
  adresse: "12 rue des Arts, 75011 Paris",
  siret: "123 456 789 00012",
  email: "asso@kennenmusic.fr",
  tel: "+33 1 23 45 67 89",
};

const DOWNLOADS = [
  {
    id: "presentation",
    label: "Présentation artiste",
    description: "Biographie, univers, presse et contacts",
    accent: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </svg>
    ),
    file: "/assets/docs/fiche-technique-barhan.pdf",
  },
  {
    id: "plan",
    label: "Plan de scène",
    description: "Disposition des musiciens et équipements",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
        <circle cx="15" cy="15" r="2"/>
        <path d="M6 6h.01M6 12h.01"/>
      </svg>
    ),
    file: "/assets/docs/plan-de-scene-barhan.pdf",
  },
];

const EVENT_TYPES = ["Concert", "Festival", "Événement privé", "Résidence artistique", "Autre"];

function InfoRow({ icon, children }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-xl text-[#e29600]">{icon}</span>
      <span className="font-dm text-lg text-[#efdecd] leading-relaxed">{children}</span>
    </div>
  );
}

function DownloadCard({ item }) {
  return (
    <div className="flex items-center justify-between gap-4
      bg-black/60 border border-l-[3px] border-l-[#390202] rounded-2xl p-6
      transition-all duration-300 border-[#390202]/50 hover:border-[#390202]/60"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center
          ${item.accent
            ? "bg-[#390202]/15 border-[#390202]/50 text-[#e29600]"
            : "bg-[#390202]/10 border-[#e29600]/20 text-[#e29600]"
          }`}>
          {item.icon}
        </div>
        <div>
          <p className="font-bebas text-[14px] tracking-[0.18rem] text-[#e29600]">{item.label}</p>
          <p className="font-dm text-sm text-[#efdecd] mt-0.5">{item.description}</p>
        </div>
      </div>
      <a
  href={item.file}
  download
  className="font-dm flex items-center gap-2 text-xs font-bold tracking-widest uppercase
             px-4 py-2 rounded-full transition-all duration-200 shrink-0 text-[#efdecd]"
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
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
          <path d="M8 2v9M4 7l4 4 4-4M2 14h12"/>
        </svg>
        PDF
      </a>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-dm text-xs tracking-[0.18em] text-[#efdecd]/60 uppercase">{label}</label>
      {children}
    </div>
  );
}

const inputClass = `
  font-dm w-full bg-black/60 border border-[#efdecd]/10 rounded-xl px-4 py-3
  text-[#efdecd]/80 text-sm placeholder:text-[#efdecd]/30
  focus:outline-none focus:border-[#e29600]/60 focus:bg-black/80
  transition-all duration-200
`;

export default function Bookme() {
  const [form, setForm] = useState({
    nom: "", email: "", tel: "", type: "", date: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <>
      {/* BG portraitHero en dessous */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${PortraitHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <Helmet>
        <title>Barhan Ndiaye — Réservation & Contact</title>
        <meta name="description" content="Réservez Barhan Ndiaye pour votre concert, festival ou événement privé. Fiches techniques et formulaire de contact disponibles." />
        <meta property="og:title" content="Barhan Ndiaye — Réservation & Contact" />
        <meta property="og:url" content="https://www.barhan.fr/bookme" />
      </Helmet>
      {/* BG Color par dessus à 60% */}
      <div
        className="fixed inset-0 z-[1]"
        style={{
          backgroundImage: `url(${BgColor})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          opacity: 0.84,
        }}
      />
      {/* Overlay sombre */}
      <div className="fixed inset-0 z-[2] bg-[#030405]/30" />

      <Header />

      <section className="relative w-full min-h-screen bg-transparent text-white pt-28 pb-24 overflow-hidden">

        <div className="absolute bottom-0 left-0 right-0 h-64 z-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(57,2,2,0.22) 0%, transparent 75%)" }}
        />
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(239,222,205,0.04) 0%, transparent 70%)" }}
        />

        <div className="relative z-[10] max-w-[1100px] mx-auto px-6 flex flex-col gap-16">

          {/* En-tête */}
          <div className="flex flex-col items-center gap-3 mt-10">
            <p className="font-bold text-[16px] tracking-[0.35em] text-[#efdecd]/40 uppercase">
              Réservation & Contact
            </p>
            <h2 className="font-bebas text-[32px] mt-3 tracking-[0.20em] text-[#e29600] leading-none">
              BOOK ME
            </h2>
          </div>

          {/* Contact + Association */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Artiste */}
            <div className="bg-black/60 border border-[#efdecd]/10 border-l-[3px] border-l-[#390202] rounded-2xl p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <p className="font-dm text-xs tracking-[0.18em] text-[#e29600] uppercase">Artiste</p>
                <h3 className="font-bebas text-xl tracking-[0.18em] text-[#efdecd] leading-none mb-2">BARHAN</h3>
                <div className="flex flex-col gap-4">
                  <InfoRow icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M8 1C5.8 1 4 2.8 4 5c0 3 4 9 4 9s4-6 4-9c0-2.2-1.8-4-4-4z"/><circle cx="8" cy="5" r="1.5"/></svg>}>
                    {CONTACT.ville}
                  </InfoRow>
                  <InfoRow icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M2 3h3l1.5 3.5-1.5 1a9 9 0 0 0 3.5 3.5l1-1.5L13 11v3a1 1 0 0 1-1 1C5.4 15 1 10.6 1 5a1 1 0 0 1 1-2z"/></svg>}>
                    <a href={`tel:${CONTACT.tel}`} className="hover:text-[#e29600] transition-colors">{CONTACT.tel}</a>
                  </InfoRow>
                  <InfoRow icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 4l7 5 7-5"/></svg>}>
                    <a href={`mailto:${CONTACT.email}`} className="hover:text-[#e29600] transition-colors">{CONTACT.email}</a>
                  </InfoRow>
                </div>
              </div>
              <div className="border-t border-[#efdecd]/10 pt-6">
                <Icons />
              </div>
            </div>

            {/* Association */}
            <div className="bg-black/60 border border-[#efdecd]/10 border-l-[3px] border-l-[#390202] rounded-2xl p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <p className="font-dm text-xs tracking-[0.2em] text-[#e29600] uppercase">Association</p>
                <h3 className="font-bebas text-xl tracking-[0.18em] text-[#efdecd] leading-none mb-2">
                  {ASSOCIATION.nom.toUpperCase()}
                </h3>
                <div className="flex flex-col gap-4">
                  <InfoRow icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M8 1C5.8 1 4 2.8 4 5c0 3 4 9 4 9s4-6 4-9c0-2.2-1.8-4-4-4z"/><circle cx="8" cy="5" r="1.5"/></svg>}>
                    {ASSOCIATION.adresse}
                  </InfoRow>
                  <InfoRow icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="1" y="3" width="14" height="10" rx="1.5"/><path d="M1 4l7 5 7-5"/></svg>}>
                    <a href={`mailto:${ASSOCIATION.email}`} className="hover:text-[#e29600] transition-colors">{ASSOCIATION.email}</a>
                  </InfoRow>
                  <InfoRow icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M2 3h3l1.5 3.5-1.5 1a9 9 0 0 0 3.5 3.5l1-1.5L13 11v3a1 1 0 0 1-1 1C5.4 15 1 10.6 1 5a1 1 0 0 1 1-2z"/></svg>}>
                    <a href={`tel:${ASSOCIATION.tel}`} className="hover:text-[#e29600] transition-colors">{ASSOCIATION.tel}</a>
                  </InfoRow>
                  <InfoRow icon={<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="1" y="1" width="14" height="14" rx="1.5"/><path d="M4 6h8M4 9h5"/></svg>}>
                    <span className="text-[#efdecd]">SIRET</span>{" "}{ASSOCIATION.siret}
                  </InfoRow>
                </div>
              </div>
            </div>

          </div>

          {/* Téléchargements */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 mb-2">
              <p className="font-dm text-xs tracking-[0.18em] text-[#e29600] uppercase">Documents</p>
              <h3 className="font-bebas text-xl mt-2 tracking-[0.18em] text-[#efdecd]">Fiches techniques</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {DOWNLOADS.map((item) => (
                <DownloadCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Formulaire */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="font-dm text-xs tracking-[0.18em] text-[#e29600] uppercase">Formulaire</p>
              <h3 className="font-bebas text-xl mt-2 tracking-[0.18em] text-[#efdecd]">Faire une demande</h3>
            </div>

            {sent ? (
              <div className="bg-black/60 border border-[#e29600]/40 rounded-2xl p-10 flex flex-col items-center gap-4 text-center">
                <div className="w-14 h-14 rounded-full bg-[#e29600]/10 border border-[#e29600]/30
                                flex items-center justify-center text-[#e29600]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="font-bebas text-2xl tracking-widest text-[#efdecd]">Message envoyé !</p>
                <p className="font-dm text-sm text-[#efdecd]/40">Nous reviendrons vers vous dans les plus brefs délais.</p>
                <button
                  onClick={() => setSent(false)}
                  className="font-dm mt-2 text-xs tracking-widest uppercase text-[#e29600] hover:text-[#efdecd] transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-black/60 border-[#390202] border-2 rounded-2xl p-8 flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Nom complet">
                    <input name="nom" type="text" required placeholder="Votre nom"
                      value={form.nom} onChange={handleChange} className={inputClass} />
                  </Field>
                  <Field label="Email">
                    <input name="email" type="email" required placeholder="votre@email.com"
                      value={form.email} onChange={handleChange} className={inputClass} />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Téléphone">
                    <input name="tel" type="tel" placeholder="+33 6 00 00 00 00"
                      value={form.tel} onChange={handleChange} className={inputClass} />
                  </Field>
                  <Field label="Type d'événement">
                    <select name="type" required value={form.type} onChange={handleChange}
                      className={`${inputClass} appearance-none cursor-pointer`}>
                      <option value="" disabled>Sélectionner...</option>
                      {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Date souhaitée">
                  <input name="date" type="date" value={form.date} onChange={handleChange}
                    className={`${inputClass} color-scheme-dark`} />
                </Field>
                <Field label="Message">
                  <textarea name="message" required rows={5}
                    placeholder="Décrivez votre événement, le lieu, le contexte..."
                    value={form.message} onChange={handleChange}
                    className={`${inputClass} resize-none`} />
                </Field>
                <button
                  type="submit"
                  
className="font-dm self-center flex items-center gap-2
           text-[12px] font-bold tracking-widest uppercase
           text-[#efdecd] px-5 py-2 rounded-full transition-all duration-200"
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
                  Envoyer la demande
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path d="M2 8h12M9 3l5 5-5 5"/>
                  </svg>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}