import jwt from "jsonwebtoken"

const genToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured")
    }

    return jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )
}

export default genToken
