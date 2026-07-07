import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId);

    if (!user) {
        throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }

    return sendSuccess(res, 200, { user });
});
