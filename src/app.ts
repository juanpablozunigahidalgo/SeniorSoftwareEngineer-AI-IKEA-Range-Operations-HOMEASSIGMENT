import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import productRoutes from "./routes/product.routes";
import { envs } from "./config/envs"; // <--- Usamos config
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log("📄 Swagger Docs available at http://localhost:3000/api-docs"); 

// Usamos el puerto desde la config centralizada
const PORT = envs.port; 

AppDataSource.initialize()
    .then(() => {
        console.log("📦 Base de Datos Conectada exitosamente!");

        app.use("/products", productRoutes);

        app.get("/", (req, res) => {
            res.json({ message: "API Inventory System - Ready 🟢" });
        });

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error: any) => {
        console.error("❌ Error conectando a la Base de Datos:", error);
    });