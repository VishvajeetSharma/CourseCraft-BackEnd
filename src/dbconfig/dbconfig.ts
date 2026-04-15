import 'dotenv/config'
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";

// export const AppDataSource = new DataSource({
//   type: "postgres",

//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT) || 5432,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,

//   synchronize: false,
//   logging: true,

//   entities: [path.join(__dirname, "../entities/**/*.ts")],
//   migrations: [path.join(__dirname, "../migrations/**/*.ts")],
//   subscribers: [path.join(__dirname, "../subscribers/**/*.ts")],

//   migrationsRun: true,
// });


export const AppDataSource = new DataSource({
  type: "postgres",

  url: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false,
  },

  synchronize: false,
  logging: false,

  entities: [path.join(__dirname, "../entities/**/*.js")],
  migrations: [path.join(__dirname, "../migrations/**/*.js")],
  subscribers: [path.join(__dirname, "../subscribers/**/*.js")],

  migrationsRun: true,
});