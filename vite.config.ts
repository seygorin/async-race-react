// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@containers": path.resolve(__dirname, "src/containers"),
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
  server: {
    proxy: {
      "/garage-api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
