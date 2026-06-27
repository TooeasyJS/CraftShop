import { useState, useEffect, useRef } from "react";
import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Image as ImageIcon, Layout, MonitorPlay, Youtube, Tag,
  ShoppingCart, Users, Menu, X, MessageSquare, ArrowRight,
  ShieldCheck, Zap, Volume2, VolumeX, Star, Gift, BookOpen,
  ShieldAlert, LogOut, GalleryHorizontalEnd,
} from "lucide-react";
import NotFound from "@/pages/not-found";
import PortfolioPage from "@/pages/portfolio";
import ReviewsPage from "@/pages/reviews";
import PromotionsPage from "@/pages/promotions";
import RulesPage from "@/pages/rules";
import ScammersPage from "@/pages/scammers";

import logoImg from "./assets/logo.png";
import craftShopLogo from "./assets/file_00000000fe4071f58a65018409e8f59b.png";

import iconImg1 from "./assets/1751653938877.png";
import iconImg3 from "./assets/icon_do_Duo_player_2.png";
import bannerImg1 from "./assets/banner_do_murilo_the_best_com_camera_raw.png";
import bannerImg2 from "./assets/177_Sem_Titulo_20251026134328.png";
import bannerImg3 from "./assets/177_Sem_Titulo2_20251111205209.png";
import bannerImg4 from "./assets/322_Sem_Titulo_20260105183701.png";
import endImg1 from "./assets/tela_final_lazzy.png";
import endImg2 from "./assets/307_Sem_Titulo_20251224124119.png";
import endImg3 from "./assets/373_Sem_Titulo_20260220185004.png";
import thumbImg1 from "./assets/143_Sem_Titulo_20251006113653.png";
import thumbImg2 from "./assets/99_Sem_Titulo_20250924165055.png";
import thumbImg3 from "./assets/67_Sem_Titulo_20250906201037.png";
import thumbImg4 from "./assets/87_Sem_Titulo_20250919133559.png";
import thumbImg5 from "./assets/70_Sem_Titulo_20250912190727.png";
import iconImg2 from "./assets/1751744805104.png";
import iconImg4 from "./assets/7_Sem_Titulo_20250729155944.jpg";
import iconImg5 from "./assets/78_Sem_Titulo_20250915182209.png";
import craftgirlImg from "./assets/team-craftgirl.png";
import soulfelpsImg from "./assets/team-soulfelps.png";
import azukiImg from "./assets/team-azuki.png";

const queryClient = new QueryClient();
const DISCORD_LINK = "https://discord.gg/J7bufuWvh";
const LAUNCH_DATE = new Date("2026-08-01T00:00:00-03:00");
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID as string | undefined;
const DISCORD_REDIRECT_URI = "https://ttooeasycraft-ui.github.io/CraftShop/";

// --- Types ---
interface Variant { id: string; name: string; img: string; colors: string[]; description: string; }
interface DiscordUser { id: string; username: string; avatar: string | null; global_name: string | null; }

const defaultColors = ["#22c55e", "#ef4444", "#3b82f6", "#a855f7", "#f97316"];

// --- Data ---
const iconVariants: Variant[] = [
  { id: "icon-1", name: "Pinguim Sombrio", img: iconImg1, colors: defaultColors, description: "Personagem com visual sombrio e chapéu — perfeito para perfis únicos." },
  { id: "icon-2", name: "Steve Clássico", img: iconImg2, colors: defaultColors, description: "Render clean do Steve em pose natural com fundo vibrante." },
  { id: "icon-3", name: "Duo Player", img: iconImg3, colors: defaultColors, description: "Ação total com fundo splash — ideal para canais competitivos." },
  { id: "icon-4", name: "Máscara Fantasma", img: iconImg4, colors: defaultColors, description: "Visual misterioso com máscara de esqueleto e iluminação dramática." },
  { id: "icon-5", name: "Guerreira Verde", img: iconImg5, colors: defaultColors, description: "Personagem feminina com visual suave e fundo verde neon." },
];
const bannerVariants: Variant[] = [
  { id: "ban-1", name: "Banner Murilo", img: bannerImg1, colors: defaultColors, description: "Arte épica em tons de azul com personagem e redes sociais." },
  { id: "ban-2", name: "Banner Zard", img: bannerImg2, colors: defaultColors, description: "Banner vermelho geométrico com correntes — estilo agressivo." },
  { id: "ban-3", name: "Banner Calino", img: bannerImg3, colors: defaultColors, description: "Fundo laranja com hexágonos e personagem 3D em destaque." },
  { id: "ban-4", name: "Banner Pedro", img: bannerImg4, colors: defaultColors, description: "Arte em variações de cores para teste — verde/roxo vibrante." },
];
const endscreenVariants: Variant[] = [
  { id: "end-1", name: "Tela Final Lazzy", img: endImg1, colors: defaultColors, description: "Personagem em azul com dois slots de vídeo recomendado." },
  { id: "end-2", name: "Tela Final Verde", img: endImg2, colors: defaultColors, description: "Fundo verde neon com personagem e hexágonos decorativos." },
  { id: "end-3", name: "Tela Final Cinza", img: endImg3, colors: defaultColors, description: "Visual sóbrio azul/cinza com personagem elegante." },
];
const thumbnailVariants: Variant[] = [
  { id: "thm-1", name: "One Piece no Mar", img: thumbImg1, colors: defaultColors, description: "Personagem em barco com cena de mar — épico e chamativo." },
  { id: "thm-2", name: "Batalha Noturna", img: thumbImg2, colors: defaultColors, description: "Cena de batalha noturna com criatura e guerreiro — impacto total." },
  { id: "thm-3", name: "Espaço Infinito", img: thumbImg3, colors: defaultColors, description: "Personagem entre planetas — thumbnail de exploração épica." },
  { id: "thm-4", name: "Dia 1 vs Dia 100", img: thumbImg4, colors: defaultColors, description: "Comparativo clássico — formato que explode de cliques." },
  { id: "thm-5", name: "Hive Live", img: thumbImg5, colors: defaultColors, description: "Thumbnail de live com personagem em ação e logo em destaque." },
];
const prices = [
  { name: "Icon", desc: "Foto de perfil personalizada em HD", price: "R$ 3,00", img: iconImg3, href: "/icons" },
  { name: "Banner", desc: "Arte épica para a capa do teu canal", price: "R$ 3,00", img: bannerImg1, href: "/banners" },
  { name: "Tela Final", desc: "Template de encerramento para YouTube", price: "R$ 4,00", img: endImg2, href: "/tela-final" },
  { name: "Thumbnail", desc: "Capa chamativa para explodir as tuas views", price: "R$ 5,00", img: thumbImg1, href: "/thumbnails" },
  { name: "Pacote 3 Thumbnails", desc: "3 thumbnails com desconto especial", price: "R$ 12,50", img: thumbImg3, href: "/thumbnails" },
  { name: "Pacote 3 Icons", desc: "3 icons com desconto especial", price: "R$ 9,00", img: iconImg1, href: "/icons" },
];
const team = [
  { name: "CraftGirl", role: "Dona", img: craftgirlImg },
  { name: "SoulFelps", role: "Sub-Dono", img: soulfelpsImg },
  { name: "AZUKI PIZZA", role: "Admin", img: azukiImg },
];

// --- Hooks ---
function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => { const id = setInterval(() => setTime(calc()), 1000); return () => clearInterval(id); }, []);
  return time;
}

function useCountUp(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const start = Date.now();
      const id = setInterval(() => {
        const pct = Math.min((Date.now() - start) / duration, 1);
        setVal(Math.floor(pct * target));
        if (pct === 1) clearInterval(id);
      }, 16);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

// --- Discord OAuth2 ---
async function fetchDiscordUser(token: string): Promise<DiscordUser | null> {
  try {
    const r = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!r.ok) return null;
    return await r.json();
  } catch { return null; }
}

function getDiscordAvatarUrl(user: DiscordUser) {
  if (!user.avatar) return `https://cdn.discordapp.com/embed/avatars/${parseInt(user.id) % 5}.png`;
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=64`;
}

function loginWithDiscord() {
  if (!DISCORD_CLIENT_ID) { alert("Login com Discord não configurado ainda. Em breve!"); return; }
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: "token",
    scope: "identify",
  });
  window.location.href = `https://discord.com/api/oauth2/authorize?${params}`;
}

// --- Under Construction ---
function UnderConstruction({ onEnter }: { onEnter: () => void }) {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const pads = (n: number) => String(n).padStart(2, "0");
  const blocks = [
    { label: "DIAS", val: pads(days) },
    { label: "HORAS", val: pads(hours) },
    { label: "MIN", val: pads(minutes) },
    { label: "SEG", val: pads(seconds) },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#050905]">
      <video
        ref={videoRef}
        src={`${import.meta.env.BASE_URL}billie-jean.mp4`}
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(34,197,94,0.04) 3px,rgba(34,197,94,0.04) 4px)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.08)_0%,_rgba(5,9,5,0.6)_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-8 max-w-3xl w-full">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="relative">
          <div className="absolute inset-0 blur-[60px] bg-[#22c55e]/40 rounded-full scale-150" />
          <img src={craftShopLogo} alt="Craft Shop" className="w-32 h-32 md:w-44 md:h-44 object-contain relative z-10 drop-shadow-[0_0_40px_rgba(34,197,94,0.8)]" />
        </motion.div>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 md:w-16 bg-[#22c55e]/50" />
            <span className="font-mono text-xs text-[#22c55e] tracking-[0.3em] uppercase">Em Construção</span>
            <div className="h-px w-8 md:w-16 bg-[#22c55e]/50" />
          </div>
          <h1 className="font-mono text-3xl md:text-5xl lg:text-6xl text-white leading-tight" style={{ textShadow: "0 0 30px rgba(34,197,94,0.5)" }}>
            CRAFT SHOP<span className="text-[#22c55e]">®</span>
          </h1>
          <p className="text-[#22c55e]/80 font-mono text-sm md:text-base tracking-widest">ALGO ÉPICO ESTÁ A CAMINHO</p>
        </motion.div>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-4 gap-3 md:gap-6 w-full max-w-lg">
          {blocks.map(({ label, val }) => (
            <div key={label} className="flex flex-col items-center bg-[#0a140a] border border-[#22c55e]/30 p-3 md:p-5 relative" style={{ boxShadow: "0 0 15px rgba(34,197,94,0.1),inset 0 0 20px rgba(34,197,94,0.03)" }}>
              <span className="font-mono text-3xl md:text-5xl font-bold text-[#22c55e]" style={{ textShadow: "0 0 20px rgba(34,197,94,0.8)" }}>{val}</span>
              <span className="font-mono text-[10px] text-[#22c55e]/50 tracking-widest mt-1">{label}</span>
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#22c55e]/60" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#22c55e]/60" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#22c55e]/60" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#22c55e]/60" />
            </div>
          ))}
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-[#a0a8a0] text-sm md:text-base max-w-md leading-relaxed">
          Estamos preparando algo incrível para o seu canal. Enquanto isso, entre no Discord para fazer seu pedido!
        </motion.p>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }} className="flex flex-col sm:flex-row gap-4 items-center flex-wrap justify-center">
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-12 px-8 bg-[#22c55e] text-black hover:bg-[#16a34a] font-mono font-bold text-sm rounded-none" style={{ boxShadow: "0 0 20px rgba(34,197,94,0.5)" }}>
              <MessageSquare className="w-4 h-4 mr-2" /> DISCORD
            </Button>
          </a>
          <Button
            onClick={loginWithDiscord}
            variant="outline"
            size="lg"
            className="h-12 px-8 border-[#5865F2]/50 text-[#7289da] hover:bg-[#5865F2]/10 hover:text-[#7289da] font-mono text-sm rounded-none bg-transparent"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.102 18.08.114 18.102.135 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            Login com Discord
          </Button>
          <Button onClick={onEnter} variant="outline" size="lg" className="h-12 px-8 border-[#22c55e]/40 text-[#22c55e]/70 hover:bg-[#22c55e]/10 hover:text-[#22c55e] font-mono text-sm rounded-none bg-transparent">
            Ver o Site →
          </Button>
        </motion.div>

        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} onClick={() => { setMuted(m => { if (videoRef.current) videoRef.current.muted = !m; return !m; }); }} className="flex items-center gap-2 text-[#22c55e]/40 hover:text-[#22c55e]/70 transition-colors font-mono text-xs">
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          {muted ? "ATIVAR SOM" : "SILENCIAR"}
        </motion.button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none">
        <div className="w-full h-4 bg-[#22c55e]/20" />
        <div className="w-full h-4 bg-[#5c4033]/20" />
      </div>
    </div>
  );
}

// --- Floating Discord Button ---
function FloatingDiscordButton() {
  return (
    <a
      href={DISCORD_LINK}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-discord"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#22c55e] text-black font-mono font-bold text-sm px-4 py-3 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:bg-[#16a34a] hover:shadow-[0_0_30px_rgba(34,197,94,0.7)] transition-all duration-300 hover:scale-105"
    >
      <MessageSquare className="w-5 h-5" />
      <span className="hidden sm:inline">DISCORD</span>
    </a>
  );
}

// --- Product components ---
function ColorSwatches({ colors, variantId }: { colors: string[]; variantId: string }) {
  const [active, setActive] = useState(colors[0]);
  return (
    <div className="flex gap-2 mt-4 mb-6">
      {colors.map((c) => (
        <button key={c} type="button" data-testid={`button-color-${variantId}-${c}`} onClick={() => setActive(c)}
          className={`w-6 h-6 rounded-full border-2 transition-all ${active === c ? "scale-125 border-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "border-transparent opacity-70 hover:opacity-100 hover:scale-110"}`}
          style={{ backgroundColor: c }} aria-label={`Selecionar cor ${c}`} />
      ))}
    </div>
  );
}

function ProductGallery({ title, description, variants, price }: { title: string; description: string; variants: Variant[]; price: string }) {
  const isSquare = variants[0]?.id.startsWith("icon");
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-mono text-primary text-glow mb-4" data-testid={`title-${title}`}>{title}</h1>
        <p className="text-xl text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {variants.map((v) => (
          <Card key={v.id} data-testid={`card-variant-${v.id}`} className="bg-[#0f140f] border-primary/20 hover:border-primary transition-colors overflow-hidden group">
            <div className={`w-full overflow-hidden border-b border-primary/20 relative ${isSquare ? "aspect-square" : "aspect-video"}`}>
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
              <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-3 right-3 z-20">
                <span className="bg-black/80 backdrop-blur-sm text-primary font-mono text-sm px-3 py-1 border border-primary/30 box-glow" data-testid={`price-${v.id}`}>{price}</span>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold font-sans mb-2 group-hover:text-primary transition-colors">{v.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{v.description}</p>
              <div className="mb-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">Opções de cor:</div>
              <ColorSwatches colors={v.colors} variantId={v.id} />
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="block w-full" data-testid={`link-discord-${v.id}`}>
                <Button data-testid={`button-order-${v.id}`} className="w-full bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-black hover:border-primary transition-all font-mono text-xs box-glow">
                  ENCOMENDAR NO DISCORD
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- Pages ---
function StatCounter({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const { val, ref } = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col items-center text-center p-6 bg-[#0f140f] border border-primary/20">
      <span className="font-mono text-4xl font-bold text-primary text-glow">+{val}{suffix}</span>
      <span className="text-sm text-muted-foreground mt-2 font-mono">{label}</span>
    </div>
  );
}

const partners = [
  { name: "Servidor Parceiro", desc: "Parceiro oficial da Craft Shop®", url: DISCORD_LINK },
  { name: "Comunidade Gamer", desc: "Comunidade de gamers brasileiros", url: DISCORD_LINK },
  { name: "Seja um Parceiro", desc: "Entre em contato para parceria", url: DISCORD_LINK },
];

function HomePage() {
  return (
    <div className="animate-in fade-in duration-500 flex flex-col gap-16">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-lg border border-primary/20 bg-[#0f140f] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12">
        <div className="absolute inset-0 bg-primary/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent pointer-events-none" />
        <div className="flex-1 z-10 flex flex-col gap-6">
          <div className="inline-block px-4 py-2 border border-primary/30 bg-primary/10 w-fit">
            <span className="text-primary font-mono text-xs">O SEU CANAL MERECE O MELHOR</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono leading-tight">
            DESIGN DE <br /> <span className="text-primary text-glow">ALTO NÍVEL</span> <br /> PARA GAMERS
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            A Craft Shop® é especializada em artes Minecraft para YouTubers e Streamers. Destaque-se na multidão com um visual profissional e único.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-hero-discord">
              <Button size="lg" data-testid="button-hero-order" className="h-14 px-8 bg-primary text-black hover:bg-primary/90 box-glow font-bold rounded-none">
                Fazer Orçamento <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="w-5 h-5 text-primary" /> Entrega Rápida</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Zap className="w-5 h-5 text-primary" /> Alta Qualidade</div>
          </div>
        </div>
        <div className="flex-1 z-10 w-full max-w-md relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
          <img src={logoImg} alt="Craft Shop" className="w-full h-auto object-contain drop-shadow-[0_0_60px_rgba(34,197,94,0.6)] hover:scale-105 transition-transform duration-500" />
        </div>
      </div>

      {/* Stats */}
      <div>
        <h2 className="text-2xl font-mono mb-8 border-l-4 border-primary pl-4">NOSSOS NÚMEROS</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCounter value={150} label="Clientes Atendidos" />
          <StatCounter value={17} label="Trabalhos no Portfólio" />
          <StatCounter value={5} label="Estrelas de Avaliação" suffix="★" />
          <StatCounter value={3} label="Membros na Equipe" />
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-2xl font-mono mb-8 border-l-4 border-primary pl-4">ESCOLHA SEU PRODUTO</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "ICONS", desc: "Sua marca registrada.", href: "/icons", icon: ImageIcon, img: iconImg3 },
            { title: "BANNERS", desc: "A capa perfeita.", href: "/banners", icon: Layout, img: bannerImg1 },
            { title: "TELA FINAL", desc: "Retenção máxima.", href: "/tela-final", icon: MonitorPlay, img: endImg2 },
            { title: "THUMBNAILS", desc: "Cliques garantidos.", href: "/thumbnails", icon: Youtube, img: thumbImg1 },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="group block" data-testid={`link-quick-${item.title}`}>
              <Card className="bg-[#0f140f] border-primary/20 hover:border-primary transition-all overflow-hidden h-full">
                <div className="h-32 overflow-hidden border-b border-primary/20 relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <item.icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-primary z-20 opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-mono text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div>
        <h2 className="text-2xl font-mono mb-8 border-l-4 border-primary pl-4">PARCEIROS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {partners.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="group bg-[#0f140f] border border-primary/20 hover:border-primary transition-all p-6 flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <span className="font-mono font-bold text-white group-hover:text-primary transition-colors">{p.name}</span>
              <span className="text-xs text-muted-foreground">{p.desc}</span>
            </a>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4 font-mono">
          Quer ser parceiro? Entre em contato no Discord!
        </p>
      </div>
    </div>
  );
}

function PricesPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-mono text-primary text-glow mb-4">TABELA DE PREÇOS</h1>
        <p className="text-xl text-muted-foreground">Investimento acessível para decolar o teu canal.</p>
      </div>
      <div className="grid gap-4">
        {prices.map((item, idx) => (
          <div key={idx} data-testid={`price-card-${idx}`} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-[#0f140f] border border-primary/20 hover:border-primary transition-all duration-300 group overflow-hidden">
            <div className="w-full sm:w-32 h-24 sm:h-20 shrink-0 overflow-hidden border border-primary/20 group-hover:border-primary/50 transition-colors">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="font-mono text-lg font-bold text-white block">{item.name}</span>
              <span className="text-sm text-muted-foreground">{item.desc}</span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-mono text-primary text-2xl tracking-tight" data-testid={`price-val-${idx}`}>{item.price}</span>
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" data-testid={`link-buy-${idx}`}>
                <Button data-testid={`button-buy-${idx}`} className="bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-black rounded-none">
                  <ShoppingCart className="w-4 h-4 mr-2" /> Comprar
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-muted-foreground text-sm">Todos os pagamentos e pedidos são feitos direto no Discord.</p>
    </div>
  );
}

function HowToBuyPage() {
  const steps = [
    { step: "01", title: "ESCOLHA A ARTE", desc: "Navegue pelas categorias no menu e encontre o estilo que combina com você." },
    { step: "02", title: "ABRA UM TICKET", desc: "Acesse o Discord e abra um ticket na sala de atendimento." },
    { step: "03", title: "RECEBA O PRODUTO", desc: "Passe os detalhes e receba sua arte profissional em alta qualidade." },
  ];
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-mono text-primary text-glow mb-4">COMO COMPRAR</h1>
        <p className="text-xl text-muted-foreground">Processo simples, rápido e 100% pelo Discord.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
        <div className="hidden md:block absolute top-12 left-10 right-10 h-[2px] bg-primary/20 z-0" />
        {steps.map((s) => (
          <div key={s.step} className="relative z-10 flex flex-col items-center text-center p-8 bg-[#0f140f] border border-primary/30 box-glow rounded-lg">
            <div className="w-24 h-24 bg-primary text-black flex items-center justify-center font-mono text-4xl mb-8 rounded-full border-4 border-[#0f140f] shadow-[0_0_15px_rgba(34,197,94,0.4)]">{s.step}</div>
            <h3 className="font-bold font-mono text-xl mb-4 text-white">{s.title}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-20 flex justify-center">
        <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-discord-steps">
          <Button size="lg" data-testid="button-discord-steps" className="h-16 px-10 text-xl font-bold bg-primary text-black hover:bg-primary/90 box-glow rounded-none">
            <MessageSquare className="mr-3 w-6 h-6" /> Abrir Ticket no Discord
          </Button>
        </a>
      </div>
    </div>
  );
}

function TeamPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-mono text-primary text-glow mb-4">NOSSA EQUIPE</h1>
        <p className="text-xl text-muted-foreground">Os talentos por trás de cada pixel da Craft Shop®.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {team.map((member) => (
          <div key={member.name} className="flex flex-col items-center group" data-testid={`team-${member.name}`}>
            <div className="w-48 h-48 mb-6 border-4 border-primary/20 p-2 group-hover:border-primary transition-all duration-300 relative overflow-hidden bg-[#0f140f]">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="font-mono text-2xl text-white mb-2 group-hover:text-primary transition-colors">{member.name}</h3>
            <span className="text-primary font-bold tracking-widest uppercase text-sm border border-primary/30 bg-primary/10 px-4 py-1">{member.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Layout ---
function LayoutWrapper({ children, discordUser, onLogin, onLogout }: { children: React.ReactNode; discordUser: DiscordUser | null; onLogin: () => void; onLogout: () => void; }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  const navItems = [
    { label: "Início", path: "/", icon: Home },
    { label: "Icons", path: "/icons", icon: ImageIcon },
    { label: "Banners", path: "/banners", icon: Layout },
    { label: "Tela Final", path: "/tela-final", icon: MonitorPlay },
    { label: "Thumbnails", path: "/thumbnails", icon: Youtube },
    { label: "Portfólio", path: "/portfolio", icon: GalleryHorizontalEnd },
    { divider: true, id: "div1" },
    { label: "Preços", path: "/precos", icon: Tag },
    { label: "Como Comprar", path: "/como-comprar", icon: ShoppingCart },
    { label: "Promoções", path: "/promocoes", icon: Gift },
    { label: "Avaliações", path: "/avaliacoes", icon: Star },
    { divider: true, id: "div2" },
    { label: "Equipe", path: "/equipe", icon: Users },
    { label: "Regras", path: "/regras", icon: BookOpen },
    { label: "Denúncias", path: "/denuncias", icon: ShieldAlert },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0e0a] text-foreground font-sans selection:bg-primary selection:text-black">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 w-full h-16 bg-[#111811] border-b border-primary/20 z-40 flex items-center justify-between px-4">
        <img src={logoImg} alt="Craft Shop" className="w-8 h-8 object-contain" />
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-muted-foreground hover:text-white" aria-label="Open menu" data-testid="button-menu">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeSidebar} className="md:hidden fixed inset-0 bg-black/80 z-50 backdrop-blur-sm" />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside className={`fixed inset-y-0 left-0 w-64 bg-[#111811] border-r border-primary/20 z-50 flex flex-col transform md:translate-x-0 transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Craft Shop" className="w-10 h-10 object-contain shrink-0" />
            <span className="font-mono text-sm tracking-wider text-primary text-glow leading-tight">CRAFT<br />SHOP®</span>
          </div>
          <button onClick={closeSidebar} className="md:hidden text-muted-foreground hover:text-white" aria-label="Close menu" data-testid="button-close-menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Discord login area */}
        <div className="px-4 mb-2">
          {discordUser ? (
            <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 p-3">
              <img
                src={getDiscordAvatarUrl(discordUser)}
                alt={discordUser.username}
                className="w-8 h-8 rounded-full border border-primary/30"
              />
              <div className="flex-1 min-w-0">
                <span className="font-mono text-xs text-white block truncate">{discordUser.global_name || discordUser.username}</span>
                <span className="text-[10px] text-muted-foreground">Conectado</span>
              </div>
              <button onClick={onLogout} className="text-muted-foreground hover:text-red-400 transition-colors" title="Sair">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-2 bg-[#5865F2]/10 border border-[#5865F2]/30 text-[#7289da] hover:bg-[#5865F2]/20 hover:border-[#5865F2]/50 transition-all p-3 font-mono text-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.102 18.08.114 18.102.135 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
              Entrar com Discord
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-3 flex flex-col gap-1">
          {navItems.map((item, i) => {
            if (item.divider) return <div key={`div-${i}`} className="my-3 h-px bg-primary/10 mx-2" />;
            const active = location === item.path;
            const Icon = item.icon!;
            return (
              <Link key={item.path} href={item.path!} onClick={closeSidebar} data-testid={`nav-${item.label}`}>
                <span className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all group cursor-pointer ${active ? "bg-primary/10 text-primary border-l-4 border-primary box-glow" : "text-muted-foreground hover:bg-white/5 hover:text-white border-l-4 border-transparent"}`}>
                  <Icon className={`w-4 h-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-white"}`} />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary/20">
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="block" data-testid="nav-discord">
            <Button className="w-full bg-primary text-black hover:bg-primary/90 font-mono text-xs rounded-none box-glow">
              <MessageSquare className="w-4 h-4 mr-2" /> DISCORD
            </Button>
          </a>
        </div>
      </motion.aside>

      {/* Main */}
      <main className="flex-1 md:ml-64 flex flex-col min-w-0 pt-16 md:pt-0">
        <div className="flex-1 p-6 md:p-10 lg:p-14 overflow-x-hidden">{children}</div>
        <footer className="border-t border-primary/20 p-6 text-center text-xs font-mono text-muted-foreground">
          &copy; {new Date().getFullYear()} Craft Shop®. Design feito por gamers.
        </footer>
      </main>

      <FloatingDiscordButton />
    </div>
  );
}

// --- Router ---
function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/icons">{() => <ProductGallery title="ICONS" description="Fotos de perfil personalizadas em alta definição." variants={iconVariants} price="R$ 3,00" />}</Route>
      <Route path="/banners">{() => <ProductGallery title="BANNERS" description="Artes épicas para a capa do teu canal." variants={bannerVariants} price="R$ 3,00" />}</Route>
      <Route path="/tela-final">{() => <ProductGallery title="TELA FINAL" description="Templates de encerramento para reter audiência." variants={endscreenVariants} price="R$ 4,00" />}</Route>
      <Route path="/thumbnails">{() => <ProductGallery title="THUMBNAILS" description="Capas chamativas para explodir tuas views." variants={thumbnailVariants} price="R$ 5,00" />}</Route>
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/precos" component={PricesPage} />
      <Route path="/como-comprar" component={HowToBuyPage} />
      <Route path="/promocoes" component={PromotionsPage} />
      <Route path="/avaliacoes" component={ReviewsPage} />
      <Route path="/equipe" component={TeamPage} />
      <Route path="/regras" component={RulesPage} />
      <Route path="/denuncias" component={ScammersPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

// --- App Root ---
function AppShell() {
  const [entered, setEntered] = useState(false);
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);

  // Handle Discord OAuth2 callback (implicit flow — token in URL fragment)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token=")) {
      const params = new URLSearchParams(hash.slice(1));
      const token = params.get("access_token");
      if (token) {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
        fetchDiscordUser(token).then((user) => {
          if (user) {
            setDiscordUser(user);
            localStorage.setItem("discord_user", JSON.stringify(user));
            localStorage.setItem("discord_token", token);
            setEntered(true);
          }
        });
      }
    }
    const saved = localStorage.getItem("discord_user");
    if (saved) { try { setDiscordUser(JSON.parse(saved)); } catch { localStorage.removeItem("discord_user"); localStorage.removeItem("discord_token"); } }
  }, []);

  const handleLogout = () => { setDiscordUser(null); localStorage.removeItem("discord_user"); localStorage.removeItem("discord_token"); };

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <motion.div key="construction" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
            <UnderConstruction onEnter={() => setEntered(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {entered && (
          <motion.div key="site" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="contents">
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <LayoutWrapper discordUser={discordUser} onLogin={loginWithDiscord} onLogout={handleLogout}>
                <Router />
              </LayoutWrapper>
            </WouterRouter>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppShell />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
