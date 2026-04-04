import 'dotenv/config'
import "reflect-metadata";
import { DataSource } from "typeorm";
import dns from 'dns';

// Parse DATABASE_URL to extract connection details
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const url = new URL(databaseUrl);

export const AppDataSource = new DataSource({ 
  type: "postgres",
  host: url.hostname,
  port: Number(url.port) || 5432,
  username: url.username,
  password: url.password,
  database: url.pathname.slice(1), // Remove leading '/'

  ssl: {
    rejectUnauthorized: false,
  },

  synchronize: false, // ❗ production me always false
  logging: false,

  // ❗ Render me build ke baad dist use hota hai
  entities: ["dist/entities/**/*.js"],
  migrations: ["dist/migrations/**/*.js"],

  extra: {
    max: 3,          // 🔥 reduce connections (Supabase free tier)
    family: 4,       // 🔥 force IPv4 (fix ENETUNREACH)
    lookup: (hostname: string, options: any, callback: any) => {
      dns.lookup(hostname, { family: 4 }, callback);
    },
  },
});