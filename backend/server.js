import express, { response } from 'express';
import dotenv from "dotenv";
import path from "path";

import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";

dotenv.config(); // Loads .env variables

const app = express(); //calling the function


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //allows us to accept JSON data in the req.body

app.use("/api/products/", productRoutes);

//here we are going to check our environment (production or development)
if (process.env.NODE_ENV == "production") { //that means we deploy the application
    //so we will have some kind of different configuration
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    //just like that we made our dist folder to be our static asset
    //the above thing basically says that go to root then go to frontend then go inside dist folder

    app.get("*", (req, res) => {//if we send any request (*) (other than /api/products) then we should render our react application
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at our http://localhost:" + PORT);
}); //listening for a port then running a callback