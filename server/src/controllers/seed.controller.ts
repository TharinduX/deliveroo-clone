import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import MenuItem from '@models/item.model.js';
import Category from '@models/category.model.js';

export const generateMenuItems = async (req: Request, res: Response) => {
  const categoryId = req.params.id;

  if (!categoryId) {
    res.status(400).json({ message: 'Please provide a category id' });
  }

  const categoryExists = Category.findOne({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    res.status(400).json({ message: 'Category does not exist' });
  }

  const numItems = faker.number.int({ min: 10, max: 15 });
  const menuItems = [];
  for (let i = 0; i < numItems; i++) {
    const menuItem = {
      name: faker.lorem.words(),
      isPopular: faker.datatype.boolean(0.4),
      description: faker.lorem.paragraph(2),
      price: faker.commerce.price({ min: 800, max: 2000 }),
      kcal: faker.number.int({ min: 200, max: 1000 }),
      image: faker.image.food(),
      categoryId: categoryId,
    };
    menuItems.push(menuItem);
  }

  try {
    await MenuItem.bulkCreate(menuItems);
    res.status(201).json({
      message: `Generated ${numItems} menu items for category ID ${categoryId}`,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating menu items' });
  }
};
