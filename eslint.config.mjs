import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules } from '@eslint/compat';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  ...tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  globalIgnores(['**/dist']),
  {
    extends: fixupConfigRules(compat.extends('eslint:recommended')),
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
]);
