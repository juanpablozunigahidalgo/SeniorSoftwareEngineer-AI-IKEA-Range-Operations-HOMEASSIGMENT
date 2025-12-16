"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
const productService = new product_service_1.ProductService();
class ProductController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productService.create(req.body);
                res.status(201).json(product);
            }
            catch (error) {
                res.status(400).json({ message: "Error creating product", error });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield productService.getAll();
            res.json(products);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield productService.getOne(id);
            if (!product)
                return res.status(404).json({ message: "Product not found" });
            res.json(product);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield productService.update(id, req.body);
            if (!product)
                return res.status(404).json({ message: "Product not found" });
            res.json(product);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const success = yield productService.delete(req.params.id);
            if (!success)
                return res.status(404).json({ message: "Product not found" });
            res.status(204).send();
        });
    }
    incrementStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { amount = 1 } = req.body; // Default a 1 si no viene
            if (amount <= 0)
                return res.status(400).json({ message: "Amount must be positive" });
            const result = yield productService.adjustStock(id, amount, 'increment');
            if (result.error)
                return res.status(result.status).json({ message: result.error });
            res.json(result.product);
        });
    }
    decrementStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { amount = 1 } = req.body;
            if (amount <= 0)
                return res.status(400).json({ message: "Amount must be positive" });
            const result = yield productService.adjustStock(id, amount, 'decrement');
            if (result.error)
                return res.status(result.status).json({ message: result.error });
            res.json(result.product);
        });
    }
}
exports.ProductController = ProductController;
