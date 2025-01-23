import { relations, sql } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";

export const habits = t.sqliteTable("habits", {
  id: t.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  color: t.text().default("#0099cc"),
  description: t.text().default(""),
  count: t.integer().default(1),
  icon: t.text().default(""),
  created_at: t.text().default(sql`(CURRENT_TIMESTAMP)`),
});

export const habitsRelations = relations(habits, ({ many }) => ({
  logs: many(habitLogs),
}));

export const habitLogs = t.sqliteTable("habitt_logs", {
  id: t.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  // date: t.integer({ mode: "timestamp" }).default(sql`(CURRENT_TIMESTAMP)`),
  // date: t
  //   .integer({ mode: "timestamp" })
  //   .notNull()
  // .default(sql`(CURRENT_DATE)`),
  date: t.integer({ mode: "timestamp" }).notNull(),
  completed: t.integer({ mode: "boolean" }).default(true),
  habit_id: t.integer().references(() => habits.id, {
    onDelete: "cascade",
  }), // foreign key
  count: t.integer().default(0),
  created_at: t.text().default(sql`(CURRENT_TIMESTAMP)`),
});

export const habitLogsRelations = relations(habitLogs, ({ one }) => ({
  habit: one(habits, {
    fields: [habitLogs.habit_id],
    references: [habits.id],
  }),
}));
