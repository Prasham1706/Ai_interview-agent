import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
dotenv.config()// this will load the environment variables from the .env file into process.env

const app = express()// this is the main app object that we will use to define our routes and middleware
const PORT = process.env.PORT || 6000 // this is the port that the server will listen on. We can set it in the .env file or use a default value of 6000


app.get('/', (req, res) => {//Tell the server what to do for specific URLs.
    return res.json({ message: "Hello from server"})
})

app.listen(PORT, () => {//app.listen() → Turn the server on and start accepting requests
    console.log(`Server is running on port ${PORT}`)
    connectDB()// this will connect to the MongoDB database using the connectDB function that we defined in the connectDB.js file
})
