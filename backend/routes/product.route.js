import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js"; //to use the controller functions

const router = express.Router();

router.get("/", getProduct); //using the controller function instead
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;