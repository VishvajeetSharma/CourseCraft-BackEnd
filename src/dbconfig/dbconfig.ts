import 'dotenv/config'
import "reflect-metadata";
import { DataSource } from "typeorm";

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",

  // 🔀 Auto switch: Local vs Production
  ...(isProduction
    ? {
        url: process.env.DATABASE_URL, // 🌍 Render / Cloud DB
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),

  synchronize: false, // ❗ kabhi true nahi in production
  logging: !isProduction,

  // 📁 Paths auto switch
  entities: isProduction
    ? ["dist/entities/**/*.js"]
    : ["src/entities/**/*.ts"],

  migrations: isProduction
    ? ["dist/migrations/**/*.js"]
    : ["src/migrations/**/*.ts"],

  subscribers: isProduction
    ? ["dist/subscribers/**/*.js"]
    : ["src/subscribers/**/*.ts"],

  migrationsRun: true, // 🚀 auto run migrations
});