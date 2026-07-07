export const getRequestMetadata = (req) => ({
    ipAddress: req.ip,
    userAgent: req.get("user-agent") || "unknown",
});

export const getRefreshTokenExpiry = () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    return expiresAt;
};
