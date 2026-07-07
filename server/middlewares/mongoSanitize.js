const hasUnsafeKey = (key) => key.includes("$") || key.includes(".");

const sanitizeValue = (value) => {
    if (!value || typeof value !== "object") {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map(sanitizeValue);
    }

    return Object.entries(value).reduce((sanitized, [key, nestedValue]) => {
        if (!hasUnsafeKey(key)) {
            sanitized[key] = sanitizeValue(nestedValue);
        }

        return sanitized;
    }, {});
};

const sanitizeInPlace = (target) => {
    if (!target || typeof target !== "object") {
        return;
    }

    const sanitized = sanitizeValue(target);

    Object.keys(target).forEach((key) => {
        delete target[key];
    });

    Object.assign(target, sanitized);
};

const mongoSanitize = (req, res, next) => {
    sanitizeInPlace(req.body);
    sanitizeInPlace(req.params);
    sanitizeInPlace(req.query);
    next();
};

export default mongoSanitize;
