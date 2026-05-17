import { motion } from "motion/react";
import { Patch, GlowingText } from "./Patch";
import { Send, Mail, Phone } from "lucide-react";
import React, { useState } from "react";

export function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("success"), 2000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-rage-black/80 backdrop-blur-sm overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 400 800" fill="none">
          <path d="M0 0 L400 200 V600 L0 800" stroke="#ff007f" strokeWidth="2" strokeDasharray="10 10" />
          <path d="M50 50 L350 250 V550 L50 750" stroke="#a3ff00" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-8xl font-display font-black uppercase italic leading-none mb-8">
            СШЕЙ <br />
            <GlowingText color="pink">ЭТОТ МИР</GlowingText>
          </h2>
          
          <div className="space-y-8 mb-12">
            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-rage-grey clip-patch group-hover:bg-rage-pink group-hover:text-white transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-pixel opacity-50 uppercase mb-1">Запросы</p>
                <p className="text-2xl font-display font-bold">hello@ragemedia.ai</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group">
              <div className="p-4 bg-rage-grey clip-patch group-hover:bg-white group-hover:text-black transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs font-pixel opacity-50 uppercase mb-1">Экстренная линия</p>
                <p className="text-2xl font-display font-bold">8 800 555 35 35</p>
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            <motion.a
              href="#"
              whileHover={{ y: -5, rotate: 5 }}
              className="w-16 h-16 bg-rage-grey flex items-center justify-center clip-patch hover:bg-rage-pink transition-colors"
            >
              <Send size={24} />
              <span className="sr-only">Telegram</span>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -5, rotate: 5 }}
              className="w-16 h-16 bg-rage-grey flex items-center justify-center clip-patch hover:bg-rage-lime transition-colors"
            >
              <Send size={24} />
              <span className="sr-only">ВКонтакте</span>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Patch color="black" className="p-8 md:p-12 h-full border-2 border-rage-pink shadow-[20px_20px_0px_rgba(255,0,127,0.1)]">
            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-24 h-24 bg-rage-lime text-rage-black flex items-center justify-center clip-patch mb-8 glitch-animation">
                  <Send size={40} />
                </div>
                <h3 className="text-4xl font-display font-black uppercase mb-4">СООБЩЕНИЕ ПРИНЯТО</h3>
                <p className="text-xl font-display opacity-70">Система анализирует ваш запрос. Ожидайте выхода на связь в течение 24 часов.</p>
                <button 
                  onClick={() => setFormState("idle")}
                  className="mt-12 text-rage-pink font-pixel text-sm uppercase tracking-widest hover:underline"
                >
                  ОТПРАВИТЬ ЕЩЕ ОДИН СИГНАЛ?
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-pixel text-rage-pink uppercase tracking-widest">Представьтесь</label>
                  <input 
                    required
                    type="text" 
                    placeholder="ИМЯ / ПСЕВДОНИМ"
                    className="w-full bg-rage-grey border-b-2 border-transparent focus:border-rage-pink p-4 font-display text-lg outline-none transition-all clip-patch"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-pixel text-rage-lime uppercase tracking-widest">Канал связи</label>
                  <input 
                    required
                    type="email" 
                    placeholder="EMAIL_АДРЕС"
                    className="w-full bg-rage-grey border-b-2 border-transparent focus:border-rage-lime p-4 font-display text-lg outline-none transition-all clip-patch"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-pixel opacity-50 uppercase tracking-widest">Миссия</label>
                  <textarea 
                    required
                    rows={4} 
                    placeholder="ОПИШИТЕ ВАШ БУНТ..."
                    className="w-full bg-rage-grey border-b-2 border-transparent focus:border-white p-4 font-display text-lg outline-none transition-all clip-patch"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full py-6 bg-rage-pink text-white font-display font-black text-2xl uppercase italic clip-patch hover:brightness-125 transition-all flex items-center justify-center gap-4 group disabled:opacity-50"
                >
                  <span>{formState === "sending" ? "ЗАГРУЗКА..." : "ПЕРЕДАТЬ"}</span>
                  <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>
              </form>
            )}
          </Patch>
        </motion.div>
      </div>

      <footer className="mt-24 pt-12 border-t border-rage-grey max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-pixel opacity-40 uppercase tracking-widest">
        <p>© 2099 RAGE MEDIA ADVERTISING. ВСЕ СИСТЕМЫ В НОРМЕ.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-rage-pink">Политика конфиденциальности</a>
          <a href="#" className="hover:text-rage-lime">Условия использования</a>
          <a href="#" className="hover:text-white">Куки</a>
        </div>
        <p>РОЖДЕНО_В_ПУСТОТЕ.AI</p>
      </footer>
    </section>
  );
}
