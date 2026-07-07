import mongoose from "mongoose";
import AppError from "../utils/AppError.js";
import logger from "../utils/logger.js";

const normalizeError = (error) => {
    if (error instanceof AppError) {
        return error;
    }

    if (error instanceof mongoose.Error.ValidationError) {
        return new AppError("Validation failed", 400, "VALIDATION_ERROR");
    }

    if (error instanceof mongoose.Error.CastError) {
        return new AppError("Invalid resource identifier", 400, "INVALID_ID");
    }

    if (error?.code === 11000) {
        return new AppError("Resource already exists", 409, "DUPLICATE_RESOURCE");
    }

    if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
        return new AppError("Invalid or expired token", 401, "INVALID_TOKEN");
    }

    return new AppError("Internal server error", 500, "INTERNAL_ERROR");
};

const errorHandler = (error, req, res, next) => {
    const normalizedError = normalizeError(error);

    logger.error(normalizedError.message, {
        code: normalizedError.code,
        statusCode: normalizedError.statusCode,
        path: req.originalUrl,
        method: req.method,
        stack: normalizedError.statusCode >= 500 ? error.stack : undefined,
    });

    return res.status(normalizedError.statusCode).json({
        success: false,
        message: normalizedError.message,
        code: normalizedError.code,
    });
};

export default errorHandler;
