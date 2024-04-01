import { getRestaurantDetails } from '@controllers/owner.controller.js';
import { generateMenuItems } from '@controllers/seed.controller.js';
import express from 'express';

const router = express.Router();

router.get('/restaurant/:slug', getRestaurantDetails);
router.post('/seed/:id', generateMenuItems);

export default router;
