import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactNative from 'eslint-plugin-react-native';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReactNative.configs.flat.recommended,
  {
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

      'no-use-before-define': ['error', { variables: false }],

      'react/prop-types': ['error', { ignore: ['navigation', 'navigation.navigate'] }],
    },
  },
]);
