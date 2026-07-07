import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/app.config.js";

export const signAccessToken = (user) => {
    return jwt.sign(
        {
            userId: user._id.toString(),
            role: user.role,
        },
        config.jwt.accessSecret,
        { expiresIn: config.jwt.accessExpiresIn }
    );
};

export const signRefreshToken = (user, sessionId) => {
    return jwt.sign(
        {
            userId: user._id.toString(),
            sessionId,
            tokenVersion: user.tokenVersion,
        },
        config.jwt.refreshSecret,
        { expiresIn: config.jwt.refreshExpiresIn }
    );
};

export const verifyAccessToken = (token) => jwt.verify(token, config.jwt.accessSecret);

export const verifyRefreshToken = (token) => jwt.verify(token, config.jwt.refreshSecret);

export const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");
