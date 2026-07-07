import config from "../config/app.config.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/token.js";

const isAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.[config.jwt.accessCookieName] || req.cookies?.token;

    if (!token) {
        throw new AppError("Authentication token is required", 401, "AUTH_TOKEN_REQUIRED");
    }

    const payload = verifyAccessToken(token);

    req.userId = payload.userId;
    req.userRole = payload.role;
    next();
});

export default isAuth
