import mongoose from "mongoose";
import config from "./app.config.js";
import logger from "../utils/logger.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongo.url, {
            autoIndex: !config.isProduction,
        })
        logger.info("MongoDB connected successfully")
    } catch (error) {
        logger.error("Error connecting to MongoDB", { message: error.message })
        throw error
    }
}

export default connectDB
