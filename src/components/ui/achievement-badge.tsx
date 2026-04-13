"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface AchievementBadgeProps {
  name: string;
  strength: number;
  tier: string;
  icon: string;
}

export const AchievementBadge = ({ name, strength, tier, icon }: AchievementBadgeProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = (LucideIcons as any)[icon] as LucideIcon || LucideIcons.Award;

  const tierColors: Record<string, string> = {
    Gold: "from-yellow-400 to-amber-600 shadow-yellow-500/50",
    Silver: "from-slate-300 to-slate-500 shadow-slate-400/50",
    Cyan: "from-cyan-400 to-blue-600 shadow-cyan-500/50",
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / (rect.width/2));
    y.set((e.clientY - rect.top - rect.height / 2) / (rect.height/2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="relative w-40 h-40 perspective-1000 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* FRONT */}
        <div 
          className={`absolute inset-0 backface-hidden rounded-full glass p-1 flex items-center justify-center overflow-hidden border-2 border-white/10 ${tierColors[tier]} bg-gradient-to-br`}
          style={{ transform: "translateZ(10px)" }}
        >
          {/* Sparkles */}
          <div className="absolute inset-0 opacity-40">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [0, 1, 0], 
                  opacity: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 60],
                  y: [0, (Math.random() - 0.5) * 60]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                className="absolute left-1/2 top-1/2 w-1 h-1 bg-white rounded-full blur-[1px]"
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center backdrop-blur-md border border-white/20">
              <Icon size={32} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
        </div>

        {/* BACK */}
        <div 
          className="absolute inset-0 backface-hidden rounded-full glass p-6 flex flex-col items-center justify-center text-center bg-background/80 border-2 border-primary/40"
          style={{ transform: "rotateY(180deg) translateZ(10px)" }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Neural Strength</p>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: `${strength}%` }}
               className="h-full bg-primary shadow-[0_0_10px_#3b82f6]"
             />
          </div>
          <span className="text-2xl font-black font-outfit text-foreground">{strength}%</span>
          <p className="text-[9px] font-bold text-muted uppercase tracking-widest mt-2">{name}</p>
        </div>
      </motion.div>
    </div>
  );
};
