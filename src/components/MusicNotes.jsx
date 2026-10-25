// ============================================================
// MUSIC NOTES PARTICLES — animation côté gauche
// ============================================================
//
// UTILISATION dans Home.jsx et About.jsx :
//   import MusicNotes from "../animations/MusicNotes";
//   <MusicNotes />  ← après l'<img> de fond, dans la section relative
// ============================================================

import { useEffect, useRef } from "react";

const NOTES = ["♪", "♫", "♩", "♬", "♭"];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createNote(w, h, startVisible = false) {
  return {
    x:             randomBetween(10, w * 0.22),
    y:             startVisible ? randomBetween(h * 0.1, h * 0.9) : h + randomBetween(20, 100),
    size:          randomBetween(22, 38),
    opacity:       0,
    maxOpacity:    randomBetween(0.7, 1.0),
    speed:         randomBetween(0.5, 1.1),
    drift:         randomBetween(-0.3, 0.3),
    rotation:      randomBetween(-20, 20),
    rotationSpeed: randomBetween(-0.4, 0.4),
    symbol:        NOTES[Math.floor(Math.random() * NOTES.length)],
    life:          startVisible ? randomBetween(40, 120) : 0,
    maxLife:       randomBetween(200, 350),
  };
}

export default function MusicNotes() {
  const canvasRef = useRef(null);
  const notesRef  = useRef([]);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Pré-remplir avec des notes déjà en cours
    for (let i = 0; i < 10; i++) {
      notesRef.current.push(createNote(canvas.width, canvas.height, true));
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (notesRef.current.length < 14 && Math.random() < 0.02) {
        notesRef.current.push(createNote(canvas.width, canvas.height, false));
      }

      notesRef.current = notesRef.current.filter((n) => {
        n.life     += 1;
        n.y        -= n.speed;
        n.x        += n.drift;
        n.rotation += n.rotationSpeed;

        const fade = 40;
        if (n.life < fade) {
          n.opacity = (n.life / fade) * n.maxOpacity;
        } else if (n.life > n.maxLife - fade) {
          n.opacity = ((n.maxLife - n.life) / fade) * n.maxOpacity;
        } else {
          n.opacity = n.maxOpacity;
        }

        if (n.life >= n.maxLife || n.y < -40) return false;

        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate((n.rotation * Math.PI) / 180);
        ctx.globalAlpha = n.opacity;
        ctx.font        = `${n.size}px serif`;
        // Halo lumineux
        ctx.shadowColor = "#00000000";
        ctx.shadowBlur  = 12;
        ctx.fillStyle   = "#ffe0a0";
        ctx.fillText(n.symbol, 0, 0);
        ctx.restore();

        return true;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
