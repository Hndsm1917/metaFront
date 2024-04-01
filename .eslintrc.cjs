/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    //'@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  plugins: ['vue', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-undef': 'off',
    'prettier/prettier': ['warn', { singleQuote: true, useTabs: true, endOfLine: 'auto' }],
    camelcase: 'off',
    'no-case-declarations': 'off',
    'vue/no-v-html': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-for-template-key': 'off',
    'prefer-promise-reject-errors': 'off',
  },
  ignorePatterns: ['jetbrains.config.js'],
}
