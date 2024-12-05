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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxEZXNrdG9wIEZpbGVzXFxcXFdlYiBEZXYgUHJvamVjdHMgYW5kIExlYXJuaW5nXFxcXHByb2plY3Rfd29ya3NwYWNlXFxcXFdvcmRTa3VsbFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcRGVza3RvcCBGaWxlc1xcXFxXZWIgRGV2IFByb2plY3RzIGFuZCBMZWFybmluZ1xcXFxwcm9qZWN0X3dvcmtzcGFjZVxcXFxXb3JkU2t1bGxcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0Rlc2t0b3AlMjBGaWxlcy9XZWIlMjBEZXYlMjBQcm9qZWN0cyUyMGFuZCUyMExlYXJuaW5nL3Byb2plY3Rfd29ya3NwYWNlL1dvcmRTa3VsbC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHZpdGVQbHVnaW4gYXMgcmVtaXggfSBmcm9tIFwiQHJlbWl4LXJ1bi9kZXZcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IG1keCBmcm9tIFwiQG1keC1qcy9yb2xsdXBcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfTogeyBtb2RlOiBzdHJpbmcgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgXCJcIik7XHJcbiAgcHJvY2Vzcy5lbnYgPSB7IC4uLnByb2Nlc3MuZW52LCAuLi5lbnYgfTtcclxuXHJcbiAgY29uc3QgcG9ydCA9IDMyMDA7XHJcbiAgY29uc3QgaG9zdCA9IFwiMC4wLjAuMFwiO1xyXG5cclxuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0LFxyXG4gICAgICBob3N0LFxyXG4gICAgICBobXI6IHtcclxuICAgICAgICBwcm90b2NvbDogXCJ3c1wiLFxyXG4gICAgICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHByb3h5OlxyXG4gICAgICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIlxyXG4gICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgXCIvdjEvYXBpXCI6IHtcclxuICAgICAgICAgICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjMzMDBcIiwgLy8gQmFja2VuZCBzZXJ2ZXIgcnVubmluZyBvbiBwb3J0IDMzMDAgKGFkanVzdCBhcyBuZWVkZWQpXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIDoge30sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBtZHgoKSxcclxuICAgICAgLy8gSW5jbHVkZSByZW1peCBwbHVnaW4gb25seSBpZiBub3QgaW4gdGVzdCBlbnZpcm9ubWVudFxyXG4gICAgICAuLi4ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwidGVzdFwiXHJcbiAgICAgICAgPyBbXHJcbiAgICAgICAgICAgIHJlbWl4KHtcclxuICAgICAgICAgICAgICBmdXR1cmU6IHtcclxuICAgICAgICAgICAgICAgIHYzX2ZldGNoZXJQZXJzaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdjNfcmVsYXRpdmVTcGxhdFBhdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB2M190aHJvd0Fib3J0UmVhc29uOiB0cnVlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgaWdub3JlZFJvdXRlRmlsZXM6IFtcIioqLyouY3NzXCJdLCAvLyBPcHRpb25hbGx5IGlnbm9yZSBjZXJ0YWluIGZpbGVzXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIDogW10pLFxyXG4gICAgICB0c2NvbmZpZ1BhdGhzKCksXHJcbiAgICBdLFxyXG4gICAgYmFzZTogXCIvXCIsIC8vIEVuc3VyZSBiYXNlIHBhdGggaXMgc2V0IGNvcnJlY3RseVxyXG4gICAgdGVzdDoge1xyXG4gICAgICBnbG9iYWxzOiB0cnVlLFxyXG4gICAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxyXG4gICAgfSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICBcImltcG9ydC5tZXRhLmVudi5NT0RFXCI6IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lk1PREUgfHwgXCJkZXZlbG9wbWVudFwiKSxcclxuICAgICAgXCJpbXBvcnQubWV0YS5lbnYuVklURV9QT1JUXCI6IEpTT04uc3RyaW5naWZ5KFxyXG4gICAgICAgIHByb2Nlc3MuZW52LlZJVEVfUE9SVCB8fCBcIjMyMDBcIlxyXG4gICAgICApLFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBleHRlcm5hbDogW1wiZnNcIl0sIC8vIEV4Y2x1ZGUgZnMgZnJvbSB0aGUgY2xpZW50LXNpZGUgYnVuZGxlXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIGV4Y2x1ZGU6IFtcImZzXCJdLCAvLyBFeGNsdWRlIGZzIGZyb20gZGVwcyBvcHRpbWl6YXRpb25cclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb2EsU0FBUyxjQUFjLGFBQWE7QUFDeGMsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sbUJBQW1CO0FBRTFCLElBQU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBd0I7QUFDN0MsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFVBQVEsTUFBTSxFQUFFLEdBQUcsUUFBUSxLQUFLLEdBQUcsSUFBSTtBQUV2QyxRQUFNLE9BQU87QUFDYixRQUFNLE9BQU87QUFFYixTQUFPLGFBQWE7QUFBQSxJQUNsQixRQUFRO0FBQUEsTUFDTjtBQUFBLE1BQ0E7QUFBQSxNQUNBLEtBQUs7QUFBQSxRQUNILFVBQVU7QUFBQSxRQUNWLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQSxPQUNFLFNBQVMsZ0JBQ0w7QUFBQSxRQUNFLFdBQVc7QUFBQSxVQUNULFFBQVE7QUFBQTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxNQUNGLElBQ0EsQ0FBQztBQUFBLElBQ1Q7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQTtBQUFBLE1BRUosR0FBSSxRQUFRLElBQUksYUFBYSxTQUN6QjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFVBQ0osUUFBUTtBQUFBLFlBQ04sbUJBQW1CO0FBQUEsWUFDbkIsc0JBQXNCO0FBQUEsWUFDdEIscUJBQXFCO0FBQUEsVUFDdkI7QUFBQSxVQUNBLG1CQUFtQixDQUFDLFVBQVU7QUFBQTtBQUFBLFFBQ2hDLENBQUM7QUFBQSxNQUNILElBQ0EsQ0FBQztBQUFBLE1BQ0wsY0FBYztBQUFBLElBQ2hCO0FBQUEsSUFDQSxNQUFNO0FBQUE7QUFBQSxJQUNOLE1BQU07QUFBQSxNQUNKLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTix3QkFBd0IsS0FBSyxVQUFVLFFBQVEsSUFBSSxRQUFRLGFBQWE7QUFBQSxNQUN4RSw2QkFBNkIsS0FBSztBQUFBLFFBQ2hDLFFBQVEsSUFBSSxhQUFhO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxlQUFlO0FBQUEsUUFDYixVQUFVLENBQUMsSUFBSTtBQUFBO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixTQUFTLENBQUMsSUFBSTtBQUFBO0FBQUEsSUFDaEI7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFtdCn0K
