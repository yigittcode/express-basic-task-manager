import express from 'express';
import dotenv from 'dotenv/config';
import mongoose from 'mongoose';
import taskRoute from './routes/taskRoute.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from './middlewares/cors.js';
const app = express();

app.use(cors);
app.use(express.json());


app.use('/api/v1', taskRoute);

app.use((req, res, next) => {
    next(new Error('Resource not found')); 
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
