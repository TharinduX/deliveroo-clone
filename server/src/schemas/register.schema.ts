export default {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string', minLength: 6 },
    phone: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    role: { type: 'string' },
  },
  required: ['email', 'password'],
};
