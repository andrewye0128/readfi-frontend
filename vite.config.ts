import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/readfi-frontend/", // GitHub Repo 名稱
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      buffer: "buffer",
      process: "process/browser",
      util: "util",
    },
  },
  define: {
    global: "globalThis",
    "process.env": {},
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      plugins: [],
    },
  },
  optimizeDeps: {
    include: ["buffer", "util", "process"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
});
