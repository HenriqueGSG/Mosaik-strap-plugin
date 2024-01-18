const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf((info) => {
      const message = `${info.timestamp} ${info.level}: ${info.message}`;
      return info.object
        ? `${message} ${JSON.stringify(info.object, null, 2)}`
        : message;
    })
  ),
  transports: [new winston.transports.File({ filename: "logs/comboned.log" })],
});

module.exports = logger;
