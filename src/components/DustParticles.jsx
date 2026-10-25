// ============================================================
// DUST PARTICLES — tourbillon de vent côté gauche
// ============================================================

import { useEffect, useRef } from "react";

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticle(w, h, startVisible = false) {
  // Chaque particule orbite autour d'un centre de tourbillon
  const centerX  = randomBetween(w * 0.02, w * 0.20);
  const centerY  = startVisible ? randomBetween(h * 0.1, h * 0.9) : h * randomBetween(0.6, 1.1);
  const radius   = randomBetween(8, 60);
  const angle    = randomBetween(0, Math.PI * 2);
  const size     = randomBetween(1.5, 4.5);

  return {
    centerX,
    centerY,
    radius,
    angle,
    size,
    opacity:      0,
    maxOpacity:   size > 3 ? randomBetween(0.5, 0.8) : randomBetween(0.2, 0.5),
    // vitesse angulaire — sens antihoraire (vent qui tourbillonne)
    angularSpeed: randomBetween(0.012, 0.035) * (Math.random() > 0.5 ? 1 : -1),
    // le tourbillon monte lentement
    riseSpeed:    randomBetween(0.15, 0.55),
    // le rayon rétrécit en montant — effet spirale ascendante
    radiusDecay:  randomBetween(0.015, 0.06),
    rotation:     randomBetween(0, Math.PI * 2),
    rotationSpeed:randomBetween(-0.04, 0.04),
    life:         startVisible ? randomBetween(0, 150) : 0,
    maxLife:      randomBetween(200, 420),
  };
}

export default function DustParticles() {
  const canvasRef    = useRef(null);
  const particlesRef = useRef([]);
  const rafRef       = useRef(null);

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
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push(createParticle(canvas.width, canvas.height, true));
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawner de nouvelles particules
      if (particlesRef.current.length < 80 && Math.random() < 0.4) {
        particlesRef.current.push(createParticle(canvas.width, canvas.height, false));
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life        += 1;
        p.angle       += p.angularSpeed;
        p.centerY     -= p.riseSpeed;           // tourbillon qui monte
        p.radius      *= (1 - p.radiusDecay * 0.01); // spirale qui se resserre
        p.rotation    += p.rotationSpeed;

        // Position réelle sur la spirale
        const x = p.centerX + Math.cos(p.angle) * p.radius;
        const y = p.centerY + Math.sin(p.angle) * p.radius * 0.4; // aplatir verticalement

        // Fade in / out
        const fade = 45;
        if (p.life < fade) {
          p.opacity = (p.life / fade) * p.maxOpacity;
        } else if (p.life > p.maxLife - fade) {
          p.opacity = ((p.maxLife - p.life) / fade) * p.maxOpacity;
        } else {
          p.opacity = p.maxOpacity;
        }

        if (p.life >= p.maxLife || p.centerY < -80) return false;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(x, y);
        ctx.rotate(p.rotation + p.angle);

        if (p.size > 3) {
          ctx.shadowColor = "#c8a060";
          ctx.shadowBlur  = p.size * 2.5;
        }

        // Grain allongé
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 2, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(221, 177, 131, 1)`;
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
