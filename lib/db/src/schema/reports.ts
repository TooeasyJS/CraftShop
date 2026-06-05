import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reportsTable = pgTable("reports", {
  id: serial("id").primaryKey(),
  accusedNick: text("accused_nick").notNull(),
  accusedDiscord: text("accused_discord").notNull(),
  reason: text("reason").notNull(),
  images: jsonb("images").$type<string[]>().default([]),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const DISCORD_LINK_PATTERN = /discord\.gg\//i;

export const insertReportSchema = createInsertSchema(reportsTable)
  .omit({ id: true, createdAt: true, status: true })
  .extend({
    accusedNick: z.string().min(2).max(50),
    accusedDiscord: z.string().min(2).max(100).refine(
      (v) => !DISCORD_LINK_PATTERN.test(v),
      "Links de Discord não são permitidos neste campo"
    ),
    reason: z.string().min(10).max(1000).refine(
      (v) => !DISCORD_LINK_PATTERN.test(v),
      "Links de Discord não são permitidos na descrição"
    ),
    images: z.array(z.string().startsWith("data:image/")).max(3).optional(),
  });

export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reportsTable.$inferSelect;
