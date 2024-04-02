import express, { Express } from 'express';
import authRoutes from '@routes/auth.routes.js';
import ownerRoutes from '@routes/owner.routes.js';
import customerRoutes from '@routes/customer.routes.js';
import publicRoutes from '@routes/public.routes.js';
import sequelize from '@config/sequelize.config.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import verifyRole from '@middlewares/verifyRole.js';
import { verifyJWT } from '@middlewares/verifyJWT.js';

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

//Public routes
app.use('/api/public', publicRoutes);

//Auth routes
app.use('/api/auth', authRoutes);

//Owner routes
app.use('/api/owner', verifyRole('owner'), verifyJWT, ownerRoutes);

//Customer routes
app.use('/api/customer', verifyRole('customer'), verifyJWT, customerRoutes);

export default app;

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
