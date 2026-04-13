"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { MagneticButton } from "../ui/magnetic-button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export const Hero = ({ onContactClick }: { onContactClick?: () => void }) => {
  const t = useTranslations("Hero");
  const [roleText, setRoleText] = useState("");
  const fullRole = t("role");

  useEffect(() => {
    let current = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullRole.length) {
        current += fullRole[i];
        setRoleText(current);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [fullRole]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-28 pb-10 px-6 overflow-hidden">
      {/* Status Badges */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-3 mb-8"
      >
        <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black tracking-widest uppercase text-green-500">{t("openToWork")}</span>
        </div>
        <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center gap-2">
          <span className="text-[10px] font-black tracking-widest uppercase text-blue-400">⚡ AI Integrated</span>
        </div>
      </motion.div>

      {/* Parallax Avatar Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow" />
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full border-2 border-white/10 p-2 glass overflow-hidden">
          <Image
            src="/avatar.png"
            alt="Nguyen Ba Hoai Nam"
            width={256}
            height={256}
            sizes="(max-width: 768px) 192px, 256px"
            className="w-full h-full object-cover rounded-full"
            priority
          />
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="text-center space-y-6 max-w-4xl relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-primary font-bold tracking-[0.3em] uppercase text-xs md:text-sm"
        >
          {t("subtitle")}
        </motion.p>
        
        <motion.h1 
          className="text-4xl md:text-7xl font-outfit font-black tracking-tighter text-foreground leading-[1.1]"
        >
          {t("greeting")} <span className="text-gradient capitalize">Hoai Nam</span>
        </motion.h1>

        <div className="h-8 md:h-12">
          <p className="text-lg md:text-2xl font-medium text-muted">
            {roleText}<span className="animate-pulse text-primary font-bold">|</span>
          </p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-muted/80 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed font-medium"
        >
          {t("bio")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="flex flex-col sm:flex-row gap-4 pt-8 justify-center items-center"
        >
          <MagneticButton className="relative group w-full sm:w-auto">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500 pointer-events-none" />
            <button 
              onClick={onContactClick}
              className="relative w-full px-10 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-black rounded-2xl shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {t("hireMe")}
            </button>
          </MagneticButton>

          <div className="flex gap-4 w-full sm:w-auto">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-1 px-8 py-4 glass border border-white/10 text-foreground font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 text-sm whitespace-nowrap"
            >
              {t("viewProjects")}
            </button>
            <Link href="/cv" className="flex-1">
              <button className="w-full px-8 py-4 glass border border-white/10 text-foreground font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 text-sm flex items-center justify-center gap-2 whitespace-nowrap">
                <span>CV</span>
                <span className="opacity-50 text-[10px]">PDF</span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 rounded-full border-2 border-border/20 flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-primary" 
          />
        </div>
      </motion.div>
    </section>
  );
};
