import logger from '../config/logger.js';

const errorMiddleware = (err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ message: 'An internal error occurred' });
};

export default errorMiddleware;
