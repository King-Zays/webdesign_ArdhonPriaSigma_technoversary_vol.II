"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Smartphone } from "lucide-react";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallBanner() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      if (typeof window !== "undefined" && sessionStorage.getItem("boni-dismiss-pwa")) {
        return;
      }
      const timer = setTimeout(() => setShow(true), 30_000);
      return () => clearTimeout(timer);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (!show) {
      setExpanded(false);
      return;
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setExpanded(true);
      return;
    }
    const timer = setTimeout(() => setExpanded(true), 650);
    return () => clearTimeout(timer);
  }, [show]);

  const handleInstall = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === "accepted") {
      toast.success("BONI installed");
    }
    setShow(false);
    setPrompt(null);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 24, stiffness: 280 }}
          className="pointer-events-none fixed bottom-4 left-4 right-4 z-[9999] flex justify-center"
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className={`pointer-events-auto flex items-center overflow-hidden rounded-2xl border border-[#A8D5BA] bg-white shadow-2xl ${
              expanded ? "w-full max-w-sm gap-3 px-4 py-3.5" : "gap-0 p-2"
            }`}
          >
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="pwa-info"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden"
                >
                  <Smartphone size={24} className="shrink-0 text-[#2D5F3F]" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#1A1A1A]">Install BONI</p>
                    <p className="text-xs text-gray-500">Faster access and camera capture on your phone</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              layout="position"
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={handleInstall}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#2D5F3F] px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-[#245033]"
            >
              <Download size={12} /> Install
            </motion.button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.button
                  key="pwa-close"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    setShow(false);
                    if (typeof window !== "undefined") sessionStorage.setItem("boni-dismiss-pwa", "1");
                  }}
                  aria-label="Tutup notifikasi instalasi"
                  className="shrink-0 overflow-hidden rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
