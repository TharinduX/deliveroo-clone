export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    restaurantId: { type: 'string' },
  },
  required: ['name', 'restaurantId'],
};
