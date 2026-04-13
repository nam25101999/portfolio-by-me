"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";

export const LocaleSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "vi" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 px-3 py-1.5 glass rounded-full hover:neon-glow transition-all duration-300 group"
      title={locale === "en" ? "Switch to Vietnamese" : "Chuyển sang Tiếng Anh"}
    >
      <Languages size={14} className="text-primary group-hover:rotate-12 transition-transform" />
      <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300 group-hover:text-white">
        {locale}
      </span>
      <div className="flex flex-col gap-0.5 ml-1">
        <div className={`w-1 h-1 rounded-full ${locale === 'en' ? 'bg-primary shadow-[0_0_5px_rgba(59,130,246,1)]' : 'bg-white/20'}`} />
        <div className={`w-1 h-1 rounded-full ${locale === 'vi' ? 'bg-accent shadow-[0_0_5px_rgba(34,211,238,1)]' : 'bg-white/20'}`} />
      </div>
    </button>
  );
};
