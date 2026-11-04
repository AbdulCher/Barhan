import {
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaFacebook,
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
    link: "https://barhan.itunes.com",
    label: "iTunes",
    color: "#1DA0C3",
  },
  {
    icon: <FaSpotify />,
    link: "https://open.spotify.com/user/olva0z7obnc6sz6tmqjp0mciy?si=74b90630f25d41fc",
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

export default function Icons() {
  return (
    <>
      {/* ── Desktop : barre verticale fixe à droite ── */}
      <nav
        className="hidden md:flex fixed top-1/2 right-6 -translate-y-1/2 flex-col gap-5 z-50"
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

      {/* ── Mobile : barre horizontale inline ── */}
      <nav
        className="flex md:hidden items-center justify-center gap-6"
        aria-label="Réseaux sociaux"
      >
        {ICONS.map((item) => (
          <a
            key={item.label}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="text-4xl transition-all duration-300 hover:scale-125"
            style={{ color: item.color }}
          >
            {item.icon}
          </a>
        ))}
      </nav>
    </>
  );
}

