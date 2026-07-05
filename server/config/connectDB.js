import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL is not configured")
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log(`Error connecting to MongoDB : ${error.message}`)
        throw error
    }
}

export default connectDB
