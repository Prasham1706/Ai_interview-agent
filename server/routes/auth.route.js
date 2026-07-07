import express from "express"
import { googleAuth, logOut, login, refresh, register } from "../controllers/auth.controller.js"
import { authRateLimiter } from "../middlewares/rateLimiters.js"


const authRouter = express.Router()


authRouter.post("/register", authRateLimiter, register)
authRouter.post("/login", authRateLimiter, login)
authRouter.post("/google", authRateLimiter, googleAuth)
authRouter.post("/refresh", authRateLimiter, refresh)
authRouter.post("/logout", logOut)
authRouter.get("/logout", logOut)


export default authRouter
