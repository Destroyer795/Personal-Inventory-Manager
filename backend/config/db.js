import mongoose from "mongoose"

export const connectDB = async () => { //exporting that function as well and this is an async function
    try {
        //we will use mongoose package to be able to connect our database
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); 
    }
}