// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  // Tells Vite to look for index.html in the 'src' folder
  root: path.resolve(__dirname, "src"),

  build: {
    // Put final compiled assets in dist/client
    outDir: path.resolve(__dirname, "dist/client"),
    emptyOutDir: true, // so we get a clean output folder each build

    rollupOptions: {
      // Vite needs to know where your HTML entry is
      input: path.resolve(__dirname, "src/index.html"),
    },
  },
});
