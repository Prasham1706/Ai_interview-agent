import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
dotenv.config()// this will load the environment variables from the .env file into process.env
import cors from "cors"
import authRouter from "./routes/auth.route.js";


const app = express()// this is the main app object that we will use to define our routes and middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))



app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)

const PORT = process.env.PORT || 6000 // this is the port that the server will listen on. We can set it in the .env file or use a default value of 6000

app.listen(PORT, () => {//app.listen() → Turn the server on and start accepting requests
    console.log(`Server is running on port ${PORT}`)
    connectDB()// this will connect to the MongoDB database using the connectDB function that we defined in the connectDB.js file
})
