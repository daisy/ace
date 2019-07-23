const common = require('./jest.config-common');
module.exports = {
  ...common,
  testPathIgnorePatterns: [
    'tests/__tests__/cli'
  ]
};
