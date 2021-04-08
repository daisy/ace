const common = require('./jest.config-common');
module.exports = {
  ...common,
  testMatch: [
    '<rootDir>/tests/__tests__/cli.test.js',
  ],
};
