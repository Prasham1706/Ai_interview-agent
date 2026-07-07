import AuditLog from "../models/auditLog.model.js";
import logger from "../utils/logger.js";

export const writeAuditLog = async ({ actorId, action, resource, ipAddress, userAgent, metadata = {} }) => {
    try {
        await AuditLog.create({
            actorId,
            action,
            resource,
            ipAddress,
            userAgent,
            metadata,
        });
    } catch (error) {
        logger.error("Failed to write audit log", {
            message: error.message,
            action,
            resource,
            actorId,
        });
    }
};
