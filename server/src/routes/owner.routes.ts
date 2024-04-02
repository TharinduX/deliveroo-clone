import {
  createCategory,
  createItem,
  createRestaurant,
} from '@controllers/owner.controller.js';
import express from 'express';

const router = express.Router();

// Create a restaurant
router.post('/create/restaurant', createRestaurant);
router.post('/create/category', createCategory);
router.post('/create/item', createItem);

export default router;
