import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

import routes from './routes'; // pasta com suas rotas separadas
import errorHandler from './middlewares/errorHandler'; // opcional

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes); // todas as rotas montadas em um arquivo index.ts

app.use(errorHandler); // middleware de tratamento de erros

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
