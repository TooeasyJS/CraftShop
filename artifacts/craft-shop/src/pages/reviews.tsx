import { useState, useEffect } from "react";
import { Star, MessageSquare, Send, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const DISCORD_LINK = "https://discord.gg/J7bufuWvh";

interface DiscordUser {
  id: string;
  username: string;
  avatar: string | null;
  global_name: string | null;
}

interface Review {
  id: number;
  discordId: string;
  discordUsername: string;
  discordAvatar: string | null;
  discordGlobalName: string | null;
  stars: number;
  comment: string;
  createdAt: string;
}

function getAvatarUrl(review: Review) {
  if (!review.discordAvatar)
    return `https://cdn.discordapp.com/embed/avatars/${parseInt(review.discordId) % 5}.png`;
  return `https://cdn.discordapp.com/avatars/${review.discordId}/${review.discordAvatar}.webp?size=64`;
}

function StarPicker({ value, onChange, max = 10 }: { value: number; onChange: (v: number) => void; max?: number }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1 flex-wrap">
      {Array.from({ length: max }).map((_, i) => {
        const n = i + 1;
        const filled = n <= (hover || value);
        return (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(n)}
            className="transition-transform hover:scale-125"
          >
            <Star
              className={`w-7 h-7 transition-colors ${filled ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`}
            />
          </button>
        );
      })}
      {value > 0 && (
        <span className="ml-2 font-mono text-yellow-400 self-center text-sm">
          {value}/10
        </span>
      )}
    </div>
  );
}

function StarDisplay({ value, max = 10 }: { value: number; max?: number }) {
  return (
    <div className="flex gap-0.5 flex-wrap">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < value ? "fill-yellow-400 text-yellow-400" : "text-white/10"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const name = review.discordGlobalName || review.discordUsername;
  const date = new Date(review.createdAt).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-[#0f140f] border border-primary/20 hover:border-primary/50 transition-all duration-300 p-5 flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <img
          src={getAvatarUrl(review)}
          alt={name}
          className="w-10 h-10 rounded-full border border-primary/30"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://cdn.discordapp.com/embed/avatars/0.png`;
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-mono font-bold text-white text-sm truncate">{name}</span>
            <span className="text-xs text-muted-foreground font-mono shrink-0">{date}</span>
          </div>
          <StarDisplay value={review.stars} />
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">
        &ldquo;{review.comment}&rdquo;
      </p>
    </motion.div>
  );
}

function ReviewForm({
  discordUser,
  token,
  onSubmitted,
}: {
  discordUser: DiscordUser;
  token: string;
  onSubmitted: () => void;
}) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (stars === 0) { setError("Escolha uma nota de 1 a 10 estrelas."); return; }
    if (comment.trim().length < 10) { setError("O comentário precisa ter pelo menos 10 caracteres."); return; }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stars, comment: comment.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erro ao enviar avaliação."); return; }
      onSubmitted();
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const name = discordUser.global_name || discordUser.username;

  return (
    <form onSubmit={submit} className="bg-[#0f140f] border border-primary/30 p-6 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center overflow-hidden">
          {discordUser.avatar ? (
            <img
              src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp?size=64`}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-mono text-primary text-sm">{name[0]}</span>
          )}
        </div>
        <div>
          <span className="font-mono text-white text-sm font-bold">{name}</span>
          <span className="text-xs text-primary block">Avaliando como cliente verificado</span>
        </div>
      </div>

      <div>
        <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3 block">
          Sua nota (1-10 estrelas) *
        </label>
        <StarPicker value={stars} onChange={setStars} />
      </div>

      <div>
        <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
          Comentário * <span className="text-primary/50">({comment.length}/500)</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value.slice(0, 500))}
          placeholder="Conta pra gente como foi sua experiência com a Craft Shop..."
          rows={4}
          className="w-full bg-[#0a140a] border border-primary/20 focus:border-primary outline-none text-white placeholder:text-muted-foreground p-3 text-sm font-sans resize-none transition-colors"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm font-mono border border-red-900/40 bg-red-950/20 px-4 py-2">
          ⚠ {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="bg-primary text-black hover:bg-primary/90 font-mono font-bold rounded-none h-12"
      >
        {loading ? (
          <span className="animate-pulse">Enviando...</span>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" /> Enviar Avaliação
          </>
        )}
      </Button>
    </form>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState<number | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);
  const [discordToken, setDiscordToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("discord_user");
    const token = localStorage.getItem("discord_token");
    if (saved && token) {
      try {
        setDiscordUser(JSON.parse(saved));
        setDiscordToken(token);
      } catch {
        localStorage.removeItem("discord_user");
        localStorage.removeItem("discord_token");
      }
    }
    loadReviews();
  }, []);

  async function loadReviews() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews ?? []);
        setAverage(data.average);
        setTotal(data.total);
      }
    } finally {
      setLoading(false);
    }
  }

  const alreadyReviewed =
    discordUser
      ? reviews.some((r) => r.discordId === discordUser.id)
      : false;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-mono text-primary text-glow mb-4">AVALIAÇÕES</h1>
        <p className="text-xl text-muted-foreground">
          Opiniões reais dos clientes da Craft Shop®.
        </p>
      </div>

      {/* Stats bar */}
      {total > 0 && average !== null && (
        <div className="bg-[#0f140f] border border-primary/20 p-6 mb-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-primary text-glow">{average.toFixed(1)}</div>
            <div className="font-mono text-yellow-400 text-sm mt-1">★ / 10</div>
            <div className="text-xs text-muted-foreground font-mono mt-1">{total} avaliação{total !== 1 ? "ões" : ""}</div>
          </div>
          <div className="h-px sm:h-16 sm:w-px bg-primary/20 w-full sm:w-auto" />
          <div className="flex-1 flex flex-col gap-2 w-full">
            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((star) => {
              const c = reviews.filter((r) => r.stars === star).length;
              const pct = total > 0 ? Math.round((c / total) * 100) : 0;
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono w-4">{star}</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 shrink-0" />
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono w-4">{c}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Form section */}
      <div className="mb-12">
        <h2 className="text-xl font-mono mb-6 border-l-4 border-primary pl-4">DEIXAR AVALIAÇÃO</h2>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0f140f] border border-primary/30 p-8 text-center flex flex-col items-center gap-4"
            >
              <div className="text-4xl">🎉</div>
              <h3 className="font-mono text-xl text-primary">Avaliação enviada!</h3>
              <p className="text-muted-foreground text-sm">
                Obrigado pelo feedback! Ele já aparece na lista abaixo.
              </p>
              <Button onClick={loadReviews} variant="outline" className="border-primary/30 text-primary font-mono rounded-none">
                Recarregar avaliações
              </Button>
            </motion.div>
          ) : alreadyReviewed ? (
            <motion.div
              key="already"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#0f140f] border border-primary/20 p-6 text-center"
            >
              <p className="text-muted-foreground font-mono">✅ Você já enviou sua avaliação. Obrigado!</p>
            </motion.div>
          ) : discordUser && discordToken ? (
            <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <ReviewForm
                discordUser={discordUser}
                token={discordToken}
                onSubmitted={() => { setSubmitted(true); loadReviews(); }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0f140f] border border-primary/20 p-8 text-center flex flex-col items-center gap-5"
            >
              <Lock className="w-10 h-10 text-primary/50" />
              <div>
                <p className="font-mono text-white mb-2">Login necessário</p>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Para deixar uma avaliação, entre com sua conta Discord. Isso garante que só clientes reais avaliam!
                </p>
              </div>
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-mono rounded-none gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Entrar com Discord
                </Button>
              </a>
              <p className="text-xs text-muted-foreground">
                Clique em &ldquo;Entrar com Discord&rdquo; no menu lateral e volte aqui
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reviews list */}
      <div>
        <h2 className="text-xl font-mono mb-6 border-l-4 border-primary pl-4">
          AVALIAÇÕES DOS CLIENTES {total > 0 && <span className="text-muted-foreground text-sm ml-2">({total})</span>}
        </h2>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#0f140f] border border-primary/10 p-5 animate-pulse h-28" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <Star className="w-12 h-12 text-primary/20" />
            <p className="font-mono text-muted-foreground text-lg">Nenhuma avaliação ainda.</p>
            <p className="text-muted-foreground text-sm">Seja o primeiro a avaliar a Craft Shop®!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
