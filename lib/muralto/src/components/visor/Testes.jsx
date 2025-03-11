import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function ModelViewer({
  modelUrl,
  backgroundColor = "#DAE7F2",
  width = "100%",
  height = "100%",
}) {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meshStats, setMeshStats] = useState({ before: 0, after: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Crear escena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // Configurar cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Configurar renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    // Añadir luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Añadir OrbitControls sin restricciones
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // No establecer límites para OrbitControls
    controls.minDistance = 0;
    controls.maxDistance = Infinity;

    // Función para unir meshes
    function mergeMeshes(meshes, materialIndex) {
      if (meshes.length === 0) return null;

      // Crear geometrías combinadas
      const geometry = new THREE.BufferGeometry();

      // Arrays para almacenar los datos de los atributos
      let vertices = [];
      let normals = [];
      let uvs = [];
      let indices = [];

      let indexOffset = 0;

      // Combinar geometrías
      meshes.forEach((mesh) => {
        // Obtener geometría y transformarla según la matriz mundial del mesh
        const geo = mesh.geometry.clone();
        geo.applyMatrix4(mesh.matrixWorld);

        // Obtener atributos
        const position = geo.getAttribute("position").array;
        const normal = geo.getAttribute("normal")?.array;
        const uv = geo.getAttribute("uv")?.array;
        const index = geo.index?.array;

        // Añadir vértices
        for (let i = 0; i < position.length; i++) {
          vertices.push(position[i]);
        }

        // Añadir normales si existen
        if (normal) {
          for (let i = 0; i < normal.length; i++) {
            normals.push(normal[i]);
          }
        }

        // Añadir UVs si existen
        if (uv) {
          for (let i = 0; i < uv.length; i++) {
            uvs.push(uv[i]);
          }
        }

        // Añadir índices si existen
        if (index) {
          for (let i = 0; i < index.length; i++) {
            indices.push(index[i] + indexOffset);
          }
        }

        // Actualizar el offset para los índices
        indexOffset += position.length / 3;
      });

      // Establecer atributos en la geometría combinada
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      if (normals.length > 0) {
        geometry.setAttribute(
          "normal",
          new THREE.Float32BufferAttribute(normals, 3)
        );
      }

      if (uvs.length > 0) {
        geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
      }

      if (indices.length > 0) {
        geometry.setIndex(indices);
      }

      // Crear un material básico para el mesh combinado
      // Usar el material del primer mesh si está disponible
      const material = meshes[0].material.clone();

      // Crear el mesh combinado
      const mergedMesh = new THREE.Mesh(geometry, material);
      mergedMesh.name = materialIndex === 0 ? "merged_walls" : "merged_other";

      return mergedMesh;
    }

    // Cargar modelo
    const loader = new GLTFLoader();

    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        const originalMeshCount = [];

        // Arrays para almacenar los meshes según su categoría
        const wallMeshes = [];
        const otherMeshes = [];

        // Recorrer todos los meshes y clasificarlos
        model.traverse((child) => {
          if (child.isMesh) {
            originalMeshCount.push(child);

            // Clonar el mesh para no afectar al original mientras procesamos
            const clonedMesh = child.clone();

            // Comprobar si el nombre contiene "wall"
            if (child.name.toLowerCase().includes("wall")) {
              wallMeshes.push(clonedMesh);
            } else {
              otherMeshes.push(clonedMesh);
            }
          }
        });

        // Eliminar el modelo original de la escena
        // scene.remove(model);

        // Crear meshes combinados
        const mergedWallMesh = mergeMeshes(wallMeshes, 0);
        const mergedOtherMesh = mergeMeshes(otherMeshes, 1);

        // Crear un nuevo grupo para contener los meshes combinados
        const optimizedModel = new THREE.Group();

        // Añadir los meshes combinados al grupo
        if (mergedWallMesh) optimizedModel.add(mergedWallMesh);
        if (mergedOtherMesh) optimizedModel.add(mergedOtherMesh);

        // Añadir el grupo optimizado a la escena
        scene.add(optimizedModel);

        // Actualizar estadísticas
        setMeshStats({
          before: originalMeshCount.length,
          after: (mergedWallMesh ? 1 : 0) + (mergedOtherMesh ? 1 : 0),
        });

        // Centrar la cámara en el modelo
        const box = new THREE.Box3().setFromObject(optimizedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

        // Añadir un margen
        cameraZ *= 1.5;

        camera.position.set(center.x, center.y, center.z + cameraZ);
        controls.target.set(center.x, center.y, center.z);

        // Notificar que la carga ha finalizado
        setIsLoading(false);

        console.log("Optimización completada:");
        console.log(`- Meshes originales: ${originalMeshCount.length}`);
        console.log(
          `- Meshes después de la optimización: ${
            (mergedWallMesh ? 1 : 0) + (mergedOtherMesh ? 1 : 0)
          }`
        );
        console.log(`- Meshes tipo 'wall': ${wallMeshes.length}`);
        console.log(`- Otros meshes: ${otherMeshes.length}`);
      },
      (xhr) => {
        // Progreso de carga
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(`${Math.round(percentComplete)}% cargado`);
      },
      (error) => {
        console.error("Error cargando el modelo:", error);
        setError(error.message || "Error al cargar el modelo");
        setIsLoading(false);
      }
    );

    // Función de animación
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Manejar cambios de tamaño de ventana
    const handleResize = () => {
      if (!containerRef.current) return;

      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    // Limpieza
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
      controls.dispose();
    };
  }, [modelUrl, backgroundColor]);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: `${backgroundColor}`,
        position: "relative",
        width: width,
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading && (
        <div style={{ position: "absolute", color: "#666" }}>
          Cargando modelo...
        </div>
      )}

      {error && (
        <div style={{ position: "absolute", color: "red" }}>Error: {error}</div>
      )}

      {!isLoading && !error && meshStats.after > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          Optimización: {meshStats.before} → {meshStats.after} meshes
        </div>
      )}
    </div>
  );
}

export default ModelViewer;
