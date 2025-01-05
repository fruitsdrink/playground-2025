import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

// https://docs.expo.dev/versions/latest/sdk/sqlite/
// https://orm.drizzle.team/docs/connect-expo-sqlite
// https://orm.drizzle.team/docs/connect-op-sqlite#install-babel-plugin

export const sqliteDb = SQLite.openDatabaseSync("db.db", {
  enableChangeListener: true,
});

export const db = drizzle(sqliteDb, {
  // logger: process.env.NODE_ENV === "development" ? true : false,
});
