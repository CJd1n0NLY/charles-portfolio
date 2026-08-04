"use client";

import { useEffect, useRef } from "react";

type ParticleCanvasProps = {
  className?: string;
  dotColor?: string;
  lineColor?: string;
  density?: number;
  maxLineDistance?: number;
};

export default function ParticleCanvas({
  className,
  dotColor = "rgba(17,17,17,0.25)",
  lineColor = "17,17,17",
  density = 45000,        // fewer particles
  maxLineDistance = 90,   // shorter connecting lines
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];
    let animationId: number;

    function resize() {
      const parent = canvas!.parentElement;
      canvas!.width = parent ? parent.clientWidth : window.innerWidth;
      canvas!.height = parent ? parent.clientHeight : window.innerHeight;
    }

    function initParticles() {
      const count = Math.min(40, Math.floor((canvas!.width * canvas!.height) / density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }));
    }

    // Fades opacity toward the edges so nothing reads as "flying off the screen"
    function edgeFade(x: number, y: number) {
      const w = canvas!.width, h = canvas!.height;
      const marginX = w * 0.15, marginY = h * 0.15;
      const fx = Math.min(x / marginX, (w - x) / marginX, 1);
      const fy = Math.min(y / marginY, (h - y) / marginY, 1);
      return Math.max(0, Math.min(fx, fy));
    }

    function drawFrame(move: boolean) {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      particles.forEach((p) => {
        if (move) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;
        }
        const fade = edgeFade(p.x, p.y);
        if (fade <= 0) return;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
        ctx!.fillStyle = dotColor;
        ctx!.globalAlpha = fade;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxLineDistance) {
            const fade = Math.min(edgeFade(particles[i].x, particles[i].y), edgeFade(particles[j].x, particles[j].y));
            if (fade <= 0) continue;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(${lineColor},${0.25 * (1 - dist / maxLineDistance) * fade})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }
    }

    function loop() { drawFrame(true); animationId = requestAnimationFrame(loop); }

    resize();
    initParticles();
    if (prefersReduced) drawFrame(false); else loop();

    const ro = new ResizeObserver(() => { resize(); initParticles(); });
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    return () => { cancelAnimationFrame(animationId); ro.disconnect(); };
  }, [dotColor, lineColor, density, maxLineDistance]);

  return <canvas ref={canvasRef} className={className} />;
}