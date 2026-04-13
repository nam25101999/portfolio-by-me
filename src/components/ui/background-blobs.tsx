"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export const BackgroundBlobs = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-dark">
      {/* Slow Gradient Shift Base */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-dark to-secondary/5 animate-gradient-shift bg-[length:200%_200%]" />
      
      {/* Parallax Blobs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-secondary/20 blur-[120px] animate-pulse-slow delay-1000"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[10%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-accent/20 blur-[120px] animate-pulse-slow delay-2000"
      />

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      
      {/* Grid Pattern Overlay (Subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};
