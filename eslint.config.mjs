import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    plugins: ["react-hooks"],
    rules: {
      semi: ["error"],
      "no-console": ["warn"],
      "no-unused-vars": [
        "warn",
        {
          args: "none", // don't warn about unused function args
          varsIgnorePattern: "^_", // ignore vars starting with _
          argsIgnorePattern: "^_", // ignore args starting with _
        },
      ],
      "prefer-const": ["error"],
      "jsx-quotes": ["error", "prefer-double"],
      quotes: ["error", "double"],
    },
  }),
];

export default eslintConfig;
