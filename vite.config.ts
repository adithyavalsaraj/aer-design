import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ mode }) => {
  const isDocsMode = mode === "docs" || process.env.BUILD_DOCS === "true";

  return {
    plugins: [
      tailwindcss(), // Tailwind 4 Plugin
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler", {}]],
        },
      }),
      !isDocsMode &&
        dts({
          insertTypesEntry: true,
          include: ["src"],
          exclude: [
            "**/*.test.ts",
            "**/*.test.tsx",
            "src/main.tsx",
            "src/App.tsx",
          ],
        }),
    ].filter(Boolean),
    base: isDocsMode ? "/aer-design/" : "/",
    build: isDocsMode
      ? {
          // Docs build configuration
          outDir: "dist",
          emptyOutDir: true,
          rollupOptions: {
            input: {
              main: resolve(__dirname, "index.html"),
            },
          },
        }
      : {
          // Library build configuration
          lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "AerDesign",
            formats: ["es"],
            fileName: (format) => `aer-design.${format}.js`,
          },
          rollupOptions: {
            external: [
              "react",
              "react-dom",
              "react/jsx-runtime",
              "tailwindcss",
            ],
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
  };
});
