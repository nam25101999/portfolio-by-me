"use client";

import { useTranslations } from "next-intl";
import { personalInfo, experience, education, skillsGroups, projects } from "@/lib/data";
import { Mail, Github, Linkedin, Globe, FileDown, ArrowLeft, Loader2, Briefcase, GraduationCap, Code, Star, ExternalLink, Activity, Phone, MessageSquare } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useRef, useState } from "react";

export default function CVPage() {
  const t = useTranslations();
  const tCV = useTranslations("CV");
  const tHero = useTranslations("Hero");

  const [isExporting, setIsExporting] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!cvRef.current) return;
    setIsExporting(true);

    const element = cvRef.current;

    try {
      const exportWidth = 794;
      const exportHeight = 1123;

      // Ensure fonts are fully loaded before capture
      await document.fonts.ready;
      await new Promise((resolve) => setTimeout(resolve, 500));

      const { toPng } = await import('html-to-image');
      const { jsPDF } = await import('jspdf');

      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: '#020617',
        cacheBust: true,
        width: exportWidth,
        height: exportHeight,
        canvasWidth: exportWidth * 3,
        canvasHeight: exportHeight * 3,
        skipAutoScale: true,
        style: {
          width: `${exportWidth}px`,
          height: `${exportHeight}px`,
          margin: "0",
          fontFamily: "'Outfit', 'Inter', sans-serif", // Force explicit fonts for SVG converter
        },
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
      pdf.save(`${personalInfo.name.replace(/\s+/g, '_')}_CV_Professional.pdf`);
    } catch (error) {
      console.error('PDF Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-inter selection:bg-indigo-500/30">
      {/* Action Buttons - Hidden on Print */}
      <div className="fixed top-8 left-8 right-8 z-50 flex justify-between items-center print:hidden">
        <Link 
          href="/" 
          className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full transition-all font-bold text-sm backdrop-blur-md"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {tCV("back")}
        </Link>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="relative group flex items-center gap-2 px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all font-bold text-sm overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FileDown size={16} />}
          {tCV("print")}
        </button>
      </div>

      {/* Main CV Container */}
      <div
        ref={cvRef}
        className={`cv-export-container mx-auto relative ${isExporting ? "cv-exporting" : "max-w-[210mm] min-h-[297mm] shadow-2xl my-24 border border-white/5 rounded-3xl overflow-hidden"}`}
      >
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[#020617] -z-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] -z-10" />

        <div className="cv-sheet-grid grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-[297mm]">
          
          {/* LEFT COLUMN: Profile and Minimal Info */}
          <aside className="bg-white/[0.01] border-r border-white/5 p-6 flex flex-col gap-8">
            
            {/* Profile Info - Condensed, No AVT */}
            <div className="space-y-4">
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-black text-white tracking-tight mb-1">{personalInfo.name}</h1>
                <p className="text-indigo-400 font-bold text-[9px] uppercase tracking-[0.25em] leading-tight">
                    Fullstack Developer<br/>AI Integration
                </p>
              </div>
            </div>

            {/* Contact Information - Added Phone/Zalo */}
            <div className="space-y-4">
              <h3 className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 flex items-center gap-2">
                <Activity size={9} className="text-indigo-500" /> CONTACT_INFO
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: (personalInfo as any).email, href: `mailto:${(personalInfo as any).email}` },
                  { icon: Phone, label: (personalInfo as any).phone, href: `tel:${(personalInfo as any).phone}` },
                  { icon: MessageSquare, label: `Zalo: ${(personalInfo as any).zalo}`, href: `https://zalo.me/${(personalInfo as any).zalo}` },
                  { icon: Globe, label: "portfolio-by-me.vercel", href: (personalInfo as any).website },
                  { icon: Github, label: "nam25101999", href: personalInfo.github },
                  { icon: Linkedin, label: "Hoai Nam Nguyen", href: personalInfo.linkedin },
                ].map((item, i) => (
                  <a key={i} href={item.href} target="_blank" className="flex items-center gap-2.5 group">
                    <div className="p-1.5 rounded bg-white/5 border border-white/5 group-hover:bg-indigo-500/20 transition-all">
                      <item.icon size={11} className="text-slate-400 group-hover:text-indigo-400" />
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 group-hover:text-white transition-colors truncate">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Technical Skills Overview */}
            <div className="space-y-8">
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 flex items-center gap-2">
                <Code size={10} className="text-indigo-500" /> CORE_STACK
              </h3>
              <div className="space-y-6">
                {skillsGroups.map((group, idx) => (
                  <div key={idx} className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                       {t(`Skills.${group.category.toLowerCase().split(' ')[0]}`)}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map(skill => (
                        <span 
                          key={skill.name} 
                          className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[9px] font-bold text-slate-300 whitespace-nowrap inline-block"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Professional Content */}
          <main className="p-10 md:p-12 flex flex-col gap-10">
            
            {/* Professional Summary */}
            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/30 to-transparent" />
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-indigo-400 opacity-60">PROFESSIONAL_SUMMARY</span>
              </div>
              <p className="text-[13px] text-slate-400 leading-relaxed font-medium">
                {tHero("bio")}
              </p>
            </section>

            {/* Work Experience */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Briefcase size={14} className="text-indigo-500" />
                <h2 className="text-sm font-black text-white uppercase tracking-widest">{tCV("experience")}</h2>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-3 top-0 bottom-0 w-px bg-indigo-500/10 group-hover:bg-indigo-500/40 transition-colors" />
                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <h3 className="text-[14px] font-bold text-white group-hover:text-indigo-400 transition-colors">{t(`Experience.items.${idx}.company`)}</h3>
                        <p className="text-[10px] font-black text-indigo-500/80 uppercase tracking-widest mt-0.5">{t(`Experience.items.${idx}.role`)}</p>
                      </div>
                      <span className="text-[9px] font-black text-slate-500 bg-white/5 px-2 py-0.5 rounded uppercase tracking-tighter">{exp.period}</span>
                    </div>
                    <p className="text-[12px] text-slate-400 leading-relaxed italic opacity-90">
                      {t(`Experience.items.${idx}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured AI Projects */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Star size={14} className="text-indigo-500" />
                <h2 className="text-sm font-black text-white uppercase tracking-widest">SELECTED_PROJECTS</h2>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {projects.slice(0, 3).map((proj, idx) => (
                  <div key={idx} className="glass p-5 rounded-xl border border-white/5 hover:border-indigo-500/20 transition-all group relative">
                    <div className="grid grid-cols-[1fr_auto] gap-4 items-start mb-2">
                      <h3 className="text-[13px] font-black text-white tracking-tight leading-tight">{t(`Projects.items.${idx}.title`)}</h3>
                      <span className="text-[7px] font-black px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/10 uppercase tracking-widest whitespace-nowrap">{proj.tag}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2 leading-relaxed line-clamp-2">
                      {t(`Projects.items.${idx}.description`)}
                    </p>
                    <div className="flex flex-wrap gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      {proj.tech.slice(0, 4).map(t => (
                        <span key={t} className="text-[7px] font-mono text-slate-500">#{t.replace(/\s+/g, '')}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap size={14} className="text-indigo-500" />
                <h2 className="text-sm font-black text-white uppercase tracking-widest">{tCV("education")}</h2>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <div className="grid grid-cols-[1fr_auto] gap-4 items-baseline mb-1">
                      <h3 className="text-[13px] font-bold text-white leading-tight">{t(`Education.items.${idx}.school`)}</h3>
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap self-start">{edu.period}</span>
                    </div>
                    <p className="text-[11px] font-bold text-indigo-500/80 mb-1 leading-tight">{t(`Education.items.${idx}.degree`)}</p>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                      {t(`Education.items.${idx}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>

        {/* HUD Decoration Footer */}
        <footer className="absolute bottom-6 left-12 right-12 flex justify-between items-center opacity-20 pointer-events-none">
           <span className="text-[7px] font-black uppercase tracking-[0.4em]">SYSTEM_VERSION_4.0.2</span>
           <div className="flex gap-2">
              <div className="w-1 h-1 rounded-full bg-indigo-500" />
              <div className="w-1 h-1 rounded-full bg-indigo-500" />
              <div className="w-1 h-1 rounded-full bg-indigo-500" />
           </div>
           <span className="text-[7px] font-black uppercase tracking-[0.4em]">© NGUYEN_BA_HOAI_NAM</span>
        </footer>
      </div>

      <style jsx global>{`
        .cv-export-container.cv-exporting {
          width: 794px !important;
          min-width: 794px !important;
          max-width: 794px !important;
          height: 1123px !important;
          min-height: 1123px !important;
          padding: 0 !important;
          margin: 0 !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
          border-radius: 0 !important;
          border: none !important;
        }

        .cv-export-container.cv-exporting aside {
          width: 240px !important;
          padding-top: 32px !important;
          padding-bottom: 32px !important;
          padding-left: 20px !important;
          padding-right: 20px !important;
        }

        .cv-export-container.cv-exporting main {
          min-width: 0 !important;
          padding-top: 40px !important;
          padding-bottom: 40px !important;
          padding-left: 32px !important;
          padding-right: 32px !important;
          gap: 28px !important;
        }

        .cv-export-container.cv-exporting h1 {
          font-size: 30px !important;
          line-height: 1.05 !important;
        }

        .cv-export-container.cv-exporting h2 {
          font-size: 16px !important;
        }

        .cv-export-container.cv-exporting p,
        .cv-export-container.cv-exporting span,
        .cv-export-container.cv-exporting a {
          overflow-wrap: anywhere !important;
          word-break: break-word !important;
        }

        .cv-export-container.cv-exporting section {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }

        .cv-export-container.cv-exporting footer {
          left: 32px !important;
          right: 32px !important;
          bottom: 20px !important;
        }
      `}</style>
    </div>
  );
}
