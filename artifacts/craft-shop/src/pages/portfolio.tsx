import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import iconImg1 from "../assets/1751653938877.png";
import iconImg2 from "../assets/1751744805104.png";
import iconImg3 from "../assets/icon_do_Duo_player_2.png";
import iconImg4 from "../assets/7_Sem_Titulo_20250729155944.jpg";
import iconImg5 from "../assets/78_Sem_Titulo_20250915182209.png";
import bannerImg1 from "../assets/banner_do_murilo_the_best_com_camera_raw.png";
import bannerImg2 from "../assets/177_Sem_Titulo_20251026134328.png";
import bannerImg3 from "../assets/177_Sem_Titulo2_20251111205209.png";
import bannerImg4 from "../assets/322_Sem_Titulo_20260105183701.png";
import endImg1 from "../assets/tela_final_lazzy.png";
import endImg2 from "../assets/307_Sem_Titulo_20251224124119.png";
import endImg3 from "../assets/373_Sem_Titulo_20260220185004.png";
import thumbImg1 from "../assets/143_Sem_Titulo_20251006113653.png";
import thumbImg2 from "../assets/99_Sem_Titulo_20250924165055.png";
import thumbImg3 from "../assets/67_Sem_Titulo_20250906201037.png";
import thumbImg4 from "../assets/87_Sem_Titulo_20250919133559.png";
import thumbImg5 from "../assets/70_Sem_Titulo_20250912190727.png";

type Category = "Todos" | "Icons" | "Banners" | "Tela Final" | "Thumbnails";

interface Work {
  id: string;
  img: string;
  category: Exclude<Category, "Todos">;
  title: string;
  client: string;
  square?: boolean;
}

const works: Work[] = [
  { id: "w1", img: iconImg3, category: "Icons", title: "Duo Player", client: "Duo Player", square: true },
  { id: "w2", img: bannerImg1, category: "Banners", title: "Banner MuriloTMJBR", client: "MuriloTMJBR" },
  { id: "w3", img: thumbImg1, category: "Thumbnails", title: "One Piece no Mar", client: "Cliente" },
  { id: "w4", img: iconImg1, category: "Icons", title: "Pinguim Sombrio", client: "Cliente", square: true },
  { id: "w5", img: endImg2, category: "Tela Final", title: "Tela Final Verde", client: "Cliente" },
  { id: "w6", img: bannerImg2, category: "Banners", title: "Banner Zard", client: "Zard" },
  { id: "w7", img: thumbImg2, category: "Thumbnails", title: "Batalha Noturna", client: "Cliente" },
  { id: "w8", img: iconImg2, category: "Icons", title: "Steve Clássico", client: "Cliente", square: true },
  { id: "w9", img: endImg1, category: "Tela Final", title: "Tela Final Lazzy", client: "Lazzy" },
  { id: "w10", img: bannerImg3, category: "Banners", title: "Banner Calino", client: "Calino" },
  { id: "w11", img: thumbImg3, category: "Thumbnails", title: "Espaço Infinito", client: "Cliente" },
  { id: "w12", img: iconImg4, category: "Icons", title: "Máscara Fantasma", client: "Cliente", square: true },
  { id: "w13", img: endImg3, category: "Tela Final", title: "Tela Final Cinza", client: "Cliente" },
  { id: "w14", img: bannerImg4, category: "Banners", title: "Banner Pedro", client: "Pedro" },
  { id: "w15", img: thumbImg4, category: "Thumbnails", title: "Dia 1 vs Dia 100", client: "Cliente" },
  { id: "w16", img: iconImg5, category: "Icons", title: "Guerreira Verde", client: "Cliente", square: true },
  { id: "w17", img: thumbImg5, category: "Thumbnails", title: "Hive Live", client: "Cliente" },
];

const categories: Category[] = ["Todos", "Icons", "Banners", "Tela Final", "Thumbnails"];

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("Todos");
  const [lightbox, setLightbox] = useState<Work | null>(null);

  const filtered = active === "Todos" ? works : works.filter((w) => w.category === active);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-mono text-primary text-glow mb-4">PORTFÓLIO</h1>
        <p className="text-xl text-muted-foreground">Todos os trabalhos reais feitos pela Craft Shop®.</p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 font-mono text-sm border transition-all duration-200 ${
              active === cat
                ? "bg-primary text-black border-primary"
                : "bg-transparent text-muted-foreground border-primary/20 hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((work) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden border border-primary/20 hover:border-primary transition-all duration-300"
              onClick={() => setLightbox(work)}
            >
              <img
                src={work.img}
                alt={work.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <span className="font-mono text-primary text-sm font-bold">{work.title}</span>
                <span className="text-xs text-muted-foreground">{work.category}</span>
                <span className="text-xs border border-primary/40 text-primary/70 px-2 py-0.5 font-mono">VER</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-3xl max-h-[85vh] w-full flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.img}
                alt={lightbox.title}
                className="max-h-[75vh] w-auto object-contain border border-primary/30"
              />
              <div className="text-center">
                <p className="font-mono text-primary text-lg">{lightbox.title}</p>
                <p className="text-xs text-muted-foreground">{lightbox.category} · {lightbox.client}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
