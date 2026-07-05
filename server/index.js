import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config()

const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TalentAI API is running"
    })
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

const PORT = process.env.PORT || 8000

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`)
        process.exit(1)
    }
}

startServer()
