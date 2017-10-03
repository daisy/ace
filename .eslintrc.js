module.exports = {
  "extends": "airbnb-base",
  "env": {
    "jest": true
  },
  "rules": {
    "no-console": 0,
    "no-underscore-dangle": ["error", { "allowAfterThis": true }],
  },
  "plugins": [
    "import"
  ],
  "parserOptions": {
    "sourceType": "script"
  }
};
