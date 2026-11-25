import { defineConfig, globalIgnores } from "eslint/config";
import boundaries from "eslint-plugin-boundaries";
import checkFile from "eslint-plugin-check-file";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

// Files where a tool requires a default export.
const DEFAULT_EXPORT_FILES = [
  "src/**/*.stories.{ts,tsx}",
  ".storybook/**/*.{ts,tsx}",
  "*.config.{ts,mjs,js}",
];

const eslintConfig = defineConfig([
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}", ".storybook/**/*.{ts,tsx}"],
    plugins: { react, "react-hooks": reactHooks },
    settings: { react: { version: "detect" } },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react/jsx-key": "error",
      "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary"] }],
    },
  },
  {
    // Code style (see the code-guidelines skill).
    rules: {
      curly: ["error", "all"],
      // `function name() {}` rather than `const name = () => {}`. Inline callbacks stay arrows.
      "func-style": ["error", "declaration"],
      "no-nested-ternary": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-restricted-exports": [
        "error",
        {
          restrictDefaultExports: {
            direct: true,
            named: true,
            defaultFrom: true,
          },
        },
      ],
    },
  },
  {
    files: DEFAULT_EXPORT_FILES,
    rules: { "no-restricted-exports": "off" },
  },
  {
    // Build scripts report their result on stdout.
    files: ["html/build.mjs", ".claude/**/*.mjs"],
    rules: { "no-console": "off" },
  },
  {
    // Naming: kebab-case files and folders.
    files: ["src/**/*.{ts,tsx}"],
    plugins: { "check-file": checkFile },
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        { "**/*.{ts,tsx}": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
      "check-file/folder-naming-convention": [
        "error",
        { "src/**": "KEBAB_CASE" },
      ],
    },
  },
  {
    // Architecture: who imports what (see src/CLAUDE.md).
    files: ["src/**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "import/resolver": { typescript: { alwaysTryTypes: true } },
      "boundaries/legacy-templates": false,
      "boundaries/elements": [
        { type: "ui", pattern: "src/components/ui" },
        { type: "lib", pattern: "src/lib" },
        { type: "stories", pattern: "src/stories" },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            {
              // Stories show the kit: they may import everything.
              from: { element: { type: "stories" } },
              allow: { to: { element: { types: ["ui", "lib", "stories"] } } },
            },
            {
              // UI primitives carry no business logic.
              from: { element: { type: "ui" } },
              allow: { to: { element: { types: ["ui", "lib"] } } },
            },
            {
              // Recipes and helpers stay free of React: the HTML build imports them.
              from: { element: { type: "lib" } },
              allow: { to: { element: { type: "lib" } } },
            },
          ],
        },
      ],
    },
  },
  globalIgnores([
    "dist/**",
    "public/r/**",
    "storybook-static/**",
    "coverage/**",
    "html/.tmp/**",
  ]),
]);

export default eslintConfig;
