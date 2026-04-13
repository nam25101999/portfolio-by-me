"use client";

import { SectionLayout, RevealItem } from "../ui/section-layout";
import { SkillRadarGrid } from "../ui/skill-radar";
import { ExperienceTimeline } from "../ui/experience-timeline";
import { ProjectCard, ProjectCardMobile } from "../ui/project-card";
import { skillsGroups, projects, experience, personalInfo } from "@/lib/data";
import { MagneticButton } from "../ui/magnetic-button";
import { Mail, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "../ui/icons";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

import { Layers, Cpu, Database as DBIcon, Settings, Terminal, Brain, Cloud, Rocket, Briefcase, Zap, CheckCircle2 } from "lucide-react";
import { AchievementBadge } from "../ui/achievement-badge";
import { achievements } from "@/lib/data";

export const AboutSection = () => {
  const t = useTranslations("About");
  return (
    <SectionLayout id="about">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <RevealItem className="lg:w-1/2">
          <h2 className="text-4xl md:text-6xl font-outfit font-black mb-6 text-foreground">
            {t("title")} <span className="text-gradient">{t("titleAccent")}</span>
          </h2>
          <p className="text-xl text-muted font-medium mb-8">
            {t("description")}
          </p>
          <div className="space-y-6 text-muted/80 leading-relaxed">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>
        </RevealItem>
        <RevealItem className="lg:w-1/2 w-full">
          <NeuralMatrixHUD />
        </RevealItem>
      </div>
    </SectionLayout>
  );
};

const NeuralMatrixHUD = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass p-1 p-0.5 rounded-[2.5rem] relative group transition-all duration-500 hover:neon-glow cursor-none perspective-1200"
    >
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="aspect-video glass rounded-[2.5rem] overflow-hidden relative"
      >
        {/* Deep Space Background */}
        <div className="absolute inset-0 bg-[#020617] opacity-20" />
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Core: THE NEURAL SUN */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(80px)" }}>
           
           {/* Sun Radiance Layers */}
           <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-40 h-40 bg-primary/20 rounded-full blur-[60px]"
           />
           <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-24 h-24 bg-accent/20 rounded-full blur-2xl"
           />
           
           {/* The Sun Core */}
           <div className="relative w-12 h-12 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 bg-primary rounded-full blur-md opacity-50" />
              <div className="relative w-8 h-8 bg-gradient-to-tr from-primary to-accent rounded-full shadow-[0_0_30px_var(--tw-shadow-color)] shadow-primary z-10 flex items-center justify-center overflow-hidden">
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.4),transparent)]"
                 />
                 <div className="w-2 h-2 bg-white rounded-full animate-pulse relative z-20" />
              </div>
           </div>

           {/* Orbits & Planets */}
           
           {/* Orbit 1: INNER (NLP Core) */}
           <div className="absolute w-32 h-32 border border-white/5 rounded-full">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                 <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_#3b82f6] border border-white/20" />
              </motion.div>
           </div>

           {/* Orbit 2: MIDDLE (Vision Core) */}
           <div className="absolute w-56 h-56 border border-white/5 rounded-full" style={{ transform: "rotateX(60deg) rotateY(10deg)" }}>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                 <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full shadow-[0_0_15px_#22d3ee] border border-white/20" />
              </motion.div>
           </div>

           {/* Orbit 3: OUTER (Vector Storage) */}
           <div className="absolute w-80 h-80 border border-white/5 rounded-full" style={{ transform: "rotateX(-30deg) rotateY(20deg)" }}>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                 <div className="absolute bottom-[10%] right-[10%] w-5 h-5 bg-secondary rounded-full shadow-[0_0_20px_#a855f7] border border-white/20">
                    <div className="absolute inset-0 border border-white/20 rounded-full animate-ping opacity-30" />
                 </div>
              </motion.div>
           </div>

           {/* Floating HUD Labels */}
           <div className="absolute left-12 top-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(40px)" }}>
              <span className="text-[6px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-2 py-0.5 rounded-full">Inner_Sync: 0.998</span>
           </div>
           <div className="absolute right-12 bottom-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(40px)" }}>
              <span className="text-[6px] font-black uppercase tracking-[0.3em] text-accent bg-accent/10 px-2 py-0.5 rounded-full">Outer_Load: 12%</span>
           </div>
        </div>

        {/* HUD Overlay Bar */}
        <div className="absolute bottom-6 left-8 right-8 z-30" style={{ transform: "translateZ(100px)" }}>
           <div className="glass p-4 rounded-xl border-white/10 backdrop-blur-3xl shadow-2xl flex items-center justify-between overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 -z-10 animate-pulse" />
              <div className="flex items-center gap-4">
                 <div className="relative">
                    <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                       <motion.div 
                          animate={{ y: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-full h-1/2 bg-primary/20 absolute"
                       />
                       <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                 </div>
                 <div>
                    <h4 className="text-[9px] font-black text-primary tracking-[0.4em] uppercase mb-0.5">Neural Ecosystem</h4>
                    <p className="text-xl font-black font-outfit text-foreground leading-none">SYSTEM_ACTIVE</p>
                 </div>
              </div>
              
              <div className="hidden sm:flex items-center gap-6">
                 <div className="text-right">
                    <p className="text-[7px] font-bold text-muted uppercase tracking-widest mb-1">Inference Cluster</p>
                    <div className="flex gap-1">
                       {[1, 2, 3, 4, 5, 6].map(i => (
                         <motion.div 
                            key={i}
                            animate={{ scaleY: [0.5, 1.5, 0.5] }}
                            transition={{ delay: i * 0.1, repeat: Infinity }}
                            className="w-1 h-3 bg-secondary rounded-full"
                         />
                       ))}
                    </div>
                 </div>
                 <div className="h-8 w-[1px] bg-white/5" />
                 <div className="flex flex-col items-end">
                    <span className="text-[7px] font-bold text-accent uppercase tracking-widest">Orbit Status</span>
                    <span className="text-[10px] font-black font-mono text-foreground">STABLE</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.08] noise-overlay" />
      </motion.div>
    </div>
  );
};

export const SkillsSection = () => {
  const t = useTranslations("Skills");

  const icons = [Layers, Cpu, DBIcon, Settings, Terminal, Brain];
  const colors = ["#3b82f6", "#a855f7", "#22d3ee", "#f472b6", "#fbbf24", "#61dafb"];

  const translatedSkillsGroups = skillsGroups.map((group, idx) => ({
    ...group,
    category: t(group.category.toLowerCase().split(' ')[0]),
    icon: icons[idx % icons.length],
    color: colors[idx % colors.length]
  }));

  return (
    <SectionLayout id="skills">
      <RevealItem className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-outfit font-black mb-4 text-foreground">
          {t("title")} <span className="text-gradient">{t("titleAccent")}</span>
        </h2>
        <p className="text-muted max-w-2xl mx-auto">{t("description")}</p>
      </RevealItem>
      <SkillRadarGrid groups={translatedSkillsGroups} />
    </SectionLayout>
  );
};

export const ExperienceSection = () => {
  const t = useTranslations("Experience");
  
  // Map translated items to the experience data structure
  const translatedExperience = experience.map((item, index) => ({
    ...item,
    role: t(`items.${index}.role`),
    company: t(`items.${index}.company`),
    description: t(`items.${index}.description`),
  }));

  return (
    <SectionLayout id="experience" className="bg-foreground/[0.02] rounded-[3rem]">
      <RevealItem className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-outfit font-black mb-4 text-foreground">
          {t("title")} <span className="text-gradient">{t("titleAccent")}</span>
        </h2>
        <p className="text-muted/80">{t("description")}</p>
      </RevealItem>
      <ExperienceTimeline items={translatedExperience} />
    </SectionLayout>
  );
};

export const ProjectsSection = () => {
  const t = useTranslations("Projects");

  const translatedProjects = projects.map((p, i) => ({
    ...p,
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  return (
    <SectionLayout id="projects">
      <RevealItem className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-outfit font-black mb-4 text-foreground">
          {t("title")} <span className="text-gradient">{t("titleAccent")}</span>
        </h2>
        <p className="text-muted/80">{t("description")}</p>
      </RevealItem>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {translatedProjects.map((p, i) => (
          <RevealItem key={i}>
            <ProjectCard {...p} index={i} />
            <ProjectCardMobile {...p} index={i} />
          </RevealItem>
        ))}
      </div>
    </SectionLayout>
  );
};

export const WhatImBuilding = () => {
  const t = useTranslations("WhatImBuilding");
  return (
    <SectionLayout id="building" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 rounded-[4rem] -z-10" />
      <div className="flex flex-col md:flex-row items-center gap-12">
        <RevealItem className="md:w-1/2 space-y-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-bold tracking-widest uppercase">
              {t("active")}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-outfit font-black leading-tight text-foreground">
            {t("title")} <span className="text-gradient">{t("titleAccent")}</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            {t("description")}
          </p>
          <div className="flex items-center gap-4 text-primary font-bold">
            <span>{t("progress")}</span>
            <div className="flex-1 h-2 bg-foreground/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "85%" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-primary" 
              />
            </div>
            <span>85%</span>
          </div>
        </RevealItem>
        <RevealItem className="md:w-1/2 w-full">
          <div className="glass p-8 rounded-[2.5rem] border-primary/20 neon-glow relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 bg-primary p-3 rounded-2xl shadow-xl z-20">
              <ArrowRight className="text-white" />
            </div>
            
            {/* AI HUD Background Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/20 transition-all" />
            
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
               <span className="w-2 h-2 bg-primary rounded-full" />
               {t("highlightTitle")}
            </h3>
            <ul className="space-y-4 mb-8">
              {[
                t("highlight1"),
                t("highlight2"),
                t("highlight3"),
                t("highlight4")
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-muted">
                  <div className="w-1 h-4 bg-primary/30 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-border flex justify-between items-center text-[10px] font-bold tracking-widest">
               <div className="flex flex-col gap-1">
                  <span className="text-muted uppercase">Neural Sync</span>
                  <span className="text-primary uppercase">Active (99.2%)</span>
               </div>
               <div className="flex flex-col gap-1 text-right">
                  <span className="text-muted uppercase">Inference Time</span>
                  <span className="text-accent uppercase">4 ms</span>
               </div>
            </div>
          </div>
        </RevealItem>
      </div>
    </SectionLayout>
  );
};

export const ContactSection = () => {
  const t = useTranslations("Contact");
  const tTrust = useTranslations("Trust");
  
  const trustSignals = [
    { icon: Briefcase, label: tTrust("experience"), color: "text-primary" },
    { icon: Rocket, label: tTrust("projects"), color: "text-secondary" },
    { icon: Zap, label: tTrust("fast"), color: "text-accent" },
  ];

  return (
    <SectionLayout id="contact">
      <div className="glass-morphism p-12 rounded-[3.5rem] relative overflow-hidden text-center space-y-12">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
        
        {/* Header */}
        <RevealItem>
          <h2 className="text-4xl md:text-7xl font-outfit font-black text-foreground mb-6">
            {t("title")} <span className="text-gradient drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">{t("titleAccent")}</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </RevealItem>
        
        {/* Main CTA & Trust Signals */}
        <RevealItem className="space-y-8">
          <div className="flex flex-col items-center gap-6">
            <MagneticButton className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
              <button 
                className="relative px-12 py-5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl font-black text-xl shadow-[0_10px_20px_rgba(139,92,246,0.2)] hover:shadow-[0_15px_30px_rgba(139,92,246,0.4)] transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] flex items-center gap-3"
                onClick={() => window.location.href = `mailto:${personalInfo.email}`}
              >
                <Mail className="w-6 h-6 group-hover:animate-bounce" />
                {t("cta")}
              </button>
            </MagneticButton>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-4">
              {trustSignals.map((signal, i) => (
                <div key={i} className="flex items-center gap-2 group">
                  <signal.icon className={`w-4 h-4 ${signal.color} animate-pulse`} />
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-muted group-hover:text-foreground transition-colors">
                    {signal.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealItem>

        <div className="h-[1px] w-1/4 mx-auto bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Secondary Links */}
        <RevealItem className="flex flex-wrap justify-center gap-4">
          {[
            { icon: GithubIcon, label: t("github"), href: personalInfo.github },
            { icon: LinkedInIcon, label: t("linkedin"), href: personalInfo.linkedin },
          ].map(link => (
            <MagneticButton key={link.label}>
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-sm font-bold text-muted hover:text-foreground group"
              >
                <link.icon className="w-4 h-4 group-hover:rotate-[360deg] transition-transform duration-500" />
                {link.label}
              </a>
            </MagneticButton>
          ))}
        </RevealItem>

        <RevealItem className="pt-8 opacity-40">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-green-500">{tTrust("availability")}</span>
          </div>
          <p className="text-muted text-[10px] tracking-[0.5em] uppercase font-bold">
            © {new Date().getFullYear()} Nguyen Ba Hoai Nam. {t("rights")}
          </p>
        </RevealItem>
      </div>
    </SectionLayout>
  );
};
