import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    tailwindcss(), // Tailwind 4 Plugin
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", {}]],
      },
    }),
    dts({
      insertTypesEntry: true,
      include: ["src"],
      exclude: ["**/*.test.ts", "**/*.test.tsx", "src/main.tsx", "src/App.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "AerDesign",
      formats: ["es"],
      fileName: (format) => `aer-design.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
