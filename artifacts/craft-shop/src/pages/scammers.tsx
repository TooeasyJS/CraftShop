import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ShieldAlert, Info, X, Upload, CheckCircle, Trash2, Send } from "lucide-react";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const DISCORD_LINK_RE = /discord\.gg\//i;

const tips = [
  { icon: "⚠️", title: "Verifique o nome", desc: "Golpistas costumam usar nomes parecidos com os da nossa staff. Sempre confirme o nome completo e o discriminador." },
  { icon: "💳", title: "Nunca pague antes", desc: "Não faça pagamentos antes de confirmar o pedido com a staff oficial. Desconfie de cobranças por links externos." },
  { icon: "🔗", title: "Links suspeitos", desc: "Não clique em links de pessoas não verificadas. Golpistas enviam links falsos fingindo ser o nosso site ou Discord." },
  { icon: "📸", title: "Guarde as provas", desc: "Se suspeitar de golpe, tire print antes de denunciar. Isso agiliza o processo de investigação." },
];

interface FormData {
  accusedNick: string;
  accusedDiscord: string;
  reason: string;
  images: { file: File; preview: string; b64: string }[];
}

const initForm = (): FormData => ({
  accusedNick: "",
  accusedDiscord: "",
  reason: "",
  images: [],
});

export default function ScammersPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(initForm());
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function validate(): boolean {
    const e: typeof errors = {};
    if (!form.accusedNick.trim() || form.accusedNick.trim().length < 2)
      e.accusedNick = "Informe o nick do acusado (mínimo 2 caracteres).";
    if (!form.accusedDiscord.trim() || form.accusedDiscord.trim().length < 2)
      e.accusedDiscord = "Informe o @ do Discord do acusado.";
    if (DISCORD_LINK_RE.test(form.accusedDiscord))
      e.accusedDiscord = "Links de Discord não são permitidos neste campo.";
    if (!form.reason.trim() || form.reason.trim().length < 10)
      e.reason = "Descreva o motivo com pelo menos 10 caracteres.";
    if (DISCORD_LINK_RE.test(form.reason))
      e.reason = "Links de Discord não são permitidos na descrição.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleImageAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const remaining = 3 - form.images.length;
    const toAdd = files.slice(0, remaining);
    const newImgs = await Promise.all(
      toAdd.map(async (file) => ({
        file,
        preview: URL.createObjectURL(file),
        b64: await toBase64(file),
      }))
    );
    setForm((f) => ({ ...f, images: [...f.images, ...newImgs] }));
    e.target.value = "";
  }

  function removeImage(idx: number) {
    setForm((f) => {
      URL.revokeObjectURL(f.images[idx].preview);
      return { ...f, images: f.images.filter((_, i) => i !== idx) };
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setGlobalError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accusedNick: form.accusedNick.trim(),
          accusedDiscord: form.accusedDiscord.trim(),
          reason: form.reason.trim(),
          images: form.images.map((i) => i.b64),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setGlobalError(data.error ?? "Erro ao enviar denúncia.");
        return;
      }
      setSuccess(true);
    } catch {
      setGlobalError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    form.images.forEach((i) => URL.revokeObjectURL(i.preview));
    setForm(initForm());
    setErrors({});
    setGlobalError(null);
    setSuccess(false);
    setShowForm(false);
  }

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
            Eles podem entrar em contato pelo Discord fingindo oferecer serviços ou cobrar por artes não feitas.
            <br /><br />
            <strong className="text-red-400">A Craft Shop® nunca entra em contato primeiro!</strong> Se alguém te
            chamar no privado se passando por nós, desconfie imediatamente.
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

      {/* Warning note */}
      <div className="flex gap-3 bg-[#0f140f] border border-primary/20 p-5 mb-10">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <strong className="text-white">Tem provas?</strong>{" "}
          Prints das conversas e comprovante de pagamento ajudam muito. Use o formulário abaixo para
          enviar sua denúncia — a staff analisa e toma as providências necessárias.
        </p>
      </div>

      {/* Report CTA */}
      <div className="flex justify-center mb-10">
        <Button
          size="lg"
          className="h-14 px-10 bg-red-600 hover:bg-red-700 text-white font-mono font-bold rounded-none text-base"
          onClick={() => setShowForm(true)}
        >
          <ShieldAlert className="w-5 h-5 mr-3" />
          Abrir Denúncia
        </Button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget && !loading) reset(); }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 30 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-[#0e130e] border border-red-500/30 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-red-500/20">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6 text-red-400" />
                  <h2 className="font-mono font-bold text-white">Formulário de Denúncia</h2>
                </div>
                {!loading && (
                  <button onClick={reset} className="text-muted-foreground hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center gap-5 py-8"
                    >
                      <CheckCircle className="w-16 h-16 text-green-400" />
                      <div>
                        <h3 className="font-mono text-xl text-white mb-2">Denúncia enviada!</h3>
                        <p className="text-muted-foreground text-sm">
                          Nossa equipe irá analisar e tomar as providências necessárias.
                          Obrigado por ajudar a proteger a comunidade!
                        </p>
                      </div>
                      <Button onClick={reset} className="bg-primary text-black hover:bg-primary/90 font-mono rounded-none">
                        Fechar
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={submit} className="flex flex-col gap-5">
                      {/* Nick */}
                      <div>
                        <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                          Nick do Acusado *
                        </label>
                        <input
                          type="text"
                          value={form.accusedNick}
                          onChange={(e) => { setForm((f) => ({ ...f, accusedNick: e.target.value })); setErrors((er) => ({ ...er, accusedNick: undefined })); }}
                          placeholder="Nome/apelido do acusado"
                          maxLength={50}
                          className="w-full bg-[#0a140a] border border-primary/20 focus:border-primary outline-none text-white placeholder:text-muted-foreground px-3 py-2.5 text-sm transition-colors"
                        />
                        {errors.accusedNick && <p className="text-red-400 text-xs mt-1">{errors.accusedNick}</p>}
                      </div>

                      {/* Discord */}
                      <div>
                        <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                          @ do Discord do Acusado *
                          <span className="text-red-400/70 ml-2 normal-case">Links de servidor não permitidos</span>
                        </label>
                        <input
                          type="text"
                          value={form.accusedDiscord}
                          onChange={(e) => { setForm((f) => ({ ...f, accusedDiscord: e.target.value })); setErrors((er) => ({ ...er, accusedDiscord: undefined })); }}
                          placeholder="usuario#0000 ou nome de usuário"
                          maxLength={100}
                          className="w-full bg-[#0a140a] border border-primary/20 focus:border-primary outline-none text-white placeholder:text-muted-foreground px-3 py-2.5 text-sm transition-colors"
                        />
                        {errors.accusedDiscord && <p className="text-red-400 text-xs mt-1">{errors.accusedDiscord}</p>}
                      </div>

                      {/* Reason */}
                      <div>
                        <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                          Motivo da Denúncia *
                          <span className="text-primary/50 ml-2 normal-case">({form.reason.length}/1000)</span>
                        </label>
                        <textarea
                          value={form.reason}
                          onChange={(e) => { setForm((f) => ({ ...f, reason: e.target.value.slice(0, 1000) })); setErrors((er) => ({ ...er, reason: undefined })); }}
                          placeholder="Descreva o que aconteceu em detalhes..."
                          rows={4}
                          className="w-full bg-[#0a140a] border border-primary/20 focus:border-primary outline-none text-white placeholder:text-muted-foreground px-3 py-2.5 text-sm resize-none transition-colors"
                        />
                        {errors.reason && <p className="text-red-400 text-xs mt-1">{errors.reason}</p>}
                      </div>

                      {/* Images */}
                      <div>
                        <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                          Prints como prova (máx. 3 imagens)
                          <span className="text-red-400/70 ml-2 normal-case">Apenas imagens — links não aceitos</span>
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {form.images.map((img, idx) => (
                            <div key={idx} className="relative w-20 h-20 border border-primary/20 overflow-hidden group">
                              <img src={img.preview} alt={`prova-${idx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                              >
                                <Trash2 className="w-5 h-5 text-red-400" />
                              </button>
                            </div>
                          ))}
                          {form.images.length < 3 && (
                            <button
                              type="button"
                              onClick={() => fileRef.current?.click()}
                              className="w-20 h-20 border-2 border-dashed border-primary/20 hover:border-primary/50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Upload className="w-5 h-5" />
                              <span className="text-[10px] font-mono">Adicionar</span>
                            </button>
                          )}
                        </div>
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageAdd}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Formatos aceitos: PNG, JPG, JPEG, WEBP. Apenas imagens, não links!
                        </p>
                      </div>

                      {globalError && (
                        <p className="text-red-400 text-sm font-mono border border-red-900/40 bg-red-950/20 px-4 py-2">
                          ⚠ {globalError}
                        </p>
                      )}

                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={reset}
                          disabled={loading}
                          className="flex-1 border-white/10 text-muted-foreground hover:text-white rounded-none font-mono"
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-mono font-bold rounded-none"
                        >
                          {loading ? (
                            <span className="animate-pulse">Enviando...</span>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Enviar Denúncia
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
