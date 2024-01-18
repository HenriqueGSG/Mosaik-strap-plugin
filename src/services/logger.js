const winston = require("winston");

function createLogger(logFileName) {
  return winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.printf((info) => {
        let msg = `${info.timestamp} ${info.level}: ${info.message}`;
        if (info.object) {
          msg += ` | Dados: ${JSON.stringify(info.object, null, 2)}`;
        }
        return msg;
      })
    ),
    transports: [
      new winston.transports.File({ filename: `logs/${logFileName}.log` }),
    ],
  });
}

module.exports = createLogger;
