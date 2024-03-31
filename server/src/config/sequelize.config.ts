import { Sequelize } from 'sequelize-typescript';
import User from '@models/user.model.js';
import Restaurant from '@models/restaurant.model.js';
import Menu from '@models/menu.model.js';
import Category from '@models/category.model.js';
import MenuItem from '@models/item.model.js';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST!,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME!,
  password: process.env.MYSQL_PASSWORD!,
  database: process.env.MYSQL_DATABASE!,
  logging: false,
  models: [User, Restaurant, Menu, Category, MenuItem],
});

export default sequelize;
