const common = require('./jest.config-common');
module.exports = {
  ...common,
  testPathIgnorePatterns: common.testPathIgnorePatterns.concat([
    '<rootDir>/tests/__tests__/cli',
  ]),
};
