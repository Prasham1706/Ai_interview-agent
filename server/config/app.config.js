import dotenv from "dotenv";

dotenv.config();

const parseList = (value, fallback = []) => {
    if (!value) {
        return fallback;
    }

    return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
};

const toNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const config = {
    env: process.env.NODE_ENV || "development",
    isProduction: process.env.NODE_ENV === "production",
    port: toNumber(process.env.PORT, 8000),
    clientUrls: parseList(process.env.CLIENT_URLS || process.env.CLIENT_URL, ["http://localhost:5173"]),
    mongo: {
        url: process.env.MONGODB_URL,
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
        accessCookieName: process.env.ACCESS_TOKEN_COOKIE_NAME || "accessToken",
        refreshCookieName: process.env.REFRESH_TOKEN_COOKIE_NAME || "refreshToken",
    },
    rateLimit: {
        windowMs: toNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
        max: toNumber(process.env.RATE_LIMIT_MAX, 300),
        authMax: toNumber(process.env.AUTH_RATE_LIMIT_MAX, 20),
        aiMax: toNumber(process.env.AI_RATE_LIMIT_MAX, 20),
    },
};

export const validateConfig = () => {
    const missing = [];

    if (!config.mongo.url) {
        missing.push("MONGODB_URL");
    }

    if (!config.jwt.accessSecret) {
        missing.push("JWT_ACCESS_SECRET or JWT_SECRET");
    }

    if (!config.jwt.refreshSecret) {
        missing.push("JWT_REFRESH_SECRET or JWT_SECRET");
    }

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
};

export default config;
