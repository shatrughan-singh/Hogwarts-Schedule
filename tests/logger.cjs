// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Log level: 'info' for general logs, 'debug' for more detailed logs
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Logs to console
    new winston.transports.File({ filename: 'logs/test.log' }), // Logs to a file
  ],
});

module.exports = logger;
