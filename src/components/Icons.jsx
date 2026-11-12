import {
  FaInstagram,
  FaYoutube,
  FaSpotify,
  FaBandcamp,
  FaItunes,
} from "react-icons/fa";

const ICONS = [
  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com/barhan.music/",
    label: "Instagram",
    color: "#E1306C",
  },
  {
    icon: <FaItunes />,
    link: "https://music.apple.com/tr/artist/barhan/1501600830?l=tr",
    label: "iTunes",
    color: "#1DA0C3",
  },
  {
    icon: <FaSpotify />,
    link: "https://open.spotify.com/intl-fr/artist/2n39AGJsmmS7qQBIBYl0lo",
    label: "Spotify",
    color: "#1DB954",
  },
  {
    icon: <FaBandcamp />,
    link: "https://barhan.bandcamp.com",
    label: "Bandcamp",
    color: "#1DA0C3",
  },
  {
    icon: <FaYoutube />,
    link: "https://www.youtube.com/@BarhanOfficiel",
    label: "YouTube",
    color: "#FF0000",
  },
];

// Téléphone en paysage (écran de moins de 500px de haut) :
// on garde la barre horizontale sous le logo, même si l'écran est large.
export default function Icons() {
  return (
    <>
      {/* ── Ordinateur : barre verticale fixe à droite ── */}
      <nav
        className="hidden md:flex [@media(orientation:landscape)_and_(max-height:500px)]:hidden
                   fixed top-1/2 right-6 -translate-y-1/2 flex-col gap-5 z-50"
        aria-label="Réseaux sociaux"
      >
        {ICONS.map((item) => (
          <a
            key={item.label}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="text-3xl transition-all duration-300 hover:scale-125 hover:rotate-12"
            style={{ color: item.color }}
          >
            {item.icon}
          </a>
        ))}
      </nav>

      {/* ── Téléphone (portrait et paysage) : barre horizontale sous le logo ── */}
      <nav
        className="flex md:hidden [@media(orientation:landscape)_and_(max-height:500px)]:flex
                   items-center justify-center gap-6"
        aria-label="Réseaux sociaux"
      >
        {ICONS.map((item) => (
          <a
            key={item.label}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="text-3xl transition-all duration-300 hover:scale-125"
            style={{ color: item.color }}
          >
            {item.icon}
          </a>
        ))}
      </nav>
    </>
  );
}
