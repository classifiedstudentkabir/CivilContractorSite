import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const raw = process.env.DATABASE_URL || "<none>";
const masked = raw.replace(/:\/\/([^:]+):([^@]+)@/, "://$1:********@");
console.log("drizzle using DATABASE_URL:", masked);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
