import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MessageSquare, ArrowRight, ShieldCheck, Zap, MonitorPlay, Image as ImageIcon, Paintbrush, Youtube } from "lucide-react";
import NotFound from "@/pages/not-found";

import heroImg from "./assets/hero.png";
import iconImg from "./assets/product-icon.png";
import bannerImg from "./assets/product-banner.png";
import endscreenImg from "./assets/product-endscreen.png";
import thumbnailImg from "./assets/product-thumbnail.png";
import craftgirlImg from "./assets/team-craftgirl.png";
import soulfelpsImg from "./assets/team-soulfelps.png";
import azukiImg from "./assets/team-azuki.png";

const queryClient = new QueryClient();

const DISCORD_LINK = "https://discord.gg/J7bufuWvh";

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary block box-glow" />
            <span className="font-mono text-sm tracking-wider text-primary text-glow">CRAFT SHOP®</span>
          </div>
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-black font-mono text-xs">
              <MessageSquare className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 min-h-[90vh] flex items-center">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-block px-4 py-2 border border-primary/30 bg-primary/10 w-fit">
              <span className="text-primary font-mono text-xs">ESTÚDIO CRIATIVO Nº1 DO BRASIL</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-mono leading-tight">
              DESIGN FEITO <br />
              POR <span className="text-primary text-glow">GAMERS</span>, <br />
              PARA GAMERS.
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Artes exclusivas com a verdadeira estética Minecraft. Destaca teu canal, atrai mais views e constrói tua comunidade com a Craft Shop®.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary text-black hover:bg-primary/90 box-glow rounded-none">
                  Fazer Orçamento <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-primary" /> Entrega Rápida
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-5 h-5 text-primary" /> Alta Qualidade
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <img 
              src={heroImg} 
              alt="Craft Shop Chest" 
              className="w-full h-auto object-cover border-4 border-primary/30 box-glow"
            />
          </motion.div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-24 bg-card/50 px-4 border-y border-primary/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono mb-4">NOSSOS PRODUTOS</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Tudo que teu canal precisa para ter uma identidade visual foda e profissional.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "ICONS", desc: "Fotos de perfil personalizadas em HD.", img: iconImg, icon: ImageIcon },
              { title: "BANNERS", desc: "Artes épicas para a capa do teu canal.", img: bannerImg, icon: Paintbrush },
              { title: "TELA FINAL", desc: "Templates de encerramento para Youtube.", img: endscreenImg, icon: MonitorPlay },
              { title: "THUMBNAILS", desc: "Capas chamativas para explodir tuas views.", img: thumbnailImg, icon: Youtube }
            ].map((prod, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="bg-background border-primary/20 hover:border-primary/60 transition-colors rounded-none group overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden border-b border-primary/20">
                    <img 
                      src={prod.img} 
                      alt={prod.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <prod.icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-mono text-lg mb-2">{prod.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{prod.desc}</p>
                    <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="inline-block w-full">
                      <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary hover:text-black rounded-none">
                        Encomendar
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono mb-4 text-primary text-glow">TABELA DE PREÇOS</h2>
            <p className="text-muted-foreground">Valores acessíveis para impulsionar a tua jornada no Minecraft.</p>
          </div>

          <div className="space-y-4">
            {[
              { name: "Icon (Foto de Perfil)", price: "R$ 3,00" },
              { name: "Banner de Canal", price: "R$ 3,00" },
              { name: "Tela Final (End Screen)", price: "R$ 4,00" },
              { name: "Thumbnail (Capa de Vídeo)", price: "R$ 5,00" },
              { name: "Pacote 3 Thumbnails", price: "R$ 12,50" },
              { name: "Pacote 3 Icons", price: "R$ 9,00" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center justify-between p-6 bg-card border border-primary/20 hover:border-primary/50 transition-colors">
                <span className="font-sans text-lg font-bold">{item.name}</span>
                <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
                  <div className="h-[1px] w-full sm:w-16 bg-primary/20 hidden sm:block"></div>
                  <span className="font-mono text-primary text-xl">{item.price}</span>
                  <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="ml-4">
                    <Button size="sm" className="bg-primary/20 text-primary hover:bg-primary hover:text-black rounded-none">
                      Comprar
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Buy */}
      <section className="py-24 bg-primary/5 px-4 border-y border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono mb-4">COMO COMPRAR?</h2>
            <p className="text-muted-foreground">O processo é rápido, direto e 100% focado no Discord.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-primary/20 -translate-y-1/2 z-0" />
            
            {[
              { step: "1", title: "ESCOLHA A ARTE", desc: "Dá uma olhada no nosso portfólio e decide o que o teu canal precisa." },
              { step: "2", title: "ABRA UM TICKET", desc: "Entra no nosso servidor do Discord e abre um ticket na sala de compras." },
              { step: "3", title: "RECEBA O PRODUTO", desc: "Passa os detalhes, aguarda a produção e recebe a tua arte em altíssima qualidade." },
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center p-6 bg-background border border-primary/30 box-glow">
                <div className="w-16 h-16 bg-primary text-black flex items-center justify-center font-mono text-2xl mb-6">
                  {s.step}
                </div>
                <h3 className="font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary text-black hover:bg-primary/90 box-glow rounded-none">
                Abrir Ticket no Discord
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-mono mb-4">NOSSA EQUIPE</h2>
            <p className="text-muted-foreground">Quem faz a magia acontecer nos bastidores.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { name: "CraftGirl", role: "Dona / Designer", img: craftgirlImg },
              { name: "SoulFelps", role: "Sub-Dono", img: soulfelpsImg },
              { name: "AZUKI PIZZA", role: "Admin", img: azukiImg },
            ].map((member, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-40 h-40 mb-6 border-4 border-primary/30 p-1 group-hover:border-primary transition-colors">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-mono text-xl text-primary mb-1">{member.name}</h3>
                <span className="text-muted-foreground bg-card px-3 py-1 text-sm border border-primary/10">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-primary text-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-mono mb-6 leading-tight">PRONTO PARA UPAR<br />O TEU CANAL?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-80 font-bold">
            Junta-te a dezenas de criadores que já confiam na Craft Shop® para suas artes.
          </p>
          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-16 px-10 text-xl font-bold bg-black text-primary hover:bg-black/90 rounded-none border-2 border-transparent hover:border-black/50 transition-all">
              <MessageSquare className="w-6 h-6 mr-3" />
              Entrar no Servidor
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 bg-background py-12 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary" />
            <span className="font-mono text-sm tracking-wider text-primary">CRAFT SHOP®</span>
          </div>
          
          <div className="text-muted-foreground text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Craft Shop. Todos os direitos reservados.
          </div>
          
          <div className="flex gap-4">
             <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
