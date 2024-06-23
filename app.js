import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config.js';
import cors from 'cors';
import { sequelize } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import postRoutes from './routes/postRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import logger from './config/logger.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/comments', commentRoutes);
app.use('/posts', postRoutes);
app.use('/tags', tagRoutes);
app.use('/users', userRoutes);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Online Forum API');
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        app.listen(config.port, () => {
            logger.info(`Server running on port ${config.port}`);
        });
    } catch (error) {
        logger.error(`Unable to start server: ${error.message}`);
    }
};

export default startServer;
