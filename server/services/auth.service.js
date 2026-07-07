import crypto from "crypto";
import AppError from "../utils/AppError.js";
import User from "../models/user.model.js";
import { AUTH_PROVIDERS } from "../constants/auth.js";
import { getRefreshTokenExpiry } from "../utils/session.js";
import { hashToken, signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/token.js";

const normalizeEmail = (email) => email.trim().toLowerCase();

const createSession = async (user, metadata) => {
    const sessionId = crypto.randomUUID();
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user, sessionId);

    user.refreshTokenHash = hashToken(refreshToken);
    user.refreshTokenExpiresAt = getRefreshTokenExpiry();
    user.lastLoginAt = new Date();
    user.lastLoginIp = metadata.ipAddress;
    user.lastUserAgent = metadata.userAgent;
    await user.save();

    return {
        accessToken,
        refreshToken,
        user,
    };
};

export const registerUser = async ({ name, email, password }, metadata) => {
    const normalizedEmail = normalizeEmail(email);
    const existingUser = await User.findOne({ email: normalizedEmail }).select("_id");

    if (existingUser) {
        throw new AppError("Email is already registered", 409, "EMAIL_EXISTS");
    }

    const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password,
        authProvider: AUTH_PROVIDERS.LOCAL,
    });

    return createSession(user, metadata);
};

export const loginUser = async ({ email, password }, metadata) => {
    const normalizedEmail = normalizeEmail(email);
    const user = await User.findOne({ email: normalizedEmail }).select("+password +tokenVersion");

    if (!user || !(await user.comparePassword(password))) {
        throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
    }

    return createSession(user, metadata);
};

export const findOrCreateGoogleUser = async ({ name, email }, metadata) => {
    const normalizedEmail = normalizeEmail(email);
    const displayName = name.trim();

    const existingUser = await User.findOne({ email: normalizedEmail }).select("+tokenVersion");
    if (existingUser) {
        return createSession(existingUser, metadata);
    }

    const user = await User.create({
        name: displayName,
        email: normalizedEmail,
        authProvider: AUTH_PROVIDERS.GOOGLE,
    });

    return createSession(user, metadata);
};

export const refreshUserSession = async (refreshToken, metadata) => {
    if (!refreshToken) {
        throw new AppError("Refresh token is required", 401, "REFRESH_TOKEN_REQUIRED");
    }

    const payload = verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.userId).select("+refreshTokenHash +refreshTokenExpiresAt +tokenVersion");

    if (!user || user.tokenVersion !== payload.tokenVersion) {
        throw new AppError("Invalid refresh token", 401, "INVALID_REFRESH_TOKEN");
    }

    const isStoredToken = user.refreshTokenHash === hashToken(refreshToken);
    const isExpired = !user.refreshTokenExpiresAt || user.refreshTokenExpiresAt <= new Date();

    if (!isStoredToken || isExpired) {
        throw new AppError("Invalid refresh token", 401, "INVALID_REFRESH_TOKEN");
    }

    return createSession(user, metadata);
};

export const logoutUser = async (userId) => {
    if (!userId) {
        return;
    }

    await User.findByIdAndUpdate(userId, {
        $unset: {
            refreshTokenHash: "",
            refreshTokenExpiresAt: "",
        },
        $inc: {
            tokenVersion: 1,
        },
    });
};
