import AppError from "../utils/AppError.js";

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.userRole)) {
            next(new AppError("You are not allowed to access this resource", 403, "FORBIDDEN"));
            return;
        }

        next()
    }
}

export default authorizeRoles
