import genToken from "../config/token.js";
import { findOrCreateGoogleUser } from "../services/auth.service.js";
import { authCookieOptions } from "../utils/cookieOptions.js";
import { validateGoogleAuthPayload } from "../validators/auth.validator.js";

export const googleAuth = async (req, res) => {
    try {
        const validationError = validateGoogleAuthPayload(req.body)
        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError
            })
        }

        const user = await findOrCreateGoogleUser(req.body)
        const token = genToken(user)

        res.cookie("token", token, authCookieOptions())

        return res.status(200).json({
            success: true,
            message: "Authentication successful",
            user
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", authCookieOptions())
        return res.status(200).json({
            success: true,
            message: "Logout successful"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
