import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProduct = async(req, res) => {
    //we are just going to find all the products in the database
    try {
        const products = await Product.find({}); //if we pass an empty object then that means fetch/return all products that we have in the databse
        res.status(200).json({success: true, data: products}); //returning the products as a list of objects
    }
    catch(error) {
        console.log("error in fetching prodcuts: ", error.message);
        res.status(500).json({success: false, message: "Server Error"});
        //we are putitng these console log for only debugging purposes..
    }
};

export const createProduct = async (req, res) => { //making the function async to use await
    const product = req.body; //user will send this data (user will pass)(extracted from the user)
    if (!product.name || !product.price || !product.image) { //check for requirements by ourselves
        //if any of them is not provided, then we respond back with status code of 400
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }
    const newProduct = new Product(product) //this product object is coming from the product.js file that we created just before
    //inside that we put the product body that we got from the user

    try {
        await newProduct.save(); //this is going to save it to the database
        //and once we do we can respond with a status code of 201 which means something is created
        res.status(201).json({success:true, data: newProduct}); //just returning the newProduct as response (as an object)
    }
    catch (error){
        console.error("Error in Create product:", error.message); //just printing error
        res.status(500).json({success: false, message: "Server Error"}); //500 means internal server error
    }
};

export const updateProduct = async (req, res) => { //destructure the id again..
    const {id} = req.params; //destructuring the id broo
    console.log("id", id);
    const product = req.body; //this is going to be the fields such as name, image and price whatever the user wants to update.
    //the user might want to update all of them or some of them..
    //this req.body is basically the postman part where we type our object what we are sending.

    //If we want to also handle the 404 error(which means the id does not exist in the database) before itself, then what we can do is: 
    if (!mongoose.Types.ObjectId.isValid(id)) { //if id is not valid then return status 404 error
        res.status(404).json({success:false, response: "Invalid product ID"});
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});//finding by the id then updating by sending the product which we got from request.body
        //we can add one more object in the above findByIdAndUpdate which is {new:true}
        //why? because this method will return the old object before the update hrouterened, by saying new:true, it will give the updated object..
        res.status(200).json({success: true, data: updatedProduct});
    }
    catch(error) {
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const deleteProduct = async (req, res) => {
    //what we will do is just get the id from the url
    const {id} = req.params; //destructure the id coming from request.params (it is id because that is what our dynamic thing name is)
    console.log("id", id);
    if (!mongoose.Types.ObjectId.isValid(id)) { //if id is not valid then return status 404 error
        res.status(404).json({success:false, response: "Invalid product ID"});
    }
    try {
        //finding by id then trying to delete. If does not then await raises error..
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    }
    catch(error) {
        //handling the error when the id does not exist in the database itself
        console.log("error in deleting the product:", error.message);
        res.status(500).json({success:false, response: "Product not found"});
    }
};