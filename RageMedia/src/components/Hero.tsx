import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Patch, GlowingText, RageLogo } from "./Patch";

export function Hero() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase < 2) setPhase(phase + 1);
    }, 2000);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-rage-black">
      {/* Background Animated Geometric Patterns */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-rage-lime" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Pulsing Hexagons */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <svg width="800" height="800" viewBox="0 0 800 800" fill="none" className="text-rage-pink">
            <path d="M400 100L659.808 250V550L400 700L140.192 550V250L400 100Z" stroke="currentColor" strokeWidth="1" />
            <path d="M400 200L573.205 300V500L400 600L226.795 500V300L400 200Z" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="p0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            className="text-center z-10"
          >
            <h1 className="text-8xl md:text-[12vw] font-display font-black leading-none tracking-tighter uppercase italic">
              <span className="block text-rage-lime glitch-animation">РЕКЛАМНОЕ</span>
              <span className="block text-rage-pink text-shadow-neon-pink">АГЕНТСТВО</span>
            </h1>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            key="p1"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100, filter: "brightness(2)" }}
            className="z-10 px-6 max-w-4xl text-center"
          >
            <Patch color="lime" className="inline-block mb-8">
              <span className="font-pixel text-xl uppercase tracking-widest">Перехват системы: АКТИВЕН</span>
            </Patch>
            <h2 className="text-6xl md:text-8xl font-display font-bold leading-tight">
              МЫ НЕ ДЕЛАЕМ <span className="italic underline decoration-rage-pink">РЕКЛАМУ</span>. МЫ ДЕЛАЕМ <GlowingText color="pink">ЯРОСТЬ</GlowingText>.
            </h2>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="p2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="z-10 flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="mb-16"
            >
              <RageLogo size="lg" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              <button className="px-8 py-4 bg-rage-lime text-rage-black font-display font-bold uppercase tracking-wider clip-patch hover:scale-110 transition-transform">
                Кейсы
              </button>
              <a href="#bloggers" className="px-8 py-4 border border-rage-pink text-rage-pink font-display font-bold uppercase tracking-wider clip-patch hover:bg-rage-pink hover:text-white transition-all inline-block">
                 Блогеры
               </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Grain/Noise Overlay */}
      <div className="fixed inset-0 bg-noise opacity-[0.02] pointer-events-none z-[100]" />
    </div>
  );
}
