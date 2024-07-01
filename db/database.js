import mongoose from "mongoose";

export const connectToDatabase = async() =>{
    const mongoURI = process.env.MONGO_URI
    try{
        const db = await mongoose.connect(mongoURI)
        console.log("Connected to DB : " + db.connection.name)
    }catch(error){
        console.log("Error connecting to database", error)
        process.exit(1)
    }
}