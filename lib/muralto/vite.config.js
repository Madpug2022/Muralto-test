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
        "@react-three/drei",
        "@react-three/fiber",
        "@react-three/postprocessing",
        "leva",
        "three-csm",
        "react-icons",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          three: "THREE",
          "@react-three/drei": "drei",
          "@react-three/fiber": "ReactThreeFiber",
          "@react-three/postprocessing": "postprocessing",
          leva: "Leva",
          "three-csm": "THREECSM",
          "react-icons": "ReactIcons",
        },
      },
    },
  },
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.bin"],
});
