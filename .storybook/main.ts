import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: { name: "@storybook/react-vite", options: {} },
  // The HTML build and its demo page are served as-is, for the "HTML" story.
  staticDirs: [
    { from: "../dist", to: "/dist" },
    { from: "../html/demo.html", to: "/html/demo.html" },
  ],
  viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        alias: { "@": fileURLToPath(new URL("../src", import.meta.url)) },
      },
    });
  },
};

export default config;
