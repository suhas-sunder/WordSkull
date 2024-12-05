// vite.config.ts
import { vitePlugin as remix } from "file:///E:/Desktop%20Files/Web%20Dev%20Projects%20and%20Learning/project_workspace/WordSkull/node_modules/@remix-run/dev/dist/index.js";
import { defineConfig, loadEnv } from "file:///E:/Desktop%20Files/Web%20Dev%20Projects%20and%20Learning/project_workspace/WordSkull/node_modules/vite/dist/node/index.js";
import mdx from "file:///E:/Desktop%20Files/Web%20Dev%20Projects%20and%20Learning/project_workspace/WordSkull/node_modules/@mdx-js/rollup/index.js";
import tsconfigPaths from "file:///E:/Desktop%20Files/Web%20Dev%20Projects%20and%20Learning/project_workspace/WordSkull/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = ({ mode }) => {
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
        host: "localhost"
      },
      proxy: mode === "development" ? {
        "/v1/api": {
          target: "http://localhost:3300",
          // Backend server running on port 3300 (adjust as needed)
          changeOrigin: true,
          secure: false
        }
      } : {}
    },
    plugins: [
      remix({
        future: {
          v3_lazyRouteDiscovery: true,
          v3_singleFetch: true
        }
      }),
      mdx(),
      // Include remix plugin only if not in test environment
      ...process.env.NODE_ENV !== "test" ? [
        remix({
          future: {
            v3_fetcherPersist: true,
            v3_relativeSplatPath: true,
            v3_throwAbortReason: true
          },
          ignoredRouteFiles: ["**/*.css"]
          // Optionally ignore certain files
        })
      ] : [],
      tsconfigPaths()
    ],
    base: "/",
    // Ensure base path is set correctly
    test: {
      globals: true,
      environment: "jsdom"
    },
    define: {
      "import.meta.env.MODE": JSON.stringify(process.env.MODE || "development"),
      "import.meta.env.VITE_PORT": JSON.stringify(
        process.env.VITE_PORT || "3200"
      )
    },
    build: {
      rollupOptions: {
        external: ["fs"]
        // Exclude fs from the client-side bundle
      }
    },
    optimizeDeps: {
      exclude: ["fs"]
      // Exclude fs from deps optimization
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxEZXNrdG9wIEZpbGVzXFxcXFdlYiBEZXYgUHJvamVjdHMgYW5kIExlYXJuaW5nXFxcXHByb2plY3Rfd29ya3NwYWNlXFxcXFdvcmRTa3VsbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcRGVza3RvcCBGaWxlc1xcXFxXZWIgRGV2IFByb2plY3RzIGFuZCBMZWFybmluZ1xcXFxwcm9qZWN0X3dvcmtzcGFjZVxcXFxXb3JkU2t1bGxcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0Rlc2t0b3AlMjBGaWxlcy9XZWIlMjBEZXYlMjBQcm9qZWN0cyUyMGFuZCUyMExlYXJuaW5nL3Byb2plY3Rfd29ya3NwYWNlL1dvcmRTa3VsbC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHZpdGVQbHVnaW4gYXMgcmVtaXggfSBmcm9tIFwiQHJlbWl4LXJ1bi9kZXZcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IG1keCBmcm9tIFwiQG1keC1qcy9yb2xsdXBcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfTogeyBtb2RlOiBzdHJpbmcgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgXCJcIik7XHJcbiAgcHJvY2Vzcy5lbnYgPSB7IC4uLnByb2Nlc3MuZW52LCAuLi5lbnYgfTtcclxuXHJcbiAgY29uc3QgcG9ydCA9IDMyMDA7XHJcbiAgY29uc3QgaG9zdCA9IFwiMC4wLjAuMFwiO1xyXG5cclxuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0LFxyXG4gICAgICBob3N0LFxyXG4gICAgICBobXI6IHtcclxuICAgICAgICBwcm90b2NvbDogXCJ3c1wiLFxyXG4gICAgICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHByb3h5OlxyXG4gICAgICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIlxyXG4gICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgXCIvdjEvYXBpXCI6IHtcclxuICAgICAgICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjMzMDBcIiwgLy8gQmFja2VuZCBzZXJ2ZXIgcnVubmluZyBvbiBwb3J0IDMzMDAgKGFkanVzdCBhcyBuZWVkZWQpXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIDoge30sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICByZW1peCh7XHJcbiAgICAgICAgZnV0dXJlOiB7XHJcbiAgICAgICAgICB2M19sYXp5Um91dGVEaXNjb3Zlcnk6IHRydWUsXHJcbiAgICAgICAgICB2M19zaW5nbGVGZXRjaDogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgbWR4KCksXHJcbiAgICAgIC8vIEluY2x1ZGUgcmVtaXggcGx1Z2luIG9ubHkgaWYgbm90IGluIHRlc3QgZW52aXJvbm1lbnRcclxuICAgICAgLi4uKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInRlc3RcIlxyXG4gICAgICAgID8gW1xyXG4gICAgICAgICAgICByZW1peCh7XHJcbiAgICAgICAgICAgICAgZnV0dXJlOiB7XHJcbiAgICAgICAgICAgICAgICB2M19mZXRjaGVyUGVyc2lzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHYzX3JlbGF0aXZlU3BsYXRQYXRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdjNfdGhyb3dBYm9ydFJlYXNvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGlnbm9yZWRSb3V0ZUZpbGVzOiBbXCIqKi8qLmNzc1wiXSwgLy8gT3B0aW9uYWxseSBpZ25vcmUgY2VydGFpbiBmaWxlc1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgIF1cclxuICAgICAgICA6IFtdKSxcclxuICAgICAgdHNjb25maWdQYXRocygpLFxyXG4gICAgXSxcclxuICAgIGJhc2U6IFwiL1wiLCAvLyBFbnN1cmUgYmFzZSBwYXRoIGlzIHNldCBjb3JyZWN0bHlcclxuICAgIHRlc3Q6IHtcclxuICAgICAgZ2xvYmFsczogdHJ1ZSxcclxuICAgICAgZW52aXJvbm1lbnQ6IFwianNkb21cIixcclxuICAgIH0sXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgXCJpbXBvcnQubWV0YS5lbnYuTU9ERVwiOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5NT0RFIHx8IFwiZGV2ZWxvcG1lbnRcIiksXHJcbiAgICAgIFwiaW1wb3J0Lm1ldGEuZW52LlZJVEVfUE9SVFwiOiBKU09OLnN0cmluZ2lmeShcclxuICAgICAgICBwcm9jZXNzLmVudi5WSVRFX1BPUlQgfHwgXCIzMjAwXCJcclxuICAgICAgKSxcclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgZXh0ZXJuYWw6IFtcImZzXCJdLCAvLyBFeGNsdWRlIGZzIGZyb20gdGhlIGNsaWVudC1zaWRlIGJ1bmRsZVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICBleGNsdWRlOiBbXCJmc1wiXSwgLy8gRXhjbHVkZSBmcyBmcm9tIGRlcHMgb3B0aW1pemF0aW9uXHJcbiAgICB9LFxyXG4gIH0pO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9hLFNBQVMsY0FBYyxhQUFhO0FBQ3hjLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sU0FBUztBQUNoQixPQUFPLG1CQUFtQjtBQUUxQixJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQXdCO0FBQzdDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxVQUFRLE1BQU0sRUFBRSxHQUFHLFFBQVEsS0FBSyxHQUFHLElBQUk7QUFFdkMsUUFBTSxPQUFPO0FBQ2IsUUFBTSxPQUFPO0FBRWIsU0FBTyxhQUFhO0FBQUEsSUFDbEIsUUFBUTtBQUFBLE1BQ047QUFBQSxNQUNBO0FBQUEsTUFDQSxLQUFLO0FBQUEsUUFDSCxVQUFVO0FBQUEsUUFDVixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0EsT0FDRSxTQUFTLGdCQUNMO0FBQUEsUUFDRSxXQUFXO0FBQUEsVUFDVCxRQUFRO0FBQUE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFFBQVE7QUFBQSxRQUNWO0FBQUEsTUFDRixJQUNBLENBQUM7QUFBQSxJQUNUO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsUUFDSixRQUFRO0FBQUEsVUFDTix1QkFBdUI7QUFBQSxVQUN2QixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsSUFBSTtBQUFBO0FBQUEsTUFFSixHQUFJLFFBQVEsSUFBSSxhQUFhLFNBQ3pCO0FBQUEsUUFDRSxNQUFNO0FBQUEsVUFDSixRQUFRO0FBQUEsWUFDTixtQkFBbUI7QUFBQSxZQUNuQixzQkFBc0I7QUFBQSxZQUN0QixxQkFBcUI7QUFBQSxVQUN2QjtBQUFBLFVBQ0EsbUJBQW1CLENBQUMsVUFBVTtBQUFBO0FBQUEsUUFDaEMsQ0FBQztBQUFBLE1BQ0gsSUFDQSxDQUFDO0FBQUEsTUFDTCxjQUFjO0FBQUEsSUFDaEI7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBLE1BQ0osU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLHdCQUF3QixLQUFLLFVBQVUsUUFBUSxJQUFJLFFBQVEsYUFBYTtBQUFBLE1BQ3hFLDZCQUE2QixLQUFLO0FBQUEsUUFDaEMsUUFBUSxJQUFJLGFBQWE7QUFBQSxNQUMzQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLFVBQVUsQ0FBQyxJQUFJO0FBQUE7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxJQUFJO0FBQUE7QUFBQSxJQUNoQjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
