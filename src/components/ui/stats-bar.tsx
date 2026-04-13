"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Rocket, Briefcase, CheckCircle2, Zap } from "lucide-react";

export const StatsBar = () => {
  const t = useTranslations("Trust");

  const trustSignals = [
    { key: "projects", icon: Rocket, color: "text-primary" },
    { key: "experience", icon: Briefcase, color: "text-accent" },
    { key: "availability", icon: CheckCircle2, color: "text-green-500" },
    { key: "fast", icon: Zap, color: "text-yellow-500" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-12">
      {trustSignals.map((signal, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center justify-center space-y-3 p-6 glass rounded-2xl group hover:border-primary/30 transition-all duration-500"
        >
          <div className={`p-3 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors`}>
            <signal.icon className={`w-6 h-6 ${signal.color}`} />
          </div>
          <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.1em] text-foreground text-center leading-tight">
            {t(signal.key)}
          </p>
          <div className="h-[1px] w-8 bg-white/10 group-hover:w-16 transition-all duration-500" />
        </motion.div>
      ))}
    </div>
  );
};
