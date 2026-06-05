import { Star } from "lucide-react";
import { motion } from "framer-motion";

import iconImg3 from "../assets/icon_do_Duo_player_2.png";
import iconImg1 from "../assets/1751653938877.png";
import bannerImg1 from "../assets/banner_do_murilo_the_best_com_camera_raw.png";
import bannerImg2 from "../assets/177_Sem_Titulo_20251026134328.png";
import thumbImg1 from "../assets/143_Sem_Titulo_20251006113653.png";
import thumbImg5 from "../assets/70_Sem_Titulo_20250912190727.png";
import endImg2 from "../assets/307_Sem_Titulo_20251224124119.png";

const DISCORD_LINK = "https://discord.gg/J7bufuWvh";

interface Review {
  id: string;
  name: string;
  product: string;
  productImg: string;
  stars: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: "r1",
    name: "MuriloTMJBR",
    product: "Banner",
    productImg: bannerImg1,
    stars: 5,
    comment: "Ficou incrível! Melhor banner que já tive no meu canal. A CraftGirl caprichou demais, entregou antes do prazo e ainda ajustou detalhe que pedi. Recomendo 100%!",
    date: "Maio 2026",
  },
  {
    id: "r2",
    name: "Zard",
    product: "Banner",
    productImg: bannerImg2,
    stars: 5,
    comment: "Cara, que arte absurda! Ficou muito melhor do que eu esperava. Já recebi vários elogios no canal por causa desse banner. Nota 10!",
    date: "Abril 2026",
  },
  {
    id: "r3",
    name: "DuoPlayer",
    product: "Icon",
    productImg: iconImg3,
    stars: 5,
    comment: "Icon perfeito! Ficou com a minha cara, muito detalhado. Atendimento rápido e super atencioso. Já indiquei pra vários amigos!",
    date: "Março 2026",
  },
  {
    id: "r4",
    name: "Pedro_MC",
    product: "Icon",
    productImg: iconImg1,
    stars: 5,
    comment: "Serviço impecável! Fiz meu icon aqui e ficou profissional demais. Preço justo pra qualidade entregue. Vale muito a pena!",
    date: "Março 2026",
  },
  {
    id: "r5",
    name: "CalinoGamer",
    product: "Thumbnail",
    productImg: thumbImg1,
    stars: 5,
    comment: "Minhas views aumentaram depois que comecei a usar as thumbnails da Craft Shop. Design chamativo, entrega rápida. Simplesmente incrível!",
    date: "Fevereiro 2026",
  },
  {
    id: "r6",
    name: "HivePlayer",
    product: "Thumbnail",
    productImg: thumbImg5,
    stars: 5,
    comment: "Excelente trabalho! Thumbnail ficou perfeita pro estilo do meu canal. Processo foi fácil, só entrei no Discord e já estava sendo atendido!",
    date: "Janeiro 2026",
  },
  {
    id: "r7",
    name: "LazzyBR",
    product: "Tela Final",
    productImg: endImg2,
    stars: 5,
    comment: "Tela final ficou linda! Minhas lives ficaram com cara de canal profissional. Super recomendo a Craft Shop, qualidade e preço ótimos!",
    date: "Dezembro 2025",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "fill-yellow-400 text-yellow-400" : "text-white/10"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="bg-[#0f140f] border border-primary/20 hover:border-primary/50 transition-all duration-300 p-6 flex flex-col gap-4"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 shrink-0 overflow-hidden border border-primary/30">
          <img src={review.productImg} alt={review.product} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-mono font-bold text-white">{review.name}</span>
            <span className="text-xs text-muted-foreground font-mono">{review.date}</span>
          </div>
          <span className="text-xs text-primary font-mono border border-primary/30 bg-primary/10 px-2 py-0.5 inline-block mt-1">
            {review.product}
          </span>
          <div className="mt-2">
            <Stars count={review.stars} />
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
    </motion.div>
  );
}

const avg = (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1);

export default function ReviewsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-mono text-primary text-glow mb-4">AVALIAÇÕES</h1>
        <p className="text-xl text-muted-foreground">O que nossos clientes estão dizendo sobre a Craft Shop®.</p>
      </div>

      {/* Summary bar */}
      <div className="bg-[#0f140f] border border-primary/20 p-6 mb-10 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-center">
          <div className="text-6xl font-mono font-bold text-primary text-glow">{avg}</div>
          <div className="flex justify-center mt-2"><Stars count={5} /></div>
          <div className="text-xs text-muted-foreground font-mono mt-1">{reviews.length} avaliações</div>
        </div>
        <div className="h-px sm:h-16 sm:w-px bg-primary/20 w-full sm:w-auto" />
        <div className="flex-1 flex flex-col gap-2 w-full">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.stars === star).length;
            const pct = Math.round((count / reviews.length) * 100);
            return (
              <div key={star} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-mono w-4">{star}</span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground font-mono w-6">{count}</span>
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <a
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-black font-mono font-bold px-6 py-3 hover:bg-primary/90 transition-colors text-sm"
          >
            Deixar Avaliação
          </a>
          <p className="text-xs text-muted-foreground mt-2">Via Discord</p>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, i) => (
          <ReviewCard key={review.id} review={review} index={i} />
        ))}
      </div>

      <p className="mt-8 text-center text-muted-foreground text-sm font-mono">
        Quer deixar sua avaliação? Entre no nosso Discord!
      </p>
    </div>
  );
}
