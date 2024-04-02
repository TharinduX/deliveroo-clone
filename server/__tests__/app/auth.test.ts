import request from 'supertest';
import express, { Express } from 'express';
import { createServer } from 'http';
import { AddressInfo } from 'net';
import { registerUser, loginUser } from '@controllers/auth.controller.js';
import sequelize from '../config/sequelize.js';
import {
  createCategory,
  createItem,
  createRestaurant,
} from '@controllers/owner.controller.js';
import cookieParser from 'cookie-parser';
import { verifyJWT } from '@middlewares/verifyJWT.js';
import verifyRole from '@middlewares/verifyRole.js';

describe('Authentication Endpoints', () => {
  let app: Express;
  let server: ReturnType<typeof createServer>;
  let accessToken: string;
  let userId: string;
  let restaurantId: string;
  let categoryId: string;

  beforeAll(async () => {
    // Create your Sequelize instance and connect to the database
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }

    app = express();
    app.use(express.json());
    app.use(cookieParser());

    app.post('/api/auth/register', registerUser);
    app.post('/api/auth/login', loginUser);

    // Owner routes
    app.post(
      '/api/owner/create/restaurant',
      verifyJWT,
      verifyRole('owner'),
      createRestaurant,
    );
    app.post(
      '/api/owner/create/category',
      verifyJWT,
      verifyRole('owner'),
      createCategory,
    );
    app.post(
      '/api/owner/create/item',
      verifyJWT,
      verifyRole('owner'),
      createItem,
    );

    // Create a server
    server = app.listen(0);
    server.on('listening', () => {
      const { port } = server.address() as AddressInfo;
      console.log(`Server is running on port ${port}`);
    });
  });

  afterAll(async () => {
    await sequelize.close();
    server.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password',
        phone: '1234567890',
        firstName: 'John',
        lastName: 'Doe',
        role: 'owner',
      };

      // Make a request to register a new user
      const res = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      // Assert response
      expect(res.body).toHaveProperty('message', 'User created successfully');

      const { user } = res.body;

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email', userData.email);
      expect(user).toHaveProperty('passwordHash');
      expect(user).toHaveProperty('phone', userData.phone);
      expect(user).toHaveProperty('firstName', userData.firstName);
      expect(user).toHaveProperty('lastName', userData.lastName);
      expect(user).toHaveProperty('role', userData.role);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password',
      };

      // Make a request to login with the test user credentials
      const res = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      // Assert response
      expect(res.body).toHaveProperty('userInfo');
      expect(res.body.userInfo).toHaveProperty('id');
      expect(res.body.userInfo).toHaveProperty('email', loginData.email);
      expect(res.body.userInfo).toHaveProperty('role');
      expect(res.body.userInfo).toHaveProperty('phone');
      expect(res.body.userInfo).toHaveProperty('firstName');
      expect(res.body.userInfo).toHaveProperty('lastName');
      expect(res.body.userInfo).toHaveProperty('provider');
      expect(res.body).toHaveProperty('accessToken');

      // Save the access token for future requests
      accessToken = res.body.accessToken;
      userId = res.body.userInfo.id;
    });

    // Test for invalid credentials
    it('should return 401 for invalid credentials', async () => {
      const invalidLoginData = {
        email: 'invalid@example.com',
        password: 'invalidpassword',
      };

      // Make a request to login with invalid credentials
      const res = await request(app)
        .post('/api/auth/login')
        .send(invalidLoginData)
        .expect(401);

      // Assert response
      expect(res.body).toHaveProperty(
        'message',
        'The email or password is incorrect',
      );
    });

    // Test for user not found
    it('should return 401 if user is not found', async () => {
      const nonExistingUserLoginData = {
        email: 'nonexisting@example.com',
        password: 'password',
      };

      // Make a request to login with non-existing user credentials
      const res = await request(app)
        .post('/api/auth/login')
        .send(nonExistingUserLoginData)
        .expect(401);

      // Assert response
      expect(res.body).toHaveProperty(
        'message',
        'The email or password is incorrect',
      );
    });
  });

  describe('POST /api/owner/create/restaurant', () => {
    it('should create a restaurant', async () => {
      const restaurantData = {
        name: 'Test Restaurant',
        address: '123 Test Street',
        phone: '1234567890',
        email: 'testrestaurant@example.com',
        description: 'Test description',
        image: 'http://test-image.jpg',
      };
      const res = await request(app)
        .post('/api/owner/create/restaurant')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(restaurantData)
        .expect(201);

      expect(res.body).toHaveProperty(
        'message',
        'Restaurant created successfully',
      );
      expect(res.body).toHaveProperty('restaurant');
      expect(res.body.restaurant).toHaveProperty('id');
      expect(res.body.restaurant).toHaveProperty('name', restaurantData.name);
      expect(res.body.restaurant).toHaveProperty('slug');
      expect(res.body.restaurant).toHaveProperty(
        'address',
        restaurantData.address,
      );
      expect(res.body.restaurant).toHaveProperty('phone', restaurantData.phone);
      expect(res.body.restaurant).toHaveProperty(
        'description',
        restaurantData.description,
      );
      expect(res.body.restaurant).toHaveProperty('image', restaurantData.image);
      expect(res.body.restaurant).toHaveProperty('ownerId', userId);

      // Save the restaurant ID for future requests
      restaurantId = res.body.restaurant.id;
    });
  });

  describe('POST /api/owner/create/category', () => {
    it('should create a category', async () => {
      const categoryData = {
        name: 'Test Category',
        restaurantId: restaurantId,
      };

      const res = await request(app)
        .post('/api/owner/create/category')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(categoryData)
        .expect(201);

      expect(res.body).toHaveProperty(
        'message',
        'Category created successfully',
      );
      expect(res.body).toHaveProperty('category');
      expect(res.body.category).toHaveProperty('id');
      expect(res.body.category).toHaveProperty('name', categoryData.name);
      expect(res.body.category).toHaveProperty('categorySlug');
      expect(res.body.category).toHaveProperty('restaurantId', restaurantId);

      // Save the category ID for future requests
      categoryId = res.body.category.id;
    });
  });

  describe('POST /api/owner/create/item', () => {
    it('should create a menu item', async () => {
      const menuItemData = {
        name: 'Test Menu Item',
        isPopular: true,
        description: 'Test description',
        price: 1000,
        kcal: 500,
        image: 'http://test-image.jpg',
        categoryId: categoryId,
      };

      const res = await request(app)
        .post('/api/owner/create/item')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(menuItemData)
        .expect(201);

      expect(res.body).toHaveProperty('message', 'Item created successfully');
      expect(res.body).toHaveProperty('item');
      expect(res.body.item).toHaveProperty('id');
      expect(res.body.item).toHaveProperty('name', menuItemData.name);
      expect(res.body.item).toHaveProperty('isPopular');
      expect(res.body.item).toHaveProperty(
        'description',
        menuItemData.description,
      );
      expect(res.body.item).toHaveProperty('price', menuItemData.price);
      expect(res.body.item).toHaveProperty('kcal', menuItemData.kcal);
      expect(res.body.item).toHaveProperty('image', menuItemData.image);
      expect(res.body.item).toHaveProperty(
        'categoryId',
        menuItemData.categoryId,
      );
    });
  });
});
