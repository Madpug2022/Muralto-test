import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.jsx",
      name: "muralto",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `muralto.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "three",
        "react-icons",
        "lgl-tracer",
        "postprocessing",
        "dat.gui",
        "gsap",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          three: "THREE",
          "react-icons": "ReactIcons",
          "lgl-tracer": "lglTracer",
          postprocessing: "postprocessing",
          "dat.gui": "dat",
          gsap: "gsap",
        },
      },
    },
  },
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.bin"],
});
