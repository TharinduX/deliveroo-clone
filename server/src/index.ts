import express, { Express } from 'express';
import authRoutes from '@routes/auth.routes.js';
import userRoutes from '@routes/user.routes.js';
import sequelize from '@config/sequelize.config.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = process.env.PORT!;
const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(cookieParser());

//Auth routes
app.use('/api/auth', authRoutes);

//User routes
app.use('/api/user', userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
