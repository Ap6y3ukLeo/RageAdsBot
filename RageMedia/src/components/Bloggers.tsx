import { motion } from "motion/react";
import { Patch, GlowingText } from "./Patch";

const BLOGGERS = [
  {
    name: "Mud Flaps",
    handle: "@blogger1",
    image: "/MudFlups.jpg",
    specialty: "Развлекательный контент",
    stats: "1.5 млн подписчиков",
    color: "pink"
  },
  {
    name: "Магмуст",
    handle: "@blogger2",
    image: "/Magmust.jpg",
    specialty: "Гейминг",
    stats: "2.1 млн подписчиков",
    color: "lime"
  }
];

const SMALL_CLIENTS = [
  { name: "Блоггер 5", image: "", stats: "500к", color: "grey" },
  { name: "Блоггер 6", image: "", stats: "300к", color: "grey" },
  { name: "Блоггер 7", image: "", stats: "200к", color: "grey" },
  { name: "Блоггер 8", image: "", stats: "400к", color: "grey" },
  { name: "Блоггер 9", image: "", stats: "600к", color: "grey" }
];

export function Bloggers() {
  return (
    <section id="bloggers" className="py-24 px-6 bg-rage-black/80 backdrop-blur-sm overflow-hidden border-t border-rage-grey">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-6xl md:text-8xl font-display font-black uppercase italic leading-none mb-4">
              НАШИ <GlowingText color="lime">КЛИЕНТЫ</GlowingText>
            </h2>
          </div>
          <Patch color="grey" className="px-6 py-3 h-fit">
            <span className="font-pixel text-xs tracking-[0.2em]">ФИЛЬТР: ВСЕ_ТАЛАНТЫ</span>
          </Patch>
        </div>

        {/* First line - 2 large clients (pink and lime) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {BLOGGERS.map((blogger, idx) => (
            <motion.div
              key={blogger.name}
              initial={{ opacity: 0, scale: 0.9, rotate: idx === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
            >
              <Patch color={blogger.color as any} className="flex gap-8 p-10 h-full group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 bg-rage-grey mr-4">
                  {blogger.image && <img src={blogger.image} alt={blogger.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-4xl md:text-5xl font-display font-black uppercase mb-2">{blogger.name}</h3>
                  <p className="text-3xl font-display font-black italic">{blogger.stats}</p>
                </div>
              </Patch>
            </motion.div>
          ))}
        </div>

        {/* Second line - 2 more clients (lime and pink) with full card images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            className="h-[200px] relative clip-patch group cursor-pointer bg-rage-lime text-rage-black fabric-texture"
          >
            {/* Heavy stitching effect */}
            <div className="absolute inset-0 pointer-events-none p-1">
              <div className="w-full h-full border-[3px] border-dotted border-black/10 clip-patch opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute inset-0 clip-patch overflow-hidden">
              <img src="/Magmust.jpg" alt="Магмуст" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="absolute bottom-4 left-16 z-10">
              <h3 className="text-4xl md:text-5xl font-display font-black uppercase mb-2">Магмуст</h3>
              <p className="text-3xl font-display font-black italic">1.2 млн подписчиков</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            className="h-[200px] relative clip-patch group cursor-pointer bg-rage-pink text-white fabric-texture"
          >
            {/* Heavy stitching effect */}
            <div className="absolute inset-0 pointer-events-none p-1">
              <div className="w-full h-full border-[3px] border-dotted border-black/10 clip-patch opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute inset-0 clip-patch overflow-hidden">
              <img src="/MudFlups.jpg" alt="Mud Flaps" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="absolute bottom-4 left-16 z-10">
              <h3 className="text-4xl md:text-5xl font-display font-black uppercase mb-2">Mud Flaps</h3>
              <p className="text-3xl font-display font-black italic">900к подписчиков</p>
            </div>
          </motion.div>
        </div>

        {/* Third line - 5 small grey blocks with avatar */}
        <div className="grid grid-cols-5 gap-4">
          {SMALL_CLIENTS.map((client, idx) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Patch color="grey" className="p-4 h-24 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 mb-1 bg-rage-grey">
                  {client.image && <img src={client.image} alt={client.name} className="w-full h-full object-cover" />}
                </div>
                <span className="font-display font-black text-xs uppercase">{client.name}</span>
              </Patch>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
