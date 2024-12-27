module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // Only run tests from the tests directory, not from dist
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  verbose: true,
  // Ignore the dist directory
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};