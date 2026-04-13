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
  results?: string[];
}

export const ProjectCard = ({ title, description, tech, image, github, demo, tag, index, results }: ProjectCardProps) => {
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
      className="relative group h-[500px] w-full cursor-none hidden md:block perspective-1200"
    >
      {/* The AI Hardware Module Container */}
      <div 
        className="absolute inset-2 rounded-[2.5rem] glass p-1 transition-all duration-500 group-hover:neon-glow overflow-hidden"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="absolute inset-0 bg-[#020617]/40" />
        
        {/* Holographic Image Layer */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-60 transition-opacity duration-700">
           <Image 
              src={image} 
              alt={title} 
              fill 
              sizes="(max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent" />
        </div>

        {/* Content HUD Overlays */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between" style={{ transform: "translateZ(60px)" }}>
           
           {/* Top Telemetry */}
           <div className="flex justify-between items-start opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <Activity size={10} className="text-primary animate-pulse" />
                    <span className="text-[7px] font-black uppercase tracking-[0.3em] font-mono">ID_{index}</span>
                 </div>
                 <div className="h-3 w-[1px] bg-white/20" />
                 <span className="text-[7px] font-black uppercase tracking-[0.3em] font-mono">STABLE_BUILD</span>
              </div>
              <div className="px-3 py-1 bg-primary/20 rounded-full border border-primary/20">
                 <span className="text-[8px] font-black uppercase tracking-widest text-primary">{tag}</span>
              </div>
           </div>

           {/* Main Holo-Content */}
           <div className="space-y-6">
              <div className="space-y-2">
                 <motion.h3 
                    style={{ translateZ }}
                    className="text-3xl font-outfit font-black text-foreground"
                 >
                    {title}
                 </motion.h3>
                 <div className="flex items-center gap-2 opacity-60">
                    <Terminal size={12} className="text-accent" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest">DEPLOYMENT_SUCCESS</span>
                 </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted/80 text-sm leading-relaxed line-clamp-2 max-w-sm">
                   {description}
                </p>

                {/* Results Section - Reveal on hover */}
                <div className="space-y-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-[1px] w-4 bg-primary/40" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Key Results</span>
                  </div>
                  <ul className="space-y-1.5">
                    {results?.map((res, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={12} className="text-green-500 mt-0.5 shrink-0" />
                        <span className="text-[11px] text-foreground font-medium">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

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
              <div className="flex gap-4 pt-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                 <a href={demo} target="_blank" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                    <ExternalLink size={14} />
                    <span className="text-[11px] font-black uppercase tracking-widest">Live Demo</span>
                 </a>
                 <a href={github} target="_blank" className="flex items-center justify-center gap-2 px-6 py-3 glass hover:bg-white/10 rounded-xl border border-white/10 transition-all hover:scale-105 active:scale-95">
                    <GithubIcon size={14} />
                    <span className="text-[11px] font-black uppercase tracking-widest">Source</span>
                 </a>
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
export const ProjectCardMobile = ({ title, description, tech, image, tag, github, demo, results }: ProjectCardProps) => (
  <div className="md:hidden glass rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl border-white/5 mx-2">
    <div className="relative h-56 w-full">
      <Image 
        src={image} 
        alt={title} 
        fill 
        sizes="(max-width: 768px) 100vw, 500px"
        className="object-cover opacity-60" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <div className="absolute top-6 left-6 flex gap-2">
         <div className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full border border-primary/20">
            <span className="text-[8px] font-black text-primary uppercase tracking-widest">{tag}</span>
         </div>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
         <h3 className="text-2xl font-outfit font-black text-foreground mb-1">{title}</h3>
      </div>
    </div>
    <div className="p-6 space-y-6">
      <p className="text-muted/80 text-xs leading-relaxed">{description}</p>
      
      {/* Metrics for Mobile */}
      <div className="space-y-3">
        <ul className="space-y-2">
          {results?.slice(0, 2).map((res, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 size={10} className="text-green-500 mt-0.5" />
              <span className="text-[10px] text-foreground font-medium">{res}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 text-muted">
        {tech.slice(0, 3).map((t) => (
          <span key={t} className="text-[7px] font-black px-2 py-0.5 border border-white/10 uppercase tracking-widest bg-white/5">
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
         <a href={demo} target="_blank" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
            <span>Demo</span>
         </a>
         <a href={github} target="_blank" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 glass rounded-xl text-[10px] font-black uppercase tracking-widest">
            <span>Source</span>
         </a>
      </div>
    </div>
  </div>
);
