import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is required"
            })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = verifyToken.userId
        req.userRole = verifyToken.role
        next()
    } catch (error) {
        const isTokenError = error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"

        return res.status(isTokenError ? 401 : 500).json({
            success: false,
            message: isTokenError ? "Invalid or expired authentication token" : `Auth error: ${error.message}`
        })
    }
}

export default isAuth
