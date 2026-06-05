import { Router } from "express";
import { db } from "@workspace/db";
import { reportsTable, insertReportSchema } from "@workspace/db";

const router = Router();

router.post("/reports", async (req, res) => {
  const parsed = insertReportSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Dados inválidos", details: parsed.error.issues });
  }

  try {
    const [report] = await db.insert(reportsTable).values(parsed.data).returning({
      id: reportsTable.id,
      createdAt: reportsTable.createdAt,
    });
    return res.status(201).json({ success: true, id: report.id });
  } catch (err) {
    req.log.error({ err }, "Failed to insert report");
    return res.status(500).json({ error: "Erro interno ao salvar denúncia" });
  }
});

export default router;
