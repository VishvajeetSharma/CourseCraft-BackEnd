import "dotenv/config";
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

const isDev = process.env.NODE_ENV !== "production";

export const AppDataSource = new DataSource({
  type: "postgres",

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl:
    process.env.DB_SSL === "true"
      ? { rejectUnauthorized: false }
      : false,

  synchronize: false,
  logging: true,

  // ✅ FIXED: dev + prod support
  entities: [
    path.join(
      __dirname,
      isDev ? "../entities/**/*.ts" : "../entities/**/*.js"
    ),
  ],

  migrations: [
    path.join(
      __dirname,
      isDev ? "../migrations/**/*.ts" : "../migrations/**/*.js"
    ),
  ],

  subscribers: [
    path.join(
      __dirname,
      isDev ? "../subscribers/**/*.ts" : "../subscribers/**/*.js"
    ),
  ],

  migrationsRun: true,
});