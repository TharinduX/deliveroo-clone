export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    isPopular: { type: 'boolean' },
    categoryId: { type: 'number' },
    price: { type: 'number' },
    description: { type: 'string' },
    image: { type: 'string' },
    kcal: { type: 'string' },
  },
  required: ['name', 'categoryId', 'price'],
};
