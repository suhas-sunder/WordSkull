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
    },
    css: { devSourcemap: false },
    optimizeDeps: {
      esbuildOptions: {
        sourcemap: false,
      },
    },
    plugins: [
      mdx(),
      ...(process.env.NODE_ENV !== "test"
        ? [
            remix({
              ssr: false,
              future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
                v3_lazyRouteDiscovery: true,
                v3_singleFetch: true,
              },
              ignoredRouteFiles: ["**/*.css"],
            }),
          ]
        : []),
      tsconfigPaths(),
    ],
    base: "/",
    test: {
      globals: true,
      environment: "jsdom",
    },
    define: {
      "import.meta.env.MODE": JSON.stringify(process.env.MODE || "development"),
      "import.meta.env.VITE_PORT": JSON.stringify(
        process.env.VITE_PORT || "3200",
      ),
    },
  });
};
