"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepository = void 0;
const data_source_1 = require("../data-source");
const Products_1 = require("../models/Products"); // Ojo: Tu archivo se llama Products.ts según la imagen
exports.productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product).extend({
// Aquí podríamos agregar métodos custom si la lógica fuera muy compleja SQL
// Por ahora, usamos los estándar de TypeORM (find, save, etc.)
});
