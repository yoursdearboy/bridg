import js from "@eslint/js";
import json from "@eslint/json";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["vite.config.ts"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unnecessary-condition": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["sibling", "parent"],
            "index",
            "unknown",
          ],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-named-as-default-member": "off",
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  {
    plugins: { json },
    files: ["**/*.json"],
    language: "json/jsonc",
    rules: {
      "json/no-duplicate-keys": "error",
    },
  },
  {
    plugins: { json },
    files: ["**/locales/*.json"],
    language: "json/jsonc",
    rules: {
      "json/sort-keys": [
        "error",
        "asc",
        {
          caseSensitive: true,
        },
      ],
    },
  },
]);
