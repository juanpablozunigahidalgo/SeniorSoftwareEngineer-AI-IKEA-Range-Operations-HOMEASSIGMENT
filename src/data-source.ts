import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./models/Products"; // Asegúrate que el nombre coincida con tu archivo
import { envs } from "./config/envs"; // <--- IMPORTAMOS LA NUEVA CONFIG

// LOG
console.log("🕵️ DATOS DE CONEXIÓN:", {
    host: envs.db.host,
    user: envs.db.username,
    pass: envs.db.password, // ¿Qué contraseña sale aquí?
    port: envs.db.port
});
// 


export const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.db.host,
    port: envs.db.port,
    username: envs.db.username,
    password: envs.db.password,
    database: envs.db.name,
    synchronize: true,
    logging: false,
    entities: [Product],
    subscribers: [],
    migrations: [],
});