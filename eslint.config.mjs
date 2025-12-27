import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { importX } from 'eslint-plugin-import-x'
import globals from 'globals';
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(
  globalIgnores(["**/dist/", "**/types/", '**/tmp2/', '**/tmp/', '**/unused_code/', '**/old', '**/converter_old/', '**/try/','**/node_modules/','**/*.mjs',"**/*.js"]),
  eslint.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: true,
        node: true,
      },
    },
  },  
  {

    rules: {
      'import-x/no-cycle': 'error', 
      "@typescript-eslint/no-unused-vars": "off", //turned off because biome does it faster
      "@typescript-eslint/no-unsafe-type-assertion":"off",
      //less than recomended
      "@typescript-eslint/no-deprecated": [
        "warn",
        {
          "allow": ["chrome"]
        }
      ],
      "@typescript-eslint/no-invalid-void-type": "off", //needed to mark function as not using this, also one routine that can retrn it.
      "@typescript-eslint/no-non-null-assertion":"off", //to many of them . also deffecult to replace it with nl for +=
      "@typescript-eslint/no-confusing-void-expression":"off", //becuse i like to do return return_void()  and also in VisitorCB
      "@typescript-eslint/restrict-template-expressions":"off", //its ok if template have numbers
       "@typescript-eslint/no-dynamic-delete": "off", //because delting variables at end of draw cycle, should probably resotre
       "@typescript-eslint/no-base-to-string": "off",//take too long to fix and not important
      "@typescript-eslint/no-unsafe-assignment":"warn",
      "@typescript-eslint/no-unsafe-argument":"warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-unused-labels": "off", //i dont like this rule because i like to orgenize long routines using labels
      "@typescript-eslint/no-unnecessary-type-parameters":"off",//i dont like this rule because it flages some usefull functions sucks as resuse_prev
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",//terible law, implmenting it resulted in bugs in the code
      "@typescript-eslint/no-use-before-define": [
        "warn",
        {
          "ignoreTypeReferences": false
        }
      ],
      "@typescript-eslint/restrict-plus-operands": "off",///oxc ["warn",{allowNumberAndString:true}], //ok to add string and number
      "@typescript-eslint/only-throw-error":"off", //aint nothing wrong with throwing a string - just check on catch
      //more than recomended
      "no-duplicate-imports":"warn",
      "eqeqeq": "off",//moved to oxc
      "@typescript-eslint/require-await":"off",//becuse oxc can do it
      "@typescript-eslint/promise-function-async":"off", //moved to oxc
      "no-constant-condition":"off",
      "@typescript-eslint/unified-signatures":"off"//rule crashes in my case
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  }
);