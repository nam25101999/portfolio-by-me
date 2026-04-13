"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mail, User, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { personalInfo } from "@/lib/data";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch(`https://formspree.io/f/mqakevjr`, { // Note: User should replace this with their own Formspree ID
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
        }, 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-morphism rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div>
                <h3 className="text-xl font-outfit font-black text-foreground">{t("form_title")}</h3>
                <p className="text-xs text-muted font-medium mt-1">{t("form_subtitle")}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center gap-4"
                >
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">{t("form_success")}</h4>
                  <p className="text-sm text-muted">I will get back to you as soon as possible!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1 flex items-center gap-2">
                        <User size={12} /> {t("form_name")}
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1 flex items-center gap-2">
                        <Mail size={12} /> {t("form_email")}
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground"
                      />
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-muted ml-1 flex items-center gap-2">
                        <MessageSquare size={12} /> {t("form_message")}
                      </label>
                      <textarea
                        required
                        name="message"
                        rows={4}
                        placeholder="Tell me about your project..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-foreground resize-none"
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                      <AlertCircle size={14} /> {t("form_error")}
                    </div>
                  )}

                  <button
                    disabled={status === "sending"}
                    type="submit"
                    className="w-full group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-black text-sm shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t("form_sending")}
                      </>
                    ) : (
                      <>
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        {t("form_send")}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
