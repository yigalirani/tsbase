import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';
import { defineConfig,globalIgnores  } from "eslint/config";
export default defineConfig(
  globalIgnores(["dist/", "types/"]),
  eslint.configs.all, //this must be adter tseslint.configs or there will be less rules
  tseslint.configs.strict, //trying all, doesnt work
  {
    plugins: {
      'import-x': importX,
    },
    rules: {
      //'import-x/no-cycle': 'error',
      "@typescript-eslint/no-use-before-define":"warn",
      "no-inline-comments":"off",
      "sort-keys":"off",
      "func-style":"off",
      "no-console":"off",
      "id-length":"off",
      "one-var":"off",
      "curly":"off",
      "capitalized-comments":"off",
      "sort-imports":"off",
      "camelcase":"off"
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);