// ============================================================
// SMOKE EFFECT — volutes de fumée côté gauche
// ============================================================
//
// UTILISATION dans Home.jsx et About.jsx :
//   import SmokeEffect from "../animations/SmokeEffect";
//   <SmokeEffect />  ← après l'<img> de fond, dans la section relative
// ============================================================

import { useEffect, useRef } from "react";

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createPuff(w, h, startVisible = false) {
  return {
    x:          randomBetween(20, w * 0.25),
    y:          startVisible ? randomBetween(h * 0.2, h * 0.95) : h + randomBetween(20, 120),
    radius:     randomBetween(25, 60),
    maxRadius:  randomBetween(120, 250),
    opacity:    0,
    maxOpacity: randomBetween(0.18, 0.38),
    speedY:     randomBetween(0.3, 0.7),        // monte lentement
    drift:      randomBetween(-0.4, 0.4),       // dérive horizontale douce
    driftFreq:  randomBetween(0.005, 0.015),
    driftPhase: randomBetween(0, Math.PI * 2),
    life:       startVisible ? randomBetween(0, 180) : 0,
    maxLife:    randomBetween(280, 520),
  };
}

export default function SmokeEffect() {
  const canvasRef = useRef(null);
  const puffsRef  = useRef([]);
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

    // Pré-remplir
    for (let i = 0; i < 28; i++) {
      puffsRef.current.push(createPuff(canvas.width, canvas.height, true));
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawner
      if (puffsRef.current.length < 38 && Math.random() < 0.1) {
        puffsRef.current.push(createPuff(canvas.width, canvas.height, false));
      }

      puffsRef.current = puffsRef.current.filter((p) => {
        p.life += 1;
        p.y    -= p.speedY;
        p.x    += Math.sin(p.life * p.driftFreq + p.driftPhase) * p.drift;

        // La volute se dilate progressivement
        const growProgress = Math.min(p.life / p.maxLife, 1);
        const currentRadius = p.radius + (p.maxRadius - p.radius) * growProgress;

        // Fade in rapide, longue tenue, fade out doux
        const fadeIn  = 60;
        const fadeOut = 120;
        if (p.life < fadeIn) {
          p.opacity = (p.life / fadeIn) * p.maxOpacity;
        } else if (p.life > p.maxLife - fadeOut) {
          p.opacity = ((p.maxLife - p.life) / fadeOut) * p.maxOpacity;
        } else {
          p.opacity = p.maxOpacity;
        }

        if (p.life >= p.maxLife || p.y < -200) return false;

        // Dégradé radial : centre opaque, bords transparents
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
        grad.addColorStop(0,   `rgba(220, 200, 165, ${p.opacity})`);
        grad.addColorStop(0.3, `rgba(200, 175, 140, ${p.opacity * 0.75})`);
        grad.addColorStop(0.7, `rgba(170, 148, 115, ${p.opacity * 0.35})`);
        grad.addColorStop(1,   `rgba(140, 120, 95, 0)`);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
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
