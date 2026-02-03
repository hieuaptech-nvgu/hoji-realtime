import { defineConfig } from "eslint/config";
import globals from "globals";
import eslint from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    ignores: ["eslint.config.mjs", "node_modules", "dist", "build"],

    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        project: "./tsconfig.json"
      },
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      semi: "off",
      "prefer-const": "error",
      "no-console": "error",
      "prettier/prettier": "warn",
    },
  },
]);