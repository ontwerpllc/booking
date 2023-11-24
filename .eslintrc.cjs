module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-console': 'warn',
    '@typescript-eslint/consistent-type-exports': 'warn',
    '@typescript-eslint/consistent-type-imports': 'warn',
  },
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
};
