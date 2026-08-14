"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  r: number;
  baseR: number;
  color: string;
  vx: number;
  vy: number;
  pulsePhase: number;
  pulseSpeed: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.baseR = Math.random() * 1.5 + 0.5; // Stardust size: very small
    this.r = this.baseR;
    
    // Stardust / Fireflies colors (Gold / Pale Yellow / Soft Rose)
    const hues = ["255, 215, 0", "255, 239, 150", "255, 192, 203", "255, 255, 255"];
    const hue = hues[Math.floor(Math.random() * hues.length)];
    const alpha = Math.random() * 0.5 + 0.1; 
    this.color = `rgba(${hue}, ${alpha})`;

    this.vx = (Math.random() - 0.5) * 0.2; // Subtle horizontal sway
    this.vy = -(Math.random() * 0.4 + 0.1); // Always floating upwards
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.05 + 0.01;
  }

  update(canvasWidth: number, canvasHeight: number, mouseX: number, mouseY: number) {
    // Mouse breeze interaction
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const breezeRadius = 150;

    if (dist < breezeRadius) {
      const force = (breezeRadius - dist) / breezeRadius;
      // Gentle push away from mouse
      this.vx -= (dx / dist) * force * 0.05;
      this.vy -= (dy / dist) * force * 0.05;
    }

    // Friction to slow down mouse pushes
    this.vx *= 0.99;
    this.vy *= 0.99;
    
    // Base upward wind restitution (slowly goes back to floating up)
    if (this.vy > -0.1) this.vy -= 0.005; 
    
    this.x += this.vx;
    this.y += this.vy;

    // Twinkle effect (slight pulsating size/opacity)
    this.pulsePhase += this.pulseSpeed;
    this.r = Math.max(0.1, this.baseR + Math.sin(this.pulsePhase) * 0.5);

    // Boundary wrap (wrapping bottom up)
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) {
      this.y = canvasHeight;
      this.x = Math.random() * canvasWidth;
      this.vx = (Math.random() - 0.5) * 0.2;
    }
    if (this.y > canvasHeight) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Higher density for stardust compared to bokeh
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 10000);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height, mouseX, mouseY);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
