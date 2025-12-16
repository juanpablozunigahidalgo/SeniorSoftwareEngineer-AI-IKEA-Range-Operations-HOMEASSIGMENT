"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
const productController = new product_controller_1.ProductController();
// CRUD
router.post("/", (req, res) => productController.create(req, res));
router.get("/", (req, res) => productController.getAll(req, res));
router.get("/:id", (req, res) => productController.getOne(req, res));
router.put("/:id", (req, res) => productController.update(req, res));
router.delete("/:id", (req, res) => productController.delete(req, res));
// Stock Operations
router.post("/:id/increment", (req, res) => productController.incrementStock(req, res));
router.post("/:id/decrement", (req, res) => productController.decrementStock(req, res));
exports.default = router;
