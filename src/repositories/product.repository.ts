import { AppDataSource } from "../data-source";
import { Product } from "../models/Products"; // Ojo: Tu archivo se llama Products.ts según la imagen

export const productRepository = AppDataSource.getRepository(Product).extend({
  // Aquí podríamos agregar métodos custom si la lógica fuera muy compleja SQL
  // Por ahora, usamos los estándar de TypeORM (find, save, etc.)
});