import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Patch, GlowingText } from "./Patch";
import { X, ExternalLink } from "lucide-react";

const CASES = [
  {
    id: 1,
    title: "Majestic",
    client: "Majestic",
    color: "pink",
    image: "/Majestic.jpg",
    description: "Кампания для Majestic - лидера в своем сегменте развлекательного контента.",
    stats: ["+180% Вовлеченность", "8 млн охватов"]
  },
  {
    id: 2,
    title: "WarThunder",
    client: "WarThunder",
    color: "lime",
    image: "/WarThunder.jpg",
    description: "Стратегическое партнерство с WarThunder для расширения аудитории.",
    stats: ["+150% рост аудитории", "5 млн охватов"]
  },
  {
    id: 3,
    title: "ЗОНА 51",
    client: "Зона 51",
    color: "black",
    image: "/Zone51.jpg",
    description: "Работа с Зоной 51 - уникальный проект в жанре хоррор-развлечений.",
    stats: ["+200% Вовлеченность", "10 млн охватов"]
  },
  {
    id: 4,
    title: "ЯНДЕКС МАРКЕТ",
    client: "Яндекс Маркет",
    color: "grey",
    image: "/YandexMarket.png",
    description: "Кампания для Яндекс Маркет - одного из лидеров e-commerce рынка.",
    stats: ["+120% конверсия", "15 млн охватов"]
  }
];

export function Cases() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedCase = CASES.find(c => c.id === selectedId);

  return (
    <section id="cases" className="py-24 px-6 bg-rage-black/80 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-block px-4 py-1 bg-rage-lime text-rage-black font-pixel text-sm mb-4 clip-patch">
            АРХИВ v4.0
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-black uppercase italic leading-none">
            НАШИ <GlowingText color="pink">КЕЙСЫ</GlowingText>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CASES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedId(item.id)}
              className="cursor-pointer"
            >
              <div className="relative h-[400px] group">
                {/* Patch as background with clip-patch */}
                <Patch 
                  color={item.color as any} 
                  className="h-full absolute inset-0 clip-patch"
                  hoverable={false}
                >
                  <div />
                </Patch>
                
                {/* Background image - full size, clipped */}
                <div className="absolute inset-0 clip-patch overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover opacity-60" 
                  />
                </div>
                
                {/* Content at bottom - inside clip-patch */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-rage-black/80 p-4 border-l-4 border-rage-pink backdrop-blur-sm inline-block">
                    <p className="text-xs font-pixel opacity-70 mb-1">{item.client}</p>
                    <h3 className="text-2xl font-display font-black leading-tight mb-2 text-white">{item.title}</h3>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs uppercase font-bold text-rage-lime">ПОДРОБНЕЕ</span>
                      <ExternalLink size={14} className="text-rage-lime" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Detail Modal */}
      <AnimatePresence>
        {selectedId && selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 bg-rage-black/95 backdrop-blur-xl"
          >
            <motion.div
              layoutId={`case-${selectedId}`}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="w-full max-w-6xl h-full max-h-[800px] relative"
            >
              <Patch color="black" className="w-full h-full p-0 flex flex-col md:flex-row overflow-hidden border-2 border-rage-pink" hoverable={false}>
                {/* Close Button - moved lower */}
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-20 right-6 z-50 p-3 bg-rage-pink text-white clip-patch hover:rotate-90 transition-transform"
                >
                  <X size={28} />
                </button>

                <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
                  <img src={selectedCase.image} className="w-full h-full object-cover" alt={selectedCase.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-rage-black to-transparent" />
                  <div className="absolute bottom-8 left-8">
                     <Patch color="lime" className="inline-block py-2 px-4 italic mb-2">
                        <span className="font-pixel text-sm">{selectedCase.client}</span>
                      </Patch>
                      <h2 className="text-5xl md:text-7xl font-display font-black text-white italic drop-shadow-2xl">{selectedCase.title}</h2>
                  </div>
                </div>

                <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                  <div className="mb-8">
                    <h4 className="text-rage-lime font-pixel text-sm uppercase mb-4 tracking-widest">// О ПРОЕКТЕ</h4>
                    <p className="text-xl md:text-2xl font-display leading-relaxed opacity-90">
                      {selectedCase.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-12">
                    {selectedCase.stats.map((stat, i) => (
                      <div key={i}>
                        <Patch color="grey" className="p-4" hoverable={false}>
                          <p className="text-2xl font-display font-black text-rage-lime italic">{stat}</p>
                        </Patch>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-rage-pink font-pixel text-sm uppercase mb-4 tracking-widest">// НАШ ПОДХОД</h4>
                    <p className="text-lg font-display opacity-80">
                      Мы использовали самые свежие субкультурные тренды, чтобы вывести {selectedCase.client} на передний план цифровой дискуссии. Отказавшись от стандартов корпоративной эстетики, мы создали бренд, который дышит аутентичностью и бунтарством.
                    </p>
                    <button className="w-full py-4 bg-rage-pink text-white font-display font-black uppercase italic clip-patch text-xl mt-8 hover:brightness-125 transition-all">
                      ПОСМОТРЕТЬ ПРОЕКТ
                    </button>
                  </div>
                </div>
              </Patch>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
