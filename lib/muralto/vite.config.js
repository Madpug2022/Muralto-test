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
        "three-mesh-bvh",
        "n8ao",
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
          "three-mesh-bvh": "THREE.MeshBVH",
          n8ao: "n8ao",
        },
      },
    },
  },
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.json"],
});
