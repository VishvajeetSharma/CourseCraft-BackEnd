import 'dotenv/config'
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",

  url: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV !== "production" ? { rejectUnauthorized: false } : undefined,

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: false,
  logging: process.env.NODE_ENV === "production",

  entities: [path.join(__dirname, "../entities/**/*.{js,ts}")],
  migrations: [path.join(__dirname, "../migrations/**/*.{js,ts}")],
  subscribers: [path.join(__dirname, "../subscribers/**/*.{js,ts}")],

  migrationsRun: true,
});