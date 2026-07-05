import mongoose from "mongoose";

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
        role: {
            type: String,
            enum: ["candidate", "recruiter", "admin"],
            default: "candidate"
        },
        authProvider: {
            type: String,
            enum: ["google"],
            default: "google"
        },
        credits: {
            type: Number,
            default: 100
        }
    },
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)

export default User
