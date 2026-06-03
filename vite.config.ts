import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const entry = path.resolve(__dirname, "src/index.ts");
const isIifeBuild = process.env.BUILD_TARGET === "iife";

export default defineConfig({
  plugins: [react()],
  build: isIifeBuild
    ? {
        emptyOutDir: false,
        lib: {
          entry,
          name: "MyReactComponents",
          fileName: () => "index.iife.js",
          formats: ["iife"],
        },
      }
    : {
        emptyOutDir: true,
        lib: {
          entry,
          name: "MyReactComponents",
          fileName: (format) => `index.${format}.js`,
          formats: ["es", "umd"],
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
      },
});
