import { cpSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

function fromRoot(path: string) {
  return fileURLToPath(new URL(path, import.meta.url));
}

const SITE_OUT = fromRoot("./build");

/**
 * Ships the plain-HTML flavour with the site: /dist/dovetail.min.css,
 * /dist/dovetail.js… and the demo page at /html/demo.html. The shadcn
 * registry (public/r) is copied by Vite itself, so it is served at /r/.
 */
function shipHtmlBuild(): Plugin {
  let isSiteBuild = false;
  return {
    name: "dovetail:ship-html-build",
    apply: "build",
    configResolved(config) {
      // Storybook reuses this config with its own output folder: skip it there.
      isSiteBuild = resolve(config.root, config.build.outDir) === SITE_OUT;
    },
    closeBundle() {
      if (!isSiteBuild) {
        return;
      }
      if (!existsSync(fromRoot("./dist"))) {
        this.warn("dist/ is missing: run `npm run build:html` first.");
        return;
      }
      cpSync(fromRoot("./dist"), resolve(SITE_OUT, "dist"), {
        recursive: true,
      });
      cpSync(fromRoot("./html/demo.html"), resolve(SITE_OUT, "html/demo.html"));
    },
  };
}

// The showcase site (index.html + src/docs). Storybook reuses the plugins and the alias.
export default defineConfig({
  plugins: [react(), tailwindcss(), shipHtmlBuild()],
  resolve: {
    alias: { "@": fromRoot("./src") },
  },
  build: { outDir: "build", emptyOutDir: true },
});
