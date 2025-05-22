import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["**/.next/**", "**/node_modules/**", "**/dist/**", "**/build/**", "**/out/**"],
  },
  { plugins: { "jsx-a11y": eslintPluginJsxA11y } },
  ...compat.config({
    extends: ["plugin:jsx-a11y/strict", "next", "prettier"],
    rules: {
      semi: ["error"],
      "no-console": ["warn"],
      "prefer-const": ["error"],
      "jsx-quotes": ["error", "prefer-double"],
      quotes: ["error", "double"],
    },
  }),
];

export default eslintConfig;
