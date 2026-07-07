import app from "./app.js";
import connectDB from "./config/connectDB.js";
import config, { validateConfig } from "./config/app.config.js";
import logger from "./utils/logger.js";

const startServer = async () => {
    try {
        validateConfig()
        await connectDB()
        app.listen(config.port, () => {
            logger.info(`Server is running on port ${config.port}`)
        })
    } catch (error) {
        logger.error("Failed to start server", { message: error.message })
        process.exit(1)
    }
}

startServer()
