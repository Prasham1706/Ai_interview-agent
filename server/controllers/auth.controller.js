import config from "../config/app.config.js";
import {
    findOrCreateGoogleUser,
    loginUser,
    logoutUser,
    refreshUserSession,
    registerUser,
} from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { accessCookieOptions, refreshCookieOptions } from "../utils/cookieOptions.js";
import { getRequestMetadata } from "../utils/session.js";
import { verifyRefreshToken } from "../utils/token.js";
import AppError from "../utils/AppError.js";
import {
    validateGoogleAuthPayload,
    validateLoginPayload,
    validateRegisterPayload,
} from "../validators/auth.validator.js";

const setAuthCookies = (res, { accessToken, refreshToken }) => {
    res.cookie(config.jwt.accessCookieName, accessToken, accessCookieOptions());
    res.cookie(config.jwt.refreshCookieName, refreshToken, refreshCookieOptions());
};

const clearAuthCookies = (res) => {
    res.clearCookie(config.jwt.accessCookieName, accessCookieOptions());
    res.clearCookie(config.jwt.refreshCookieName, refreshCookieOptions());
};

export const register = asyncHandler(async (req, res) => {
    const { error, value } = validateRegisterPayload(req.body);
    if (error) {
        throw new AppError(error, 400, "VALIDATION_ERROR");
    }

    const session = await registerUser(value, getRequestMetadata(req));
    setAuthCookies(res, session);

    return sendSuccess(res, 201, {
        message: "Registration successful",
        user: session.user,
    });
});

export const login = asyncHandler(async (req, res) => {
    const { error, value } = validateLoginPayload(req.body);
    if (error) {
        throw new AppError(error, 400, "VALIDATION_ERROR");
    }

    const session = await loginUser(value, getRequestMetadata(req));
    setAuthCookies(res, session);

    return sendSuccess(res, 200, {
        message: "Login successful",
        user: session.user,
    });
});

export const googleAuth = asyncHandler(async (req, res) => {
    const { error, value } = validateGoogleAuthPayload(req.body);
    if (error) {
        throw new AppError(error, 400, "VALIDATION_ERROR");
    }

    const session = await findOrCreateGoogleUser(value, getRequestMetadata(req));
    setAuthCookies(res, session);

    return sendSuccess(res, 200, {
        message: "Authentication successful",
        user: session.user,
    });
});

export const refresh = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.[config.jwt.refreshCookieName];
    const session = await refreshUserSession(refreshToken, getRequestMetadata(req));
    setAuthCookies(res, session);

    return sendSuccess(res, 200, {
        message: "Session refreshed",
        user: session.user,
    });
});

export const logOut = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.[config.jwt.refreshCookieName];

    if (refreshToken) {
        try {
            const payload = verifyRefreshToken(refreshToken);
            await logoutUser(payload.userId);
        } catch {
            clearAuthCookies(res);
            return sendSuccess(res, 200, { message: "Logout successful" });
        }
    }

    clearAuthCookies(res);
    return sendSuccess(res, 200, { message: "Logout successful" });
});
