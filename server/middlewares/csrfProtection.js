import crypto from "crypto";
import AppError from "../utils/AppError.js";
import config from "../config/app.config.js";

const CSRF_COOKIE_NAME = "csrfToken";
const CSRF_HEADER_NAME = "x-csrf-token";
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
const EXCLUDED_AUTH_PATHS = new Set([
    "/api/auth/register",
    "/api/auth/login",
    "/api/auth/google",
    "/api/auth/refresh",
]);

const cookieOptions = {
    httpOnly: false,
    secure: config.isProduction,
    sameSite: config.isProduction ? "none" : "lax",
    path: "/",
};

const csrfProtection = (req, res, next) => {
    const existingToken = req.cookies?.[CSRF_COOKIE_NAME];
    const token = existingToken || crypto.randomBytes(32).toString("hex");

    if (!existingToken) {
        res.cookie(CSRF_COOKIE_NAME, token, cookieOptions);
    }

    if (SAFE_METHODS.has(req.method) || EXCLUDED_AUTH_PATHS.has(req.path)) {
        next();
        return;
    }

    if (req.get(CSRF_HEADER_NAME) !== token) {
        next(new AppError("Invalid CSRF token", 403, "INVALID_CSRF_TOKEN"));
        return;
    }

    next();
};

export default csrfProtection;
