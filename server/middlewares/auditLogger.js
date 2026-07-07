import { writeAuditLog } from "../services/audit.service.js";

const auditActions = new Map([
    ["POST /api/auth/register", "auth.register"],
    ["POST /api/auth/login", "auth.login"],
    ["POST /api/auth/google", "auth.google"],
    ["POST /api/auth/refresh", "auth.refresh"],
    ["POST /api/auth/logout", "auth.logout"],
    ["GET /api/auth/logout", "auth.logout"],
    ["GET /api/user/current-user", "user.current"],
]);

const auditLogger = (req, res, next) => {
    res.on("finish", () => {
        const action = auditActions.get(`${req.method} ${req.path}`);

        if (!action) {
            return;
        }

        void writeAuditLog({
            actorId: req.userId,
            action,
            resource: req.originalUrl,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") || "unknown",
            metadata: {
                statusCode: res.statusCode,
                method: req.method,
            },
        });
    });

    next();
};

export default auditLogger;
