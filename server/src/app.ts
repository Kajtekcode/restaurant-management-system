import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

import menuRoutes from './routes/menuRoutes';
app.use('/api/menu', menuRoutes);

import reservationRoutes from './routes/reservationRoutes';
import { protect } from './middlewares/authMiddleware';
app.use('/api/reservations', protect, reservationRoutes);

// Add routes here later

export default app;
