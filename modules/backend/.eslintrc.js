module.exports = {
  env: {
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:cypress/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-use-before-define': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'react/function-component-definition': 0,
    'react/require-default-props': 0,
    'linebreak-style': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
