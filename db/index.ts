import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.DRIZZLE_DB_URL!);
