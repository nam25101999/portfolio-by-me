"use client";

import { motion, Variants } from "framer-motion";

interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  staggerChildren?: number;
}

export const SectionLayout = ({ 
  children, 
  className = "", 
  id = "", 
  staggerChildren = 0.2 
}: SectionLayoutProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: 0.1,
      },
    },
  };


  return (
    <section id={id} className={`relative py-16 px-6 max-w-7xl mx-auto ${className}`}>
      {/* Central Neural Backbone Segment */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 pointer-events-none -z-10">
         <div className="w-[1px] h-full bg-border/20 relative">
            {/* Pulsing Data Spark */}
            <motion.div 
               animate={{ top: ["-10%", "110%"], opacity: [0, 1, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
               className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-primary to-transparent -left-[1.5px] blur-[1px]"
            />
            
            {/* Connection Pin Top */}
            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full border border-primary/40 bg-background z-10" />
            {/* Connection Pin Bottom */}
            <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full border border-primary/40 bg-background z-10" />
         </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export const RevealItem = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
  };

  return (
    <motion.div variants={itemVariants} className={`relative ${className}`}>
      {children}
    </motion.div>
  );
};
