import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        actorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true
        },
        action: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        resource: {
            type: String,
            required: true,
            trim: true
        },
        ipAddress: {
            type: String
        },
        userAgent: {
            type: String
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    { timestamps: true }
);

auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ actorId: 1, createdAt: -1 });

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;
