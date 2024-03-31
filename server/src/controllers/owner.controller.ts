import restaurantSchema from '@schemas/restaurant.schema.js';
import Restaurant from '@models/restaurant.model.js';
import { Request as ExpressRequest, Response } from 'express';
import dotenv from 'dotenv';
import ajvModule from 'ajv';
import asyncHandler from 'express-async-handler';

dotenv.config();
const Ajv = ajvModule.default;
const ajv = new Ajv();

interface Request extends ExpressRequest {
  id?: string;
  user?: string;
  roles?: string;
}

export const createRestaurant = asyncHandler(
  async (req: Request, res: Response) => {
    const validate = ajv.compile(restaurantSchema);
    const valid = validate(req.body);
    if (!valid) {
      res.status(400).json({ message: validate.errors });
      return;
    }
    const { name, address, phone, email, description, image } = req.body;

    // Generate the slug
    const slug = name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
    const userId = req.id;

    const restaurantExist = await Restaurant.findOne({ where: { slug } });
    if (restaurantExist) {
      res.status(400).json({ message: 'Restaurant already exists!' });
      return;
    }

    const phoneExist = await Restaurant.findOne({ where: { phone } });
    if (phoneExist) {
      res.status(400).json({ message: 'Phone number already exists!' });
      return;
    }

    const restaurant = await Restaurant.create({
      name,
      slug,
      address,
      phone,
      email,
      image,
      description,
      ownerId: userId,
    });

    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant,
    });
  },
);
