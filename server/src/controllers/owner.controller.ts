import restaurantSchema from '@schemas/restaurant.schema.js';
import Restaurant from '@models/restaurant.model.js';
import { Request as ExpressRequest, Response } from 'express';
import dotenv from 'dotenv';
import ajvModule from 'ajv';
import asyncHandler from 'express-async-handler';
import Category from '@models/category.model.js';
import categorySchema from '@schemas/category.schema.js';
import MenuItem from '@models/item.model.js';
import itemSchema from '@schemas/item.schema.js';

dotenv.config();
//@ts-ignore
const Ajv = ajvModule.default;
const ajv = new Ajv();

interface Request extends ExpressRequest {
  id?: string;
  user?: string;
  roles?: string;
}

// @desc Create a restaurant
// @route POST /api/owner/create/restaurant
// @access Private: only owner can create a restaurant
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

// @desc Create a category
// @route POST /api/owner/create/category
// @access Private: only owner can create a category
export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const validate = ajv.compile(categorySchema);
    const valid = validate(req.body);
    if (!valid) {
      res.status(400).json({ message: validate.errors });
      return;
    }
    const { name, restaurantId } = req.body;

    const categorySlug = name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');

    const restaurant = await Restaurant.findOne({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found!' });
      return;
    }

    const categoryExist = await Category.findOne({
      where: { name, restaurantId: restaurant.id },
    });

    if (categoryExist) {
      res.status(400).json({ message: 'Category already exists!' });
      return;
    }

    const category = await Category.create({
      name,
      categorySlug,
      restaurantId: restaurant.id,
    });

    res.status(201).json({
      message: 'Category created successfully',
      category,
    });
  },
);

// @desc Create a item
// @route POST /api/owner/create/item
// @access Private: only owner can create a item
export const createItem = asyncHandler(async (req: Request, res: Response) => {
  const validate = ajv.compile(itemSchema);
  const valid = validate(req.body);
  if (!valid) {
    res.status(400).json({ message: validate.errors });
    return;
  }
  const { name, price, categoryId, description, kcal, image, isPopular } =
    req.body;

  const itemSlug = name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

  const category = await Category.findOne({
    where: { id: categoryId },
  });

  if (!category) {
    res.status(404).json({ message: 'Category not found!' });
    return;
  }

  const itemExist = await MenuItem.findOne({
    where: { name, categoryId: category.id },
  });

  if (itemExist) {
    res.status(400).json({ message: 'Item already exists!' });
    return;
  }

  const item = await MenuItem.create({
    name,
    itemSlug,
    price,
    isPopular,
    categoryId: category.id,
    description,
    kcal,
    image,
  });

  res.status(201).json({
    message: 'Item created successfully',
    item,
  });
});

// @desc Get restaurant details by slug
// @route GET /api/public/restaurant/:slug
// @access Public - anyone can get the restaurant details
export const getRestaurantDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const restaurant = await Restaurant.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: Category,
          as: 'categories',
          include: [
            {
              model: MenuItem,
              as: 'menuItems',
            },
          ],
        },
      ],
    });

    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found!' });
      return;
    }

    res.status(200).json({
      ...restaurant.toJSON(),
    });
  },
);

// @desc Get all restaurants
// @route GET /api/public/restaurants
// @access Public - anyone can get the restaurants
export const getRestaurants = asyncHandler(
  async (req: Request, res: Response) => {
    const restaurants = await Restaurant.findAll();

    if (!restaurants) {
      res.status(404).json({ message: 'No restaurants found!' });
      return;
    }

    res.status(200).json({
      restaurants,
    });
  },
);
