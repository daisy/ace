const common = require('./jest.config-common');
module.exports = {
  ...common,
  runner: '@jest-runner/electron/main',
  testPathIgnorePatterns: [
    'tests/__tests__/cli'
  ]
};
