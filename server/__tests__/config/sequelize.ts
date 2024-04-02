import { Sequelize } from 'sequelize-typescript';
import User from '@models/user.model.js';
import Restaurant from '@models/restaurant.model.js';
import Category from '@models/category.model.js';
import MenuItem from '@models/item.model.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
  models: [User, Restaurant, Category, MenuItem],
});

export default sequelize;
