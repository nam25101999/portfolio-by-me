"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { MagneticButton } from "../ui/magnetic-button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export const Hero = () => {
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
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 px-6 overflow-hidden">
      {/* Parallax Avatar Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow" />
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-primary/30 p-2 glass overflow-hidden">
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
        {/* Floating Accent Blobs */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-accent/40 blur-xl" 
        />
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-secondary/40 blur-xl" 
        />
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
          className="text-5xl md:text-8xl font-outfit font-black tracking-tighter text-foreground"
        >
          {t("greeting")} <span className="text-gradient capitalize">Hoai Nam</span>
        </motion.h1>

        <div className="h-10 md:h-14">
          <p className="text-xl md:text-3xl font-medium text-muted">
            {roleText}<span className="animate-pulse text-primary font-bold">|</span>
          </p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-muted/80 max-w-xl mx-auto text-sm md:text-md leading-relaxed"
        >
          {t("bio")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="flex flex-col sm:flex-row gap-6 pt-8 justify-center items-center"
        >
          <MagneticButton className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView()}
              className="relative px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl hover:shadow-primary/40 transition-all duration-300"
            >
              {t("viewProjects")}
            </button>
          </MagneticButton>

          <Link href="/cv" className="block">
            <MagneticButton className="group">
              <div className="px-10 py-4 glass border border-white/10 text-foreground font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                <span>{t("downloadCv")}</span>
                <motion.span 
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ↓
                </motion.span>
              </div>
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-border/50 flex justify-center p-1">
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
