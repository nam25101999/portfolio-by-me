"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { 
  Search, 
  User, 
  Code, 
  Briefcase, 
  Folder, 
  Mail, 
  Github, 
  Linkedin,
  FileText,
  Command as CommandIcon 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const t = useTranslations("CommandPalette");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Command Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 shadow-2xl shadow-black/50"
          >
            <Command className="flex flex-col h-full w-full">
              <div className="flex items-center border-b border-white/5 px-4">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Command.Input
                  placeholder={t("placeholder")}
                  className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  autoFocus
                />
                <div className="flex items-center gap-1 rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  <CommandIcon className="h-2.5 w-2.5" />
                  <span>K</span>
                </div>
              </div>

              <Command.List className="max-h-[350px] overflow-y-auto overflow-x-hidden p-2 no-scrollbar">
                <Command.Empty className="py-6 text-center text-sm">{t("empty")}</Command.Empty>
                
                <Command.Group heading={t("nav")} className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-muted/50">
                  <Item icon={User} label={t("about")} onSelect={() => runCommand(() => document.getElementById('about')?.scrollIntoView())} />
                  <Item icon={Code} label={t("skills")} onSelect={() => runCommand(() => document.getElementById('skills')?.scrollIntoView())} />
                  <Item icon={Briefcase} label={t("experience")} onSelect={() => runCommand(() => document.getElementById('experience')?.scrollIntoView())} />
                  <Item icon={Folder} label={t("projects")} onSelect={() => runCommand(() => document.getElementById('projects')?.scrollIntoView())} />
                  <Item icon={Mail} label={t("contact")} onSelect={() => runCommand(() => document.getElementById('contact')?.scrollIntoView())} />
                </Command.Group>

                <Command.Group heading={t("social")} className="mt-4 px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-muted/50">
                  <Item icon={Github} label="GitHub" onSelect={() => runCommand(() => window.open('https://github.com/nam25101999', '_blank'))} />
                  <Item icon={Linkedin} label="LinkedIn" onSelect={() => runCommand(() => window.open('https://linkedin.com/in/nguyen-ba-hoai-nam', '_blank'))} />
                </Command.Group>

                <Command.Group heading={t("actions")} className="mt-4 px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-muted/50">
                   <Item icon={FileText} label={t("resume")} onSelect={() => runCommand(() => router.push('/cv'))} />
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Item = ({ icon: Icon, label, onSelect }: { icon: any, label: string, onSelect: () => void }) => (
  <Command.Item
    onSelect={onSelect}
    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-sm text-foreground outline-none transition-colors hover:bg-white/5 aria-selected:bg-white/10 aria-selected:text-primary"
  >
    <Icon className="h-4 w-4" />
    <span className="flex-1">{label}</span>
  </Command.Item>
);
