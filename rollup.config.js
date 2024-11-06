import mdx from "@mdx-js/rollup";
import { babel } from "@rollup/plugin-babel";
import resolve from '@rollup/plugin-node-resolve'; // Resolves modules from node_modules
import commonjs from '@rollup/plugin-commonjs'; // Converts CommonJS modules to ES6

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.js', // Your entry file
  output: {
    dir: 'dist',
    format: 'esm', // ESM format is suitable for modern applications
    sourcemap: true, // Optional: includes sourcemaps for easier debugging
  },
  plugins: [
    resolve(), // Resolves node modules
    commonjs(), // Converts CommonJS modules to ES6
    mdx({
      // Any specific options for MDX can be added here
      // For example, you might want to add options for the MDX compiler here
    }),
    babel({
      extensions: [".js", ".jsx", ".cjs", ".mjs", ".md", ".mdx"],
      babelHelpers: 'bundled', // Make sure Babel can work with these files
      presets: ["@babel/preset-react"], // Include React preset
      // Add any other Babel options as needed
    }),
  ],
};

export default config;
