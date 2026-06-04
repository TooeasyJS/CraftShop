import { useState } from "react";
import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Image as ImageIcon,
  Layout,
  MonitorPlay,
  Youtube,
  Tag,
  ShoppingCart,
  Users,
  Menu,
  X,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import NotFound from "@/pages/not-found";

import heroImg from "./assets/hero.png";
import logoImg from "./assets/logo.png";
import iconImg from "./assets/product-icon.png";
import bannerImg from "./assets/product-banner.png";
import endscreenImg from "./assets/product-endscreen.png";
import thumbnailImg from "./assets/product-thumbnail.png";
import craftgirlImg from "./assets/team-craftgirl.png";
import soulfelpsImg from "./assets/team-soulfelps.png";
import azukiImg from "./assets/team-azuki.png";

const queryClient = new QueryClient();
const DISCORD_LINK = "https://discord.gg/J7bufuWvh";

interface Variant {
  id: string;
  name: string;
  img: string;
  colors: string[];
  description: string;
}

const defaultColors = ["#22c55e", "#ef4444", "#3b82f6", "#a855f7", "#f97316"];

// --- Data ---
const iconVariants: Variant[] = [
  { id: "icon-1", name: "Estilo Guerreiro", img: iconImg, colors: defaultColors, description: "Traços marcantes e olhar focado para perfis competitivos." },
  { id: "icon-2", name: "Estilo Mago", img: iconImg, colors: defaultColors, description: "Aura mística e efeitos mágicos ao redor do personagem." },
  { id: "icon-3", name: "Estilo Neon", img: iconImg, colors: defaultColors, description: "Cores vibrantes e brilhantes que chamam atenção na timeline." },
  { id: "icon-4", name: "Estilo Sombra", img: iconImg, colors: defaultColors, description: "Fundo escuro e iluminação dramática." },
  { id: "icon-5", name: "Estilo Natureza", img: iconImg, colors: defaultColors, description: "Elementos orgânicos e vibes relaxantes." },
];

const bannerVariants: Variant[] = [
  { id: "ban-1", name: "Banner Épico", img: bannerImg, colors: defaultColors, description: "Cenário de batalha massivo com teu personagem em destaque." },
  { id: "ban-2", name: "Banner Neon", img: bannerImg, colors: defaultColors, description: "Cyberpunk blocky com letreiros brilhantes." },
  { id: "ban-3", name: "Banner Medieval", img: bannerImg, colors: defaultColors, description: "Castelos, espadas e texturas rústicas." },
  { id: "ban-4", name: "Banner Futurista", img: bannerImg, colors: defaultColors, description: "Naves, lasers e tecnologia alienígena." },
];

const endscreenVariants: Variant[] = [
  { id: "end-1", name: "Tela Final Clássica", img: endscreenImg, colors: defaultColors, description: "Design limpo e direto para focar nos vídeos recomendados." },
  { id: "end-2", name: "Tela Final Dark", img: endscreenImg, colors: defaultColors, description: "Cores profundas para não cansar a vista do espectador." },
  { id: "end-3", name: "Tela Final Colorida", img: endscreenImg, colors: defaultColors, description: "Vibrante e animada para reter a atenção." },
];

const thumbnailVariants: Variant[] = [
  { id: "thm-1", name: "Thumb Impacto", img: thumbnailImg, colors: defaultColors, description: "Expressões exageradas e textos garrafais." },
  { id: "thm-2", name: "Thumb Limpa", img: thumbnailImg, colors: defaultColors, description: "Minimalista, deixando o gameplay brilhar." },
  { id: "thm-3", name: "Thumb Épica", img: thumbnailImg, colors: defaultColors, description: "Composição cinematográfica para vídeos de lore." },
  { id: "thm-4", name: "Thumb Neon", img: thumbnailImg, colors: defaultColors, description: "Alto contraste para destacar no modo escuro do Youtube." },
];

const prices = [
  { name: "Icon", price: "R$ 3,00" },
  { name: "Banner", price: "R$ 3,00" },
  { name: "Tela Final", price: "R$ 4,00" },
  { name: "Thumbnail", price: "R$ 5,00" },
  { name: "Pacote 3 Thumbnails", price: "R$ 12,50" },
  { name: "Pacote 3 Icons", price: "R$ 9,00" },
];

const team = [
  { name: "CraftGirl", role: "Dona", img: craftgirlImg },
  { name: "SoulFelps", role: "Sub-Dono", img: soulfelpsImg },
  { name: "AZUKI PIZZA", role: "Admin", img: azukiImg },
];

// --- Components ---

function ColorSwatches({ colors, variantId }: { colors: string[]; variantId: string }) {
  const [active, setActive] = useState(colors[0]);
  return (
    <div className="flex gap-2 mt-4 mb-6">
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          data-testid={`button-color-${variantId}-${c}`}
          onClick={() => setActive(c)}
          className={`w-6 h-6 rounded-full border-2 transition-all ${
            active === c ? "scale-125 border-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "border-transparent opacity-70 hover:opacity-100 hover:scale-110"
          }`}
          style={{ backgroundColor: c }}
          aria-label={`Selecionar cor ${c}`}
        />
      ))}
    </div>
  );
}

function ProductGallery({ title, description, variants, price }: { title: string; description: string; variants: Variant[]; price: string }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-mono text-primary text-glow mb-4" data-testid={`title-${title}`}>{title}</h1>
        <p className="text-xl text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {variants.map((v) => (
          <Card key={v.id} data-testid={`card-variant-${v.id}`} className="bg-[#0f140f] border-primary/20 hover:border-primary transition-colors overflow-hidden group">
            <div className="aspect-video w-full overflow-hidden border-b border-primary/20 relative">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
              <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-3 right-3 z-20">
                <span className="bg-black/80 backdrop-blur-sm text-primary font-mono text-sm px-3 py-1 border border-primary/30 box-glow" data-testid={`price-${v.id}`}>
                  {price}
                </span>
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-primary" /> Entrega Rápida
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-5 h-5 text-primary" /> Alta Qualidade
            </div>
          </div>
        </div>
        
        <div className="flex-1 z-10 w-full max-w-md relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
          <img src={logoImg} alt="Craft Shop" className="w-full h-auto object-contain drop-shadow-[0_0_60px_rgba(34,197,94,0.6)] hover:scale-105 transition-transform duration-500" />
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-2xl font-mono mb-8 border-l-4 border-primary pl-4">ESCOLHA SEU PRODUTO</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "ICONS", desc: "Sua marca registrada.", href: "/icons", icon: ImageIcon, img: iconImg },
            { title: "BANNERS", desc: "A capa perfeita.", href: "/banners", icon: Layout, img: bannerImg },
            { title: "TELA FINAL", desc: "Retenção máxima.", href: "/tela-final", icon: MonitorPlay, img: endscreenImg },
            { title: "THUMBNAILS", desc: "Cliques garantidos.", href: "/thumbnails", icon: Youtube, img: thumbnailImg },
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
          <div key={idx} className="flex flex-col sm:flex-row items-center justify-between p-6 bg-[#0f140f] border border-primary/20 hover:border-primary transition-colors box-glow">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-2 h-2 bg-primary rounded-full hidden sm:block" />
              <span className="font-sans text-xl font-bold">{item.name}</span>
            </div>
            
            <div className="flex items-center gap-6 mt-6 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-primary/10 pt-4 sm:pt-0">
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
    </div>
  );
}

function HowToBuyPage() {
  const steps = [
    { step: "01", title: "ESCOLHA A ARTE", desc: "Navegue pelas nossas categorias no menu lateral e encontre o estilo que mais combina com você." },
    { step: "02", title: "ABRA UM TICKET", desc: "Acesse nosso servidor no Discord e abra um ticket na sala de atendimento." },
    { step: "03", title: "RECEBA O PRODUTO", desc: "Converse com nossa equipe, passe os detalhes e receba sua arte em alta qualidade." },
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
            <div className="w-24 h-24 bg-primary text-black flex items-center justify-center font-mono text-4xl mb-8 rounded-full border-4 border-[#0f140f] shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              {s.step}
            </div>
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

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: "Início", path: "/", icon: Home },
    { label: "Icons", path: "/icons", icon: ImageIcon },
    { label: "Banners", path: "/banners", icon: Layout },
    { label: "Tela Final", path: "/tela-final", icon: MonitorPlay },
    { label: "Thumbnails", path: "/thumbnails", icon: Youtube },
    { divider: true, id: "div1" },
    { label: "Preços", path: "/precos", icon: Tag },
    { label: "Como Comprar", path: "/como-comprar", icon: ShoppingCart },
    { label: "Equipe", path: "/equipe", icon: Users },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-[#0a0e0a] text-foreground font-sans selection:bg-primary selection:text-black">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 w-full h-16 bg-[#111811] border-b border-primary/20 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="Craft Shop" className="w-8 h-8 object-contain" />
        </div>
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-muted-foreground hover:text-white" aria-label="Open menu" data-testid="button-menu">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="md:hidden fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 w-64 bg-[#111811] border-r border-primary/20 z-50 flex flex-col transform md:translate-x-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Craft Shop" className="w-10 h-10 object-contain shrink-0" />
            <span className="font-mono text-sm tracking-wider text-primary text-glow leading-tight">CRAFT<br/>SHOP®</span>
          </div>
          <button onClick={closeSidebar} className="md:hidden text-muted-foreground hover:text-white" aria-label="Close menu" data-testid="button-close-menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          {navItems.map((item, i) => {
            if (item.divider) {
              return <div key={`div-${i}`} className="my-4 h-px bg-primary/10 mx-2" />;
            }
            const active = location === item.path;
            const Icon = item.icon!;
            return (
              <Link key={item.path} href={item.path!} onClick={closeSidebar} data-testid={`nav-${item.label}`}>
                <span className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all group cursor-pointer ${
                  active 
                    ? "bg-primary/10 text-primary border-l-4 border-primary box-glow" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-white border-l-4 border-transparent"
                }`}>
                  <Icon className={`w-5 h-5 ${active ? "text-primary" : "text-muted-foreground group-hover:text-white"}`} />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary/20">
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="block" data-testid="nav-discord">
            <Button className="w-full bg-primary text-black hover:bg-primary/90 font-mono text-xs rounded-none box-glow">
              <MessageSquare className="w-4 h-4 mr-2" />
              DISCORD
            </Button>
          </a>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-w-0 pt-16 md:pt-0">
        <div className="flex-1 p-6 md:p-10 lg:p-14 overflow-x-hidden">
          {children}
        </div>
        <footer className="border-t border-primary/20 p-6 text-center text-xs font-mono text-muted-foreground">
          &copy; {new Date().getFullYear()} Craft Shop®. Design feito por gamers.
        </footer>
      </main>
    </div>
  );
}

// --- Router ---

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/icons">
        {() => <ProductGallery title="ICONS" description="Fotos de perfil personalizadas em alta definição." variants={iconVariants} price="R$ 3,00" />}
      </Route>
      <Route path="/banners">
        {() => <ProductGallery title="BANNERS" description="Artes épicas para a capa do teu canal." variants={bannerVariants} price="R$ 3,00" />}
      </Route>
      <Route path="/tela-final">
        {() => <ProductGallery title="TELA FINAL" description="Templates de encerramento para reter audiência." variants={endscreenVariants} price="R$ 4,00" />}
      </Route>
      <Route path="/thumbnails">
        {() => <ProductGallery title="THUMBNAILS" description="Capas chamativas para explodir tuas views." variants={thumbnailVariants} price="R$ 5,00" />}
      </Route>
      <Route path="/precos" component={PricesPage} />
      <Route path="/como-comprar" component={HowToBuyPage} />
      <Route path="/equipe" component={TeamPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

// --- App ---

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <LayoutWrapper>
            <Router />
          </LayoutWrapper>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
