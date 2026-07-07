const write = (level, message, meta) => {
    const payload = {
        level,
        message,
        timestamp: new Date().toISOString(),
        ...(meta ? { meta } : {}),
    };

    const output = JSON.stringify(payload);

    if (level === "error") {
        console.error(output);
        return;
    }

    if (level === "warn") {
        console.warn(output);
        return;
    }

    console.log(output);
};

const logger = {
    info: (message, meta) => write("info", message, meta),
    warn: (message, meta) => write("warn", message, meta),
    error: (message, meta) => write("error", message, meta),
};

export default logger;
