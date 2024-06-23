import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import models from '../models/index.js';

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await models.User.findByPk(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }
};

export default authMiddleware;
