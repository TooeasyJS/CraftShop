import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Gift, Zap, Clock } from "lucide-react";

const DISCORD_LINK = "https://discord.gg/J7bufuWvh";

interface Promo {
  id: string;
  type: "promo" | "sorteio";
  badge: string;
  title: string;
  desc: string;
  detail: string;
  icon: React.ElementType;
  color: string;
  cta: string;
  active: boolean;
}

const promos: Promo[] = [
  {
    id: "p1",
    type: "promo",
    badge: "OFERTA ATIVA",
    title: "Compre 2 Icons e leve o 3º GRÁTIS!",
    desc: "Indique um amigo e receba um icon de graça.",
    detail: "Compre 2 icons no Discord, indique o servidor pra um amigo e a gente te manda um icon extra sem custo nenhum! Válido apenas para novos pedidos.",
    icon: Zap,
    color: "#22c55e",
    cta: "Aproveitar Agora",
    active: true,
  },
  {
    id: "p2",
    type: "promo",
    badge: "OFERTA ESPECIAL",
    title: "Pacote Completo por R$ 18,00!",
    desc: "Icon + Banner + Tela Final por um preço especial.",
    detail: "Pediu os 3 ao mesmo tempo? Paga só R$18,00 em vez de R$10,00! Aproveite esse combo exclusivo e dê um UP no seu canal de uma vez só.",
    icon: Gift,
    color: "#a855f7",
    cta: "Pedir o Pacote",
    active: true,
  },
  {
    id: "p3",
    type: "sorteio",
    badge: "SORTEIO",
    title: "1 Thumbnail GRÁTIS todo mês!",
    desc: "Entre no Discord e participe do sorteio mensal.",
    detail: "Todo mês sorteamos 1 thumbnail grátis entre todos os membros do servidor. Para participar: entre no Discord, vá no canal #sorteios e reaja com 🎉 no post fixado!",
    icon: Gift,
    color: "#f97316",
    cta: "Participar do Sorteio",
    active: true,
  },
  {
    id: "p4",
    type: "promo",
    badge: "EM BREVE",
    title: "Black Friday Craft Shop",
    desc: "Ofertas absurdas em novembro — fique de olho!",
    detail: "Prepara o bolso! Em novembro teremos promoções exclusivas com descontos de até 50% em todos os produtos. Ativa as notificações do Discord pra não perder!",
    icon: Clock,
    color: "#3b82f6",
    cta: "Ativar Notificações",
    active: false,
  },
];

export default function PromotionsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-mono text-primary text-glow mb-4">PROMOÇÕES</h1>
        <p className="text-xl text-muted-foreground">Ofertas relâmpago e sorteios exclusivos da Craft Shop®.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promos.map((promo, i) => {
          const Icon = promo.icon;
          return (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-[#0f140f] border transition-all duration-300 p-6 flex flex-col gap-4 overflow-hidden ${
                promo.active ? "border-primary/30 hover:border-primary" : "border-white/10 opacity-60"
              }`}
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-20 pointer-events-none"
                style={{ backgroundColor: promo.color }}
              />

              <div className="flex items-start justify-between gap-4">
                <div
                  className="w-12 h-12 flex items-center justify-center shrink-0 border"
                  style={{ backgroundColor: `${promo.color}20`, borderColor: `${promo.color}40` }}
                >
                  <Icon className="w-6 h-6" style={{ color: promo.color }} />
                </div>
                <span
                  className="font-mono text-xs px-3 py-1 border shrink-0"
                  style={{
                    color: promo.color,
                    borderColor: `${promo.color}40`,
                    backgroundColor: `${promo.color}15`,
                  }}
                >
                  {promo.badge}
                </span>
              </div>

              <div>
                <h3 className="font-mono font-bold text-xl text-white mb-2">{promo.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{promo.detail}</p>
              </div>

              {promo.active && (
                <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="mt-auto">
                  <Button
                    className="w-full font-mono text-sm rounded-none"
                    style={{
                      backgroundColor: `${promo.color}20`,
                      color: promo.color,
                      borderColor: `${promo.color}40`,
                      border: "1px solid",
                    }}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {promo.cta}
                  </Button>
                </a>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 p-6 bg-[#0f140f] border border-primary/20 text-center">
        <p className="text-muted-foreground text-sm mb-4">
          Quer saber de todas as promoções em primeira mão? Entre no nosso Discord!
        </p>
        <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-mono font-bold rounded-none px-10">
            <MessageSquare className="w-5 h-5 mr-2" /> Entrar no Discord
          </Button>
        </a>
      </div>
    </div>
  );
}
