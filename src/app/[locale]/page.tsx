"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/navbar";
import { BackgroundBlobs } from "@/components/ui/background-blobs";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/ui/stats-bar";
import { ContactModal } from "@/components/ui/contact-modal";

// Dynamic imports for improved performance
const AboutSection = dynamic(() => import("@/components/sections/sections").then(mod => mod.AboutSection));
const ServicesSection = dynamic(() => import("@/components/sections/sections").then(mod => mod.ServicesSection));
const SkillsSection = dynamic(() => import("@/components/sections/sections").then(mod => mod.SkillsSection));
const WhatImBuilding = dynamic(() => import("@/components/sections/sections").then(mod => mod.WhatImBuilding));
const ExperienceSection = dynamic(() => import("@/components/sections/sections").then(mod => mod.ExperienceSection));
const ProjectsSection = dynamic(() => import("@/components/sections/sections").then(mod => mod.ProjectsSection));
const ContactSection = dynamic(() => import("@/components/sections/sections").then(mod => mod.ContactSection));

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-dark">
      <CustomCursor />
      <BackgroundBlobs />
      <Navbar onContactClick={() => setIsModalOpen(true)} />
      
      <div className="relative z-10 pt-10">
        <Hero onContactClick={() => setIsModalOpen(true)} />
        
        <div className="max-w-7xl mx-auto px-6">
          <StatsBar />
        </div>

        <div className="space-y-16 pb-24">
          <AboutSection />
          <ServicesSection />
          <SkillsSection />
          <WhatImBuilding />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection onContactClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
