import { Router } from "express";
import { eq, desc, avg, count } from "drizzle-orm";
import { db, reviewsTable, insertReviewSchema } from "@workspace/db";

const router = Router();

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await db
      .select()
      .from(reviewsTable)
      .orderBy(desc(reviewsTable.createdAt));

    const [stats] = await db
      .select({ avg: avg(reviewsTable.stars), total: count(reviewsTable.id) })
      .from(reviewsTable);

    res.json({
      reviews,
      average: stats?.avg ? Number(Number(stats.avg).toFixed(1)) : null,
      total: Number(stats?.total ?? 0),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch reviews");
    res.status(500).json({ error: "Erro interno ao buscar avaliações" });
  }
});

router.post("/reviews", async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Token do Discord obrigatório" });
  }

  let discordUser: {
    id: string;
    username: string;
    avatar: string | null;
    global_name: string | null;
  };
  try {
    const discordRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!discordRes.ok) {
      return res.status(401).json({
        error: "Token Discord inválido ou expirado. Faça login novamente.",
      });
    }
    discordUser = (await discordRes.json()) as typeof discordUser;
  } catch (err) {
    req.log.error({ err }, "Discord API call failed");
    return res.status(502).json({ error: "Erro ao verificar autenticação Discord" });
  }

  const existing = await db
    .select({ id: reviewsTable.id })
    .from(reviewsTable)
    .where(eq(reviewsTable.discordId, discordUser.id))
    .limit(1);

  if (existing.length > 0) {
    return res.status(409).json({ error: "Você já enviou uma avaliação. Obrigado!" });
  }

  const parsed = insertReviewSchema.safeParse({
    discordId: discordUser.id,
    discordUsername: discordUser.username,
    discordAvatar: discordUser.avatar,
    discordGlobalName: discordUser.global_name,
    stars: req.body.stars,
    comment: req.body.comment,
  });

  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos", details: parsed.error.issues });
  }

  try {
    const [review] = await db.insert(reviewsTable).values(parsed.data).returning();
    return res.status(201).json(review);
  } catch (err) {
    req.log.error({ err }, "Failed to insert review");
    return res.status(500).json({ error: "Erro interno ao salvar avaliação" });
  }
});

export default router;
