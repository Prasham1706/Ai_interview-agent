import config from "../config/app.config.js";

export const accessCookieOptions = () => ({
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
    path: "/"
})

export const refreshCookieOptions = () => ({
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth"
})
