"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { MagneticButton } from "./magnetic-button";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "../theme-toggle";

export const Navbar = ({ onContactClick }: { onContactClick?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navbar");

  const navLinks = [
    { name: t("about"), href: "#about" },
    { name: t("skills"), href: "#skills" },
    { name: t("experience"), href: "#experience" },
    { name: t("projects"), href: "#projects" },
    { name: t("contact"), href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-morphism rounded-2xl px-6 py-3">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <motion.a 
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-outfit font-black tracking-tighter text-foreground"
          >
            NAM<span className="text-primary italic">.</span>DEV
          </motion.a>
          
          <div className="hidden md:flex items-center gap-3">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-slate-300 hover:text-primary transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <MagneticButton className="px-5 py-2 glass rounded-xl text-sm font-bold text-foreground hover:neon-glow transition-all" onClick={onContactClick}>
            {t("hireMe")}
          </MagneticButton>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <LocaleSwitcher />
          <button onClick={() => setIsOpen(!isOpen)} className="text-foreground pt-1">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-24 left-6 right-6 glass-morphism rounded-2xl p-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-lg font-outfit font-bold text-foreground border-b border-border pb-2"
            >
              {link.name}
            </a>
          ))}
          <MagneticButton className="px-5 py-3 glass rounded-xl text-center font-bold text-foreground mt-2" onClick={() => { setIsOpen(false); onContactClick?.(); }}>
            {t("hireMe")}
          </MagneticButton>
        </motion.div>
      )}
    </nav>
  );
};
