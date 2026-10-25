// ============================================================
// CLIP SECTION — vidéo locale + typographie Bebas + DM Sans
// ============================================================
//
// Placez votre vidéo dans : /public/assets/videos/clip.mp4
// ============================================================
import BarhanLogo from "../assets/barhanLogoSans.png";

export default function ClipSection() {
  return (
<section className="relative w-full bg-transparent py-20 flex justify-center overflow-hidden">
      {/* Halo rouge central */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
  background:
    "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(57,2,2,0.35) 0%, transparent 75%)",
}}
      />
      {/* Halo bordeaux bas */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-0 pointer-events-none"
        style={{
  background:
    "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(57,2,2,0.2) 0%, transparent 80%)",
}}
      />

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-[900px] px-4 flex flex-col items-center gap-10">

        {/* En-tête — Bebas + DM Sans */}
        <div className="flex flex-col items-center gap-3 mt-10">
          <p className="font-bold text-[16px] tracking-[0.35em] text-[#efdecd]/40 uppercase">
            Exclusivité
          </p>
          <h2 className="font-bebas text-[32px] mt-3 mb-10 tracking-[0.20em] text-[#e29600] leading-none">
            CLIP OFFICIEL
          </h2>
        </div>

        {/* Vidéo locale */}
<div
  className="relative w-full aspect-video overflow-hidden rounded-2xl"
  style={{
    boxShadow: "0 0 0 1px rgba(57,2,2,0.5), 0 20px 60px rgba(57,2,2,0.45), 0 4px 20px rgba(0,0,0,0.8)",
    border: "1px solid rgba(226,150,0,0.25)",
  }}
>
  {/* Icône play centrée */}
  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center"
      style={{
        background: "rgba(57,2,2,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(226,150,0,0.4)",
        boxShadow: "0 0 24px rgba(57,2,2,0.6), inset 0 1px 0 rgba(226,150,0,0.15)",
      }}
    >
      <svg viewBox="0 0 16 16" fill="#e29600" className="w-7 h-7 ml-1">
        <path d="M4 2l10 6-10 6V2z"/>
      </svg>
    </div>
  </div>

  {/* Vidéo YouTube */}
<div
  className="relative w-full aspect-video overflow-hidden rounded-2xl"
  style={{
    boxShadow: "0 0 0 1px rgba(57,2,2,0.5), 0 20px 60px rgba(57,2,2,0.45), 0 4px 20px rgba(0,0,0,0.8)",
    border: "1px solid rgba(226,150,0,0.25)",
  }}
>
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/zVOEU0MiWiw"
    title="Barhan — Clip Officiel"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</div>
</div>
  {/* ✅ Icône play centrée */}

        {/* Bouton */}
        <button
  onClick={() => window.open("https://www.youtube.com/@BarhanNdi", "_blank")}
  className="font-dm text-sm tracking-widest uppercase font-bold
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
  Voir plus sur YouTube
</button>
      </div>
    </section>
  );
}