const common = require('./jest.config-common');
module.exports = {
  ...common,
  runner: '@jest-runner/electron/main',
  testPathIgnorePatterns: common.testPathIgnorePatterns.concat([
    '<rootDir>/tests/__tests__/cli',
  ]),
};
