import 'dotenv/config'
import "reflect-metadata";
import { DataSource } from "typeorm";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST || "localhost",
//   port: Number(process.env.DB_PORT) || 5432,
//   username: process.env.DB_USER || "postgres",
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   synchronize: process.env.NODE_ENV !== "production",
//   logging: process.env.NODE_ENV === "development",
//   entities: ["src/entities/**/*.ts"],
//   migrations: ["src/migrations/**/*.ts"],
// });


export const AppDataSource = new DataSource({ 
  type: "postgres",
  url: process.env.DATABASE_URL,

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
  },
});