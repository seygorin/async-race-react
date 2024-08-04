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
      "@pages": path.resolve(__dirname, "src/pages"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@store": path.resolve(__dirname, "src/store"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@type": path.resolve(__dirname, "src/types"),
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
