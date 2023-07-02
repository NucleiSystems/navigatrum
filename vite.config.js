import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [
    // wasm(),
    // topLevelAwait(),
    react(),
    commonjs(),

    // add the commonjs plugin here
  ],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
