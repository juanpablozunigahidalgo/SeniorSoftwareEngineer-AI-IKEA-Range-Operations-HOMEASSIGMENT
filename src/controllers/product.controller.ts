import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class ProductController {
  
  async create(req: Request, res: Response) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Error creating product", error });
    }
  }

  async getAll(req: Request, res: Response) {
    const products = await productService.getAll();
    res.json(products);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const product = await productService.getOne(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const product = await productService.update(id, req.body);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  }

  async delete(req: Request, res: Response) {
    const success = await productService.delete(req.params.id);
    if (!success) return res.status(404).json({ message: "Product not found" });
    res.status(204).send();
  }

  async incrementStock(req: Request, res: Response) {
    const { id } = req.params;
    const { amount = 1 } = req.body; // Default a 1 si no viene
    
    if (amount <= 0) return res.status(400).json({ message: "Amount must be positive" });

    const result = await productService.adjustStock(id, amount, 'increment');
    if (result.error) return res.status(result.status!).json({ message: result.error });
    
    res.json(result.product);
  }

  async decrementStock(req: Request, res: Response) {
    const { id } = req.params;
    const { amount = 1 } = req.body;

    if (amount <= 0) return res.status(400).json({ message: "Amount must be positive" });

    const result = await productService.adjustStock(id, amount, 'decrement');
    if (result.error) return res.status(result.status!).json({ message: result.error });
    
    res.json(result.product);
  }
}