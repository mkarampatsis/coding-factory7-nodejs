// First Example
// const winston = require("winston");

// const logger = winston.createLogger({
//   level: "debug",
//   format: winston.format.json(),
//   transports: [new winston.transports.Console()],
// });

// Second Example
const { format, createLogger, transports } = require("winston");
require("winston-daily-rotate-file");
require('winston-mongodb');

// require("dotenv").config();

// Third Example
// const { combine, timestamp, label, printf } = format;
const { combine, timestamp, label, printf, prettyPrint } = format;

const CATEGORY = "winston custom format";

//Using the printf format.
// const customFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`;
// });

//DailyRotateFile func()
const fileRotateTransport = new transports.DailyRotateFile({
  filename: "./logs/rotate-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "14d",
});

// Third Example
// const logger = createLogger({
//   level: "debug",
//   format: combine(
//     label({ label: CATEGORY }), 
//     timestamp(), 
//     customFormat
//   ),
//   transports: [new transports.Console()],
// });

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    // format.json()
    prettyPrint()
  ),
  transports: [
    fileRotateTransport,
    new transports.File({
      filename: "logs/example.log",
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
    new transports.Console(),
    new transports.MongoDB({
      level: 'error',
      //mongo database connection link
      db : process.env.MONGODB_URI,
      // options: {
      //   useUnifiedTopology: true
      // },
      // A collection to save json formatted logs
      collection: 'server_logs',
      format: format.combine(
      format.timestamp(),
      // Convert logs to a json format
      format.json())
    })
  ],
});

module.exports = logger;