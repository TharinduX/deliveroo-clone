import {
  getRestaurantDetails,
  getRestaurants,
} from '@controllers/owner.controller.js';
import { generateMenuItems } from '@controllers/seed.controller.js';
import express from 'express';

const router = express.Router();

router.get('/restaurant/:slug', getRestaurantDetails);
router.get('/restaurants', getRestaurants);
router.post('/seed/:id', generateMenuItems);

export default router;
