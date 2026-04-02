import 'dotenv/config'
import "reflect-metadata";
import { DataSource } from "typeorm";

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

export const AppDataSource = new DataSource({
  type:"postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/entities/migration/**/*.ts"],
  subscribers: ["src/entities/sunscriber/**/*.ts"],                                                     
})