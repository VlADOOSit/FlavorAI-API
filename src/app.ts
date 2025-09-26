import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routes/auth.router';
import recipeRouter from './routes/recipe.router';

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/recipe', recipeRouter);

export default app;
