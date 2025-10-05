import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();


const mongo_uri =process.env.MONGO_URI

async function connect() {
    if (!mongo_uri) {
        console.error("FATAL ERROR: MONGO_URI is not defined in environment variables.");
         
        process.exit(1); 
    }

    try {
         
        await mongoose.connect(mongo_uri, {
             
            serverSelectionTimeoutMS: 5000, 
        });

        console.log(" Database successfully connected to MongoDB.");
    } catch (err) {
        console.error(" Database Connection Error:");
        console.error(err.message); 
         
        process.exit(1); 
    }
}

export default connect;