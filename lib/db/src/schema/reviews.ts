import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  discordId: text("discord_id").notNull(),
  discordUsername: text("discord_username").notNull(),
  discordAvatar: text("discord_avatar"),
  discordGlobalName: text("discord_global_name"),
  stars: integer("stars").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertReviewSchema = createInsertSchema(reviewsTable)
  .omit({ id: true, createdAt: true })
  .extend({
    stars: z.number().int().min(1).max(10),
    comment: z.string().min(10).max(500),
  });

export const selectReviewSchema = createSelectSchema(reviewsTable);

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviewsTable.$inferSelect;
