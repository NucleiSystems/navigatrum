import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import commonjs from "@rollup/plugin-commonjs";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

export default defineConfig({
  plugins: [
    // wasm(),
    // topLevelAwait(),
    react(),
    commonjs(),
    registerPlugin(
      FilePondPluginImageExifOrientation,
      FilePondPluginImagePreview
    ),
    // add the commonjs plugin here
  ],
});
