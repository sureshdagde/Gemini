"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerConfig = void 0;
const winston = require("winston");
const loggerConfig = () => {
    const logLevel = process.env.LOG_LEVEL || 'debug';
    const nodeEnv = process.env.NODE_ENV || 'development';
    const transports = [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), winston.format.printf(({ timestamp, level, message, context, ...meta }) => {
                return `${timestamp} [${context || 'Application'}] ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
            })),
        }),
    ];
    if (nodeEnv === 'production') {
        transports.push(new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }), new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }));
    }
    return {
        level: logLevel,
        format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
        transports,
    };
};
exports.loggerConfig = loggerConfig;
//# sourceMappingURL=logger.config.js.map