import rateLimit from "express-rate-limit";
import config from "../config/app.config.js";

const baseOptions = {
    windowMs: config.rateLimit.windowMs,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
        code: "RATE_LIMITED",
    },
};

export const apiRateLimiter = rateLimit({
    ...baseOptions,
    max: config.rateLimit.max,
});

export const authRateLimiter = rateLimit({
    ...baseOptions,
    max: config.rateLimit.authMax,
});

export const aiRateLimiter = rateLimit({
    ...baseOptions,
    max: config.rateLimit.aiMax,
});
