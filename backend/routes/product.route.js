import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js"; //to use the controller functions

const router = express.Router();

router.get("/", getProduct); //using the controller function instead
//creating a route and listening for a get method (upto / is our 5000 port then next wherever we go we add)
router.post("/", createProduct);
router.patch("/:id", updateProduct);
//to be able to delete a product, we need an id, (it is the _id)
//we will be pasting that id to the end point of our link like this http://localhost:5000/api/products/67e550cc6c447937fdbb12a2
//to get the id, we will be using :id which means that it is going to be dynamic based on the user..
router.delete("/:id", deleteProduct);

export default router;