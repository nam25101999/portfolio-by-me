"use client";

import { useState, useEffect, useRef } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillRadarProps {
  category: string;
  skills: Skill[];
  icon: LucideIcon;
  color: string;
  index: number;
}

const getSkillLevel = (level: number) => {
  if (level >= 85) return "Advanced";
  if (level >= 65) return "Intermediate";
  return "Learning";
};

export const SkillRadar = ({ category, skills, icon: Icon, color, index }: SkillRadarProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const glareBackground = useTransform(
    [mouseXSpring, mouseYSpring],
    ([x, y]: number[]) => `radial-gradient(circle at ${x * 100 + 50}% ${y * 100 + 50}%, rgba(255,255,255,0.1) 0%, transparent 80%)`
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!isMounted) return <div className="h-[350px]" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group h-[350px] w-full"
    >
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="absolute inset-0 glass rounded-2xl p-6 flex flex-col items-center justify-between border border-white/10 shadow-2xl transition-all duration-300 group-hover:neon-glow group-hover:border-white/20"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-primary group-hover:scale-110 group-hover:text-white transition-all duration-300">
                <Icon size={20} style={{ color }} />
            </div>
            <h3 className="text-sm md:text-md font-outfit font-black text-foreground uppercase tracking-widest text-center group-hover:text-primary transition-colors line-clamp-2">
                {category}
            </h3>
        </div>

        {/* Chart Container */}
        <div className="w-full h-[180px] relative px-2" style={{ minWidth: 0 }}>
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={skills}>
              <PolarGrid stroke="var(--border)" opacity={0.5} />
              <PolarAngleAxis 
                dataKey="name" 
                tick={{ fill: "var(--muted)", fontSize: 8, fontWeight: 700 }} 
              />
              <Radar
                name={category}
                dataKey="level"
                stroke={color}
                fill={color}
                fillOpacity={0.3}
                className="drop-shadow-[0_0_8px_var(--tw-shadow-color)]"
                style={{ "--tw-shadow-color": color } as any}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Level Labels */}
        <div className="flex justify-between items-center w-full px-2 pt-2 border-t border-border/10">
          {skills.slice(0, 3).map((s) => (
            <div key={s.name} className="flex flex-col items-center flex-1 min-w-0">
                <span className="text-[8px] text-muted font-bold uppercase tracking-tighter truncate w-full text-center">{s.name}</span>
                <span className={`text-[7px] font-black uppercase ${s.level >= 85 ? 'text-accent' : s.level >= 65 ? 'text-primary' : 'text-muted/60'}`}>
                    {getSkillLevel(s.level)}
                </span>
            </div>
          ))}
        </div>

        {/* Glare/Light Effect */}
        <motion.div
          style={{
            background: glareBackground,
          }}
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </motion.div>
  );
};

export const SkillRadarGrid = ({ groups }: { groups: any[] }) => {
  return (
    <div className="flex flex-col gap-8 items-center w-full">
      {/* Grid for desktop (Rows handled manually to center bottom row) */}
      <div className="hidden lg:flex flex-col gap-8 w-full">
        <div className="grid grid-cols-3 gap-8 w-full">
          {groups.slice(0, 3).map((group, idx) => (
            <SkillRadar 
              key={group.category} 
              category={group.category} 
              skills={group.skills}
              icon={group.icon}
              color={group.color}
              index={idx}
            />
          ))}
        </div>
        <div className="flex justify-center gap-8 w-full">
          {groups.slice(3, 5).map((group, idx) => (
            <div key={group.category} className="w-1/3 max-w-[400px]">
              <SkillRadar 
                category={group.category} 
                skills={group.skills}
                icon={group.icon}
                color={group.color}
                index={idx + 3}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Grid for Mobile/Tablet */}
      <div className="grid lg:hidden grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {groups.map((group, idx) => (
          <SkillRadar 
            key={`${group.category}-mob`} 
            category={group.category} 
            skills={group.skills}
            icon={group.icon}
            color={group.color}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
};
