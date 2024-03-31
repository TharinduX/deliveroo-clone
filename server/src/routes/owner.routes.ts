import { createRestaurant } from '@controllers/owner.controller.js';
import express from 'express';

const router = express.Router();

// Create a restaurant
router.post('/create/restaurant', createRestaurant);

export default router;
