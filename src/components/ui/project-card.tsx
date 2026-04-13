"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Terminal, Share2, Activity } from "lucide-react";
import { GithubIcon } from "./icons";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
  tag: string;
  index: number;
}

export const ProjectCard = ({ title, description, tech, image, github, demo, tag, index }: ProjectCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  const translateZ = useTransform(mouseXSpring, [-0.5, 0.5], ["20px", "-20px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group h-[450px] w-full cursor-none hidden md:block perspective-1200"
    >
      {/* The AI Hardware Module Container */}
      <div 
        className="absolute inset-2 rounded-[2.5rem] glass p-1 transition-all duration-500 group-hover:neon-glow overflow-hidden"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="absolute inset-0 bg-[#020617]/40" />
        
        {/* Holographic Image Layer */}
        <div className="absolute inset-0 opacity-40 group-hover:opacity-80 transition-opacity duration-700">
           <Image 
              src={image} 
              alt={title} 
              fill 
              sizes="(max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
           />
           {/* Scanline Beam Animation */}
           <motion.div 
             animate={{ top: ["-100%", "200%"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="absolute h-1/2 w-full bg-gradient-to-b from-transparent via-primary/40 to-transparent pointer-events-none z-10"
           />
        </div>

        {/* Content HUD Overlays */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between" style={{ transform: "translateZ(60px)" }}>
           
           {/* Top Telemetry */}
           <div className="flex justify-between items-start opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <Activity size={10} className="text-primary animate-pulse" />
                    <span className="text-[7px] font-black uppercase tracking-[0.3em] font-mono">STABLE_NX_{index}</span>
                 </div>
                 <div className="h-3 w-[1px] bg-white/20" />
                 <span className="text-[7px] font-black uppercase tracking-[0.3em] font-mono">UPLINK_001</span>
              </div>
              <div className="px-3 py-1 bg-primary/20 rounded-full border border-primary/20">
                 <span className="text-[8px] font-black uppercase tracking-widest text-primary">{tag}</span>
              </div>
           </div>

           {/* Main Holo-Content */}
           <div className="space-y-4">
              <div className="space-y-1">
                 <motion.h3 
                    style={{ translateZ }}
                    className="text-4xl font-outfit font-black text-foreground"
                 >
                    {title}
                 </motion.h3>
                 <div className="flex items-center gap-2 opacity-60">
                    <Terminal size={12} className="text-accent" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest">Neural_Module_Active</span>
                 </div>
              </div>

              <p className="text-muted/80 text-sm leading-relaxed line-clamp-2 max-w-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                 {description}
              </p>

              {/* Dynamic Tech Log */}
              <div className="flex flex-wrap gap-2 pt-2 opacity-40 group-hover:opacity-100 transition-opacity">
                {tech.map((t, i) => (
                  <motion.span 
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-[8px] font-black px-2 py-0.5 border border-white/10 uppercase tracking-widest bg-white/5"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                 <a href={github} className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/40 rounded-lg border border-primary/30 transition-all">
                    <GithubIcon size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Source</span>
                 </a>
                 <a href={demo} className="flex items-center gap-2 px-4 py-2 bg-accent/20 hover:bg-accent/40 rounded-lg border border-accent/30 transition-all">
                    <ExternalLink size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
                 </a>
                 <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-all">
                    <Share2 size={14} className="text-muted" />
                 </button>
              </div>
           </div>
        </div>

        {/* HUD Corner Brackets */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/10" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/10" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/10" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/10" />
        
        {/* Glare Effect */}
        <motion.div
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([x, y]: number[]) => `radial-gradient(circle at ${x * 100 + 50}% ${y * 100 + 50}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
            ),
          }}
          className="absolute inset-0 pointer-events-none z-20"
        />
      </div>
    </motion.div>
  );
};

// Mobile Version (High-Tech Card)
export const ProjectCardMobile = ({ title, description, tech, image, tag }: ProjectCardProps) => (
  <div className="md:hidden glass rounded-[2rem] overflow-hidden mb-12 shadow-2xl border-white/5 mx-2">
    <div className="relative h-64 w-full">
      <Image 
        src={image} 
        alt={title} 
        fill 
        sizes="(max-width: 768px) 100vw, 500px"
        className="object-cover opacity-60" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute top-6 left-6 flex gap-2">
         <div className="bg-primary px-3 py-1 rounded-full">
            <span className="text-[8px] font-black text-white uppercase tracking-widest">{tag}</span>
         </div>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
         <h3 className="text-3xl font-outfit font-black text-foreground mb-1">{title}</h3>
         <div className="flex items-center gap-2 opacity-60">
            <Activity size={10} className="text-accent" />
            <span className="text-[8px] font-mono font-bold uppercase tracking-widest">Active_Uplink</span>
         </div>
      </div>
    </div>
    <div className="p-8 space-y-4">
      <p className="text-muted/80 text-sm leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="text-[8px] font-black px-2 py-0.5 border border-white/10 uppercase tracking-widest bg-white/5">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);
