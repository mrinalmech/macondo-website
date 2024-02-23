module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  root: true,
  rules: {
    'react-hooks/rules-of-hooks': `warn`,
    'react-hooks/exhaustive-deps': `warn`,
    'react/react-in-jsx-scope': `off`,
    'react/prop-types': `off`,
    'no-unused-vars': `warn`,
  },
  env: {
    amd: true,
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    `react-app`,
    `eslint:recommended`,
    `plugin:react/recommended`,
    `plugin:jsx-a11y/recommended`,
    `plugin:cypress/recommended`,
  ],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaVersion: 2020,
    requireConfigFile: false,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
    },
  },
  plugins: [`react`, `react-hooks`, `jsx-a11y`],
  settings: {
    react: {
      version: `detect`,
    },
  },
};
