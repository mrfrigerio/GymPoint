module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'react-hooks',
    'import',
    'jsx-a11y'
  ],
  rules: {
    'comma-dangle': ["error", "never"],
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.jsx', '.js'] }
    ],
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-console': ['error', { allow: ['tron'] }],
    'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
    'no-param-reassign': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'camelcase': 'off',
    'no-underscore-dangle': 'off',
    'react-native/no-raw-text': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    "jsx-a11y/label-has-associated-control": [2, {
      "labelComponents": ["label"],
      "labelAttributes": ["label"],
      "controlComponents": ["Input"],
      "depth": 3,
    }],
  },
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        rootPathSuffix: "src"
      }
    }
  }
}
