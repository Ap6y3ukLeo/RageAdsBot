import { motion, useScroll, useSpring } from "motion/react";
import { Hero } from "./components/Hero";
import { Cases } from "./components/Cases";
import { Bloggers } from "./components/Bloggers";
import { Contact } from "./components/Contact";
import { Patch, RageLogo } from "./components/Patch";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-rage-black selection:bg-rage-lime selection:text-rage-black relative">
      
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-rage-black via-rage-grey to-rage-black opacity-50 pointer-events-none" />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-rage-pink z-[1000] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-6 left-6 z-[500] hidden md:flex items-center gap-6">
        <a href="#" className="hover:scale-110 transition-transform">
          <RageLogo size="sm" />
        </a>
        <div className="flex gap-8 px-6 py-2 bg-rage-black/90 border border-rage-pink/20 clip-patch backdrop-blur-sm">
          <div className="flex gap-6 font-pixel text-[10px] tracking-[0.2em] uppercase">
            <a href="#bloggers" className="hover:text-rage-lime transition-colors">ТАЛАНТЫ</a>
            <a href="#cases" className="hover:text-rage-pink transition-colors">КЕЙСЫ</a>
            <a href="#contact" className="hover:text-white transition-colors">СВЯЗЬ</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        <Hero />
        
        <div className="relative">
          {/* Transition Element */}
          <div className="h-24 bg-gradient-to-b from-rage-black to-transparent" />
          
          <Cases />
          
          <div className="py-24 flex justify-center">
            <Patch color="pink" className="w-full max-w-lg text-center py-4 rotate-1">
              <span className="font-pixel text-sm uppercase tracking-widest animate-pulse">Поиск новых сотрудничеств...</span>
            </Patch>
          </div>

          <Bloggers />
          
          <Contact />
        </div>
      </main>

      {/* Global Grainy Gradient Texture */}
      <div className="fixed inset-0 pointer-events-none z-[90] opacity-50 mix-blend-overlay">
        <div className="w-full h-full bg-noise" />
      </div>
      
      {/* Decorative Floating Patches (Parallax-ish) */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [-5, 5, -5]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="fixed top-1/4 -right-12 z-0 opacity-20 hidden lg:block"
      >
        <Patch color="pink" className="w-48 h-48" hoverable={false}>
          <div className="w-full h-full border-2 border-black/10 clip-patch" />
        </Patch>
      </motion.div>

      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [5, -5, 5]
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        className="fixed bottom-1/4 -left-12 z-0 opacity-20 hidden lg:block"
      >
        <Patch color="lime" className="w-64 h-64" hoverable={false}>
          <div className="w-full h-full border-2 border-black/10 clip-patch" />
        </Patch>
      </motion.div>
    </div>
  );
}
