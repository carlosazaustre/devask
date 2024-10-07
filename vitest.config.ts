import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    coverage: {
      reporter: ["lcov", "text-summary"],
      reportsDirectory: "coverage",
      include: ["src/**/*.ts"],
    },
  },
  esbuild: {
    // No loader configuration needed
  },
});
