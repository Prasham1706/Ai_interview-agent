const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.userRole)) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to access this resource"
            })
        }

        next()
    }
}

export default authorizeRoles
