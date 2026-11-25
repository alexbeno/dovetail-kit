import type { StorybookConfig } from "@storybook/react-vite";

// Tailwind, React and the `@` alias come from the root vite.config.ts.
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: { name: "@storybook/react-vite", options: {} },
  // The HTML build and its demo page are served as-is, for the "HTML" story.
  staticDirs: [
    { from: "../dist", to: "/dist" },
    { from: "../html/demo.html", to: "/html/demo.html" },
  ],
};

export default config;
