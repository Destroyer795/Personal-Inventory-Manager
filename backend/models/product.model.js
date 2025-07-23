import mongoose from "mongoose";
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true //makes sure that it has createdAt, updatedAt on each documents
});

const Product = mongoose.model('Product', productSchema);
//basically this says to mongoose that you should create a model or a collection called Product and
//the second para is the schema that you should take a look for each product

//we have put a singular capitalized name called Product, not products because mongoose will automatiically
//convert it to products in itself, so it wants that singular capitalized only from us.
export default Product; //because we will be using in different files later