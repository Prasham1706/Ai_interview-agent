import User from "../models/user.model.js"

export const findOrCreateGoogleUser = async ({ name, email }) => {
    const normalizedEmail = email.trim().toLowerCase()
    const displayName = name.trim()

    const existingUser = await User.findOne({ email: normalizedEmail }).select("-__v")
    if (existingUser) {
        return existingUser
    }

    return User.create({
        name: displayName,
        email: normalizedEmail,
        authProvider: "google"
    })
}
