import { motion } from "framer-motion";
import { Shield, AlertTriangle } from "lucide-react";

const rules = [
  {
    num: "01",
    title: "Respeito Sempre",
    icon: "🤝",
    desc: "Não ofenda, provoque ou desrespeite outros membros. Somos todos amigos aqui!",
  },
  {
    num: "02",
    title: "Sem Spam",
    icon: "🚫",
    desc: "Evite mandar mensagens repetidas, floods ou links aleatórios.",
  },
  {
    num: "03",
    title: "Conteúdos Proibidos",
    icon: "⛔",
    desc: "Nada de conteúdo +18, violência, preconceito ou ilegal. Isso dá ban direto.",
  },
  {
    num: "04",
    title: "Divulgação",
    icon: "📢",
    desc: "Proibido divulgar qualquer coisa sem autorização da staff.",
  },
  {
    num: "05",
    title: "Nome e Foto Adequados",
    icon: "🪪",
    desc: "Use nome e avatar legíveis e apropriados. Nada ofensivo ou imitador.",
  },
  {
    num: "06",
    title: "Proibido Brigas",
    icon: "🔥",
    desc: "Discussões prolongadas, indiretas e treta não serão toleradas. Moderação entra em ação.",
  },
  {
    num: "07",
    title: "Obedeça a Staff",
    icon: "🛡️",
    desc: "Se um moderador pedir algo, siga. Eles estão aqui para manter tudo organizado.",
  },
  {
    num: "08",
    title: "Nada de Hacks ou Trollagem",
    icon: "⚔️",
    desc: "É pra se divertir, não estragar! Trollagem pesada resulta em punição.",
  },
  {
    num: "09",
    title: "Privacidade",
    icon: "🔒",
    desc: "Não peça nem divulgue informações pessoais de ninguém. Segurança sempre em primeiro lugar.",
  },
  {
    num: "10",
    title: "Use Cada Canal Corretamente",
    icon: "📁",
    desc: "Antes de postar, veja a descrição do canal. Organização é tudo!",
  },
];

const punishments = [
  { step: "1ª", label: "Aviso", color: "#22c55e" },
  { step: "2ª", label: "Mute", color: "#f97316" },
  { step: "3ª", label: "Kick", color: "#ef4444" },
  { step: "4ª", label: "Ban", color: "#7f1d1d" },
];

export default function RulesPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-mono text-primary text-glow mb-4">REGRAS</h1>
        <p className="text-xl text-muted-foreground">Regras do servidor Craft Shop® no Discord.</p>
      </div>

      {/* Rules list */}
      <div className="grid gap-4 mb-12">
        {rules.map((rule, i) => (
          <motion.div
            key={rule.num}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex gap-4 items-start bg-[#0f140f] border border-primary/20 hover:border-primary/40 transition-all duration-300 p-5"
          >
            <div className="flex flex-col items-center shrink-0">
              <span className="text-2xl">{rule.icon}</span>
              <span className="font-mono text-xs text-primary/50 mt-1">{rule.num}</span>
            </div>
            <div>
              <h3 className="font-mono font-bold text-white mb-1">
                <span className="text-primary mr-2">📌</span>
                {rule.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{rule.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Punishments */}
      <div className="bg-[#0f140f] border border-red-900/40 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-red-400" />
          <h2 className="font-mono text-xl text-white">⭐ Punições</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {punishments.map((p) => (
            <div key={p.step} className="flex flex-col items-center text-center p-4 border" style={{ borderColor: `${p.color}40`, backgroundColor: `${p.color}10` }}>
              <span className="font-mono text-xs mb-2" style={{ color: p.color }}>{p.step} Infração</span>
              <span className="font-mono font-bold text-white text-lg">{p.label}</span>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-sm mt-4 text-center">
          Dependendo da gravidade, pode ir direto pro ban.
        </p>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-4 bg-yellow-950/20 border border-yellow-600/30 p-5">
        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-200/80">
          <strong className="text-yellow-400">Dúvidas?</strong> Chame a staff no privado ou use o canal de suporte no Discord. Estamos aqui para ajudar!
        </p>
      </div>
    </div>
  );
}
