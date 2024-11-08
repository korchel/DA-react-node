import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import globals from "globals";
import eslintReact from 'eslint-plugin-react';
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: eslintReact,
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ['node_modules', 'public', 'dist', '@types', './webpack.config.js'],
  },
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: eslintReact.configs.recommended.parserOptions
    }
  },
  {
    files: ['**/*.{ts,ts}'],
    rules: {
      ...eslintConfigPrettier.rules,
    },
  },
);



