import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { AUTH_PROVIDER_VALUES, AUTH_PROVIDERS } from "../constants/auth.js";
import { USER_ROLE_VALUES, USER_ROLES } from "../constants/roles.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            select: false,
            minlength: 8
        },
        role: {
            type: String,
            enum: USER_ROLE_VALUES,
            default: USER_ROLES.CANDIDATE
        },
        authProvider: {
            type: String,
            enum: AUTH_PROVIDER_VALUES,
            default: AUTH_PROVIDERS.LOCAL
        },
        credits: {
            type: Number,
            default: 100
        },
        tokenVersion: {
            type: Number,
            default: 0,
            select: false
        },
        refreshTokenHash: {
            type: String,
            select: false
        },
        refreshTokenExpiresAt: {
            type: Date,
            select: false
        },
        lastLoginAt: {
            type: Date
        },
        lastLoginIp: {
            type: String,
            select: false
        },
        lastUserAgent: {
            type: String,
            select: false
        }
    },
    { timestamps: true }
)

userSchema.index({ role: 1 })
userSchema.index({ refreshTokenExpiresAt: 1 })

userSchema.pre("save", async function hashPassword(next) {
    if (!this.isModified("password") || !this.password) {
        next()
        return
    }

    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
    if (!this.password) {
        return false
    }

    return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.toJSON = function toJSON() {
    const user = this.toObject()
    delete user.password
    delete user.refreshTokenHash
    delete user.refreshTokenExpiresAt
    delete user.tokenVersion
    delete user.lastLoginIp
    delete user.lastUserAgent
    delete user.__v
    return user
}

const User = mongoose.model("User", userSchema)

export default User
