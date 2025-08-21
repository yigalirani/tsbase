import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import {dump_config} from '/yigal/eslint_utils/eslint_utils.js'
import { importX } from 'eslint-plugin-import-x'

const ignores=[ 
      "**/dist",
      "**/types"
    ]
const base=[

  { 
       files: ["**/*.ts"], 
    plugins: { js,importX,tseslint }, 
    languageOptions: { globals: globals.node } 
  },
  {
    files: ["**/*.ts"], 
    rules:{
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    'no-extend-native': 'warn',
    "no-unused-vars": "warn",
    "prefer-const": "warn",
    "object-shorthand": "warn",
    "no-inner-declarations": "warn",
    "no-duplicate-imports": "warn",
    "no-unused-labels": "off",
    "no-empty-pattern": "off",
    "no-use-before-define": "off",
    "no-self-compare": "warn",
    "no-unused-expressions": "warn",
    "max-params": "warn",
    "no-param-reassign": "off",
    "logical-assignment-operators": "warn",
    "no-func-assign": "warn",
    "no-var": "warn",
    "no-loop-func": "warn",
    'import-x/no-cycle': "off",
    "@typescript-eslint/no-use-before-define":"warn"
    },
    
  }
]

dump_config(base,'base.json')
const define_config=defineConfig(base)
 
dump_config(define_config,'define_config.json')
export default [

  {
    plugins: {
      'import-x': importX,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'import-x/no-dynamic-require': 'warn',
      'import-x/no-nodejs-modules': 'warn',
    },
  },
]
