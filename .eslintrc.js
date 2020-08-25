module.exports = {
  extends: 'plugin:@darkobits/tsx',
  rules: {
    'no-console': 'off',
    'import/no-unresolved': ['error', {
      ignore: [
        '^virtual:'
      ]
    }]
  }
};
