export default {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    description: { type: 'string', minLength: 10 },
    address: { type: 'string', minLength: 10 },
    phone: { type: 'string', minLength: 10 },
    image: { type: 'string' },
  },
  required: ['name', 'description', 'address', 'phone'],
};
