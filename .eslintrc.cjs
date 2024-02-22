/* global module:writable */
module.exports = {
  extends: ['next', 'plugin:@darkobits/tsx'],
  globals: {
    process: 'readonly'
  },
  rules: {
    // Server components must be marked as async, even if they don't have await
    // statements.
    '@typescript-eslint/require-await': 'off',
    // This seems to be a holdover from the Page Router days. If applied to the
    // root layout, fonts will be loaded on every page.
    '@next/next/no-page-custom-font': 'off',
    '@next/next/no-img-element': 'off',
    'no-console': 'off',
    'import/no-cycle': 'off'
  }
};
