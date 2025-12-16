"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const envs_1 = require("./config/envs"); // <--- Usamos config
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
console.log("📄 Swagger Docs available at http://localhost:3000/api-docs");
// Usamos el puerto desde la config centralizada
const PORT = envs_1.envs.port;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("📦 Base de Datos Conectada exitosamente!");
    app.use("/products", product_routes_1.default);
    app.get("/", (req, res) => {
        res.json({ message: "API Inventory System - Ready 🟢" });
    });
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("❌ Error conectando a la Base de Datos:", error);
});
