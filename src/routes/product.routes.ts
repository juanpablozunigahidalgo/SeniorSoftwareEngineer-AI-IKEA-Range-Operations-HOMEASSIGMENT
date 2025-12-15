import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const router = Router();
const productController = new ProductController();

// CRUD
router.post("/", (req, res) => productController.create(req, res));
router.get("/", (req, res) => productController.getAll(req, res));
router.get("/:id", (req, res) => productController.getOne(req, res));
router.put("/:id", (req, res) => productController.update(req, res));
router.delete("/:id", (req, res) => productController.delete(req, res));

// Stock Operations
router.post("/:id/increment", (req, res) => productController.incrementStock(req, res));
router.post("/:id/decrement", (req, res) => productController.decrementStock(req, res));

export default router;