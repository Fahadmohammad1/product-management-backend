import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["**/node_modules/", ".env", "**/dist/"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "@typescript-eslint/no-var-requires": 0,
    },
  }
];