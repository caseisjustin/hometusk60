import winston, { format, transports } from 'winston';
import { MongoDB } from 'winston-mongodb';
const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new MongoDB({
      level: 'info',
      db: process.env.MONGO_URI,
      collection: 'logs',
      tryReconnect: true,
      options: { useUnifiedTopology: true },
    }),
  ],
});

export default logger;
