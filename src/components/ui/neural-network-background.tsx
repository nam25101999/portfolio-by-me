"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number; // Depth factor 0.2 to 1
  baseX: number;
  baseY: number;
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
    const pointCount = 120; // Increased density
    const mouseRadius = 250;
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    const initPoints = () => {
      points = [];
      for (let i = 0; i < pointCount; i++) {
        const z = Math.random() * 0.8 + 0.2; // 0.2 to 1.0
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (1.5 * z), // Closer points move faster
          vy: (Math.random() - 0.5) * (1.5 * z),
          z: z,
          baseX: 0,
          baseY: 0
        });
      }
      // Sort points so we draw deeper points first (painter's algorithm)
      points.sort((a, b) => a.z - b.z);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const primaryColor = "59, 130, 246";
      const secondaryColor = "168, 85, 247";
      const accentColor = "34, 211, 238";

      points.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < -100) p.x = canvas.width + 100;
        if (p.x > canvas.width + 100) p.x = -100;
        if (p.y < -100) p.y = canvas.height + 100;
        if (p.y > canvas.height + 100) p.y = -100;

        // Local Mouse Interaction (Stronger reaction only near mouse)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        let shiftX = 0;
        let shiftY = 0;
        
        if (distMouse < mouseRadius) {
          const force = (mouseRadius - distMouse) / mouseRadius;
          // Pushes particles away strongly when close, scaled by depth (Z)
          shiftX = (dxMouse / distMouse) * force * 60 * p.z; 
          shiftY = (dyMouse / distMouse) * force * 60 * p.z;
        }

        const renderX = p.x - shiftX;
        const renderY = p.y - shiftY;

        // Draw connections
        const connectionDistance = 150 * p.z; 
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          
          // Calculate p2's rendered position for connection
          const dxM2 = mouse.x - p2.x;
          const dyM2 = mouse.y - p2.y;
          const distM2 = Math.sqrt(dxM2 * dxM2 + dyM2 * dyM2);
          let shiftX2 = 0;
          let shiftY2 = 0;
          if (distM2 < mouseRadius) {
             const force2 = (mouseRadius - distM2) / mouseRadius;
             shiftX2 = (dxM2 / distM2) * force2 * 60 * p2.z;
             shiftY2 = (dyM2 / distM2) * force2 * 60 * p2.z;
          }
          const p2RenderX = p2.x - shiftX2;
          const p2RenderY = p2.y - shiftY2;
          
          const dx = renderX - p2RenderX;
          const dy = renderY - p2RenderY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Opacity and width based on average z of the two points
            const avgZ = (p.z + p2.z) / 2;
            const opacity = (0.2 * avgZ) * (1 - dist / connectionDistance);
            const color = i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor;
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.lineWidth = 0.5 + (avgZ * 1.5); // Thicker lines for closer layers
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(p2RenderX, p2RenderY);
            ctx.stroke();
          }
        }

        // Draw point with glow based on Z
        const color = i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : accentColor;
        ctx.beginPath();
        const radius = 0.5 + (p.z * 2.5); // Larger dots for closer layers
        ctx.arc(renderX, renderY, radius, 0, Math.PI * 2);
        
        const glowOpacity = 0.3 + (p.z * 0.5);
        ctx.fillStyle = `rgba(${color}, ${glowOpacity})`;
        
        if (p.z > 0.6) { // Only add heavy glow to closer layers for performance
          ctx.shadowBlur = 15 * p.z;
          ctx.shadowColor = `rgba(${color}, ${glowOpacity})`;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
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
