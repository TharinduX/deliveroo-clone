import express, { Express } from 'express';
import userRoutes from '@routes/user.routes.js';
import sequelize from './db/config.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT!;
const app: Express = express();
app.use(express.json());

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
