import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
  // base: process.env.NODE_ENV === "production" ? "/front-6th-chapter1-1/" : "/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        404: "404.html",
      },
    },
  },
});
