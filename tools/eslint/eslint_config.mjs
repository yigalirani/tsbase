import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';
import { defineConfig,globalIgnores  } from "eslint/config";
export default defineConfig(
  globalIgnores(["**/dist/", "**/types/"]),
  eslint.configs.all, //taking all rules from eslint, truning select ones off below
  tseslint.configs.strict, 
  {
    plugins: {
      'import-x': importX,
    },
    rules: {
      //'import-x/no-cycle': 'error', //commented out because slow, turn on when needed
      "@typescript-eslint/no-use-before-define":"warn", //turning this one on because i love it
      "no-inline-comments":"off",
      "sort-keys":"off",
      "func-style":"off",
      "no-console":"off",
      "id-length":"off",
      "one-var":"off",
      "curly":"off",
      "capitalized-comments":"off",
      "sort-imports":"off",
      "camelcase":"off",
      "func-names":"off",
      "no-plusplus":"off",
      "no-magic-numbers":"off"
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);