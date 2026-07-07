import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import auditLogger from "./middlewares/auditLogger.js";
import csrfProtection from "./middlewares/csrfProtection.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import { apiRateLimiter } from "./middlewares/rateLimiters.js";
import { applySecurityMiddleware } from "./middlewares/security.js";

const app = express();

applySecurityMiddleware(app);
app.use(cookieParser());
app.use(apiRateLimiter);
app.use(csrfProtection);
app.use(auditLogger);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TalentAI API is running",
    });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
