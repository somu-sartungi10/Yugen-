import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: pluginReact,
    },
    extends: [
      js.configs.recommended,
      pluginReact.configs.flat.recommended,
    ],
    rules: {
      "react/react-in-jsx-scope": "off", // don’t require `import React`
      "react/prop-types": "off",         // don’t nag about PropTypes
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
