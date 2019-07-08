const common = require('./jest.config-common');
module.exports = {
  ...common,
  runner: '@jest-runner/electron/main',
  testPathIgnorePatterns: [
    '<rootDir>/packages/ace-core/src/scripts/ace-extraction',
    'tests/__tests__/cli'
  ]
};
