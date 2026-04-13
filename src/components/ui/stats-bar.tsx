"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      <span>{suffix}</span>
    </span>
  );
};

export const StatsBar = () => {
  const t = useTranslations("Stats");

  const stats = [
    { key: "projects", value: 5, suffix: "+" },
    { key: "technologies", value: 12, suffix: "+" },
    { key: "learning", value: 85, suffix: "%" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center justify-center space-y-2 p-6 glass rounded-2xl group hover:neon-glow transition-all duration-300"
        >
          <div className="text-4xl md:text-5xl font-outfit font-black text-gradient">
            <Counter value={stat.value} suffix={stat.suffix} />
          </div>
          <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-[10px] text-center">
            {t(stat.key)}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
