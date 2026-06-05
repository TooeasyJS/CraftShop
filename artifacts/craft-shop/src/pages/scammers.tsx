import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MessageSquare, ShieldAlert, Info } from "lucide-react";

const DISCORD_LINK = "https://discord.gg/J7bufuWvh";

const tips = [
  {
    icon: "⚠️",
    title: "Verifique o nome",
    desc: "Golpistas costumam usar nomes parecidos com os da nossa staff. Sempre confirme o nome completo e o número de discriminador.",
  },
  {
    icon: "💳",
    title: "Nunca pague antes de ver",
    desc: "Não faça pagamentos antes de confirmar o pedido e conversar com nossa staff oficial. Desconfie de cobranças por links externos.",
  },
  {
    icon: "🔗",
    title: "Links suspeitos",
    desc: "Não clique em links de pessoas não verificadas. Golpistas enviam links falsos fingindo ser o nosso Discord ou site.",
  },
  {
    icon: "📸",
    title: "Guarde as provas",
    desc: "Se suspeitar de golpe, tire print de todas as mensagens antes de denunciar. Isso agiliza o processo de investigação.",
  },
];

const reportLevels = [
  {
    emoji: "🚨",
    label: "Golpe Urgente",
    desc: "Perdeu dinheiro ou foi enganado agora",
    color: "#ef4444",
    action: "Abra um ticket e mande o emoji 🚨",
  },
  {
    emoji: "⚠️",
    label: "Golpe Leve",
    desc: "Tentativa ou situação suspeita",
    color: "#f97316",
    action: "Abra um ticket e mande o emoji ⚠️",
  },
];

export default function ScammersPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-mono text-red-400 mb-4 flex items-center gap-4">
          <ShieldAlert className="w-10 h-10" />
          DENÚNCIAS
        </h1>
        <p className="text-xl text-muted-foreground">Proteção contra golpistas e scammers na Craft Shop®.</p>
      </div>

      {/* Main alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-950/20 border border-red-500/40 p-6 mb-10 flex gap-4"
      >
        <AlertTriangle className="w-8 h-8 text-red-400 shrink-0 mt-0.5" />
        <div>
          <h2 className="font-mono font-bold text-red-400 text-lg mb-2">O QUE É UM SCAMMER?</h2>
          <p className="text-red-200/80 text-sm leading-relaxed">
            Scammer é uma pessoa que finge ser membro ou staff da Craft Shop® para te enganar e roubar dinheiro.
            Eles podem entrar em contato pelo Discord fingindo oferecer serviços ou cobrar por artes que nunca foram feitas.
            <br /><br />
            <strong className="text-red-400">A Craft Shop® nunca entra em contato primeiro!</strong> Se alguém te chamar no privado
            se passando por nós, desconfie imediatamente.
          </p>
        </div>
      </motion.div>

      {/* Tips */}
      <h2 className="font-mono text-xl text-white mb-6 border-l-4 border-red-400 pl-4">COMO SE PROTEGER</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-[#0f140f] border border-primary/20 p-5 flex gap-4"
          >
            <span className="text-2xl shrink-0">{tip.icon}</span>
            <div>
              <h3 className="font-mono font-bold text-white mb-1">{tip.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How to report */}
      <h2 className="font-mono text-xl text-white mb-6 border-l-4 border-orange-400 pl-4">COMO DENUNCIAR</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {reportLevels.map((level, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="bg-[#0f140f] p-6 flex flex-col gap-4 border"
            style={{ borderColor: `${level.color}40` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl">{level.emoji}</span>
              <div>
                <span className="font-mono font-bold text-white block">{level.label}</span>
                <span className="text-sm text-muted-foreground">{level.desc}</span>
              </div>
            </div>
            <div
              className="p-3 text-sm font-mono text-center"
              style={{ backgroundColor: `${level.color}15`, color: level.color, border: `1px solid ${level.color}30` }}
            >
              {level.action}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Evidence note */}
      <div className="flex gap-3 bg-[#0f140f] border border-primary/20 p-5 mb-8">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <strong className="text-white">Se alguém te deu um golpe, mande as provas no ticket!</strong>{" "}
          Print das conversas, comprovante de pagamento, nome do usuário — tudo ajuda. Quanto mais provas, mais rápido resolvemos!
        </p>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="h-14 px-10 bg-red-600 hover:bg-red-700 text-white font-mono font-bold rounded-none text-base">
            <MessageSquare className="w-5 h-5 mr-3" />
            Abrir Ticket de Denúncia
          </Button>
        </a>
      </div>
    </div>
  );
}
