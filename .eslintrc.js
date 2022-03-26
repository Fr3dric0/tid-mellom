module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    jest: true,
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'react',
    'react-hooks',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    // Our default style guide. Uses a strict policy where every violation is an error
    'airbnb-base',
    // Necessary to discover TypeScript imports
    'plugin:import/typescript',
    'plugin:react/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    // Too often we do not wish to prefer default exports
    'import/prefer-default-export': 0,
    'max-len': ['error', { code: 140 }],
    'import/extensions': 0,
    'arrow-body-style': 0,
    'react/prop-types': 0,
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    // Must be disabled for @typescript-eslint/no-unused-vars to not conflict
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
}
