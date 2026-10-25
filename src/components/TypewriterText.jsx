// ============================================================
// TYPEWRITER TEXT — texte qui s'écrit et s'efface en boucle
// ============================================================
//
// UTILISATION :
//   import TypewriterText from "../animations/TypewriterText";
//   <TypewriterText phrases={["Artiste & Musicien", "Kennen Music"]} />
// ============================================================

import { useState, useEffect } from "react";

export default function TypewriterText({
  phrases = ["Artiste & Musicien"],
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseAfterType = 2000,
  pauseAfterDelete = 400,
}) {
  const [displayed, setDisplayed]   = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex]   = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    let timeout;

    if (!isDeleting) {
      if (charIndex < current.length) {
        // Écriture
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, typingSpeed);
      } else {
        // Pause puis effacement
        timeout = setTimeout(() => setIsDeleting(true), pauseAfterType);
      }
    } else {
      if (charIndex > 0) {
        // Effacement
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, deletingSpeed);
      } else {
        // Passage à la phrase suivante
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((i) => (i + 1) % phrases.length);
        }, pauseAfterDelete);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete]);

  return (
    <span>
      {displayed}
      {/* Curseur clignotant */}
      <span className="inline-block w-px h-[1em] bg-[#ddb183] ml-0.5 align-middle animate-pulse" />
    </span>
  );
}
