const winston = require("winston");

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}]: - ${level}: ${message}`;
});

/**
 * Creates a logger instance with specified configuration.
 *
 * @returns {Object} - The logger object.
 */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    logFormat // Apply the custom log format
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      colorize: true,
      prettyPrint: true
    }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ]
});

module.exports = { logger };
