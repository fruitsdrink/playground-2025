import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { db, sqliteDb } from "@/db/init";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

export function useLocalMigrations() {
  if (__DEV__) {
    useDrizzleStudio(sqliteDb);
  }
  return useMigrations(db, migrations);
}
