import 'dotenv/config'
import "reflect-metadata";
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
  type: "postgres",

  url: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false,
  },

  synchronize: false, // ❗ production me kabhi true nahi

  logging: false,

  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],

  migrationsRun: true, // 👈 start hote hi migrations run karega
});

// export const AppDataSource = new DataSource({
//   type: "postgres",

//   url: process.env.DATABASE_URL, // 👈 ye main fix hai

//   ssl: {
//     rejectUnauthorized: false,
//   },

//   synchronize: false, // ❗ production me false

//   entities: ["dist/entities/**/*.js"], // 👈 deployment ke liye
//   migrations: ["dist/migration/**/*.js"],
//   subscribers: ["dist/subscriber/**/*.js"],
// });




