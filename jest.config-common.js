module.exports = {
  verbose: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/jest-setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.history/',
    '<rootDir>/website/',
    '<rootDir>/scripts/',
    '<rootDir>/resources/',
    '<rootDir>/CompareAxeRunners/',
    '<rootDir>/tests/data/',
  ],
  testMatch: [
    "<rootDir>/tests/__tests__/**/*.js",
    "<rootDir>/packages/**/src/**/(*.)+test.js",
  ],
};
