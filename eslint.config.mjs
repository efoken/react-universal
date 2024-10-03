import { FlatCompat } from '@eslint/eslintrc';
import stylisticPlugin from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat();

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    ignores: [
      '.yarn/',
      'docs/.next/',
      'docs/next.config.mjs',
      'app/.expo/',
      'app/android/',
      'app/ios/',
      'packages/*/dist/',
    ],
  },
  ...compat.extends('airbnb'),
  ...compat.extends('airbnb/hooks'),
  ...compat.extends('@kesills/airbnb-typescript'),
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    rules: Object.fromEntries(
      Object.keys(stylisticPlugin.configs['all-flat'].rules ?? {}).map((key) => [key, 'off']),
    ),
  },
  eslintPluginImport.flatConfigs.typescript,
  eslintPluginReact.configs.flat['jsx-runtime'],
  eslintPluginUnicorn.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'import/extensions': 'off',
      'import/no-anonymous-default-export': 'error',
      'import/no-cycle': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-array-index-key': 'off',
      'react/no-is-mounted': 'off', // currently broken
      'react/no-typos': 'off',
      'react/no-unused-class-component-methods': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'array-callback-return': 'off',
      'consistent-return': 'off',
      'no-console': 'off',
      'no-continue': 'off',
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['acc', 'node', 'ref'],
        },
      ],
      'no-restricted-syntax': 'off',
      'no-underscore-dangle': 'off',
    },
  },
  {
    files: ['*.js', '*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
];

export default config;
