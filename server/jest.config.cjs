/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@schemas/(.*)$': '<rootDir>/src/schemas/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/config/sequelize.ts',
  ],
  resolver: 'jest-ts-webcompat-resolver',
};
