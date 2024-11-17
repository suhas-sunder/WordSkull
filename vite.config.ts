import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import mdx from "@mdx-js/rollup";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env = { ...process.env, ...env };

  const port = 3200;
  const host = "0.0.0.0";

  return defineConfig({
    server: {
      port,
      host,
      hmr: {
        protocol: "ws",
        host: "localhost",
      },
      proxy:
        mode === "development"
          ? {
              "/v1/api": {
                target: "http://localhost:3300", // Backend server running on port 3300 (adjust as needed)
                changeOrigin: true,
                secure: false,
              },
            }
          : {},
    },
    plugins: [
      mdx(),
      // Include remix plugin only if not in test environment
      ...(process.env.NODE_ENV !== "test"
        ? [
            remix({
              future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
              },
              ignoredRouteFiles: ["**/*.css"], // Optionally ignore certain files
            }),
          ]
        : []),
      tsconfigPaths(),
    ],
    base: "/", // Ensure base path is set correctly
    test: {
      globals: true,
      environment: "jsdom",
    },
    define: {
      "import.meta.env.MODE": JSON.stringify(process.env.MODE || "development"),
      "import.meta.env.VITE_PORT": JSON.stringify(
        process.env.VITE_PORT || "3200"
      ),
    },
    build: {
      rollupOptions: {
        external: ["fs"], // Exclude fs from the client-side bundle
      },
    },
    optimizeDeps: {
      exclude: ["fs"], // Exclude fs from deps optimization
    },
  });
};
