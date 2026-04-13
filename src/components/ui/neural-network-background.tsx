"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    const pointCount = 60;
    const connectionDistance = 150;
    const mouseRadius = 200;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    const initPoints = () => {
      points = [];
      for (let i = 0; i < pointCount; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = theme === "dark";
      const primaryColor = "59, 130, 246";
      const secondaryColor = "168, 85, 247";
      const accentColor = "34, 211, 238";

      points.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.x > canvas.width || p.x < 0) p.x = Math.max(0, Math.min(canvas.width, p.x));
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        if (p.y > canvas.height || p.y < 0) p.y = Math.max(0, Math.min(canvas.height, p.y));

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          p.x -= dx * 0.02 * force;
          p.y -= dy * 0.02 * force;
        }

        // Draw connections
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = 0.2 * (1 - dist / connectionDistance);
            const color = i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor;
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw point with glow
        const color = i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.5)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${color}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, theme]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none opacity-40 transition-opacity duration-1000"
    />
  );
};
