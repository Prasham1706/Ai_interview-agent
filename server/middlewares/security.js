import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { xss } from "express-xss-sanitizer";
import config from "../config/app.config.js";
import mongoSanitize from "./mongoSanitize.js";
import logger from "../utils/logger.js";

const corsOptions = {
    origin(origin, callback) {
        if (!origin || config.clientUrls.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
};

export const applySecurityMiddleware = (app) => {
    app.set("trust proxy", 1);

    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(express.json({ limit: "1mb" }));
    app.use(mongoSanitize);
    app.use(xss());
    app.use(hpp());
    app.use(compression());

    if (!config.isProduction) {
        app.use(morgan("dev"));
    } else {
        app.use(
            morgan("combined", {
                stream: {
                    write: (message) => logger.info(message.trim()),
                },
            })
        );
    }
};
