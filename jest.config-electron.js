const common = require('./jest.config-common');
module.exports = {
  ...common,
  // runner: '@jest-runner/electron/main',
  runner: '@kayahr/jest-electron-runner/main',
  // testEnvironment: "@kayahr/jest-electron-runner/environment",
  // testEnvironmentOptions: {
  //     electron: {
  //         options: [
  //             "no-sandbox",
  //             // "ignore-certificate-errors",
  //             // "force-device-scale-factor=1"
  //         ],
  //         disableHardwareAcceleration: false
  //     }
  // },
  testPathIgnorePatterns: common.testPathIgnorePatterns.concat([
    '<rootDir>/tests/__tests__/cli',
  ]),
};
