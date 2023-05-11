import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import commonjs from "@rollup/plugin-commonjs";
// import wasm from "vite-plugin-wasm";
// import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    // wasm(),
    // topLevelAwait(),
    react(),
    commonjs(), // add the commonjs plugin here
  ],
});
