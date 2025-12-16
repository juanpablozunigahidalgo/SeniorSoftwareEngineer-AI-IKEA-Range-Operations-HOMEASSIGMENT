"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Products_1 = require("./models/Products"); // Asegúrate que el nombre coincida con tu archivo
const envs_1 = require("./config/envs"); // <--- IMPORTAMOS LA NUEVA CONFIG
// LOG
console.log("🕵️ DATOS DE CONEXIÓN:", {
    host: envs_1.envs.db.host,
    user: envs_1.envs.db.username,
    pass: envs_1.envs.db.password, // ¿Qué contraseña sale aquí?
    port: envs_1.envs.db.port
});
// 
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.envs.db.host,
    port: envs_1.envs.db.port,
    username: envs_1.envs.db.username,
    password: envs_1.envs.db.password,
    database: envs_1.envs.db.name,
    synchronize: true,
    logging: false,
    entities: [Products_1.Product],
    subscribers: [],
    migrations: [],
});
