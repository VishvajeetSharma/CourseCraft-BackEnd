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

  // 🔒 Required for Supabase
  ssl: {
    rejectUnauthorized: false,
  },   
 
  // ⚙️ Environment-based config
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV === "development",

  // 📁 Paths
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],

  // 🚀 Extra (recommended)
  extra: {
    max: 10, // connection pool size
    family: 4,
  },
}); 