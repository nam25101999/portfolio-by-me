"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
}

export const ExperienceTimeline = ({ items }: { items: ExperienceItem[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-24 px-4 overflow-hidden md:overflow-visible">
      
      {/* Dual-Rail Neural Circuit Path */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 flex gap-1.5 opacity-20">
         <div className="w-[1px] h-full bg-border" />
         <div className="w-[1px] h-full bg-border" />
      </div>

      {/* Progress Rails */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 flex gap-1.5">
         <motion.div style={{ scaleY, transformOrigin: "top" }} className="w-[1px] h-full bg-primary shadow-[0_0_10px_#3b82f6]" />
         <motion.div style={{ scaleY, transformOrigin: "top" }} className="w-[1px] h-full bg-accent shadow-[0_0_10px_#22d3ee]" />
      </div>

      {/* Synchronized Traveling Spark Particles */}
      {[0, 1.5, 3].map((delay) => (
        <motion.div 
          key={delay}
          animate={{ 
            top: ["0%", "100%"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 5, 
            delay,
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute left-[22px] md:left-1/2 md:-translate-x-full w-2 h-16 bg-gradient-to-b from-transparent via-primary to-transparent z-10 blur-[1px]"
        />
      ))}

      <div className="space-y-32">
        {items.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} totalItems={items.length} />
        ))}
      </div>
    </div>
  );
};

const NeuralHub = ({ index }: { index: number }) => {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
       {/* Background Aura */}
       <motion.div 
          animate={{ rotate: 360, opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-dashed border-primary/30 rounded-full"
       />
       
       {/* Mechanical Hexagon Base (SVG) */}
       <svg className="w-full h-full relative z-10" viewBox="0 0 100 100">
          <defs>
             <filter id={`glow-${index}`}>
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
             </filter>
          </defs>
          
          {/* External Casing */}
          <motion.path 
             d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" 
             fill="none" 
             stroke="currentColor" 
             strokeWidth="2"
             className="text-primary/40"
          />
          
          {/* Internal Glowing Core */}
          <motion.path 
             animate={{ 
                fillOpacity: [0.2, 0.8, 0.2],
                strokeWidth: [1, 3, 1]
             }}
             transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
             d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z" 
             fill="currentColor" 
             stroke="currentColor"
             className="text-primary"
             filter={`url(#glow-${index})`}
          />

          {/* Rotating Data Nodes */}
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: '50px 50px' }}>
             <circle cx="50" cy="5" r="3" className="fill-accent shadow-glow shadow-accent" />
          </motion.g>
       </svg>
    </div>
  );
};

const TimelineItem = ({ item, index, totalItems }: { item: ExperienceItem; index: number; totalItems: number }) => {
  const isEven = index % 2 === 0;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

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
    <div className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* High-Fidelity Neural Hub Container */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 z-30">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="md:-ml-0"
          >
             <NeuralHub index={index} />
          </motion.div>
      </div>

      {/* Content Card with Enhanced HUD Aesthetics */}
      <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pr-24 text-left md:text-right' : 'md:pl-24 text-left'}`}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, x: isEven ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-8 rounded-[2.5rem] relative group cursor-none hover:neon-glow transition-all duration-500"
        >
          {/* HUD Corner Brackets */}
          <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-primary/20 group-hover:border-primary transition-colors" />
          <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-primary/20 group-hover:border-primary transition-colors" />
          
          {/* Station ID Label */}
          <div className={`absolute top-6 ${isEven ? 'left-12' : 'right-12'} opacity-20 font-mono text-[8px] tracking-[0.3em] font-black`}>
             NODE_STATION_NX_{totalItems - index}
          </div>

          {/* Internal Scanline & Gradient */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,.06),rgba(0,255,0,.02),rgba(0,0,255,.06))] bg-[length:100%_2px,3px_100%] group-hover:opacity-[0.05]" />
          
          <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'} gap-4 relative z-10`}>
             <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase opacity-70">
                {item.period}
             </span>

             <div>
                <h3 className="text-2xl md:text-3xl font-outfit font-black text-foreground mb-1 group-hover:text-primary transition-colors">
                   {item.role}
                </h3>
                <p className="text-secondary font-bold text-md tracking-tight">@ {item.company}</p>
             </div>

             <div className="h-1.5 w-16 bg-gradient-to-r from-primary/40 to-transparent rounded-full" />
             
             <p className="text-muted/80 text-sm leading-relaxed max-w-sm">
                {item.description}
             </p>

             <div className="flex flex-wrap gap-2 mt-2">
                {['Optimization', 'Architecture', 'AI Integration'].map(tag => (
                   <span key={tag} className="px-2 py-0.5 border border-border/40 text-[7px] font-black tracking-widest uppercase text-muted">
                      {tag}
                   </span>
                ))}
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
