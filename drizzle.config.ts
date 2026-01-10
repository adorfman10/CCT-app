import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  schema: "./db/schema",
  out: "./db/migrations",
  dbCredentials: {
    url: process.env.DRIZZLE_DB_URL!,
  },
});
