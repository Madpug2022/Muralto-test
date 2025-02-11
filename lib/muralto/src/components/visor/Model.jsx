import { useRef, useEffect, useState, use, useCallback } from "react";
import * as THREE from "three";
// Importa los loaders y controles que necesitas
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { CiMaximize2 } from "react-icons/ci";
import { PiBoundingBox } from "react-icons/pi";
import { MdOutlineCameraIndoor } from "react-icons/md";

import { gsap } from "gsap";
import Button from "../ui/Button";
import Helper from "../ui/Helper";
import MenuButton from "../ui/MenuButton";
import { TransformControls } from "three/addons/controls/TransformControls.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import {
  MeshBVH,
  computeBoundsTree,
  disposeBoundsTree,
  computeBatchedBoundsTree,
  disposeBatchedBoundsTree,
  acceleratedRaycast,
} from "three-mesh-bvh";
import { N8AOPass } from "n8ao";
import modelUrl from "../../assets/Muralto/model.glb";
import roomsUrl from "../../assets/Muralto/rooms.glb";
import dataUrl from "../../assets/Muralto/props.json?url";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

function extractOODDirectShapeIds(rooms) {
  const oodDirectShapeIds = [];

  for (const key in rooms) {
    if (rooms.hasOwnProperty(key)) {
      const room = rooms[key];

      if (
        typeof room === "object" &&
        room !== null &&
        room.hasOwnProperty("_OOD_DirectShapeId")
      ) {
        oodDirectShapeIds.push(room._OOD_DirectShapeId.toString());
      }
    }
  }

  return oodDirectShapeIds;
}

const Visor = ({ externalIds, testMode = false }) => {
  const [showCameraControls, setShowCameraControls] = useState(false);
  const [cuttingActive, setCuttingActive] = useState(false);
  const visorRef = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const rendererRef = useRef();
  const sceneRef = useRef();
  const boxHelperRef = useRef(null);
  const raycasterRef = useRef(null);
  const clippingPlaneRef = useRef(null);
  const planeMeshRef = useRef(null);
  const transformControlsRef = useRef(null);
  const modelRef = useRef(null);
  const roomsModelRef = useRef(null);
  const composerRef = useRef(null);
  const originalMaterialsRef = useRef({});
  const roomsOriginalMaterialsRef = useRef({});
  const roomsRef = useRef([]);
  const n8aopassRef = useRef(null);
  const isHoverActive = useRef(false);
  const animationFrameId = useRef(null);
  const [jsonData, setJson] = useState(null);

  const cargarJSON = useCallback(async () => {
    try {
      const respuesta = await fetch(dataUrl);
      if (!respuesta.ok) {
        throw new Error(
          `Error al obtener el archivo JSON: ${respuesta.status}`
        );
      }
      const datos = await respuesta.json();
      setJson(datos);
      roomsRef.current = extractOODDirectShapeIds(datos.rooms);
      return datos;
    } catch (error) {
      console.error("Hubo un problema al cargar el JSON:", error);
      throw error;
    }
  }, [dataUrl]);

  const darkerTransparentGrayMaterial = new THREE.MeshStandardMaterial({
    color: 0xd3d3d3,
    transparent: true,
    opacity: 0.05,
    roughness: 0.1,
    metalness: 0.06,
    depthWrite: false,
  });

  // Cargar modelo GLB
  const loader = new GLTFLoader();
  const roomLoader = new GLTFLoader();

  loader.setMeshoptDecoder(MeshoptDecoder);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Configuración básica
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    function render() {
      renderer.render(scene, camera);
    }
    const width = visorRef.current.clientWidth;
    const height = visorRef.current.clientHeight;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.SRGBColorSpace;
    renderer.localClippingEnabled = true;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    visorRef.current.appendChild(renderer.domElement);

    THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
    THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
    THREE.Mesh.prototype.raycast = acceleratedRaycast;

    THREE.BatchedMesh.prototype.computeBoundsTree = computeBatchedBoundsTree;
    THREE.BatchedMesh.prototype.disposeBoundsTree = disposeBatchedBoundsTree;
    THREE.BatchedMesh.prototype.raycast = acceleratedRaycast;

    if (dataUrl) {
      cargarJSON();
    }
    // Crear escena, cámara y renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdae7f2);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(-17, 26, 16);
    cameraRef.current = camera;

    // Controles de cámara
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.dampingFactor = 0.2;
    controls.enableDamping = true;
    controls.target.set(3, 7, -3);
    controlsRef.current = controls;

    const control = new TransformControls(camera, renderer.domElement);
    control.addEventListener("objectChange", render);
    control.addEventListener("dragging-changed", function (event) {
      controls.enabled = !event.value;
    });
    transformControlsRef.current = control;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.2);
    scene.add(hemiLight);

    const directionalLight = new THREE.DirectionalLight();
    // Ajustes de la luz direccional
    directionalLight.color.setHex(0xffffff);
    directionalLight.intensity = 2.5;
    directionalLight.castShadow = true;

    directionalLight.position.set(50, 100, 50);

    directionalLight.shadow.mapSize.set(4096 * 2, 4096 * 2);
    // Asegúrate de que el 'near' y 'far' sean adecuados al tamaño de tu escena
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 200;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    // Un bias pequeño ayuda a evitar "bandas" en sombras
    directionalLight.shadow.bias = -0.0001;
    directionalLight.shadow.normalBias = 0.001;

    scene.add(directionalLight);

    scene.fog = new THREE.Fog(0x949494, 1000, 3000);
    for (let l = 0; l < 4; l++) {
      const dirLight = new THREE.DirectionalLight(0xffffff, Math.PI / 2);
      dirLight.name = "Dir. Light " + l;
      dirLight.position.set(200, 200, 200);
      dirLight.castShadow = true;
      dirLight.shadow.camera.near = 100;
      dirLight.shadow.camera.far = 5000;
      dirLight.shadow.camera.right = 150;
      dirLight.shadow.camera.left = -150;
      dirLight.shadow.camera.top = 150;
      dirLight.shadow.camera.bottom = -150;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.bias = -0.001;
      scene.add(dirLight);
    }

    const groundMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(600, 600),
      new THREE.MeshPhongMaterial({ color: 0xdae7f2, depthWrite: true })
    );
    groundMesh.position.y = -1;
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.name = "Ground Mesh";
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    const composer = new EffectComposer(renderer);
    composerRef.current = composer;

    const n8aopass = new N8AOPass(scene, camera, width, height);
    n8aopassRef.current = n8aopass;
    const renderPasse = new RenderPass(scene, camera);
    const outputPass = new OutputPass();

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.1,
      0.05,
      0.1
    );

    const outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      scene,
      camera
    );

    outlinePass.edgeStrength = 10;
    outlinePass.edgeGlow = 0;
    outlinePass.edgeThickness = 4;
    outlinePass.visibleEdgeColor.set("#0055ff");
    outlinePass.hiddenEdgeColor.set("#0055ff");

    n8aopass.configuration.aoRadius = 14;
    n8aopass.configuration.distanceFalloff = 2;
    n8aopass.configuration.intensity = 4;
    n8aopass.configuration.color = new THREE.Color(0, 0, 0);
    n8aopass.configuration.screenSpaceRadius = true;

    n8aopass.configuration.accumulate = true;
    n8aopass.configuration.stencil = true;

    n8aopass.setQualityMode("Ultra");

    n8aopass.configuration.aoSamples = 16;

    THREE.ColorManagement.legacyMode = false;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    composer.addPass(renderPasse); // RenderPass primero
    composer.addPass(n8aopass); // N8AOPass después
    composer.addPass(bloomPass); // BloomPass después
    composer.addPass(outlinePass); // OutlinePass antes del OutputPass
    composer.addPass(outputPass);

    //MOUSEOVER

    // Variables globales
    const raycaster = new THREE.Raycaster();
    raycasterRef.current = raycaster;
    const mouse = new THREE.Vector2();
    const hoverLabel = document.createElement("div");
    let hoveredMesh = null;

    // Configurar el cartel (hover label)
    hoverLabel.style.position = "absolute";
    hoverLabel.style.backgroundColor = "#ffffff";
    hoverLabel.style.color = "black";
    hoverLabel.style.boxShadow = "0 0 5px rgba(0,0,0,0.3)";
    hoverLabel.style.padding = "5px 10px";
    hoverLabel.style.borderRadius = "5px";
    hoverLabel.style.display = "none";
    document.body.appendChild(hoverLabel);

    function onMouseMove(event) {
      // Convertir la posición del mouse a coordenadas normalizadas (-1 to 1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    // Agregar el listener para el movimiento del mouse
    window.addEventListener("mousemove", onMouseMove);

    let meshList = [];
    loader.load(
      modelUrl,
      (glb) => {
        const model = glb.scene;
        storeOriginalMaterials(model, originalMaterialsRef);
        modelRef.current = model;
        model.traverse((node) => {
          if (node.isMesh) {
            node.frustumCulled = true;
            node.castShadow = true;
            node.receiveShadow = true;

            node.geometry.computeVertexNormals();
          }
        });
        scene.add(model);
        boxHelperRef.current = new THREE.Box3().setFromObject(model);
      },
      (progress) => {},
      (error) => {
        // Éste sí es el onError real
        console.error("Error cargando el modelo:", error);
      }
    );
    const roomMeshes = [];
    const roomsIds = [];
    let roomModel;
    roomLoader.load(
      roomsUrl,
      (glb) => {
        roomModel = glb.scene;
        roomsModelRef.current = roomModel;
        storeOriginalMaterials(roomModel, roomsOriginalMaterialsRef);

        // Recorrer todos los nodos del modelo
        roomModel.traverse((node) => {
          if (node.isMesh) {
            node.frustumCulled = true;
            const match = node.name.match(/<(\d{7})/);
            const number = match && match[1];
            roomMeshes.push(node);
            roomsIds.push(number);
            meshList.push(node);

            // Opcional: Configurar el BVH para la geometría original
            node.geometry.boundsTree = new MeshBVH(node.geometry, {
              maxDepth: 40,
            });
          }
        });

        // Configurar el outlinePass si existe
        if (outlinePass) {
          outlinePass.selectedObjects = meshList; // Seleccionar el modelo cargado
        }
      },
      (progress) => {},
      (error) => {
        console.error("Error cargando el modelo de rooms:", error);
      }
    );

    function updateRaycaster() {
      if (!isHoverActive.current) return;
      // Actualizar el raycaster con la posición del mouse
      raycaster.setFromCamera(mouse, camera);

      // Verificar intersecciones solo con los meshes de roomModel
      const intersects = raycaster.intersectObjects(roomMeshes, true);
      if (intersects.length > 0) {
        const firstIntersect = intersects[0].object;
        const match = firstIntersect.name.match(/<(\d{7})/);
        const number = match && match[1];
        if (roomsIds.includes(number)) {
          // Si el mesh intersectado es diferente al anterior, actualizar el cartel
          if (hoveredMesh !== firstIntersect) {
            hoveredMesh = firstIntersect;

            // Mostrar el nombre del mesh en el cartel
            hoverLabel.textContent = hoveredMesh.name || "Unnamed Mesh";
            hoverLabel.style.display = "block";

            // Posicionar el cartel cerca del cursor
            const rect = renderer.domElement.getBoundingClientRect();
            hoverLabel.style.left = `${
              mouse.x * (rect.width / 2) + rect.width / 2 + rect.left + 10
            }px`;
            hoverLabel.style.top = `${
              -mouse.y * (rect.height / 2) + rect.height / 2 + rect.top + 10
            }px`;
          }
        } else {
          // Si no hay intersecciones, ocultar el cartel
          if (hoveredMesh !== null) {
            hoveredMesh = null;
            hoverLabel.style.display = "none";
          }
        }
      }
    }
    const renderTarget = new THREE.WebGLRenderTarget(
      Math.max(width, 1),
      Math.max(height, 1)
    );

    // If you just want a depth buffer
    renderTarget.depthTexture = new THREE.DepthTexture(
      width,
      height,
      THREE.UnsignedIntType
    );
    renderTarget.depthTexture.format = THREE.DepthFormat;
    // If you want a depth buffer and a stencil buffer
    renderTarget.depthTexture = new THREE.DepthTexture(
      width,
      height,
      THREE.UnsignedInt248Type
    );
    renderTarget.depthTexture.format = THREE.DepthStencilFormat;

    // Variables para almacenar la posición y rotación anterior de la cámara
    let previousCameraPosition = new THREE.Vector3();
    let previousCameraRotation = new THREE.Euler();

    // Variables para determinar si la cámara se está moviendo
    let isCameraMoving = false;

    // Variables para el valor actual de denoise y sus objetivos
    let currentDenoiseSamples = 2;
    let currentDenoiseRadius = 1;
    let targetDenoiseSamples = 2;
    let targetDenoiseRadius = 1;

    // Función para detectar movimiento de cámara
    function updateCameraMovement(camera) {
      const positionThreshold = 0.01; // Umbral para detectar movimiento en la posición
      const rotationThreshold = 0.01; // Umbral para detectar movimiento en la rotación

      const positionDelta = camera.position.distanceTo(previousCameraPosition);
      const rotationDelta =
        Math.abs(camera.rotation.x - previousCameraRotation.x) +
        Math.abs(camera.rotation.y - previousCameraRotation.y) +
        Math.abs(camera.rotation.z - previousCameraRotation.z);

      // Actualizamos la variable que indica si la cámara se está moviendo
      isCameraMoving =
        positionDelta > positionThreshold || rotationDelta > rotationThreshold;

      // Guardamos la posición y rotación actual para el siguiente frame
      previousCameraPosition.copy(camera.position);
      previousCameraRotation.copy(camera.rotation);
    }

    // Función para definir los valores objetivo según si la cámara se mueve o no
    function setN8AOTargetValues() {
      if (isCameraMoving) {
        targetDenoiseSamples = 8;
        targetDenoiseRadius = 12;
      } else {
        targetDenoiseSamples = 2;
        targetDenoiseRadius = 1;
      }
    }

    // Función para ir interpolando progresivamente hacia esos valores objetivo
    function updateN8AOParameters(n8aopass) {
      // Factor de interpolación (ajusta este valor para cambiar la velocidad de transición)
      const lerpFactor = 0.05;

      // Interpolamos de forma lineal para que currentDenoiseSamples y currentDenoiseRadius
      // se acerquen poco a poco a los valores deseados (target)
      currentDenoiseSamples = THREE.MathUtils.lerp(
        currentDenoiseSamples,
        targetDenoiseSamples,
        lerpFactor
      );

      currentDenoiseRadius = THREE.MathUtils.lerp(
        currentDenoiseRadius,
        targetDenoiseRadius,
        lerpFactor
      );

      // Asignamos estos valores al pass
      // Nota: si denoiseSamples requiere ser entero, podrías usar Math.round(...)
      n8aopass.configuration.denoiseSamples = Math.round(currentDenoiseSamples);
      n8aopass.configuration.denoiseRadius = Math.round(currentDenoiseRadius);
    }

    // Para calcular 'delta' (el tiempo transcurrido entre frames),
    // en Three.js usualmente se hace algo así:
    const clock = new THREE.Clock();

    //Modo test con GUI

    if (testMode) {
      const gui = new GUI();
      //Folder de luz ambiental
      const ambientLightFolder = gui.addFolder("Ambient Light");
      ambientLightFolder.add(ambientLight, "intensity", 0, 1, 0.01);

      //Folder de luz direccional
      const directionalLightFolder = gui.addFolder("Directional Light");
      directionalLightFolder.add(directionalLight, "intensity", 0, 10, 0.01);
      directionalLightFolder.add(
        directionalLight.position,
        "x",
        -100,
        100,
        0.1
      );
      directionalLightFolder.add(
        directionalLight.position,
        "y",
        -100,
        100,
        0.1
      );
      directionalLightFolder.add(
        directionalLight.position,
        "z",
        -100,
        100,
        0.1
      );

      //Folder de luz hemisférica
      const hemiLightFolder = gui.addFolder("Hemisphere Light");
      hemiLightFolder.add(hemiLight, "intensity", 0, 1, 0.01);

      //folder de otras luces
      const otherLightsFolder = gui.addFolder("Other Lights");
      for (let i = 0; i < 4; i++) {
        const light = scene.getObjectByName(`Dir. Light ${i}`);
        const lightFolder = otherLightsFolder.addFolder(`Dir. Light ${i}`);
        lightFolder.add(light, "intensity", 0, 10, 0.01);
        lightFolder.add(light.position, "x", -100, 100, 0.1);
        lightFolder.add(light.position, "y", -100, 100, 0.1);
        lightFolder.add(light.position, "z", -100, 100, 0.1);
      }

      //folder de bloom
      const bloomFolder = gui.addFolder("Bloom Pass");
      bloomFolder.add(bloomPass, "strength", 0, 5, 0.01);
      bloomFolder.add(bloomPass, "radius", 0, 5, 0.01);
      bloomFolder.add(bloomPass, "threshold", 0, 1, 0.01);

      //folder de n8aopass
      const n8aopassFolder = gui.addFolder("N8AO Pass");
      n8aopassFolder.add(n8aopass.configuration, "aoSamples", 1, 64, 1);
      n8aopassFolder.add(n8aopass.configuration, "aoRadius", 1, 64, 1);
      n8aopassFolder.add(n8aopass.configuration, "intensity", 0, 10, 0.01);
      n8aopassFolder.addColor(n8aopass.configuration, "color");
      n8aopassFolder.add(
        n8aopass.configuration,
        "distanceFalloff",
        0,
        10,
        0.01
      );
      n8aopassFolder.add(n8aopass.configuration, "screenSpaceRadius");
    }

    // Ciclo de animación
    function animate() {
      animationFrameId.current = requestAnimationFrame(animate);
      updateRaycaster();
      // Calculamos el tiempo transcurrido desde el frame anterior
      const delta = clock.getDelta();

      // Revisar movimiento de la cámara
      updateCameraMovement(camera);

      // Ajustar los valores objetivo de denoise/Radius
      setN8AOTargetValues();

      // Interpola y actualiza los parámetros del pass
      updateN8AOParameters(n8aopass, delta);

      // Actualiza controles
      controls.update();

      // Renderiza la escena
      composer.render();
    }

    if (typeof window !== "undefined") {
      animate();
    }

    const handleResize = () => {
      const width = Math.max(visorRef.current.clientWidth, 1); // Mínimo 1px
      const height = Math.max(visorRef.current.clientHeight, 1); // Mínimo 1px
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderTarget.setSize(width, height);
      composer.setSize(width, height);
      n8aopass.setSize(width, height);
    };

    window.addEventListener("resize", () => {
      handleResize();
    });

    // Limpieza
    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      // Limpieza de controles
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }

      if (transformControlsRef.current) {
        transformControlsRef.current.dispose();
      }

      if (renderer) {
        renderer.dispose();
        if (visorRef.current) {
          visorRef.current.removeChild(renderer.domElement);
        }
      }

      // Limpieza del renderTarget si existe
      if (renderTarget) {
        renderTarget.dispose();
        renderTarget.depthTexture.dispose();
      }

      // Limpieza de luces
      scene.traverse((object) => {
        if (object.isLight) {
          object.dispose();
        }
      });

      // limpia el raycaster
      window.removeEventListener("mousemove", onMouseMove);

      // Limpieza del modelo y materiales
      if (modelRef.current) {
        disposeModel();
      }

      if (composerRef.current) {
        composerRef.current.dispose();
      }

      // Limpiar la escena
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }

      // Cancelar el loop de animación
      if (window.requestAnimationFrameId) {
        cancelAnimationFrame(window.requestAnimationFrameId);
      }
    };
  }, []);

  function disposeModel() {
    const model = modelRef.current;
    model.traverse((node) => {
      if (node.isMesh) {
        node.geometry.dispose();
        if (node.material.isMaterial) {
          cleanMaterial(node.material);
        } else if (Array.isArray(node.material)) {
          node.material.forEach(cleanMaterial);
        }
      }
    });
  }

  function cleanMaterial(material) {
    Object.keys(material).forEach((key) => {
      if (material[key] && typeof material[key].dispose === "function") {
        material[key].dispose();
      }
    });
  }

  useEffect(() => {
    const renderer = rendererRef.current;

    const createplanefunc = (event) => {
      if (!cuttingActive) return;
      createplane(event);
    };

    if (cuttingActive) {
      renderer.domElement.addEventListener("dblclick", createplanefunc);
    } else {
      renderer.domElement.removeEventListener("dblclick", createplanefunc);
    }
  }, [cuttingActive]);

  /**
   * Función para crear un plano de corte
   */
  const createplane = useCallback((event) => {
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    const raycaster = raycasterRef.current;
    const transformControls = transformControlsRef.current;

    if (!renderer || !camera || !scene || !raycaster || !transformControls)
      return;

    // 1. Raycast
    const rect = renderer.domElement.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera({ x: mouseX, y: mouseY }, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length === 0) return;

    const intersection = intersects[0];
    const point = intersection.point;

    const plane = new THREE.Plane();
    clippingPlaneRef.current = plane;

    const gizmo = transformControls.getHelper();
    scene.add(gizmo);

    // 3. Si ya existe un planeMesh anterior, lo removemos de la escena
    if (planeMeshRef.current) {
      scene.remove(planeMeshRef.current);
      transformControls.detach(planeMeshRef.current);
      planeMeshRef.current.geometry.dispose();
      planeMeshRef.current.material.dispose();
      planeMeshRef.current = null;
    }

    // 4. Crear un Mesh plano semitransparente para visualizarlo
    const planeSize = 8;
    const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMaterial = new THREE.MeshPhongMaterial({
      color: 0x90d5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.copy(point);

    // 1. Obtienes el vector "normal" mundial del plano
    const cameraDir = new THREE.Vector3();
    camera.getWorldDirection(cameraDir);

    if (Math.abs(cameraDir.y) > 0.7) {
      if (cameraDir.y > 0) {
        // Cámara por encima => normal hacia abajo => rotación.x = -90°
        planeMesh.rotation.set(-Math.PI / 2, 0, 0);
      } else {
        // Cámara por debajo => normal hacia arriba => +90°
        planeMesh.rotation.set(Math.PI / 2, 0, 0);
      }
    } else {
      // Si no domina Y, consideramos "vertical" => normal +Z => (0,0,0)
      planeMesh.rotation.set(0, 0, 0);
    }

    // Agregar a la escena
    scene.add(planeMesh);
    planeMeshRef.current = planeMesh;

    updatePlaneFromMesh();

    renderer.clippingPlanes = [plane];

    transformControls.attach(planeMesh);

    transformControls.addEventListener("change", updatePlaneFromMesh);
  }, []);

  function updatePlaneFromMesh() {
    const plane = clippingPlaneRef.current;
    const planeMesh = planeMeshRef.current;
    if (!plane || !planeMesh) return;

    const newNormal = new THREE.Vector3(0, 0, 1);
    planeMesh.getWorldDirection(newNormal);

    const coplanarPoint = new THREE.Vector3().setFromMatrixPosition(
      planeMesh.matrixWorld
    );

    plane.setFromNormalAndCoplanarPoint(newNormal, coplanarPoint);
  }

  const moveCamera = (newPos, time = 1) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const center = new THREE.Vector3();
    boxHelperRef.current.getCenter(center);

    // Usamos gsap para interpolar la posición de la cámara
    gsap.to(camera.position, {
      duration: time,
      x: newPos.x,
      y: newPos.y,
      z: newPos.z,
      ease: "power2.inOut",
      onUpdate: () => {
        controls.update();
      },
      onComplete: () => {
        camera.lookAt(center);
        controls.target.copy(center);
        controls.update();
      },
    });
  };

  // Esta función la llamas una sola vez, quizá cuando cargaste el modelo
  function storeOriginalMaterials(model, ref) {
    model.traverse((node) => {
      if (node.isMesh) {
        // Guardas el material original asociado al uuid (o id) del node
        ref.current[node.uuid] = node.material;
      }
    });
  }

  const removePlane = () => {
    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    const transformControls = transformControlsRef.current;

    // Quitar planeMesh
    if (planeMeshRef.current) {
      scene.remove(planeMeshRef.current);
      transformControls.detach(planeMeshRef.current);
      planeMeshRef.current.geometry.dispose();
      planeMeshRef.current.material.dispose();
      planeMeshRef.current = null;
    }

    if (renderer) {
      renderer.clippingPlanes = [];
    }

    clippingPlaneRef.current = null;
  };

  function restoreOriginalState() {
    isHoverActive.current = false;
    // Restaurar los materiales originales del modelo principal
    modelRef.current.traverse((node) => {
      if (node.isMesh && originalMaterialsRef.current[node.uuid]) {
        node.material = originalMaterialsRef.current[node.uuid]; // Restaurar el material original
        node.castShadow = true; // Restaurar sombras si es necesario
        node.receiveShadow = true; // Restaurar sombras si es necesario
      }
    });

    // Restaurar la visibilidad de todos los nodos del modelo de habitaciones
    roomsModelRef.current.traverse((node) => {
      if (node.isMesh) {
        node.visible = true; // Asegurarse de que todos los nodos estén visibles
      }
    });

    // Quitar el modelo de habitaciones de la escena si está presente
    if (sceneRef.current.children.includes(roomsModelRef.current)) {
      sceneRef.current.remove(roomsModelRef.current);
    }

    return moveCamera({ x: -17, y: 26, z: 16 });
  }

  function selectRoom(roomsData) {
    // Si no hay datos, restaurar el estado original
    if (roomsData.length === 0) return restoreOriginalState();
    //isHoverActive.current = true;
    // Verificar que todos los IDs existan
    const allMeshIds = roomsData.flatMap((room) => room.directShapeIds);
    const invalidIds = allMeshIds.filter(
      (id) => !roomsRef.current.includes(id)
    );
    if (invalidIds.length > 0) {
      return alert(`IDs no encontrados: ${invalidIds.join(", ")}`);
    }

    const n8aopass = n8aopassRef.current;
    n8aopass.setQualityMode("Ultra");
    // Transparentar todos los elementos del modelo original
    modelRef.current.traverse((node) => {
      if (node.isMesh) {
        node.material = darkerTransparentGrayMaterial;
        node.castShadow = false;
        node.receiveShadow = false;
      }
    });

    // Verificar si el modelo de rooms ya está cargado en la escena
    const isModelAlreadyLoaded = sceneRef.current.children.includes(
      roomsModelRef.current
    );

    // Si el modelo no está cargado, agregarlo a la escena
    if (!isModelAlreadyLoaded) {
      sceneRef.current.add(roomsModelRef.current);
    }

    // Restaurar la visibilidad de todos los nodos del modelo de rooms
    roomsModelRef.current.traverse((node) => {
      if (node.isMesh) {
        node.visible = true; // Restaurar la visibilidad de todos los nodos
      }
    });

    // Ocultar los elementos de room excepto los seleccionados y pintarlos según su status
    const selectedPositions = []; // Para almacenar las posiciones de las habitaciones seleccionadas

    roomsModelRef.current.traverse((node) => {
      if (node.isMesh) {
        const match = node.name.match(/<(\d{7})/);
        const number = match && match[1];

        if (number) {
          // Buscar el roomData correspondiente al directShapeId
          const roomData = roomsData.find((room) =>
            room.directShapeIds.includes(number)
          );

          if (roomData) {
            // Determinar el color según el status
            let colorHex;
            switch (roomData.status) {
              case "Occupied":
                colorHex = 0xff2323;
                break;
              case "Available":
                colorHex = 0x1daf94;
                break;
              case "Warning":
                colorHex = 0xe1901f;
                break;
              default:
                colorHex = 0x90d5ff; // Color por defecto
            }

            // Crear el material con el color correspondiente
            const coloredMaterial = new THREE.MeshBasicMaterial({
              color: colorHex,
            });

            // Aplicar el material y hacer visible el nodo
            node.material = coloredMaterial;
            node.visible = true;

            // Guardar la posición para calcular el centro
            node.updateWorldMatrix(true, true);
            const position = new THREE.Vector3();
            position.setFromMatrixPosition(node.matrixWorld);
            selectedPositions.push(position);
          } else {
            // Ocultar nodos que no coinciden con ningún directShapeId
            node.visible = false;
          }
        }
      }
    });

    // Calcular el centro de las habitaciones seleccionadas (si es necesario)
    if (selectedPositions.length > 0) {
      const center = selectedPositions
        .reduce((acc, pos) => acc.add(pos), new THREE.Vector3())
        .divideScalar(selectedPositions.length);
      console.log("Centro de las habitaciones seleccionadas:", center);
    }
  }

  function getDirectShapeIdsByExternalIds(inputArray) {
    // Array para almacenar los resultados finales
    const result = [];

    // Recorrer el array de objetos de entrada
    for (const item of inputArray) {
      const { externalIds, status } = item;

      // Array para almacenar los _OOD_DirectShapeId encontrados para este grupo de externalIds
      const directShapeIds = [];

      // Recorrer el objeto principal (jsonData.rooms)
      for (const key in jsonData.rooms) {
        if (jsonData.rooms.hasOwnProperty(key)) {
          const room = jsonData.rooms[key];

          // Verificar si el _OOD_ExternalId está en el array de externalIds
          if (externalIds.includes(room._OOD_ExternalId)) {
            // Agregar el _OOD_DirectShapeId al array de resultados
            directShapeIds.push(room._OOD_DirectShapeId.toString());
          }
        }
      }

      // Agregar el objeto con los directShapeIds y el status al resultado final
      result.push({
        directShapeIds,
        status,
      });
    }

    return result;
  }

  useEffect(() => {
    if (!jsonData) return;
    if (!externalIds) return restoreOriginalState();
    if (externalIds.length === 0) return restoreOriginalState();
    const directShapeIds = getDirectShapeIdsByExternalIds(externalIds);
    selectRoom(directShapeIds);
  }, [externalIds]);

  useEffect(() => {
    if (!cuttingActive) {
      removePlane();
    }
  }, [cuttingActive]);

  return (
    <div
      style={{
        filter: "saturate(5) contrast(1.2)",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <section
        ref={visorRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      ></section>
      <nav
        style={{
          display: "flex",
          gap: "15px",
          position: "absolute",
          bottom: "20px",
          left: "46%",
          padding: "10px",
        }}
      >
        <Helper text="Centra la camara en el modelo">
          <Button onClick={() => moveCamera({ x: -17, y: 26, z: 16 })}>
            <CiMaximize2 />
          </Button>
        </Helper>
        <Helper text="Activa un boundingbox alrededor del modelo">
          <button
            onClick={() => setCuttingActive(!cuttingActive)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "2rem",
              width: "2rem",
              background: cuttingActive ? "#3D3C3B" : "#f9f9f9",
              color: cuttingActive ? "#f9f9f9" : "#3D3C3B",
              borderRadius: "50%",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              border: "none",
              cursor: "pointer",
              padding: "0.2rem",
            }}
          >
            <PiBoundingBox />
          </button>
        </Helper>
        <div style={{ position: "relative" }}>
          <Helper text="Abre Menu de navegacion de la camara">
            <button
              onClick={() => setShowCameraControls(!showCameraControls)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "2rem",
                width: "2rem",
                background: showCameraControls ? "#3D3C3B" : "#f9f9f9",
                color: showCameraControls ? "#f9f9f9" : "#3D3C3B",
                borderRadius: "50%",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                border: "none",
                cursor: "pointer",
                padding: "0.2rem",
              }}
            >
              <MdOutlineCameraIndoor />
            </button>
          </Helper>
          {showCameraControls && (
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                bottom: "100%",
                marginBottom: "5px",
                padding: "5px",
                background: "#f9f9f9",
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              <MenuButton onClick={() => moveCamera({ x: 0, y: 30, z: 0 })}>
                Arriba
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: -30, y: 0, z: 0 })}>
                Izquierda
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: 0, y: -30, z: 0 })}>
                Abajo
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: 30, y: 0, z: 0 })}>
                Derecha
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: 0, y: 0, z: 30 })}>
                Frente
              </MenuButton>
              <MenuButton onClick={() => moveCamera({ x: 0, y: 0, z: -30 })}>
                Detras
              </MenuButton>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Visor;
