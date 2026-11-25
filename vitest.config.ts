import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    // Tests for the HTML generator live in html/, for skill scripts in .claude/.
    include: [
      "src/**/*.test.{ts,tsx}",
      "html/**/*.test.mjs",
      ".claude/**/*.test.mjs",
    ],
    coverage: { provider: "v8", reporter: ["text", "json"] },
  },
});
