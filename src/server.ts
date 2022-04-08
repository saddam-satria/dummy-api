import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './app/config/router';
import path from 'path';
import { prisma } from './app/config/prisma';

dotenv.config();
const app = express();
const PORT: undefined | string | number = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/static', express.static(path.join(__dirname, '../public')));

export const server = app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    prisma.$on('query', (e) => {
      console.log('query', e.query);
      console.log('duration', e.duration);
    });
    console.log('database connected');
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
  }
  console.log(`server running on port ${PORT}`);
});
